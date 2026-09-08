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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  fields: Record<string, unknown>;
  utm: Record<string, string>;
  pageUrl: string;
};

/**
 * The CRM's lead-intake schema REQUIRES `firstName` + `lastName` as separate
 * string fields (it rejects a single `name` with 400). Prefer the explicit
 * fields; if a form only sends a combined name, split on the first space.
 */
function splitName(lead: CrmLead): { firstName: string; lastName: string } {
  const first = lead.firstName.trim();
  const last = lead.lastName.trim();
  if (first || last) return { firstName: first || last, lastName: last || first };
  const full = lead.name.trim();
  const sp = full.indexOf(" ");
  if (sp === -1) return { firstName: full, lastName: full };
  return { firstName: full.slice(0, sp), lastName: full.slice(sp + 1).trim() };
}

/** "ein" -> "EIN", "businessName" -> "Business Name". */
function prettyLabel(key: string): string {
  if (key.toLowerCase() === "ein") return "EIN";
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
}

/** Flatten non-empty form fields to top-level string keys the CRM can auto-map. */
function flattenFields(fields: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v == null) continue;
    const s = typeof v === "string" ? v : String(v);
    if (s.trim() !== "") out[k] = s;
  }
  return out;
}

/**
 * Human-readable summary of the extra detail, so nothing is lost even if the CRM
 * doesn't map a particular key to a deal property.
 */
function buildNotes(lead: CrmLead, brand: BrandConfig): string {
  const lines: string[] = [];
  const add = (label: string, val: unknown) => {
    const s = val == null ? "" : String(val).trim();
    if (s) lines.push(`${label}: ${s}`);
  };
  for (const [k, v] of Object.entries(lead.fields)) add(prettyLabel(k), v);
  add("Source", brand.label);
  add("Page", lead.pageUrl);
  const utm = Object.entries(lead.utm)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${v}`)
    .join(", ");
  add("UTM", utm);
  return lines.join("\n");
}

const TIMEOUT_MS = 8000;

export async function forwardToCrm(
  route: FormRoute,
  lead: CrmLead,
  brand: BrandConfig,
): Promise<{ ok: boolean; error?: string }> {
  const url = process.env.CRM_LEAD_WEBHOOK_URL;
  if (!url) return { ok: false, error: "CRM_LEAD_WEBHOOK_URL not set" };

  // Flat payload matching the CRM's lead-intake schema. `firstName`/`lastName`
  // and `formIdentifier` are REQUIRED; `formIdentifier` is what the CRM matches
  // against its Form Mapping to route the lead to the Ventra subaccount.
  const { firstName, lastName } = splitName(lead);
  const notes = buildNotes(lead, brand);
  const payload = {
    // Extra form fields (state, industry, ein, about…) flattened to top-level so
    // the CRM auto-maps them. Spread FIRST so it can never clobber the canonical
    // keys below.
    ...flattenFields(lead.fields),
    formIdentifier: route.crmFormId,
    firstName,
    lastName,
    email: lead.email,
    phone: lead.phone || "",
    company: lead.company || "",
    source: brand.label,
    brand: brand.brand,
    name: lead.name,
    pageUrl: lead.pageUrl || "",
    utm: lead.utm,
    // Catch-all so the detail is always visible on the deal, mapped or not.
    notes,
    message: notes,
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
