/**
 * Site-wide configuration: navigation, primary CTA, and contact details.
 *
 * Contact values are [CONFIRM] placeholders pulled from env vars where it
 * makes sense, so they can be swapped without code changes. The primary CTA
 * across the entire site is "Start a Conversation" — never "Get a Quote".
 */

export const site = {
  name: "Ventra Insurance Group",
  shortName: "Ventra",
  domain: "ventrainsurance.com",
  description:
    "Commercial insurance tailored to your business, with a dedicated advisor who fights for your interests.",
} as const;

/** The one and only primary call to action. */
export const PRIMARY_CTA = {
  label: "Start a Conversation",
  href: "/contact",
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** If set, this item opens a dropdown panel instead of being a plain link. */
  menu?: "industries" | "coverage" | "support";
};

/** Top nav: logo (Home) · Industries · Coverage · About · Support · Contact Us · [CTA]. */
export const mainNav: NavItem[] = [
  { label: "Industries", href: "/industries", menu: "industries" },
  { label: "Coverage", href: "/solutions", menu: "coverage" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/faq", menu: "support" },
  { label: "Contact Us", href: "/contact" },
];

/**
 * Contact details — [CONFIRM] pending manager input.
 * CallRail number, email, and address are stubbed via env vars so they can
 * be wired later without touching components.
 */
export const contact = {
  // [CONFIRM] CallRail tracking number — placeholder (fictitious 555 number)
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "(305) 555-0142",
  // [CONFIRM] inbox / routing address
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@ventrainsurance.com",
  // [CONFIRM] business address
  address:
    process.env.NEXT_PUBLIC_CONTACT_ADDRESS ??
    "101 Plaza Real S, Suite 224, Boca Raton, FL 33432, United States",
} as const;

/** Social profiles — [CONFIRM] official Ventra LinkedIn URL. */
export const social = {
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    "https://www.linkedin.com/company/ventra-insurance-group",
} as const;

/** Footer legal + licensing — [CONFIRM] exact wording with manager. */
export const legal = {
  // [CONFIRM] short legal line
  line: `© ${"{year}"} ${site.name}. All rights reserved.`,
  // [CONFIRM] licensing line
  licensing:
    "Ventra Insurance Group is a licensed insurance agency. Licensing details coming soon.",
} as const;

/** Grouped footer quick links — two columns. */
export const footerLinks: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Explore",
    items: [
      { label: "Coverage", href: "/solutions" },
      { label: "Industries", href: "/industries" },
      { label: "Carriers", href: "/about#carriers" },
      { label: "Get Insured", href: "/contact" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];
