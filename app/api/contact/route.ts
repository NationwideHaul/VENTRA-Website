import { NextResponse } from "next/server";

/**
 * Contact form handler.
 *
 * Forwards the submission to the CRM webhook in CONTACT_FORM_ENDPOINT when it
 * is configured ([CONFIRM] GoHighLevel / CRM webhook). Until then it accepts
 * the submission and logs it, so the front-end flow works end to end.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Minimal required-field check.
  const required = ["firstName", "lastName", "businessName", "email", "phone"];
  const missing = required.filter((k) => !payload[k]);
  if (missing.length) {
    return NextResponse.json(
      { error: `Missing fields: ${missing.join(", ")}` },
      { status: 422 },
    );
  }

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
      console.error("Contact forward failed:", err);
      return NextResponse.json({ error: "Forwarding failed" }, { status: 502 });
    }
  } else {
    // No CRM endpoint configured yet — accept and log.
    console.info("Contact submission (no endpoint configured):", payload);
  }

  return NextResponse.json({ ok: true });
}
