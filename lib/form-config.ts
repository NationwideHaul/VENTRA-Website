/**
 * Form routing table for this site (brand: ventra, holding: ccc).
 *
 * Every form on the site posts to /api/lead with a `formId`. That handler looks
 * the id up here to decide the destination inbox and the label used in the
 * email subject. Add new forms to `forms` with their own `to` when a form needs
 * a different destination; anything not listed falls back to `defaultTo`.
 *
 * The `from` address must belong to a domain verified in the shared Resend
 * account (notify.nationwidehaul.com is the central sending domain).
 */

export type Holding = "ccc";

export type FormRoute = {
  /** Human label shown in the email subject, e.g. "[Ventra…] Contacto — Jane". */
  label: string;
  /** Inbox that receives this form's leads. */
  to: string;
};

export type BrandConfig = {
  brand: string;
  holding: Holding;
  /** Display name used in subjects and the email header. */
  label: string;
  /** Verified Resend sender. */
  from: string;
  /** Brand accent color (email header). */
  accent: string;
  /** Fallback inbox for any formId not present in `forms`. */
  defaultTo: string;
  forms: Record<string, FormRoute>;
};

export const brandConfig: BrandConfig = {
  brand: "ventra",
  holding: "ccc",
  label: "Ventra Insurance Group",
  from: "Ventra Forms <ventra@notify.nationwidehaul.com>",
  accent: "#c1121f",
  defaultTo: "info@ventrainsurance.com",
  forms: {
    contact: { label: "Contact", to: "info@ventrainsurance.com" },
    "get-a-quote": { label: "Get a quote", to: "info@ventrainsurance.com" },
  },
};

/** Resolve a formId to its route, falling back to the brand default. */
export function resolveForm(formId: string): FormRoute {
  return (
    brandConfig.forms[formId] ?? {
      label: formId || "Form",
      to: brandConfig.defaultTo,
    }
  );
}
