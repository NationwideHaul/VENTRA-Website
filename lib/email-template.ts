import { brandConfig, type FormRoute } from "@/lib/form-config";

/**
 * Lead-notification email builder.
 *
 * Renders a table-based HTML email (Outlook-safe — no flexbox/grid, all layout
 * via <table> + inline styles) with a brand-colored header, plus a plain-text
 * fallback. Subject format: "[Ventra Insurance Group] Contacto — Jane Doe".
 */

export type LeadData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  fields?: Record<string, unknown>;
  utm?: Record<string, string>;
  pageUrl?: string;
};

const esc = (v: string) =>
  v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** "firstName" / "year_started" → "First Name" / "Year Started". */
const humanize = (key: string) =>
  key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

const toText = (v: unknown): string => {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v.trim();
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
};

export function buildLeadEmail(route: FormRoute, data: LeadData) {
  const subject = `[${brandConfig.label}] ${route.label} — ${data.name}`;

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone ?? ""],
    ["Company", data.company ?? ""],
  ];

  for (const [k, v] of Object.entries(data.fields ?? {})) {
    rows.push([humanize(k), toText(v)]);
  }

  const utm = data.utm ?? {};
  const src = utm.utm_source ?? utm.source;
  const med = utm.utm_medium ?? utm.medium;
  const camp = utm.utm_campaign ?? utm.campaign;
  if (src) rows.push(["Source", src]);
  if (med) rows.push(["Medium", med]);
  if (camp) rows.push(["Campaign", camp]);
  if (data.pageUrl) rows.push(["Page", data.pageUrl]);

  const visible = rows.filter(([, v]) => v.trim() !== "");

  const rowsHtml = visible
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 14px;border:1px solid #e5e7eb;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#111827;white-space:nowrap;vertical-align:top;">${esc(k)}</td>
          <td style="padding:10px 14px;border:1px solid #e5e7eb;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111827;vertical-align:top;">${esc(v)}</td>
        </tr>`,
    )
    .join("");

  const html = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;margin:0;padding:24px 0;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#ffffff;border:1px solid #e5e7eb;border-radius:8px;">
        <tr>
          <td style="background-color:${brandConfig.accent};padding:18px 24px;border-top-left-radius:8px;border-top-right-radius:8px;">
            <span style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:#ffffff;">${esc(brandConfig.label)}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:22px 24px 8px 24px;">
            <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#111827;">New ${esc(route.label)} submission</p>
            <p style="margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7280;">Reply to this email to respond directly to the lead.</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              ${rowsHtml}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 24px 22px 24px;">
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#9ca3af;">${esc(brandConfig.holding.toUpperCase())} &middot; ${esc(brandConfig.label)} &middot; automated notification</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

  const text = visible.map(([k, v]) => `${k}: ${v}`).join("\n");

  return { subject, html, text };
}
