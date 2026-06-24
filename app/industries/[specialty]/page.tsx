import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Section from "@/components/motion/Section";
import Reveal from "@/components/motion/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import { specialties, getSpecialty } from "@/data/industries";

/**
 * Specialty vertical page — phase-1 placeholder built from the shared
 * template (brief section 6). Hero + risks + coverages + CTA are stubbed
 * from the seed data; the full "Why Ventra for [vertical]" advocacy section
 * and SEO copy land in phase 4.
 */

export function generateStaticParams() {
  return specialties.map((s) => ({ specialty: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ specialty: string }>;
}): Promise<Metadata> {
  const { specialty } = await params;
  const s = getSpecialty(specialty);
  if (!s) return {};
  return {
    title: `${s.name} Insurance`,
    description: s.valueProp,
  };
}

export default async function SpecialtyPage({
  params,
}: {
  params: Promise<{ specialty: string }>;
}) {
  const { specialty } = await params;
  const s = getSpecialty(specialty);
  if (!s) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-sand">
        <div className="container-page py-[clamp(4rem,9vw,8rem)]">
          <Reveal>
            <p className="eyebrow text-rust mb-4">Specialty vertical</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white max-w-3xl">
              {s.name}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg text-sand/75 max-w-2xl leading-relaxed">
              {s.valueProp}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9">
              <CTAButton size="lg" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Risks you face */}
      <Section>
        <h2 className="text-3xl text-ink">Risks you face</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.risks.map((risk, i) => (
            <Reveal key={risk} delay={i * 70} as="li">
              <div className="h-full rounded-2xl border border-ink/10 bg-white p-6 text-ink/80 shadow-sm">
                {risk}
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Coverages we structure */}
      <Section className="bg-white">
        <h2 className="text-3xl text-ink">Coverages we structure</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.coverages.map((c, i) => (
            <Reveal key={c.name} delay={i * 60}>
              <div className="h-full rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg text-ink">{c.name}</h3>
                {c.note && (
                  <p className="mt-2 text-sm text-ink/60">{c.note}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* End CTA */}
      <section className="bg-rust text-white">
        <div className="container-page py-[clamp(3.5rem,7vw,6rem)] text-center">
          <h2 className="text-3xl sm:text-4xl max-w-2xl mx-auto">
            Talk through {s.shortName} coverage with an advisor.
          </h2>
          <div className="mt-7">
            <CTAButton
              variant="outline"
              size="lg"
              className="border-white/50 text-white hover:bg-white hover:text-rust"
            />
          </div>
          <p className="mt-10 inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs text-white/70">
            Placeholder &middot; full specialty content in phase 4
          </p>
        </div>
      </section>
    </>
  );
}
