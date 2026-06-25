/**
 * Lines of coverage shown in the nav "Coverage" dropdown and (later) the
 * Solutions page. [CONFIRM] final list from manager — include Employee
 * benefits / HNW personal lines only if confirmed.
 */
export type CoverageLine = { name: string; blurb: string };

export const coverageLines: CoverageLine[] = [
  {
    name: "General Liability",
    blurb: "Third-party bodily injury and property damage.",
  },
  {
    name: "Commercial Property",
    blurb: "Your buildings, equipment, and contents.",
  },
  { name: "Commercial Auto", blurb: "Owned, hired, and non-owned vehicles." },
  {
    name: "Workers' Compensation",
    blurb: "Coverage for your team on the job.",
  },
  {
    name: "Professional Liability (E&O)",
    blurb: "Errors and omissions in your services.",
  },
  {
    name: "Directors & Officers (D&O)",
    blurb: "Protection for leadership decisions.",
  },
  { name: "Cyber", blurb: "Data breaches and digital exposure." },
  {
    name: "Employment Practices (EPLI)",
    blurb: "Employment-related claims.",
  },
  {
    name: "Umbrella & Excess",
    blurb: "Extra limits above your primary policies.",
  },
  {
    name: "Business Owner's Policy (BOP)",
    blurb: "Property and liability, bundled.",
  },
];
