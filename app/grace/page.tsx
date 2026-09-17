import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Logo from "@/components/ui/Logo";
import navLogo from "@/public/logos/ventra-logo-3.png";
import GraceCarriers from "@/components/grace/GraceCarriers";
import GraceCTAs from "@/components/grace/GraceCTAs";
import GraceCTA from "@/components/grace/GraceCTA";
import GraceForms from "@/components/grace/GraceForms";
import GraceStickyBar, {
  GRACE_HERO_SENTINEL_ID,
} from "@/components/grace/GraceStickyBar";
import { GRACE_FORMS_ID } from "@/components/grace/formBus";
import { grace, DEV_IMAGE_UNOPTIMIZED } from "@/data/grace";
import { site } from "@/data/site";

export const metadata: Metadata = {
  // `absolute` opts out of the site's "%s — Ventra Insurance Group" template so
  // the title reads exactly as briefed.
  title: { absolute: "Meet Grace — Ventra Insurance Group" },
  description:
    "Meet Grace Vengelis of Ventra Insurance Group. Get a free policy review — a call with a licensed agent and a written summary that's yours to keep.",
  openGraph: {
    type: "profile",
    title: "Meet Grace — Ventra Insurance Group",
    description:
      "Get a free policy review with Grace Vengelis — a call with a licensed agent and a written summary, yours to keep.",
    images: [
      {
        url: "/team/grace.jpg",
        width: 975,
        height: 1200,
        alt: `${grace.name}, ${grace.title}, ${site.name}`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Meet Grace — Ventra Insurance Group",
    description:
      "Get a free policy review with Grace Vengelis — a call with a licensed agent and a written summary, yours to keep.",
    images: ["/team/grace.jpg"],
  },
};

// What Ventra does — three short value cards (mirrors the homepage's language).
const WHAT_WE_DO = [
  {
    t: "We understand your business first",
    d: "A program built around how you operate, not a template.",
  },
  {
    t: "We find the gaps others miss",
    d: "We catch the exposures others miss, before a claim does.",
  },
  {
    t: "One licensed agent in your corner",
    d: "A real person who knows your account and picks up when you call.",
  },
];

// How it works — the path from first hello to fully covered.
const PROCESS = [
  {
    n: "01",
    t: "Tell us about your business",
    d: "Fill out a short form so we understand how you actually operate.",
  },
  {
    n: "02",
    t: "We review your coverage",
    d: "A licensed agent reads what you shared and looks at your real exposures.",
  },
  {
    n: "03",
    t: "Get covered",
    d: "Put the right protection in place, with an agent who stays with you as you grow.",
  },
];

export default function GracePage() {
  return (
    <main id="main" className="bg-white text-ink">
      {/* ---------------- NAV BAR — dark navy, bigger logo, links home ---------------- */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 backdrop-blur-md">
        <div className="container-page flex h-[var(--header-h)] items-center justify-between">
          {/* Logo links to the homepage (default). */}
          <Logo
            src={navLogo}
            height={54}
            priority
            unoptimized={DEV_IMAGE_UNOPTIMIZED}
          />
          <GraceCTA
            tab="review"
            className="hidden h-11 items-center justify-center rounded-full bg-rust px-5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-ink sm:inline-flex"
          >
            Get a Free Policy Review
          </GraceCTA>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        {/* Warm, static wash behind the hero (no motion needed). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sand/50 via-white to-white"
        />
        <div className="container-page pb-[clamp(2.5rem,6vw,4rem)] pt-[clamp(2.75rem,6vw,5rem)]">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
            {/* Portrait — layered rust panel behind, echoing the homepage.
                Rendered un-gated (no scroll-reveal) with priority so it paints
                immediately: it's the hero's LCP element. */}
            <div className="group mx-auto lg:mx-0">
              <div className="relative w-fit">
                <div
                  aria-hidden
                  className="float-soft absolute -left-4 -top-4 h-full w-full rounded-3xl bg-rust/15"
                />
                <Image
                  src={grace.portrait}
                  alt={`${grace.name}, ${grace.title} at ${site.name}`}
                  priority
                  unoptimized={DEV_IMAGE_UNOPTIMIZED}
                  sizes="(min-width: 640px) 288px, 224px"
                  placeholder="blur"
                  className="relative h-56 w-56 rounded-3xl object-cover object-[center_18%] shadow-xl ring-1 ring-ink/10 transition-transform duration-500 ease-out group-hover:scale-[1.02] sm:h-72 sm:w-72"
                />
              </div>
            </div>

            {/* Copy + CTAs — CSS-only `.rise-in` mount stagger (not scroll-gated,
                so above-the-fold content never depends on JS to become visible;
                globals forces it fully visible under prefers-reduced-motion). */}
            <div className="text-center lg:text-left">
              <p className="eyebrow rise-in text-rust">{grace.title}</p>
              <h1
                className="rise-in mt-2 font-heading text-[2.5rem] font-bold leading-[1.05] text-ink sm:text-6xl"
                style={{ ["--rise-delay" as string]: "70ms" }}
              >
                {grace.name}
              </h1>
              <p
                className="rise-in mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/70 lg:mx-0"
                style={{ ["--rise-delay" as string]: "140ms" }}
              >
                Great to meet you. Let’s make sure everything you’ve built is
                protected the way it should be and see if we can help you.
              </p>
              <div
                className="rise-in mt-8"
                style={{ ["--rise-delay" as string]: "210ms" }}
              >
                <GraceCTAs />
              </div>
              <p
                className="rise-in mt-4 text-sm text-ink/50"
                style={{ ["--rise-delay" as string]: "280ms" }}
              >
                Two minutes now. A licensed agent follows up.
              </p>
            </div>
          </div>
        </div>
        {/* Sentinel: the sticky mobile bar appears once this scrolls out of view. */}
        <div id={GRACE_HERO_SENTINEL_ID} aria-hidden className="h-px w-full" />
      </section>

      {/* ---------------- CARRIERS (static, right under the hero) ---------------- */}
      <section className="border-y border-ink/10 bg-white">
        <div className="container-page py-[clamp(1.75rem,4vw,3rem)]">
          <Reveal>
            <p className="text-center font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Access to <span className="text-rust">more than 100 carriers</span>
            </p>
          </Reveal>
          <div className="mt-8">
            <GraceCarriers />
          </div>
        </div>
      </section>

      {/* ---------------- FORM (moved up, right under the logos) ---------------- */}
      <section
        id={GRACE_FORMS_ID}
        className="container-page scroll-mt-24 py-[var(--spacing-section)]"
      >
        <div className="mx-auto mb-8 max-w-xl text-center">
          <Reveal>
            <p className="eyebrow text-rust">Let’s get started</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-ink sm:text-4xl">
              Get a free policy review
            </h2>
            <p className="mx-auto mt-4 max-w-lg leading-relaxed text-ink/65">
              A free call with a licensed agent who takes a fresh look at your
              current coverage.
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {["Free", "20 minutes", "Fresh eyes"].map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink/70"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <GraceForms />
      </section>

      {/* ---------------- HOW IT WORKS — dark band with numbered steps ---------------- */}
      <section className="relative overflow-hidden bg-ink text-sand">
        <div className="container-page py-[clamp(3.5rem,7vw,6rem)]">
          <div className="max-w-2xl">
            <p className="eyebrow text-rust">How it works</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              From first hello to fully covered.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-sand/70">
              This is the clear path to coverage that fits.
            </p>
          </div>

          <ol className="relative mt-16 grid gap-y-14 sm:mt-20 sm:grid-cols-3 sm:gap-x-8">
            {/* Connecting rail behind the badges (desktop). */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-7 right-7 top-7 hidden h-px bg-gradient-to-r from-rust via-rust/50 to-rust/10 sm:block"
            />
            {PROCESS.map((s, i) => (
              <Reveal key={s.n} delay={i * 110}>
                <li className="relative">
                  {/* Oversized ghost numeral. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-14 right-0 font-heading text-8xl font-bold leading-none text-white/[0.05] sm:text-9xl"
                  >
                    {s.n}
                  </span>

                  {/* Node badge on the rail + forward arrow toward the next step. */}
                  <div className="relative z-10 flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-rust font-heading text-lg font-bold text-white shadow-lg shadow-rust/30">
                      {s.n}
                    </span>
                    {i < PROCESS.length - 1 && (
                      <svg
                        aria-hidden
                        viewBox="0 0 40 16"
                        className="hidden h-4 w-10 text-rust/60 sm:block"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M0 8h34" />
                        <path d="M28 2l6 6-6 6" />
                      </svg>
                    )}
                  </div>

                  <h3 className="mt-7 font-heading text-xl text-white sm:text-2xl">
                    {s.t}
                  </h3>
                  <p className="mt-3 max-w-xs leading-relaxed text-sand/70">
                    {s.d}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- WHAT VENTRA DOES ---------------- */}
      <section className="container-page py-[var(--spacing-section)]">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow text-rust">What Ventra does</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-ink sm:text-4xl">
              Coverage that fits the business you run.
            </h2>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {WHAT_WE_DO.map((c, i) => (
            <Reveal key={c.t} delay={i * 80}>
              <div className="group h-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/[0.06] hover:ring-ink/15 sm:p-7">
                <span
                  aria-hidden
                  className="font-heading text-sm font-bold text-rust"
                >
                  0{i + 1}
                </span>
                <div
                  aria-hidden
                  className="mt-3 h-px w-8 bg-rust/40 transition-all duration-300 group-hover:w-12 group-hover:bg-rust"
                />
                <h3 className="mt-4 font-heading text-xl font-bold text-ink">
                  {c.t}
                </h3>
                <p className="mt-2 leading-relaxed text-ink/65">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- SECOND OPINION ---------------- */}
      <section className="container-page pb-[var(--spacing-section)]">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-[2rem] bg-ink px-6 py-[clamp(2.25rem,5vw,3.5rem)] text-center text-sand sm:px-10">
            <p className="eyebrow text-rust">Why it matters</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              A second opinion never hurts.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-sand/80">
              Most business owners set their coverage once and never look at it
              again. A fresh set of eyes can catch what you’re overpaying for and
              what you might be missing, so you can decide what’s right for the
              business with real confidence.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------------- TRUST STRIP ---------------- */}
      <section className="border-t border-ink/10 bg-sand/30">
        <div className="container-page py-8 text-center">
          <p className="text-sm leading-relaxed text-ink/60">
            {site.name} is a DBA of Complete Carrier Coverage LLC.{" "}
            <Link
              href={grace.homeUrl}
              className="font-medium text-ink underline decoration-ink/20 underline-offset-2 transition-colors hover:text-rust"
            >
              Visit {site.domain}
            </Link>
          </p>
        </div>
      </section>

      {/* Sticky mobile CTA bar (appears after the hero). */}
      <GraceStickyBar />
    </main>
  );
}
