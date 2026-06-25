/**
 * Industries data — the two-tier model from the build brief (section 6).
 *
 * Tier 1: four specialty verticals with full pages and depth.
 * Tier 2: "industries we serve" breadth list (no individual pages at launch).
 *
 * This file is the single source of truth for the Industries mega-menu,
 * the footer, the Industries landing page, and the four specialty pages.
 * Add a vertical by appending to `specialties`; add a breadth niche by
 * appending to `industriesWeServe`.
 */

export type Coverage = {
  /** Short coverage name shown on a coverage card. */
  name: string;
  /** Optional one-line plain-language note. */
  note?: string;
};

export type Specialty = {
  slug: string;
  /** Full display name. */
  name: string;
  /** Short label for tight UI (nav, chips). */
  shortName: string;
  href: string;
  /** One-line value prop used in the mega-menu and hero. */
  valueProp: string;
  /** "Risks you face" — 2 to 4 short, non-fear-based points. */
  risks: string[];
  /** "Coverages we structure" — seed content from the brief. */
  coverages: Coverage[];
};

export const specialties: Specialty[] = [
  {
    slug: "self-storage",
    name: "Self Storage",
    shortName: "Self Storage",
    href: "/industries/self-storage",
    valueProp:
      "Protection structured for storage operators, from the buildings to the tenants' goods.",
    risks: [
      "Property exposure across multiple buildings and locations",
      "Liability tied to customers' stored goods",
      "Income protection when units sit empty after a loss",
    ],
    coverages: [
      { name: "Property and buildings" },
      { name: "General liability" },
      { name: "Business income (loss of rents)" },
      { name: "Customers' goods legal liability" },
      { name: "Sale and disposal liability" },
      { name: "Cyber and tech" },
    ],
  },
  {
    slug: "contractors",
    name: "Contractors & Specialty Trades",
    shortName: "Contractors",
    href: "/industries/contractors",
    valueProp:
      "Coverage built for the job site, the crew, and the equipment that gets the work done.",
    risks: [
      "Job-site liability and third-party property damage",
      "Crew safety and workers' compensation exposure",
      "Theft or damage to tools and mobile equipment",
    ],
    coverages: [
      { name: "General liability" },
      { name: "Commercial auto" },
      { name: "Workers' comp" },
      { name: "Tools and equipment (inland marine)" },
      { name: "Builders risk" },
      { name: "Excess and umbrella" },
    ],
  },
  {
    slug: "warehousing-logistics",
    name: "Warehousing & Logistics",
    shortName: "Warehousing & Logistics",
    href: "/industries/warehousing-logistics",
    valueProp:
      "Protection for the property and operations side of moving and storing goods at scale.",
    risks: [
      "Property and contents exposure across large footprints",
      "Liability for goods held in your care",
      "Throughput interruptions that ripple down the supply chain",
    ],
    coverages: [
      { name: "Property and contents" },
      { name: "Warehouse legal liability" },
      { name: "Cargo and stock throughput" },
      { name: "General liability" },
      { name: "Commercial auto" },
      { name: "Cyber" },
    ],
  },
  {
    slug: "habitation-multifamily",
    name: "Habitation & Multi-Family",
    shortName: "Habitation & Multi-Family",
    href: "/industries/habitation-multifamily",
    valueProp:
      "Coverage for condo and apartment communities, from the structures to the board.",
    risks: [
      "Property exposure across units and common areas",
      "Liability tied to residents, guests, and vendors",
      "Decisions made by boards and property managers",
    ],
    coverages: [
      { name: "Property" },
      { name: "General liability" },
      { name: "Directors and officers" },
      { name: "Equipment breakdown" },
      { name: "Umbrella and excess" },
      { name: "Crime and fidelity" },
    ],
  },
];

/**
 * Tier 2 — breadth. Shows range; no dedicated pages at launch.
 * [CONFIRM] Trim to industries where Ventra has carrier appetite.
 */
export const industriesWeServe: string[] = [
  "Real estate and property owners",
  "Manufacturing",
  "Wholesale and distribution",
  "Hospitality",
  "Restaurants",
  "Retail",
  "Healthcare and medical offices",
  "Professional services",
  "Technology",
  "Financial services",
  "Nonprofit and religious",
  "Auto services",
];

export function getSpecialty(slug: string): Specialty | undefined {
  return specialties.find((s) => s.slug === slug);
}

/**
 * Hero "Explore by industry" tiles. These are the broad industries shown in
 * the home hero selector and on the /industries page. Selecting one carries
 * its slug into the Find an Agent form. (The dedicated specialty verticals
 * above power the Coverage mega-menu and their deep pages.)
 */
export type HeroIndustry = { slug: string; label: string; blurb: string };

export const heroIndustries: HeroIndustry[] = [
  {
    slug: "contractors",
    label: "Construction & General Contractors",
    blurb:
      "Coverage built for the job site, the crew, and the equipment that gets the work done.",
  },
  {
    slug: "self-storage",
    label: "Self Storage Facilities",
    blurb:
      "Protection structured for storage operators, from the buildings to the tenants' goods.",
  },
  {
    slug: "habitation-multifamily",
    label: "Multi-Family & Habitational",
    blurb:
      "Coverage for condo and apartment communities, from the structures to the board.",
  },
  {
    slug: "real-estate",
    label: "Real Estate & Property Owners",
    blurb: "Coverage for property owners, managers, and investors.",
  },
  {
    slug: "hospitality",
    label: "Hospitality",
    blurb:
      "Protection for hotels, restaurants, and the guests and property they look after.",
  },
  {
    slug: "healthcare",
    label: "Healthcare & Senior Living",
    blurb:
      "Coverage for medical offices, senior living, and the people in their care.",
  },
  {
    slug: "warehousing-logistics",
    label: "Warehousing & Logistics",
    blurb:
      "Protection for the property and operations side of moving and storing goods at scale.",
  },
];

/** Resolve any industry slug (hero industry, specialty, or "other") to a label. */
export function resolveIndustryLabel(slug?: string): string | null {
  if (!slug) return null;
  if (slug === "other") return "Other / not sure yet";
  return (
    heroIndustries.find((i) => i.slug === slug)?.label ??
    specialties.find((s) => s.slug === slug)?.name ??
    null
  );
}
