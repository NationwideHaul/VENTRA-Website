import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/motion/Section";
import Reveal from "@/components/motion/Reveal";
import PlaceholderPage from "@/components/ui/PlaceholderPage";
import {
  heroIndustries,
  specialties,
  industriesWeServe,
} from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "The industries Ventra protects, with dedicated specialist depth where it matters most.",
};

export default function IndustriesPage() {
  return (
    <>
      <PlaceholderPage
        eyebrow="Industries"
        title="The industries we protect."
        intro="We serve a wide range of established businesses, with dedicated depth in the specialty verticals where it matters most."
        phaseNote="full landing layout in phase 4"
      />

      {/* Broad industries (the hero set) */}
      <Section className="bg-white" reveal={false}>
        <h2 className="mb-6 text-2xl text-ink">Industries we serve</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {heroIndustries.map((industry, i) => (
            <Reveal key={industry.slug} delay={i * 80}>
              <div className="h-full rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-xl text-ink">
                  {industry.label}
                </h3>
                <p className="mt-3 text-sm text-ink/65">{industry.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Specialist depth — the dedicated verticals (Coverage pages) */}
        <h2 className="mb-6 mt-16 text-2xl text-ink">Where we go deepest</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
              <Link
                href={s.href}
                className="group block h-full rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-rust/40 hover:shadow-md"
              >
                <h3 className="font-heading text-xl text-ink">{s.name}</h3>
                <p className="mt-3 text-sm text-ink/65">{s.valueProp}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-rust">
                  Explore
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Breadth */}
        <h2 className="mb-6 mt-16 text-2xl text-ink">And many more</h2>
        <ul className="flex flex-wrap gap-2.5">
          {industriesWeServe.map((label) => (
            <li
              key={label}
              className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/75"
            >
              {label}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
