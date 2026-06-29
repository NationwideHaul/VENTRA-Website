import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/motion/Section";
import Reveal from "@/components/motion/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import { industries, getIndustry } from "@/data/industries";

/**
 * Industry page — built from the shared template for all 27 industries.
 *
 * Leads with the plain-language exposure profile ("we understand how your
 * business actually operates"), then presents Core and Specialty coverage as
 * two distinct tiers. The Specialty tier is the differentiator — the lines a
 * once-a-year transactional agency overlooks.
 */

// Slugs with a real illustration in /public/branding/illustrations (the 7
// primary-focus industries). `?v=` cache-busts re-exports over the same name.
const ILLUSTRATED = new Set([
  "contractors",
  "self-storage",
  "habitation-multifamily",
  "real-estate",
  "hospitality",
  "healthcare",
  "warehousing-logistics",
]);
const ART_VERSION = "3";

export function generateStaticParams() {
  return industries.map((i) => ({ specialty: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ specialty: string }>;
}): Promise<Metadata> {
  const { specialty } = await params;
  const i = getIndustry(specialty);
  if (!i) return {};
  return {
    title: `${i.name} Insurance`,
    description: i.exposureProfile,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ specialty: string }>;
}) {
  const { specialty } = await params;
  const industry = getIndustry(specialty);
  if (!industry) notFound();

  const isFront = industry.tier === "front";
  const hasArt = ILLUSTRATED.has(industry.slug);

  return (
    <>
      {/* Hero — white; leads with the exposure profile. Featured industries
          show their illustration (white canvas blends on the white hero). */}
      <section className="bg-white">
        <div className="container-page py-[clamp(4rem,9vw,8rem)]">
          <div
            className={
              hasArt
                ? "grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
                : ""
            }
          >
            <div className={hasArt ? "lg:col-span-7" : ""}>
              <Reveal>
                <p className="eyebrow text-rust mb-4">
                  {isFront ? "Primary focus" : "Industry"}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="max-w-4xl text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
                  {industry.name}
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-4xl text-lg leading-relaxed text-ink/70">
                  {industry.exposureProfile}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-9">
                  <CTAButton size="lg" />
                </div>
              </Reveal>
            </div>

            {hasArt && (
              <Reveal delay={120} className="lg:col-span-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/branding/illustrations/${industry.slug}.png?v=${ART_VERSION}`}
                  alt={`${industry.name} illustration`}
                  className="mx-auto aspect-[3/2] w-full max-w-md object-contain lg:ml-auto"
                />
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Core coverage */}
      <Section>
        <p className="eyebrow text-rust">Core coverage</p>
        <h2 className="mt-2 text-3xl text-ink">
          The foundation every {industry.shortName.toLowerCase()} account carries.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industry.core.map((c, i) => (
            <Reveal key={c.name} delay={i * 60}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
                <svg
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-5 w-5 shrink-0 text-rust"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="m4 10.5 4 4 8-9" />
                </svg>
                <span className="font-heading text-ink">{c.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Specialty coverage — the differentiator */}
      <Section className="bg-white">
        <p className="eyebrow text-rust">Specialty coverage</p>
        <h2 className="mt-2 text-3xl text-ink max-w-2xl">
          The lines a once-a-year agent overlooks.
        </h2>
        <p className="mt-3 max-w-2xl text-ink/65">
          These are where a {industry.shortName.toLowerCase()} program proves it
          was built around how your business actually operates.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industry.specialty.map((c, i) => (
            <Reveal key={c.name} delay={i * 50}>
              <div className="h-full rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg text-ink">{c.name}</h3>
                {c.note && <p className="mt-2 text-sm text-ink/60">{c.note}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why Ventra — the depth-first promise */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-rust">Why Ventra</p>
            <h2 className="mt-2 text-3xl text-ink">
              We understand your business before we recommend coverage.
            </h2>
          </div>
          <ul className="space-y-5">
            {[
              "We find the gaps a transactional agent misses — fewer surprises when a claim is tested.",
              "Specialized depth in the industries we serve, so we speak your business on day one.",
              "A relationship, not an annual transaction — coverage that keeps pace as you grow.",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-ink/80">
                <svg
                  viewBox="0 0 20 20"
                  className="mt-1 h-5 w-5 shrink-0 text-rust"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="m4 10.5 4 4 8-9" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* End CTA */}
      <section className="bg-rust text-white">
        <div className="container-page py-[clamp(3.5rem,7vw,6rem)] text-center">
          <h2 className="text-3xl sm:text-4xl max-w-2xl mx-auto">
            Talk through {industry.shortName} coverage with an advisor.
          </h2>
          <div className="mt-7">
            <CTAButton
              variant="outline"
              size="lg"
              className="border-white/50 text-white hover:bg-white hover:text-rust"
            />
          </div>
          <p className="mt-8">
            <Link
              href="/solutions"
              className="text-sm text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              Explore every line of coverage we structure &rarr;
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
