import Image from "next/image";
import Section from "@/components/motion/Section";
import Reveal from "@/components/motion/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import HeroIndustrySelector from "@/components/home/HeroIndustrySelector";
import SpecialtyShowcase from "@/components/home/SpecialtyShowcase";

const FEATURES = [
  {
    title: "Dedicated advisor",
    desc: "Work directly with one advisor who knows your business.",
  },
  {
    title: "Claims advocacy",
    desc: "We advocate for you, especially at claim time.",
  },
  {
    title: "Risk management",
    desc: "Expertise that helps you navigate uncertainty with confidence.",
  },
  {
    title: "Built to scale",
    desc: "Protection that grows with the scale of your ambition.",
  },
];

/**
 * Home — phase-1 placeholder.
 *
 * The full home page (hero, positioning strip, specialty cards, "how we
 * work", stat counters, advisor teaser, CTA band) is built in phase 3.
 * This stub stands up the brand system — type, color, motion — and the
 * primary CTA so the layout can be reviewed end-to-end.
 */
export default function HomePage() {
  return (
    <>
      {/* Hero — full-width image, white headline, selector card overlapping.
          Sand backdrop fills below the image so the white selector card pops. */}
      <section className="relative bg-sand">
        <div className="relative w-full overflow-hidden">
          <Image
            src="/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            // Served directly: the local optimizer cache is unreliable on this
            // filesystem. Vercel optimizes fine, so this can be removed there.
            unoptimized
            className="object-cover object-center"
          />
          {/* Legibility overlay */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink/80"
          />

          <div className="relative container-page pt-[clamp(5rem,12vh,9rem)] pb-[clamp(13rem,26vh,19rem)] text-center">
            <Reveal>
              <h1 className="mx-auto max-w-[15ch] text-balance text-5xl text-white sm:text-6xl lg:text-7xl">
                Insurance for businesses that have{" "}
                <span className="font-accent italic text-white">
                  too much to lose.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="mx-auto mt-7 max-w-full text-lg leading-relaxed text-white/85 sm:whitespace-nowrap sm:text-xl">
                Commercial insurance tailored to your business, with a dedicated
                advisor who fights for your interests.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Industry selector — white card overlapping the image bottom edge */}
        <div className="relative z-10 -mt-24 pb-[clamp(2rem,5vw,4rem)] sm:-mt-32">
          <div className="container-page">
            <div className="mx-auto max-w-6xl rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-ink/5 sm:p-10">
              <HeroIndustrySelector />
            </div>
          </div>
        </div>
      </section>

      {/* Positioning — designed feature card on a sand backdrop. The dark
          two-column card (branded visual + statement) pops against the sand. */}
      <section className="bg-sand">
        <div className="container-page py-[var(--spacing-section)]">
          <Reveal>
            <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl shadow-2xl ring-1 ring-ink/10 lg:grid-cols-2">
              {/* Left: branded rust panel with oversized submark watermark */}
              <div className="relative flex min-h-[18rem] items-end overflow-hidden bg-gradient-to-br from-rust to-[#7a2410] p-9 sm:p-11">
                <Image
                  src="/logos/ventra-submark-sand.png"
                  alt=""
                  width={4677}
                  height={3984}
                  unoptimized
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-16 w-72 opacity-[0.14] sm:w-80"
                />
                <div className="relative">
                  <p className="eyebrow text-lg text-sand">The Ventra approach</p>
                  <p className="mt-2 font-heading text-2xl text-white sm:text-[1.6rem]">
                    Coverage built around what you&rsquo;ve built.
                  </p>
                </div>
              </div>

              {/* Right: the positioning statement */}
              <div className="flex flex-col justify-center bg-charcoal p-9 sm:p-12">
                <p className="font-accent text-2xl leading-snug text-white sm:text-[1.75rem]">
                  A strategic protection partner, not a transactional quote
                  shop.
                </p>
                <p className="mt-5 leading-relaxed text-white/65">
                  We structure coverage around what you&rsquo;ve built and
                  advocate for you &mdash; especially at claim time.
                </p>
                <div className="mt-8">
                  <CTAButton variant="outline" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Specialist depth — scroll-triggered sticky showcase */}
      <SpecialtyShowcase />

      {/* Why Ventra — image + four selling points (editorial stat layout) */}
      <Section className="bg-white">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: layered photo with a rust-tinted offset panel behind */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <div
              aria-hidden
              className="absolute -left-5 -top-5 bottom-8 right-10 rounded-3xl bg-rust/15 sm:-left-7 sm:-top-7"
            />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-ink/10">
              <Image
                src="/hero.jpg"
                alt="A Ventra advisor meeting with a business owner"
                width={1200}
                height={1500}
                unoptimized
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>

          {/* Right: eyebrow, heading, and the four selling points */}
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-ink">
              Why Ventra
            </p>
            <div className="mt-3 h-0.5 w-16 bg-rust" />

            <h2 className="mt-6 font-accent text-4xl leading-[1.1] text-ink sm:text-5xl">
              Protection is where we start, not where we stop.
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={i * 70}>
                  <div className="border-b border-ink/15 pb-5">
                    <p className="font-accent text-2xl italic leading-tight text-rust sm:text-[1.75rem]">
                      {f.title}
                    </p>
                    <p className="mt-2 leading-relaxed text-ink/65">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA band */}
      <section className="bg-rust text-white">
        <div className="container-page py-[clamp(4rem,8vw,7rem)] text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl max-w-3xl mx-auto">
              Protection at the scale of your ambition.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8">
              <CTAButton variant="outline" size="lg" className="border-white/50 text-white hover:bg-white hover:text-rust" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
