import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/motion/Section";
import Reveal from "@/components/motion/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import { coverageGroups } from "@/data/coverages";

export const metadata: Metadata = {
  title: "Coverage",
  description:
    "The lines of coverage Ventra structures for established businesses — core commercial, management and professional liability, property and specialty, and industry-specific lines.",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-sand">
        <div className="container-page py-[clamp(4rem,9vw,8rem)]">
          <Reveal>
            <p className="eyebrow text-rust mb-4">Coverage</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-4xl text-4xl text-white sm:text-5xl lg:text-6xl">
              The coverage we structure for established businesses.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-sand/75">
              Not a menu pulled off a shelf — a program built around how your
              business actually operates. These are the lines we structure,
              grouped the way we think about a complete account.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9">
              <CTAButton size="lg" />
            </div>
          </Reveal>

          {/* Jump nav */}
          <Reveal delay={320}>
            <nav
              aria-label="Coverage tiers"
              className="mt-12 flex flex-wrap gap-2.5"
            >
              {coverageGroups.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="rounded-full border border-sand/20 px-4 py-1.5 text-sm text-sand/80 transition-colors hover:border-rust hover:text-white"
                >
                  {group.heading}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      {/* Coverage groups */}
      {coverageGroups.map((group, gi) => (
        <Section
          key={group.id}
          id={group.id}
          className={`scroll-mt-[calc(var(--header-h)+1.5rem)] ${
            gi % 2 === 1 ? "bg-white" : ""
          }`}
          reveal={false}
        >
          <div className="max-w-2xl">
            <p className="eyebrow text-rust">{`Tier ${gi + 1}`}</p>
            <h2 className="mt-2 text-3xl text-ink">{group.heading}</h2>
            <p className="mt-3 text-ink/65">{group.intro}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.lines.map((c, i) => (
              <Reveal key={c.name} delay={i * 45}>
                <div className="h-full rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg text-ink">{c.name}</h3>
                  <p className="mt-2 text-sm text-ink/60">{c.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      ))}

      {/* CTA */}
      <section className="bg-rust text-white">
        <div className="container-page py-[clamp(3.5rem,7vw,6rem)] text-center">
          <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl">
            Not sure which lines your business actually needs?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            That&rsquo;s the conversation. An advisor maps your operations to the
            coverage that fits — and flags the gaps a once-a-year agent misses.
          </p>
          <div className="mt-7">
            <CTAButton
              variant="outline"
              size="lg"
              className="border-white/50 text-white hover:bg-white hover:text-rust"
            />
          </div>
          <p className="mt-8">
            <Link
              href="/industries"
              className="text-sm text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              See coverage tailored to your industry &rarr;
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
