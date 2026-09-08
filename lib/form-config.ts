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
  /**
   * Form Identifier sent to the CRM (crm.roadreadyinsurance.com) so it can match
   * its Form Mapping and route the lead into the correct SUBACCOUNT/pipeline.
   *
   * The CRM webhook (key) is shared org-wide across brands (Ventra + Road Ready),
   * so the subaccount is chosen by THIS identifier, not by the webhook. Keep the
   * "Ventra Website —" prefix so these ids are unique to the Ventra subaccount and
   * can never collide with a Road Ready mapping. A matching Form Mapping with this
   * exact string must exist under the Ventra brand in the CRM.
   */
  crmFormId: string;
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
  defaultTo: "marketing@ventrainsurance.com",
  forms: {
    contact: {
      label: "Contact",
      to: "marketing@ventrainsurance.com",
      crmFormId: "ventra-website-contact",
    },
    "get-a-quote": {
      label: "Get a quote",
      to: "marketing@ventrainsurance.com",
      crmFormId: "ventra-website-get-a-quote",
    },
  },
};

/** Resolve a formId to its route, falling back to the brand default. */
export function resolveForm(formId: string): FormRoute {
  return (
    brandConfig.forms[formId] ?? {
      label: formId || "Form",
      to: brandConfig.defaultTo,
      crmFormId: `ventra-website-${formId || "form"}`,
    }
  );
}
