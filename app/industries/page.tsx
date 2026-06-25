import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/motion/Section";
import Reveal from "@/components/motion/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import { frontIndustries, moreIndustries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "The industries Ventra protects, with dedicated specialist depth in the verticals where it matters most.",
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-sand">
        <div className="container-page py-[clamp(4rem,9vw,8rem)]">
          <Reveal>
            <p className="eyebrow text-rust mb-4">Industries</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white max-w-4xl">
              The industries we protect.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg text-sand/75 max-w-4xl leading-relaxed">
              We serve a wide range of established businesses, with dedicated
              depth in the specialty verticals where it matters most.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Primary focus — the front 7 */}
      <Section className="bg-white" reveal={false}>
        <p className="eyebrow text-rust">Primary focus</p>
        <h2 className="mt-2 text-2xl text-ink sm:text-3xl">
          Where we go deepest.
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {frontIndustries.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70}>
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

        {/* Breadth — the 20 more */}
        <h2 className="mb-2 mt-16 text-2xl text-ink sm:text-3xl">
          More industries we serve.
        </h2>
        <p className="mb-8 max-w-2xl text-ink/65">
          Each with its own Core and Specialty coverage, built around how the
          class actually operates.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {moreIndustries.map((i, idx) => (
            <Reveal key={i.slug} delay={idx * 35}>
              <Link
                href={i.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-ink/10 bg-white px-5 py-4 transition-all hover:border-rust/40 hover:shadow-sm"
              >
                <span className="font-heading text-ink">{i.name}</span>
                <span
                  aria-hidden
                  className="text-rust transition-transform duration-200 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-rust text-white">
        <div className="container-page py-[clamp(3.5rem,7vw,6rem)] text-center">
          <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl">
            Don&rsquo;t see your industry? Let&rsquo;s talk.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            We place coverage for established businesses across dozens of
            classes. If you operate it, we can structure it.
          </p>
          <div className="mt-7">
            <CTAButton
              variant="outline"
              size="lg"
              className="border-white/50 text-white hover:bg-white hover:text-rust"
            />
          </div>
        </div>
      </section>
    </>
  );
}
