/**
 * Site-wide configuration: navigation, primary CTA, and contact details.
 *
 * Contact values are [CONFIRM] placeholders pulled from env vars where it
 * makes sense, so they can be swapped without code changes. The primary CTA
 * across the entire site is "Talk to an Advisor" — never "Get a Quote".
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
  label: "Find an Agent",
  href: "/contact",
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** If set, this item opens a dropdown panel instead of being a plain link. */
  menu?: "industries" | "coverage";
};

/** Top nav: logo (Home) · Industries · Coverage · Solutions · About · [CTA]. */
export const mainNav: NavItem[] = [
  { label: "Industries", href: "/industries", menu: "industries" },
  { label: "Coverage", href: "/solutions", menu: "coverage" },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
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
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "advisors@ventrainsurance.com",
  // [CONFIRM] business address
  address:
    process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? "Address coming soon",
} as const;

/** Footer legal + licensing — [CONFIRM] exact wording with manager. */
export const legal = {
  // [CONFIRM] short legal line
  line: `© ${"{year}"} ${site.name}. All rights reserved.`,
  // [CONFIRM] licensing line
  licensing:
    "Ventra Insurance Group is a licensed insurance agency. Licensing details coming soon.",
} as const;

/** Grouped footer quick links. */
export const footerLinks: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Solutions", href: "/solutions" },
      { label: "Industries", href: "/industries" },
      { label: "Find an Agent", href: "/contact" },
    ],
  },
];
