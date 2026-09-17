import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Logo from "@/components/ui/Logo";
import CarrierMarquee from "@/components/home/CarrierMarquee";
import GraceCTAs from "@/components/grace/GraceCTAs";
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
    "Meet Grace Vengelis of Ventra Insurance Group. Book a free Coverage Gap Review — a 20-minute call with a licensed agent and a one-page report that's yours to keep.",
  openGraph: {
    type: "profile",
    title: "Meet Grace — Ventra Insurance Group",
    description:
      "Book a free Coverage Gap Review with Grace Vengelis — a 20-minute call and a one-page report, yours to keep.",
    images: [
      {
        url: "/team/grace.jpg",
        width: 400,
        height: 400,
        alt: `${grace.name} — ${grace.title}, ${site.name}`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Meet Grace — Ventra Insurance Group",
    description:
      "Book a free Coverage Gap Review with Grace Vengelis — a 20-minute call and a one-page report, yours to keep.",
    images: ["/team/grace.jpg"],
  },
};

// What Ventra does — three short cards. No stock-looking icons; a small rust
// index leads each one instead.
const WHAT_WE_DO = [
  {
    t: "Commercial coverage, end to end",
    d: "Property, liability, commercial auto, workers’ comp — placed to match how your business actually runs.",
  },
  {
    t: "We find the gaps others miss",
    d: "A close read of what you carry today, so nothing that matters is left exposed.",
  },
  {
    t: "One licensed agent, in your corner",
    d: "A real person who knows your account and picks up when you call.",
  },
];

export default function GracePage() {
  return (
    <main id="main" className="bg-white text-ink">
      {/* Minimal top bar — a single small logo linking home. No nav. */}
      <div className="container-page flex items-center justify-between py-5">
        <Logo
          variant="dark"
          height={30}
          priority
          unoptimized={DEV_IMAGE_UNOPTIMIZED}
        />
        <span className="hidden text-xs font-medium uppercase tracking-wide text-ink/40 sm:block">
          Insurance Group
        </span>
      </div>

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        {/* Warm, static wash behind the hero (no motion needed). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sand/50 via-white to-white"
        />
        <div className="container-page pb-[clamp(2.5rem,6vw,4rem)] pt-[clamp(1rem,3vw,2.5rem)]">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
            {/* Portrait — layered rust panel behind, echoing the homepage.
                Rendered un-gated (no scroll-reveal) with priority so it paints
                immediately: it's the hero's LCP element. */}
            <div className="mx-auto lg:mx-0">
              <div className="relative w-fit">
                <div
                  aria-hidden
                  className="absolute -left-4 -top-4 h-full w-full rounded-3xl bg-rust/15"
                />
                <Image
                  src={grace.portrait}
                  alt={`${grace.name}, ${grace.title} at ${site.name}`}
                  priority
                  unoptimized={DEV_IMAGE_UNOPTIMIZED}
                  sizes="(min-width: 640px) 288px, 224px"
                  placeholder="blur"
                  className="relative h-56 w-56 rounded-3xl object-cover shadow-xl ring-1 ring-ink/10 sm:h-72 sm:w-72"
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
                protected the way it should be — no gaps, no guesswork. Pick an
                option and I’ll take it from here.
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
                Two minutes now — a licensed agent follows up. Never a call
                center.
              </p>
            </div>
          </div>
        </div>
        {/* Sentinel: the sticky mobile bar appears once this scrolls out of view. */}
        <div id={GRACE_HERO_SENTINEL_ID} aria-hidden className="h-px w-full" />
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
              <div className="h-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/10 sm:p-7">
                <span
                  aria-hidden
                  className="font-heading text-sm font-bold text-rust"
                >
                  0{i + 1}
                </span>
                <div
                  aria-hidden
                  className="mt-3 h-px w-8 bg-rust/40"
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

      {/* ---------------- CARRIERS (proof) ---------------- */}
      <section className="border-y border-ink/10 bg-white">
        <div className="container-page py-[clamp(2rem,4vw,3.25rem)]">
          <Reveal>
            <p className="text-center text-sm font-medium uppercase tracking-wide text-ink/45">
              Backed by the carriers you already know
            </p>
          </Reveal>
          <div className="mt-8">
            <CarrierMarquee />
          </div>
        </div>
      </section>

      {/* ---------------- THE OFFER ---------------- */}
      <section className="container-page py-[var(--spacing-section)]">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-[2rem] bg-ink px-6 py-[clamp(2.25rem,5vw,3.5rem)] text-center text-sand sm:px-10">
            <p className="eyebrow text-rust">The offer</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              The Coverage Gap Review
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-sand/80">
              A free 20-minute call with a licensed agent and a written one-page
              Gap Report — yours to keep, whether or not you move your coverage.
            </p>
            <ul className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
              {["Free", "20 minutes", "One-page Gap Report"].map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-sand/25 px-4 py-1.5 text-sm text-sand/85"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ---------------- FORMS ---------------- */}
      <section
        id={GRACE_FORMS_ID}
        className="container-page scroll-mt-8 pb-[var(--spacing-section)]"
      >
        <div className="mx-auto mb-8 max-w-xl text-center">
          <Reveal>
            <p className="eyebrow text-rust">Let’s get started</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-ink sm:text-4xl">
              Book your review — or just say hi.
            </h2>
          </Reveal>
        </div>
        <GraceForms />
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
