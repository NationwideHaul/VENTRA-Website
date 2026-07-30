import { NextResponse } from "next/server";
import { Resend } from "resend";
import { usStates } from "@/data/states";
import { OTHER_BUSINESS_CLASS } from "@/data/business-classes";

/**
 * Contact form handler.
 *
 * Primary action: emails every submission to the team inbox (CONTACT_TO_EMAIL,
 * default info@ventrainsurance.com) via Resend. Reply-To is set to the lead's
 * own address so a reply goes straight back to them.
 *
 * Anti-spam: a hidden honeypot field ("company") is silently dropped when
 * filled, plus a best-effort per-IP rate limit.
 *
 * Secondary (optional): if CONTACT_FORM_ENDPOINT is set, the raw payload is
 * also forwarded to that CRM webhook (best-effort — a webhook failure does not
 * fail the submission).
 *
 * Env vars:
 *   RESEND_API_KEY       — required to actually send. Missing → logged + accepted.
 *   CONTACT_TO_EMAIL     — inbox that receives leads. Default info@ventrainsurance.com
 *   CONTACT_FROM_EMAIL   — sender. Default onboarding@resend.dev (works without a
 *                          verified domain; only delivers to the Resend account's
 *                          own email until a domain is verified).
 *   CONTACT_FORM_ENDPOINT — optional CRM webhook.
 */

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@ventrainsurance.com";
// Internal lead notification — the customer never sees this sender, so Resend's
// shared onboarding@resend.dev works without verifying the domain. Reply-To is
// set to the lead's own email so replies go to the customer.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Ventra Website Leads <onboarding@resend.dev>";

// Best-effort in-memory rate limit. Serverless instances are per-region and
// recycle, so this throttles bursts on a warm instance rather than being a hard
// global cap — enough to blunt scripted spam without an external store.
const RATE_LIMIT = 5; // submissions
const RATE_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes
const hits = new Map<string, number[]>();

const rateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
};

const stateName = (code: unknown): string => {
  if (typeof code !== "string" || code === "") return "—";
  return usStates.find((s) => s.code === code)?.name ?? code;
};

const val = (v: unknown): string =>
  typeof v === "string" && v.trim() !== "" ? v.trim() : "—";

const escapeHtml = (v: string): string =>
  v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Honeypot — a real user never fills this. Silently accept so bots get no signal.
  if (typeof payload.company === "string" && payload.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Rate limit by client IP (best-effort).
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  // Minimal required-field check.
  const required = [
    "firstName",
    "lastName",
    "businessName",
    "email",
    "phone",
    "state",
    "industry",
  ];
  const missing = required.filter((k) => !payload[k]);
  if (missing.length) {
    return NextResponse.json(
      { error: `Missing fields: ${missing.join(", ")}` },
      { status: 422 },
    );
  }

  const fullName = `${val(payload.firstName)} ${val(payload.lastName)}`.trim();
  const leadEmail = val(payload.email);

  // Resolve the industry, expanding "Other (specify)" with the free-text value.
  const industry =
    payload.industry === OTHER_BUSINESS_CLASS
      ? `Other: ${val(payload.otherIndustry)}`
      : val(payload.industry);

  // Human-readable summary of the submission.
  const rows: [string, string][] = [
    ["Name", fullName],
    ["Email", leadEmail],
    ["Phone", val(payload.phone)],
    ["Business", val(payload.businessName)],
    ["State", stateName(payload.state)],
    ["EIN", val(payload.ein)],
    ["Industry", industry],
    ["Request", "Schedule a consultation"],
    ["About the business", val(payload.about)],
  ];

  const textBody = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const htmlBody = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#09151c;max-width:560px">
      <h2 style="margin:0 0 4px;font-size:18px">New contact form submission</h2>
      <p style="margin:0 0 16px;color:#5a6a72;font-size:13px">Ventra Insurance Group — ventrainsurance.com</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:8px 12px;border:1px solid #e3e6e8;background:#f7f8f8;font-weight:600;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td>
            <td style="padding:8px 12px;border:1px solid #e3e6e8;vertical-align:top">${escapeHtml(v)}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>`;

  const subject = `New lead: ${fullName} — ${val(payload.businessName)}`;
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject,
        replyTo: leadEmail !== "—" ? leadEmail : undefined,
        text: textBody,
        html: htmlBody,
      });
      if (error) throw new Error(`Resend: ${error.message}`);
    } catch (err) {
      console.error("Contact email failed:", err);
      return NextResponse.json({ error: "Email failed" }, { status: 502 });
    }
  } else {
    // No email provider configured yet — accept and log so the site works.
    console.warn(
      "RESEND_API_KEY not set — submission NOT emailed. Payload:",
      textBody,
    );
  }

  // Optional CRM webhook — best-effort, never fails the request.
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Upstream ${res.status}`);
    } catch (err) {
      console.error("Contact CRM forward failed (non-blocking):", err);
    }
  }

  return NextResponse.json({ ok: true });
}
