"use client";

import { useState } from "react";
import Link from "next/link";
import {
  frontIndustries,
  moreIndustries,
  industries,
} from "@/data/industries";

type MegaMenuProps = {
  open: boolean;
  /** Called when a link inside the menu is activated (so the header can close it). */
  onNavigate: () => void;
  id: string;
};

// Illustrations live in /public/branding/illustrations/<slug>.png (the 7
// primary-focus industries). `?v=` cache-busts re-exports over the same name.
const ILLUSTRATED = new Set([
  "contractors",
  "self-storage",
  "habitation-multifamily",
  "real-estate",
  "hospitality",
  "healthcare",
  "warehousing-logistics",
]);
const ART_VERSION = "3";

/**
 * Desktop two-panel Industries mega-menu.
 *
 * Left panel (rust): every industry — the 7 primary-focus, a divider, then the
 * "More industries" breadth list — all at the same size; hovering any one swaps
 * the right panel. The list scrolls if it overflows. Right panel (white): the
 * active industry's illustration (primary focus only), name, value prop, and
 * its Core coverage tier.
 */
export default function MegaMenu({ open, onNavigate, id }: MegaMenuProps) {
  const [activeSlug, setActiveSlug] = useState(frontIndustries[0].slug);
  const active =
    industries.find((s) => s.slug === activeSlug) ?? frontIndustries[0];
  const hasArt = ILLUSTRATED.has(active.slug);

  // Shared list-item renderer so primary + more read identically.
  const renderItem = (s: (typeof industries)[number]) => {
    const isActive = s.slug === active.slug;
    return (
      <li key={s.slug}>
        <Link
          href={s.href}
          onMouseEnter={() => setActiveSlug(s.slug)}
          onFocus={() => setActiveSlug(s.slug)}
          onClick={onNavigate}
          className={[
            "group flex items-center justify-between rounded-lg px-3 py-1.5 -mx-1",
            "transition-colors duration-200",
            isActive ? "bg-white/15 text-white" : "text-white/85 hover:bg-white/10",
          ].join(" ")}
        >
          <span className="font-heading text-[1.05rem]">{s.name}</span>
          <span
            aria-hidden
            className={[
              "text-white transition-transform duration-200",
              isActive
                ? "translate-x-0 opacity-100"
                : "-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0",
            ].join(" ")}
          >
            &rarr;
          </span>
        </Link>
      </li>
    );
  };

  return (
    <div
      id={id}
      role="region"
      aria-label="Industries"
      aria-hidden={!open}
      // Anchor to the header's bottom and fill to the viewport bottom so the
      // panel runs all the way down. The open/close animation is inline (not
      // Tailwind translate utilities) — Tailwind's `translate` property left a
      // residual -8px that shifted the panel up and opened a gap at the bottom.
      style={{
        top: "var(--header-h)",
        height: "calc(100vh - var(--header-h))",
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 250ms ease, visibility 250ms",
      }}
      className="absolute left-0 right-0 origin-top border-t border-ink/10 bg-white text-ink shadow-2xl"
    >
      {/* Full-bleed two-tone: the entire left section is rust (~30%), the right
          white. No container/gap so each color fills its column edge-to-edge.
          The grid fills the viewport height below the header so the panel runs
          all the way to the bottom. */}
      <div className="grid h-full" style={{ gridTemplateColumns: "30% 70%" }}>
        {/* Left: the whole orange section — scrolls internally when tall.
            data-lenis-prevent so the inner list scrolls (Lenis otherwise
            hijacks the wheel for the page). */}
        <div
          data-lenis-prevent
          className="overflow-y-auto bg-rust py-9 pl-[clamp(1.25rem,4vw,3rem)] pr-7"
        >
          <p className="eyebrow text-sm text-white/70 mb-3">Primary focus</p>
          <ul className="space-y-0.5">{frontIndustries.map(renderItem)}</ul>

          <div className="mt-5 border-t border-white/25 pt-5">
            <p className="eyebrow text-sm text-white/70 mb-3">
              More industries
            </p>
            <ul className="space-y-0.5">{moreIndustries.map(renderItem)}</ul>
          </div>
        </div>

        {/* Right: white preview — illustration aligned with the title + subtitle */}
        <div className="overflow-y-auto py-9 pl-10 pr-[clamp(1.25rem,4vw,3rem)]">
          <div className="flex items-center justify-between gap-8">
            <div className="max-w-sm">
              <p className="eyebrow text-rust text-sm mb-3">
                {active.tier === "front" ? "Primary focus" : "Industries we serve"}
              </p>
              <h3 className="font-heading text-3xl lg:text-4xl leading-tight text-ink">
                {active.name}
              </h3>
              <p className="mt-3 text-ink/70">{active.valueProp}</p>
            </div>
            {hasArt && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/branding/illustrations/${active.slug}.png?v=${ART_VERSION}`}
                alt=""
                aria-hidden
                className="h-44 w-64 shrink-0 object-contain lg:h-52 lg:w-80"
              />
            )}
          </div>

          <p className="eyebrow text-rust text-xs mt-8 mb-3">Core coverage</p>
          <div className="grid grid-cols-2 gap-3">
            {active.core.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-ink/10 bg-sand/30 px-4 py-3 text-sm text-ink/90"
              >
                {c.name}
              </div>
            ))}
          </div>

          <Link
            href={active.href}
            onClick={onNavigate}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-rust transition-colors hover:text-ink"
          >
            Explore {active.shortName} &middot; {active.specialty.length} specialty
            lines
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
