import Image from "next/image";
import Section from "@/components/motion/Section";
import Reveal from "@/components/motion/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import HeroIndustrySelector from "@/components/home/HeroIndustrySelector";
import SpecialtyShowcase from "@/components/home/SpecialtyShowcase";
import CarrierMarquee from "@/components/home/CarrierMarquee";

// Our four selling points, ordered: point 1 is the anchor (depth-first), the
// rest support it. Each is framed as the benefit the client walks away with.
const FEATURES = [
  {
    title: "We understand your business first",
    desc: "A program built around how you operate — not a template.",
  },
  {
    title: "We find the gaps others miss",
    desc: "We catch the exposures others miss, before a claim does.",
  },
  {
    title: "Specialized depth in your industry",
    desc: "An advisor who speaks your industry from day one.",
  },
  {
    title: "A relationship, not a transaction",
    desc: "We adjust coverage as you grow, so it never goes stale.",
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
          White backdrop below the image; the selector card pops via its shadow. */}
      <section className="relative bg-white">
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
              <h1 className="mx-auto max-w-[20ch] font-medium leading-[1.05] text-[2.85rem] text-white sm:text-[3.55rem] lg:text-[4.3rem]">
                Insurance for
                <br />
                businesses that have
                <span className="mt-1 block font-accent text-[1.05em] font-semibold italic">
                  too much to lose.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="mx-auto mt-7 max-w-full text-[1.0625rem] font-light leading-relaxed text-white/85 sm:whitespace-nowrap sm:text-[1.1875rem]">
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

      {/* Carrier partners — white band; sections divided by hairlines, not color */}
      <section className="bg-white">
        <div className="container-page pb-[var(--spacing-section)] pt-[clamp(1.5rem,3.5vw,3rem)]">
          <div className="mx-auto max-w-6xl text-center">
            <Reveal>
              <p className="eyebrow text-rust">Carrier partners</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-ink sm:text-4xl">
                Backed by the nation&rsquo;s leading carriers.
              </h2>
              <p className="mx-auto mt-3 text-ink/60 sm:whitespace-nowrap">
                Licensed in 48 states, with access to hundreds of competitive
                programs.
              </p>
            </Reveal>
          </div>
          <div className="mt-10">
            <CarrierMarquee />
          </div>
        </div>
      </section>

      {/* Hairline divider — separates the white sections without a color band */}
      <div className="container-page" aria-hidden>
        <div className="border-t border-ink/10" />
      </div>

      {/* Specialist depth — scroll-triggered sticky showcase */}
      <SpecialtyShowcase />

      {/* Hairline divider */}
      <div className="container-page" aria-hidden>
        <div className="border-t border-ink/10" />
      </div>

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
            <p className="eyebrow text-rust">Why Ventra</p>

            <h2 className="mt-2 font-heading text-3xl font-bold text-ink sm:text-4xl">
              Built to keep up with what you&rsquo;re building.
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
