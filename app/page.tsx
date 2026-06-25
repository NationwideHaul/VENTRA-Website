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
      {/* Hero — full-width image, white headline, selector card overlapping */}
      <section className="relative">
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

          <div className="relative container-page pt-[clamp(5rem,12vh,9rem)] pb-[clamp(10rem,20vh,15rem)] text-center">
            <Reveal>
              <h1 className="mx-auto max-w-[15ch] text-balance text-5xl text-white sm:text-6xl lg:text-7xl">
                Insurance for businesses that have{" "}
                <span className="font-accent italic text-rust">
                  too much to lose.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="mx-auto mt-7 max-w-[60ch] text-lg leading-relaxed text-white/85 sm:text-xl">
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

      {/* Positioning strip */}
      <Section>
        <p className="font-accent text-2xl sm:text-3xl text-ink/90 max-w-3xl leading-snug">
          A strategic protection partner, not a transactional quote shop. We
          structure coverage around what you&rsquo;ve built and advocate for you,
          especially at claim time.
        </p>
      </Section>

      {/* Specialist depth — scroll-triggered sticky showcase */}
      <SpecialtyShowcase />

      {/* Supporting feature checks */}
      <Section className="bg-white" innerClassName="max-w-5xl">
        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <div className="flex gap-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rust/10">
                  <svg
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5 text-rust"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m4 10.5 4 4 8-9" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-heading text-lg text-ink">{f.title}</h3>
                  <p className="mt-1 text-ink/65">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
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
