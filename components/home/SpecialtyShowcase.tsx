"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getIndustry } from "@/data/industries";

// Illustrations live in /public/branding/illustrations/<slug>.png. `?v=`
// cache-busts re-exports over the same name.
const ART_VERSION = "3";

/**
 * "Specialist depth" showcase — a scroll-triggered sticky (scrollytelling)
 * section. The left list highlights one item at a time and the right panel
 * sticks in place and swaps its coverage content as you scroll through the
 * section. Falls back to a static, fully-visible stacked layout for
 * prefers-reduced-motion and before hydration (no-JS / SEO friendly).
 */

type ShowcaseItem = {
  key: string;
  label: string;
  title: string;
  desc: string;
  coverages: string[];
  href: string;
  panelEyebrow: string;
  /** Illustration slug in /public/branding/illustrations, or null. */
  art: string | null;
};

// The four featured industries + a "More industries" catch-all. Each industry
// shows ALL of its coverage (core + specialty); illustrations come from the
// shared set in /public/branding/illustrations.
const FEATURED_SLUGS = [
  "contractors",
  "self-storage",
  "real-estate",
  "hospitality",
];

const ITEMS: ShowcaseItem[] = [
  ...FEATURED_SLUGS.map((slug) => {
    const s = getIndustry(slug)!;
    return {
      key: s.slug,
      label: s.name,
      title: s.name,
      desc: s.valueProp,
      coverages: [...s.core, ...s.specialty].map((c) => c.name),
      href: s.href,
      panelEyebrow: "Coverage",
      art: s.slug,
    };
  }),
  {
    key: "more-industries",
    label: "More industries",
    title: "Specialized depth across every industry.",
    desc: "The foundational commercial coverages every established business is built on.",
    coverages: [
      "General Liability",
      "Commercial Property",
      "Workers' Compensation",
      "Umbrella / Excess Liability",
    ],
    href: "/industries",
    panelEyebrow: "Core coverage",
    art: "more-industries",
  },
];

function NumberTile({ n, active }: { n: number; active: boolean }) {
  return (
    <span
      className={[
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-heading text-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        active
          ? "bg-rust text-white shadow-md"
          : "bg-sand text-ink/45 ring-1 ring-ink/5",
      ].join(" ")}
    >
      {n}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 text-rust"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}

function Panel({
  item,
  animate,
  fill,
}: {
  item: ShowcaseItem;
  animate?: boolean;
  /** Stretch to fill the column height (interactive layout) for a symmetric
   *  panel; the Explore link is pinned to the bottom. */
  fill?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-br from-sand/70 via-white to-white p-[1.5px] shadow-2xl ring-1 ring-ink/5 ${
        fill ? "h-full" : ""
      }`}
    >
      <div
        key={animate ? item.key : undefined}
        className={`flex h-full flex-col rounded-[calc(1.5rem-1.5px)] bg-white p-7 sm:p-9 ${
          animate ? "panel-in" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-rust">{item.panelEyebrow}</p>
            <h3 className="mt-1 font-heading text-2xl text-ink sm:text-[1.75rem]">
              {item.title}
            </h3>
          </div>
          {item.art && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/branding/illustrations/${item.art}.png?v=${ART_VERSION}`}
              alt=""
              aria-hidden
              className="h-20 w-28 shrink-0 object-contain sm:h-24 sm:w-36"
            />
          )}
        </div>
        <p className="mt-2 text-ink/60">{item.desc}</p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {item.coverages.map((c) => (
            <li
              key={c}
              className="flex items-center gap-3 rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink/85"
            >
              <CheckIcon />
              {c}
            </li>
          ))}
        </ul>

        <Link
          href={item.href}
          className={`inline-flex items-center gap-2 text-sm font-medium text-rust hover:text-ink transition-colors ${
            fill ? "mt-auto pt-7" : "mt-7"
          }`}
        >
          Explore {item.label}
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <>
      <p className="eyebrow text-rust">What we focus on</p>
      <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
        Specialist depth where it matters most.
      </h2>
    </>
  );
}

export default function SpecialtyShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setInteractive(true);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        const p =
          scrollable > 0
            ? Math.min(1, Math.max(0, -rect.top / scrollable))
            : 0;
        const idx = Math.min(ITEMS.length - 1, Math.floor(p * ITEMS.length));
        setActive(idx);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Static, fully-visible fallback (reduced motion / pre-hydration / no-JS).
  if (!interactive) {
    return (
      <section className="bg-sand/40 py-[var(--spacing-section)]">
        <div className="container-page">
          <Heading />
          <div className="mt-12 space-y-12">
            {ITEMS.map((item) => (
              <div
                key={item.key}
                className="grid items-center gap-8 lg:grid-cols-2"
              >
                <div>
                  <h3 className="font-heading text-2xl text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-ink/65">{item.desc}</p>
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-rust"
                  >
                    Explore {item.label} <span aria-hidden>&rarr;</span>
                  </Link>
                </div>
                <Panel item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Scrollytelling: tall section pins the layout; scroll drives the active item.
  return (
    <section
      ref={sectionRef}
      className="relative bg-sand/40"
      style={{ height: `${ITEMS.length * 72}vh` }}
      aria-label="Specialist depth where it matters most"
    >
      <div className="sticky top-0 flex min-h-screen items-center py-[var(--header-h)]">
        <div className="container-page grid w-full items-stretch gap-12 lg:grid-cols-2">
          {/* Left: heading + stepped list */}
          <div>
            <Heading />
            <ul className="mt-10">
              {ITEMS.map((item, i) => {
                const isActive = i === active;
                return (
                  <li key={item.key} className="border-t border-ink/10">
                    <div className="flex items-center gap-4 py-4">
                      <NumberTile n={i + 1} active={isActive} />
                      <span
                        className={`font-heading text-xl transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? "text-ink" : "text-ink/35"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {/* Active item reveals its summary */}
                    <div
                      className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        gridTemplateRows: isActive ? "1fr" : "0fr",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 pl-15 text-ink/65">{item.desc}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: panel that swaps with the active item; stretches to match
              the left column so both sides are symmetric top-to-bottom */}
          <div className="h-full">
            <Panel item={ITEMS[active]} animate fill />
          </div>
        </div>
      </div>
    </section>
  );
}
