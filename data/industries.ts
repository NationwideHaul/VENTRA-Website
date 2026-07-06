/**
 * Industries — the single source of truth for the Industries mega-menu, the
 * mobile menu, the footer, the /industries landing page, and every individual
 * industry page at /industries/[slug].
 *
 * Two tiers (from the Ventra industry brief):
 *   - "front": the 7 primary-focus industries. Deepest treatment — each leads
 *     with a full plain-language exposure profile.
 *   - "more":  20 broad industry categories. Each gets a page too, with a
 *     one-line exposure profile plus its Core and Specialty coverage tiers.
 *
 * Every industry carries a Core tier (coverages every account in the class
 * should hold) and a Specialty tier (the lines that signal genuine class
 * expertise — the ones a once-a-year transactional agency overlooks).
 *
 * Add an industry by appending to `industries`; everything else derives from it.
 */

export type Coverage = {
  /** Coverage name; keep consistent with the master list in data/coverages.ts. */
  name: string;
  /** Optional one-line plain-language note (front-tier specialty lines). */
  note?: string;
};

export type IndustryTier = "front" | "more";

export type Industry = {
  slug: string;
  /** Full display name. */
  name: string;
  /** Short label for tight UI (nav, chips, "Explore X"). */
  shortName: string;
  href: string;
  tier: IndustryTier;
  /** Plain-language exposure profile — leads each industry page. */
  exposureProfile: string;
  /** One-line value prop for menus and cards. */
  valueProp: string;
  /** Core coverages every account in the class should carry. */
  core: Coverage[];
  /** Specialty coverages that signal class expertise (the differentiator). */
  specialty: Coverage[];
};

export const industries: Industry[] = [
  // ─────────────────────── FRONT 7 — PRIMARY FOCUS ───────────────────────
  {
    slug: "contractors",
    name: "Construction & General Contractors",
    shortName: "Construction",
    href: "/industries/contractors",
    tier: "front",
    valueProp:
      "Coverage built for the job site, the crew, and the equipment that gets the work done.",
    exposureProfile:
      "A contractor's risk lives on three fronts at once — people get hurt on active jobsites, expensive equipment moves between locations and gets stolen or damaged, and the work itself can generate liability that surfaces years after the job is finished. Add subcontractor relationships and contract requirements, and the program has to be built carefully or gaps open up fast.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property" },
      { name: "Workers' Compensation" },
      { name: "Commercial Auto" },
      { name: "Commercial Umbrella / Excess Liability" },
    ],
    specialty: [
      { name: "Builders Risk", note: "Structures and materials during construction." },
      {
        name: "Contractor's Equipment (Inland Marine)",
        note: "Owned, leased, or rented tools and heavy equipment.",
      },
      { name: "Installation Floater", note: "Materials in transit and until installed." },
      { name: "Pollution / Environmental Liability", note: "Site contamination exposure." },
      { name: "Surety & Contract Bonds", note: "Bid, performance, and payment bonds." },
      { name: "Professional Liability", note: "For design-build and contractor-led design." },
      { name: "Wrap-Up Programs (OCIP / CCIP)", note: "Consolidated coverage on larger projects." },
    ],
  },
  {
    slug: "self-storage",
    name: "Self Storage Facilities",
    shortName: "Self Storage",
    href: "/industries/self-storage",
    tier: "front",
    valueProp:
      "Protection structured for storage operators, from the buildings to the tenants' goods.",
    exposureProfile:
      "A storage operation is a property business with a customer-goods twist. The building values are high, but the subtler exposure is liability for tenants' stored property and the operations around it — sales and auctions of abandoned units, online rentals and payments, and the climate-control and access equipment that keeps the site running. Larger sites, multi-building campuses, and portfolios are where these exposures compound — and where a purpose-built program matters most.",
    core: [
      { name: "Commercial Property" },
      { name: "General Liability" },
      { name: "Business Income" },
      { name: "Commercial Umbrella / Excess Liability" },
    ],
    specialty: [
      {
        name: "Customer Goods Legal Liability / Sale & Disposal Liability",
        note: "Tenant property and auction exposure.",
      },
      { name: "Equipment Breakdown", note: "Climate control, gates, elevators." },
      { name: "Flood", note: "Excluded from standard property; relevant in coastal / Florida sites." },
      { name: "Wind / Hail", note: "Often program- or geography-specific." },
      {
        name: "Tenant Insurance / Customer Protection Program",
        note: "A revenue and risk-transfer tool.",
      },
      { name: "Employee Dishonesty (Crime)" },
      { name: "Cyber", note: "Online rental and payment systems." },
    ],
  },
  {
    slug: "habitation-multifamily",
    name: "Multi-Family & Habitational",
    shortName: "Multi-Family",
    href: "/industries/habitation-multifamily",
    tier: "front",
    valueProp:
      "Coverage for condo and apartment communities, from the structures to the board.",
    exposureProfile:
      "The risk here is concentration and severity. High property values are spread across multiple buildings, and a single premises-liability claim — a fall, an assault, a fire displacing tenants — can be severe. There's ongoing tenant exposure every day the doors are open, plus governance risk where HOA or condo boards make decisions. (This is the building and the operation, not the individual unit.)",
    core: [
      { name: "Commercial Property" },
      { name: "General Liability" },
      { name: "Business Income (loss of rents)" },
      { name: "Commercial Umbrella / Excess Liability" },
    ],
    specialty: [
      { name: "Lessor's Risk (LRO)", note: "Liability arising from leased premises." },
      { name: "Ordinance or Law", note: "Extra cost to rebuild to current codes." },
      { name: "Equipment Breakdown", note: "Building systems, elevators, HVAC." },
      { name: "Flood" },
      { name: "Earthquake", note: "Geography-dependent." },
      { name: "Directors & Officers", note: "HOA and condo association boards." },
      { name: "Crime / Fidelity", note: "Association funds." },
      { name: "Cyber", note: "Resident data and payment systems." },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate & Property Owners",
    shortName: "Real Estate",
    href: "/industries/real-estate",
    tier: "front",
    valueProp:
      "Coverage for property owners, managers, and investors — built around the portfolio.",
    exposureProfile:
      "A property owner's exposure is schedule-driven — value scales with the portfolio, and each property carries tenant liability, vacancy gaps, and the management decisions behind the entity that owns it. Older buildings and mixed-use sites add code and environmental wrinkles standard property leaves uncovered.",
    core: [
      { name: "Commercial Property" },
      { name: "General Liability" },
      { name: "Business Income (loss of rents)" },
      { name: "Commercial Umbrella / Excess Liability" },
    ],
    specialty: [
      { name: "Lessor's Risk (LRO)", note: "Core for owners leasing to tenants." },
      { name: "Ordinance or Law" },
      { name: "Vacant Building Coverage", note: "For gaps between tenants." },
      { name: "Flood" },
      { name: "Earthquake", note: "Geography-dependent." },
      { name: "Equipment Breakdown" },
      { name: "Directors & Officers", note: "For ownership entities and boards." },
      { name: "Environmental / Pollution", note: "Older or mixed-use properties." },
      { name: "Cyber" },
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    shortName: "Hospitality",
    href: "/industries/hospitality",
    tier: "front",
    valueProp:
      "Protection for hotels, resorts, and the guests and property they look after.",
    exposureProfile:
      "Hospitality stacks several severe exposures in one place — high guest foot traffic, alcohol service, food handling, guests' property in your care, and the assault/battery risk that comes with venues and nightlife. High employee turnover adds employment exposure on top. (Hotels, resorts, and multi-unit restaurant groups — not the single-location diner.)",
    core: [
      { name: "Commercial Property" },
      { name: "General Liability" },
      { name: "Business Income" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella / Excess Liability" },
    ],
    specialty: [
      { name: "Liquor Liability", note: "Claims from serving alcohol." },
      { name: "Assault & Battery", note: "Patron incidents GL may exclude." },
      { name: "Food Spoilage", note: "Loss of perishable stock." },
      { name: "Equipment Breakdown", note: "Kitchen, HVAC, refrigeration." },
      { name: "Employment Practices Liability (EPLI)" },
      { name: "Cyber", note: "Guest data and payment systems." },
      { name: "Crime / Fidelity" },
      { name: "Hired & Non-Owned Auto", note: "Valet, errands, shuttle." },
      { name: "Innkeeper's / Guest Property Liability" },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Senior Living",
    shortName: "Healthcare",
    href: "/industries/healthcare",
    tier: "front",
    valueProp:
      "Coverage for medical offices, senior living, and the people in their care.",
    exposureProfile:
      "Few industries carry higher stakes than caring for people. The core exposure is professional liability — the quality and outcome of care — layered over the duty to protect vulnerable residents and patients, heavy regulatory oversight, and sensitive health data. Professional, property, and workers' comp exposure all run through one operation, so the program has to be built as a whole. (Assisted living, skilled nursing, and medical facilities.)",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella / Excess Liability" },
    ],
    specialty: [
      { name: "Professional / Medical Liability", note: "The central exposure." },
      { name: "Directors & Officers" },
      { name: "Employment Practices Liability (EPLI)" },
      { name: "Cyber", note: "PHI / HIPAA exposure." },
      { name: "Crime / Fidelity" },
      { name: "Equipment Breakdown", note: "Medical and building equipment." },
      { name: "Employee Benefits Liability" },
    ],
  },
  {
    slug: "warehousing-logistics",
    name: "Warehousing & Logistics",
    shortName: "Warehousing",
    href: "/industries/warehousing-logistics",
    tier: "front",
    valueProp:
      "Protection for the property and operations side of moving and storing goods at scale.",
    exposureProfile:
      "A warehouse holds other people's goods, often at high value, which creates legal liability distinct from the operator's own property. Add racking and material-handling equipment, refrigeration where applicable, and on-site or hired fleet movement, and the program has to address goods-in-care, equipment failure, and auto exposure together. (Distinct from trucking-fleet coverage.)",
    core: [
      { name: "Commercial Property" },
      { name: "General Liability" },
      { name: "Workers' Compensation" },
      { name: "Commercial Auto" },
      { name: "Commercial Umbrella / Excess Liability" },
    ],
    specialty: [
      { name: "Warehouse Legal Liability", note: "Goods in your care, custody, or control." },
      { name: "Motor Truck Cargo / Bailee Coverage" },
      { name: "Inland Marine", note: "Goods in transit." },
      { name: "Equipment Breakdown", note: "Material handling, refrigeration." },
      { name: "Spoilage", note: "Cold storage operations." },
      { name: "Cyber" },
      { name: "Crime / Fidelity" },
      { name: "Hired & Non-Owned Auto" },
    ],
  },

  // ──────────────────── TOP 20 — BROAD INDUSTRY CATEGORIES ────────────────────
  {
    slug: "manufacturing",
    name: "Manufacturing",
    shortName: "Manufacturing",
    href: "/industries/manufacturing",
    tier: "more",
    exposureProfile:
      "A manufacturer's risk starts with the product itself — something you made ends up in someone else's hands, and a defect can surface as a claim years after it shipped. Behind that sit large property and equipment values concentrated in one or two plants, and a supply chain where a single interruption can stop production entirely.",
    valueProp:
      "Product liability, large property and equipment values, and supply-chain interruption.",
    core: [
      { name: "Commercial Property" },
      { name: "General Liability" },
      { name: "Workers' Compensation" },
      { name: "Commercial Auto" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Product Liability" },
      { name: "Product Recall" },
      { name: "Equipment Breakdown" },
      { name: "Inland Marine" },
      { name: "Pollution / Environmental" },
      { name: "Cyber" },
      { name: "Crime / Fidelity" },
    ],
  },
  {
    slug: "wholesale-distribution",
    name: "Wholesale & Distribution",
    shortName: "Wholesale & Distribution",
    href: "/industries/wholesale-distribution",
    tier: "more",
    exposureProfile:
      "Distribution risk is volume in motion. Large inventory values sit in your warehouses, products you didn't manufacture pass through your hands on their way to market — carrying their liability with them — and a fleet keeps everything moving in between. The program has to cover the goods, the movement, and the premises together.",
    valueProp:
      "Large inventory, products passing through your hands, and fleet and warehouse operations.",
    core: [
      { name: "Commercial Property" },
      { name: "General Liability" },
      { name: "Workers' Compensation" },
      { name: "Commercial Auto" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Product Liability" },
      { name: "Inland Marine / Cargo" },
      { name: "Warehouse Legal Liability" },
      { name: "Equipment Breakdown" },
      { name: "Cyber" },
      { name: "Crime / Fidelity" },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    shortName: "Retail",
    href: "/industries/retail",
    tier: "more",
    exposureProfile:
      "Retail lives on foot traffic, and every customer through the door is premises exposure. Behind the sales floor sit inventory values, point-of-sale systems holding customer payment data, and the everyday slip-and-fall claims that make up the bulk of the class. A strong program balances property, liability, and cyber as one package.",
    valueProp:
      "Customer foot traffic, inventory, point-of-sale data, and premises liability.",
    core: [
      { name: "Commercial Property" },
      { name: "General Liability" },
      { name: "Business Income" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Cyber", note: "POS / customer data." },
      { name: "Crime / Fidelity", note: "Cash handling." },
      { name: "Equipment Breakdown" },
      { name: "Product Liability", note: "Private-label goods." },
      { name: "Liquor Liability", note: "If applicable." },
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants & Food Service",
    shortName: "Restaurants",
    href: "/industries/restaurants",
    tier: "more",
    exposureProfile:
      "Few classes stack as many everyday hazards as food service — kitchen fire, foodborne illness, alcohol service, and a workforce that turns over quickly. One serious incident, a fire or a liquor claim, can close the doors for weeks; the program has to be built to keep the business running through it.",
    valueProp:
      "Food handling, alcohol service, kitchen fire, and high employee turnover.",
    core: [
      { name: "Commercial Property" },
      { name: "General Liability" },
      { name: "Business Income" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Liquor Liability" },
      { name: "Food Spoilage" },
      { name: "Food Contamination / Recall" },
      { name: "Equipment Breakdown" },
      { name: "Assault & Battery" },
      { name: "EPLI" },
      { name: "Cyber" },
      { name: "Hired & Non-Owned Auto", note: "Delivery." },
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    shortName: "Professional Services",
    href: "/industries/professional-services",
    tier: "more",
    exposureProfile:
      "When your product is advice, your biggest exposure is being wrong — or being accused of it. A missed deadline, a flawed recommendation, or a client's financial loss can become a professional liability claim even when the work was sound. Add employee disputes and client data, and the program extends well past a standard office policy.",
    valueProp:
      "Advice and service errors, client financial harm, and employee disputes.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property (or BOP)" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Professional Liability / E&O" },
      { name: "Cyber" },
      { name: "Employment Practices Liability (EPLI)" },
      { name: "Directors & Officers" },
      { name: "Crime / Fidelity" },
    ],
  },
  {
    slug: "technology",
    name: "Technology",
    shortName: "Technology",
    href: "/industries/technology",
    tier: "more",
    exposureProfile:
      "Technology companies sell performance — and when a platform goes down or a product fails, clients feel it immediately and financially. The exposure spans service errors, data breaches, intellectual property disputes, and product liability on the hardware side. Client contracts usually dictate the coverage before a carrier does.",
    valueProp:
      "Service failures, data exposure, IP, and product or software defects.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property (or BOP)" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Technology E&O / Professional Liability" },
      { name: "Cyber" },
      { name: "Media Liability" },
      { name: "Directors & Officers" },
      { name: "EPLI" },
      { name: "Product Liability", note: "Hardware." },
    ],
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    shortName: "Financial Services",
    href: "/industries/financial-services",
    tier: "more",
    exposureProfile:
      "Financial services carry a duty most industries don't: other people's money. Regulatory oversight, fiduciary responsibility, fraud, and client claims of financial harm all sit on top of the ordinary office exposures — which is why the professional and management liability lines do the heavy lifting in this class.",
    valueProp:
      "Fiduciary duty, regulatory exposure, client financial harm, and fraud.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property (or BOP)" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Professional Liability / E&O" },
      { name: "Directors & Officers" },
      { name: "Fiduciary Liability" },
      { name: "Crime / Fidelity" },
      { name: "Cyber" },
      { name: "EPLI" },
    ],
  },
  {
    slug: "education",
    name: "Education",
    shortName: "Education",
    href: "/industries/education",
    tier: "more",
    exposureProfile:
      "Schools and educational programs are responsible for other people's children, and everything flows from that duty of care. Premises injuries, staff conduct, employment disputes, and board decisions all carry heightened scrutiny — and student data adds a growing cyber exposure on top.",
    valueProp: "Care of minors, premises liability, employment, and governance.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Educators Legal Liability / D&O" },
      { name: "Professional Liability" },
      { name: "EPLI" },
      { name: "Cyber", note: "Student data." },
      { name: "Crime / Fidelity" },
      { name: "Equipment Breakdown" },
    ],
  },
  {
    slug: "nonprofit-religious",
    name: "Nonprofit & Religious Organizations",
    shortName: "Nonprofit & Religious",
    href: "/industries/nonprofit-religious",
    tier: "more",
    exposureProfile:
      "Nonprofits run on volunteers, donations, and trust — and each carries its own exposure. Board members make decisions that can be challenged, staff and volunteers serve vulnerable populations, and donated funds need protecting from fraud. Coverage here has to stretch a careful budget across a wide risk profile.",
    valueProp:
      "Volunteer and board exposure, vulnerable populations, and donated funds.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Directors & Officers" },
      { name: "EPLI" },
      { name: "Crime / Fidelity" },
      { name: "Professional Liability", note: "Counseling / services." },
      { name: "Cyber" },
      { name: "Special Events" },
    ],
  },
  {
    slug: "public-entities",
    name: "Public Entities & Government",
    shortName: "Public Entities",
    href: "/industries/public-entities",
    tier: "more",
    exposureProfile:
      "Public entities answer to everyone. The exposure spans public premises, employment practices, law enforcement activity, officials' decisions, and the infrastructure a community depends on — with public accountability and immunity rules shaping how every claim unfolds.",
    valueProp:
      "Broad public liability, governance, law enforcement, and infrastructure.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property" },
      { name: "Workers' Compensation" },
      { name: "Commercial Auto" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Public Officials Liability / D&O" },
      { name: "Law Enforcement Liability" },
      { name: "EPLI" },
      { name: "Cyber" },
      { name: "Crime / Fidelity" },
      { name: "Equipment Breakdown" },
      { name: "Pollution" },
    ],
  },
  {
    slug: "energy-utilities",
    name: "Energy & Utilities",
    shortName: "Energy & Utilities",
    href: "/industries/energy-utilities",
    tier: "more",
    exposureProfile:
      "Energy and utility operations combine high-hazard work with essential-service obligations. Large property schedules, environmental exposure, contractor-heavy operations, and severe loss potential mean the program is engineered line by line — not pulled off a shelf.",
    valueProp:
      "High-hazard operations, large property, environmental, and contractor exposure.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property" },
      { name: "Workers' Compensation" },
      { name: "Commercial Auto" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Pollution / Environmental Liability" },
      { name: "Control of Well / Operational Covers" },
      { name: "Equipment Breakdown" },
      { name: "Inland Marine" },
      { name: "Business Income" },
      { name: "Professional Liability", note: "Engineering." },
    ],
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    shortName: "Agriculture",
    href: "/industries/agriculture",
    tier: "more",
    exposureProfile:
      "Farm risk is spread across acreage — buildings, equipment, livestock, and crops, each exposed to weather, breakdown, and timing. Seasonal labor and farm vehicles add liability on top, and a single storm can touch every line of the program at once.",
    valueProp:
      "Equipment, livestock and crops, seasonal labor, and property spread over acreage.",
    core: [
      { name: "Commercial Property (farm)" },
      { name: "General Liability" },
      { name: "Workers' Compensation" },
      { name: "Commercial Auto" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Farm Equipment / Inland Marine" },
      { name: "Livestock / Crop Coverage" },
      { name: "Pollution" },
      { name: "Equipment Breakdown" },
      { name: "Spoilage" },
      { name: "Hired & Non-Owned Auto" },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    shortName: "Automotive",
    href: "/industries/automotive",
    tier: "more",
    exposureProfile:
      "In automotive operations the core exposure is other people's vehicles — in your care for service, on your lot for sale, or up on a lift. Garage liability, garagekeepers, and lot coverage sit alongside the standard property and premises lines, and pollution exposure follows any shop with fluids and tanks.",
    valueProp:
      "Customers' vehicles in your care, lot inventory, and service operations.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Garage Liability" },
      { name: "Garagekeepers" },
      { name: "Dealer's Open Lot" },
      { name: "Pollution" },
      { name: "Equipment Breakdown" },
      { name: "EPLI" },
      { name: "Cyber" },
    ],
  },
  {
    slug: "entertainment-recreation",
    name: "Entertainment & Recreation",
    shortName: "Entertainment & Recreation",
    href: "/industries/entertainment-recreation",
    tier: "more",
    exposureProfile:
      "When the public shows up for entertainment, injury exposure shows up with them — participants, spectators, alcohol, and venues each add a layer. Event-driven operations also carry cancellation risk, where one rained-out weekend can erase a season's margin.",
    valueProp:
      "Participant and spectator injury, venues, and event-specific risk.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Participant Liability" },
      { name: "Event Cancellation" },
      { name: "Liquor Liability" },
      { name: "Equipment / Inland Marine" },
      { name: "Hired & Non-Owned Auto" },
    ],
  },
  {
    slug: "sports-fitness",
    name: "Sports & Fitness",
    shortName: "Sports & Fitness",
    href: "/industries/sports-fitness",
    tier: "more",
    exposureProfile:
      "Sports and fitness operations trade in physical activity, so participant injury is the baseline exposure. Instruction and training add professional liability, equipment adds premises risk, and member billing systems hold the personal data that makes cyber coverage part of the core program.",
    valueProp:
      "Participant injury, equipment, instruction and training, and member data.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Participant / Professional Liability" },
      { name: "Equipment Breakdown" },
      { name: "EPLI" },
      { name: "Cyber", note: "Member data." },
      { name: "Crime / Fidelity" },
    ],
  },
  {
    slug: "personal-care-wellness",
    name: "Personal Care & Wellness",
    shortName: "Personal Care & Wellness",
    href: "/industries/personal-care-wellness",
    tier: "more",
    exposureProfile:
      "Hands-on services mean hands-on liability. A treatment that goes wrong is a professional claim, not just a premises one — and client records, retail products, and specialized equipment each add an exposure a generic small-business policy overlooks.",
    valueProp:
      "Hands-on services, professional liability, premises, and client records.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property (or BOP)" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Professional Liability", note: "Treatments / services." },
      { name: "Cyber" },
      { name: "EPLI" },
      { name: "Product Liability", note: "Retail products." },
      { name: "Equipment Breakdown" },
    ],
  },
  {
    slug: "life-sciences",
    name: "Life Sciences",
    shortName: "Life Sciences",
    href: "/industries/life-sciences",
    tier: "more",
    exposureProfile:
      "Life sciences companies carry risk through the entire product lifecycle — research, clinical trials, regulatory approval, and market. Product and clinical liability lead the program, with recall, intellectual property, and pollution exposure close behind.",
    valueProp:
      "Product and clinical liability, R&D, regulatory, and IP exposure.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Product Liability" },
      { name: "Clinical Trials Liability" },
      { name: "Professional Liability / E&O" },
      { name: "Product Recall" },
      { name: "Cyber" },
      { name: "Directors & Officers" },
      { name: "Pollution" },
    ],
  },
  {
    slug: "environmental-services",
    name: "Environmental Services",
    shortName: "Environmental Services",
    href: "/industries/environmental-services",
    tier: "more",
    exposureProfile:
      "Environmental work exists because contamination is dangerous — which makes pollution liability the center of this program, not an add-on. Job-site operations, transport and disposal, and consulting advice each carry their own version of the exposure, and standard forms exclude most of it.",
    valueProp:
      "Pollution events, contractor operations, and disposal or remediation risk.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property" },
      { name: "Workers' Compensation" },
      { name: "Commercial Auto" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Contractors Pollution Liability" },
      { name: "Site Pollution Liability" },
      { name: "Professional Liability", note: "Consulting." },
      { name: "Contractor's Equipment" },
      { name: "Disposal / Transportation Covers" },
    ],
  },
  {
    slug: "marine",
    name: "Marine",
    shortName: "Marine",
    href: "/industries/marine",
    tier: "more",
    exposureProfile:
      "Marine risk lives where standard policies stop — at the water's edge. Vessels, cargo, docks, and marina operations need marine-specific forms, and property over or near water carries wind and flood exposure that inland programs rarely contemplate.",
    valueProp:
      "Vessels, cargo, dock operations, and property over or near water.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Ocean / Inland Marine" },
      { name: "Hull & Machinery" },
      { name: "Protection & Indemnity (P&I)" },
      { name: "Marina Operators Legal Liability" },
      { name: "Cargo" },
      { name: "Pollution" },
      { name: "Equipment Breakdown" },
    ],
  },
  {
    slug: "media-communications",
    name: "Media & Communications",
    shortName: "Media & Communications",
    href: "/industries/media-communications",
    tier: "more",
    exposureProfile:
      "Media companies publish, and publishing creates liability — defamation, copyright, and intellectual property claims that follow the content wherever it runs. Service errors and data exposure round out a program that is mostly about intangible risk.",
    valueProp:
      "Content liability, IP and defamation, data, and service errors.",
    core: [
      { name: "General Liability" },
      { name: "Commercial Property (or BOP)" },
      { name: "Workers' Compensation" },
      { name: "Commercial Umbrella" },
    ],
    specialty: [
      { name: "Media Liability" },
      { name: "Professional Liability / E&O" },
      { name: "Cyber" },
      { name: "Directors & Officers" },
      { name: "EPLI" },
      { name: "Intellectual Property" },
    ],
  },
];

/** The 7 primary-focus industries (deepest treatment, home grid, nav left rail). */
export const frontIndustries: Industry[] = industries.filter(
  (i) => i.tier === "front",
);

/** The 20 broad industry categories shown under "More industries". */
export const moreIndustries: Industry[] = industries.filter(
  (i) => i.tier === "more",
);

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

/** Resolve any industry slug (or "other") to a display label, for the contact form. */
export function resolveIndustryLabel(slug?: string): string | null {
  if (!slug) return null;
  if (slug === "other") return "Other / not sure yet";
  return getIndustry(slug)?.name ?? null;
}
