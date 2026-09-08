import type { BrandConfig, FormRoute } from "./form-config";

/**
 * Forward a captured lead to the shared CRM (crm.roadreadyinsurance.com).
 *
 * The full webhook URL — including its secret `key` query param — lives in the
 * CRM_LEAD_WEBHOOK_URL env var and is NEVER hardcoded in source. The key is
 * org-wide (shared by every brand/subaccount in the CRM), so the destination
 * subaccount is selected by `route.crmFormId` matching a Form Mapping in the CRM,
 * not by the webhook itself.
 *
 * This is best-effort: like the email, a CRM failure must NOT fail the request —
 * the lead is already saved to Supabase (the source of truth).
 */

export type CrmLead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  fields: Record<string, unknown>;
  utm: Record<string, string>;
  pageUrl: string;
};

const TIMEOUT_MS = 8000;

export async function forwardToCrm(
  route: FormRoute,
  lead: CrmLead,
  brand: BrandConfig,
): Promise<{ ok: boolean; error?: string }> {
  const url = process.env.CRM_LEAD_WEBHOOK_URL;
  if (!url) return { ok: false, error: "CRM_LEAD_WEBHOOK_URL not set" };

  // Flat, clearly-named payload for the CRM's custom lead-intake parser.
  // `formIdentifier` is the field the CRM matches against its Form Mapping.
  const payload = {
    formIdentifier: route.crmFormId,
    source: brand.label,
    brand: brand.brand,
    name: lead.name,
    email: lead.email,
    phone: lead.phone || "",
    company: lead.company || "",
    pageUrl: lead.pageUrl || "",
    utm: lead.utm,
    fields: lead.fields,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return {
        ok: false,
        error: `HTTP ${res.status}${detail ? `: ${detail.slice(0, 200)}` : ""}`,
      };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}
