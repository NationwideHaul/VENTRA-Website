/**
 * Lines of coverage — the single source of truth for the "Coverage" nav
 * dropdown and the /solutions page.
 *
 * Organized into the four tiers from the Ventra coverage brief. Each group has
 * a stable `id` used as the anchor target so a click in the dropdown jumps to
 * the right section on /solutions. Keep coverage names consistent with the
 * Core / Specialty lines referenced on the industry pages (data/industries.ts).
 */

export type CoverageLine = { name: string; blurb: string };

export type CoverageGroup = {
  /** Anchor id, e.g. /solutions#core. */
  id: string;
  heading: string;
  /** One-line framing for the group. */
  intro: string;
  lines: CoverageLine[];
};

export const coverageGroups: CoverageGroup[] = [
  {
    id: "core",
    heading: "Core Commercial",
    intro: "The foundation almost every commercial account is built on.",
    lines: [
      {
        name: "General Liability (GL)",
        blurb:
          "Protects the business when its operations, premises, or products cause bodily injury or property damage to a third party.",
      },
      {
        name: "Commercial Property",
        blurb:
          "Covers your buildings, equipment, inventory, and contents against fire, theft, weather, and other physical loss.",
      },
      {
        name: "Business Income / Business Interruption",
        blurb:
          "Replaces lost income and covers ongoing expenses when a covered loss forces operations to pause.",
      },
      {
        name: "Workers' Compensation",
        blurb:
          "Pays medical costs and lost wages for employees injured on the job, and protects the employer from related lawsuits.",
      },
      {
        name: "Commercial Auto",
        blurb:
          "Covers vehicles owned or used by the business for liability and physical damage.",
      },
      {
        name: "Commercial Umbrella / Excess Liability",
        blurb:
          "Adds a layer of liability limits above GL, auto, and employer's liability — essential when a single claim can exceed primary limits.",
      },
    ],
  },
  {
    id: "management-professional",
    heading: "Management & Professional Liability",
    intro:
      "Protection for the decisions, advice, and data behind the business.",
    lines: [
      {
        name: "Professional Liability / Errors & Omissions (E&O)",
        blurb:
          "Covers claims that the business's professional advice or services caused a client financial harm.",
      },
      {
        name: "Directors & Officers (D&O)",
        blurb:
          "Protects company leadership personally against claims arising from management decisions.",
      },
      {
        name: "Employment Practices Liability (EPLI)",
        blurb:
          "Covers claims of wrongful termination, discrimination, harassment, and similar employment disputes.",
      },
      {
        name: "Fiduciary Liability",
        blurb:
          "Protects those who manage employee benefit or retirement plans against claims of mismanagement.",
      },
      {
        name: "Cyber Liability",
        blurb:
          "Covers data breaches, ransomware, business interruption from cyber events, and the costs of notification and recovery.",
      },
    ],
  },
  {
    id: "property-specialty",
    heading: "Property & Specialty",
    intro: "The lines that fill the gaps standard property leaves open.",
    lines: [
      {
        name: "Inland Marine",
        blurb:
          "Covers property that moves or sits off-premises: contractor's equipment, tools, goods in transit, and specialized property.",
      },
      {
        name: "Builders Risk",
        blurb:
          "Covers buildings and materials during construction or renovation.",
      },
      {
        name: "Equipment Breakdown",
        blurb:
          "Covers sudden mechanical or electrical failure of boilers, HVAC, machinery, and electronics.",
      },
      {
        name: "Contractor's Equipment",
        blurb:
          "Covers owned, leased, or rented tools and heavy equipment against damage or theft, on-site or in transit.",
      },
      {
        name: "Flood",
        blurb: "Covers flood damage, which standard property policies exclude.",
      },
      {
        name: "Earthquake",
        blurb:
          "Covers earthquake damage, also excluded from standard property.",
      },
      {
        name: "Ordinance or Law",
        blurb:
          "Pays the extra cost of rebuilding to current codes after a covered loss.",
      },
    ],
  },
  {
    id: "industry-specific",
    heading: "Industry-Specific",
    intro: "Specialized lines that make a program genuinely tailored to a niche.",
    lines: [
      {
        name: "Liquor Liability",
        blurb:
          "Covers claims arising from serving alcohol — essential for hospitality, restaurants, and any venue with a bar.",
      },
      {
        name: "Product Liability",
        blurb:
          "Covers harm caused by a product the business made, sold, or distributed.",
      },
      {
        name: "Product Recall",
        blurb:
          "Covers the cost of recalling and replacing a defective or contaminated product.",
      },
      {
        name: "Garage Liability & Garagekeepers",
        blurb:
          "Covers auto dealers and repair operations for liability and for damage to customers' vehicles in their care.",
      },
      {
        name: "Motor Truck Cargo / Warehouse Legal Liability",
        blurb:
          "Covers goods in a warehouse operator's or carrier's care against loss or damage.",
      },
      {
        name: "Pollution / Environmental Liability",
        blurb: "Covers cleanup costs and claims from pollution events.",
      },
      {
        name: "Abuse & Molestation",
        blurb:
          "Covers abuse claims — critical for any business serving vulnerable populations.",
      },
      {
        name: "Crime / Fidelity",
        blurb:
          "Covers employee theft, fraud, forgery, and similar financial crime.",
      },
      {
        name: "Assault & Battery",
        blurb:
          "Covers patron-on-patron incidents that GL may exclude — a hospitality endorsement.",
      },
      {
        name: "Tenant / Lessor's Risk (LRO)",
        blurb:
          "Covers property owners who lease space to tenants for liability arising from the leased premises.",
      },
      {
        name: "Surety & Contract Bonds",
        blurb:
          "Guarantees a business's performance or obligations — bid, performance, payment, and license bonds.",
      },
    ],
  },
];

/** Flat list of every coverage line, derived from the groups. */
export const coverageLines: CoverageLine[] = coverageGroups.flatMap(
  (g) => g.lines,
);
