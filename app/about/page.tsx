import type { Metadata } from "next";
import Section from "@/components/motion/Section";
import Reveal from "@/components/motion/Reveal";
import CTAButton from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ventra was built by people who learned how coverage behaves when it's tested. We close the gap between established businesses and the protection they actually need.",
};

/* ---------------------------------------------------------------------------
   Section 2 — the four differentiators (pillars).
--------------------------------------------------------------------------- */
const PILLARS = [
  {
    n: "01",
    title: "We understand your business first",
    desc: "No quote before we know how you operate.",
  },
  {
    n: "02",
    title: "We find the gaps others miss",
    desc: "Exposures a once-a-year agent overlooks.",
  },
  {
    n: "03",
    title: "Specialized depth by industry",
    desc: "Advisors who already speak your language.",
  },
  {
    n: "04",
    title: "A relationship, not a renewal",
    desc: "Coverage that evolves as your business grows.",
  },
];

/* ---------------------------------------------------------------------------
   Section 3 — credibility stats. The first two are confirmed; the experience
   figure is a [CONFIRM] placeholder and the client count is pending.
--------------------------------------------------------------------------- */
const STATS = [
  { value: "48", label: "States licensed" },
  { value: "Hundreds", label: "Of competitive programs" },
  // [CONFIRM] exact years of experience with manager
  { value: "Decades", label: "Of insurance experience" },
];

/* ---------------------------------------------------------------------------
   Section 5 — carrier partners. Shown as a clean name list (logos pending);
   the per-carrier specialties are kept internal and are NOT published here.
   [CONFIRM] Berkshire Hathaway entity (GUARD vs BHHC); confirm appointments.
--------------------------------------------------------------------------- */
const STANDARD_CARRIERS = [
  "Travelers",
  "The Hartford",
  "Chubb",
  "Nationwide",
  "AIG",
  "Progressive",
  "Zurich North America",
  "Great American",
];
const SPECIALTY_CARRIERS = [
  "Markel",
  "Kinsale",
  "Lloyd's of London",
  "Arch Insurance",
  "Crum & Forster",
  "Tokio Marine HCC",
  "USLI / One80",
  "Lexington",
  "Prime Insurance",
  "Berkshire Hathaway",
];

/* ---------------------------------------------------------------------------
   Section 4 — lead advisor. [CONFIRM] title + bio; how many advisors to show
   at launch is pending Derek's sign-off.
--------------------------------------------------------------------------- */
const LEAD_ADVISOR = {
  name: "Andrew Sloan",
  role: "Principal Advisor", // [CONFIRM] title
  photo: "/branding/advisors/andrew-sloan.jpg",
};

function CarrierColumn({ label, names }: { label: string; names: string[] }) {
  return (
    <div>
      <p className="font-heading text-xs font-medium uppercase tracking-[0.18em] text-rust">
        {label}
      </p>
      <ul className="mt-5 grid grid-cols-2 gap-x-8 sm:grid-cols-3">
        {names.map((name) => (
          <li
            key={name}
            className="border-b border-ink/10 py-3 font-heading text-ink/85"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Section 1 — Origin / editorial hero */}
      <section className="bg-ink text-sand">
        <div className="container-page py-[clamp(5rem,12vw,9rem)]">
          <Reveal>
            <p className="eyebrow text-rust mb-5">Our story</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-[18ch] text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] text-white">
              We learned how coverage behaves when it&rsquo;s tested.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-12 grid gap-x-16 gap-y-6 border-t border-sand/15 pt-10 lg:grid-cols-2">
              <p className="text-xl font-medium leading-snug text-white">
                We built Ventra to close the gap between established businesses
                and the protection they actually need.
              </p>
              <div className="space-y-5 leading-relaxed text-sand/70">
                <p>
                  Ventra was founded by people who spent years in one of the
                  toughest corners of commercial insurance — protecting
                  businesses most carriers would rather avoid. That work taught
                  us how a policy actually performs when something goes wrong.
                </p>
                <p>
                  We kept seeing the same pattern: established mid-market
                  businesses — the ones with real assets and real exposure —
                  were handed off-the-shelf policies by agents who never took
                  the time to understand them. So we built something better.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2 — What makes us different (editorial numbered pillars) */}
      <Section className="bg-white">
        <p className="eyebrow text-rust">What makes us different</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-bold text-ink sm:text-4xl">
          The difference is in how we work.
        </h2>
        <div className="mt-14 grid gap-x-14 gap-y-12 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 70}>
              <div className="flex gap-6 border-t border-ink/10 pt-8">
                <span className="font-heading text-4xl font-bold leading-none text-rust/30">
                  {p.n}
                </span>
                <div>
                  <h3 className="font-heading text-xl text-ink">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/65">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Section 3 — Credibility stats (beige band, divided) */}
      <section className="bg-sand/40">
        <div className="container-page py-[clamp(3.5rem,7vw,5.5rem)]">
          <div className="grid gap-10 sm:grid-cols-3 sm:divide-x sm:divide-ink/10">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="text-center sm:px-6">
                  <p className="font-heading text-5xl font-bold leading-none text-ink sm:text-6xl">
                    {s.value}
                  </p>
                  <p className="mt-4 text-ink/60">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Meet the advisors ([CONFIRM] — more advisors pending) */}
      <Section className="bg-white">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-rust">Meet the advisors</p>
            <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
              Advisors who already know your industry.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-ink/65">
              You work with a dedicated advisor who understands how your
              business operates — not a call center. Someone who stays with you
              as your business grows.
            </p>
            <div className="mt-8 border-t border-ink/10 pt-6">
              <p className="font-heading text-xl text-ink">
                {LEAD_ADVISOR.name}
              </p>
              <p className="mt-1 text-rust">{LEAD_ADVISOR.role}</p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
            <div
              aria-hidden
              className="absolute -right-5 -top-5 bottom-8 left-10 rounded-3xl bg-rust/15 sm:-right-7 sm:-top-7"
            />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LEAD_ADVISOR.photo}
                alt={LEAD_ADVISOR.name}
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Section 5 — Carrier partners (clean editorial lists) */}
      <Section
        id="carriers"
        className="bg-white scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-ink/10"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-rust">Our carrier partners</p>
            <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
              Access to hundreds of programs through top-rated carriers.
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-ink/65">
              We place coverage across both standard and E&amp;S markets — so
              your program is built around your business, not a single
              insurer&rsquo;s appetite.
            </p>
          </div>
          <div className="space-y-12 lg:col-span-8">
            <CarrierColumn label="Standard markets" names={STANDARD_CARRIERS} />
            <CarrierColumn
              label="E&S / Specialty markets"
              names={SPECIALTY_CARRIERS}
            />
          </div>
        </div>
      </Section>

      {/* Section 6 — Closing CTA */}
      <section className="bg-white">
        <div className="container-page pb-[var(--spacing-section)]">
          <div className="rounded-[2rem] bg-rust px-6 py-[clamp(3.5rem,8vw,6rem)] text-center text-white">
            <Reveal>
              <h2 className="mx-auto max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">
                Ready to work with an advisor who actually knows your industry?
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-8">
                <CTAButton
                  variant="outline"
                  size="lg"
                  className="border-white/50 text-white hover:bg-white hover:text-rust"
                >
                  Talk to an Advisor
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
