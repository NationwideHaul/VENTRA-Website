import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { brandConfig, resolveForm } from "@/lib/form-config";
import { buildLeadEmail } from "@/lib/email-template";

/**
 * Unified lead intake for every form on the site.
 *
 * Flow:
 *   1. Validate the body (zod). A filled `_hp` honeypot → accept + drop (bot).
 *   2. Persist to Supabase `form_submissions` FIRST, using the service_role key.
 *      This is the source of truth — it runs server-side only and the key is
 *      never sent to the client.
 *   3. Send the notification email via Resend (Reply-To = the lead).
 *   4. Write back email_status ('sent' | 'failed'). A mail failure must NOT fail
 *      the request — the lead is already saved.
 */

export const runtime = "nodejs";

const leadSchema = z.object({
  formId: z.string().min(1),
  name: z.string().min(1),
  email: z.email(),
  phone: z.string().optional().default(""),
  company: z.string().optional().default(""),
  fields: z.record(z.string(), z.unknown()).optional().default({}),
  utm: z.record(z.string(), z.string()).optional().default({}),
  pageUrl: z.string().optional().default(""),
  _hp: z.string().optional().default(""),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 422 });
  }
  const data = parsed.data;

  // Honeypot: only bots fill `_hp`. Pretend success and discard.
  if (data._hp.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const route = resolveForm(data.formId);

  const fwd = request.headers.get("x-forwarded-for") ?? "";
  const ip =
    fwd.split(",")[0].trim() || request.headers.get("x-real-ip") || null;
  const userAgent = request.headers.get("user-agent") || null;
  const leadSource = data.utm.utm_source ?? data.utm.source ?? null;
  const medium = data.utm.utm_medium ?? data.utm.medium ?? null;

  // Server-only admin client. The service_role key stays on the server.
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase =
    supabaseUrl && serviceRole
      ? createClient(supabaseUrl, serviceRole, {
          auth: { persistSession: false },
        })
      : null;

  // 1) Persist FIRST — the lead is the source of truth.
  let rowId: number | string | null = null;
  if (supabase) {
    const { data: inserted, error } = await supabase
      .from("form_submissions")
      .insert({
        holding: brandConfig.holding,
        brand: brandConfig.brand,
        form_id: data.formId,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        payload: data.fields,
        lead_source: leadSource,
        medium,
        utm: data.utm,
        page_url: data.pageUrl || null,
        ip_address: ip,
        user_agent: userAgent,
        email_status: "pending",
      })
      .select("id")
      .single();
    if (error) {
      console.error("Supabase insert failed:", error.message);
    } else {
      rowId = inserted.id as number | string;
    }
  } else {
    console.warn("Supabase env not set — submission not persisted.");
  }

  // 2) Notify via Resend — failure here must NOT fail the request.
  let emailStatus: "sent" | "failed" = "failed";
  let resendId: string | null = null;
  let emailError: string | null = null;
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const { subject, html, text } = buildLeadEmail(route, data);
      const { data: sent, error } = await resend.emails.send({
        from: brandConfig.from,
        to: route.to,
        replyTo: data.email,
        subject,
        html,
        text,
      });
      if (error) throw new Error(error.message);
      resendId = sent?.id ?? null;
      emailStatus = "sent";
    } catch (err) {
      emailError = err instanceof Error ? err.message : String(err);
      console.error("Resend email failed (lead already saved):", err);
    }
  } else {
    console.warn("RESEND_API_KEY not set — no email sent.");
  }

  // 3) Reflect the email outcome on the saved row.
  if (supabase && rowId !== null) {
    const patch: Record<string, unknown> = { email_status: emailStatus };
    if (resendId) patch.resend_id = resendId;
    if (emailError) patch.email_error = emailError;
    const { error } = await supabase
      .from("form_submissions")
      .update(patch)
      .eq("id", rowId);
    if (error) console.error("email_status update failed:", error.message);
  }

  // Only surface an error if the lead was captured on NO channel at all.
  if (rowId === null && emailStatus === "failed") {
    return NextResponse.json(
      { error: "Could not process submission" },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
