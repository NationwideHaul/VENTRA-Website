"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import { heroIndustries } from "@/data/industries";
import { PRIMARY_CTA } from "@/data/site";

// Real Estate is shown on the /industries page and contact form, but omitted
// from the home "Explore by industry" tiles.
const homeIndustries = heroIndustries.filter((i) => i.slug !== "real-estate");

/**
 * Hero industry selector (Progressive-style "select a property type").
 *
 * Selectable tiles for the broad industries, plus a "More industries" tile
 * that links to the /industries page. The illustration breaks out above the
 * top edge of each tile; the chosen industry is carried into the Find an
 * Agent form (and a query param on the no-JS fallback link).
 *
 * Collects a ZIP code (not an instant-quote field) — this is a consultative flow.
 */

// Change to "svg" if you drop SVG art into /public/branding/illustrations.
const ILLUSTRATION_EXT = "png";

const TILE_BASE =
  "group relative flex w-full flex-col items-center rounded-2xl bg-white px-3 pb-5 pt-14 text-center transition-all duration-200";
const TILE_IDLE =
  "border-[0.5px] border-ink/20 hover:-translate-y-1 hover:border-ink/30 hover:shadow-md";

/** Branded placeholder shown until a real illustration file exists. */
function PlaceholderArt() {
  return (
    <span className="flex h-full w-full items-center justify-center rounded-2xl border-[0.5px] border-ink/10 bg-gradient-to-br from-sand to-white">
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 text-ink/25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9" r="1.5" />
        <path d="m21 16-4.5-4.5L7 21" />
      </svg>
    </span>
  );
}

/** Real illustration with graceful fallback (no broken-image flash). */
function TileArt({ slug }: { slug: string }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const showImg = loaded && !errored;

  return (
    <span className="relative block h-20 w-20 drop-shadow-sm">
      {!showImg && <PlaceholderArt />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/branding/illustrations/${slug}.${ILLUSTRATION_EXT}`}
        alt=""
        aria-hidden
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={
          showImg ? "h-20 w-20 object-contain" : "absolute h-0 w-0 opacity-0"
        }
      />
    </span>
  );
}

/** Distinct "see more" art for the More industries tile. */
function MoreArt() {
  return (
    <span className="flex h-20 w-20 items-center justify-center rounded-2xl border-[0.5px] border-ink/10 bg-gradient-to-br from-sand to-white drop-shadow-sm">
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 text-rust"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <path d="M17 14.5v6M14 17.5h6" />
      </svg>
    </span>
  );
}

export default function HeroIndustrySelector() {
  const [selected, setSelected] = useState<string | null>(null);
  const [zip, setZip] = useState("");

  // No-JS fallback link (the button otherwise opens the form modal).
  const params = new URLSearchParams();
  if (selected) params.set("industry", selected);
  if (zip) params.set("zip", zip);
  const fallbackHref = params.toString()
    ? `${PRIMARY_CTA.href}?${params.toString()}`
    : PRIMARY_CTA.href;

  const tileCount = homeIndustries.length + 1; // industries + "More"

  return (
    <div className="w-full">
      <Reveal delay={100}>
        <p className="eyebrow text-rust text-center">Explore by industry</p>
      </Reveal>

      <div
        role="group"
        aria-label="Select your industry"
        className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-12 pt-14 sm:grid-cols-3 lg:grid-cols-5"
      >
        {homeIndustries.map((t, i) => {
          const isSelected = selected === t.slug;
          return (
            <Reveal key={t.slug} delay={140 + i * 70}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelected(t.slug)}
                className={`${TILE_BASE} ${
                  isSelected
                    ? "border-2 border-rust bg-rust/[0.04] shadow-md"
                    : TILE_IDLE
                }`}
              >
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2">
                  <TileArt slug={t.slug} />
                </span>
                <span className="font-heading text-sm font-medium leading-snug text-ink">
                  {t.label}
                </span>
              </button>
            </Reveal>
          );
        })}

        {/* More industries — links to the Industries page */}
        <Reveal delay={140 + homeIndustries.length * 70}>
          <Link href="/industries" className={`${TILE_BASE} ${TILE_IDLE}`}>
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2">
              <MoreArt />
            </span>
            <span className="font-heading text-sm font-medium leading-snug text-ink">
              View more industries
            </span>
          </Link>
        </Reveal>
      </div>

      {/* ZIP + CTA on one row */}
      <Reveal
        delay={140 + tileCount * 70}
        className="mt-12 flex flex-wrap items-end justify-center gap-4"
      >
        <div className="flex flex-col">
          <label
            htmlFor="hero-zip"
            className="mb-2 font-heading text-sm font-medium text-ink/70"
          >
            What&rsquo;s your ZIP code?
          </label>
          <input
            id="hero-zip"
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            pattern="[0-9]{5}"
            maxLength={5}
            placeholder="Enter ZIP code"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
            className="h-13 w-full min-w-[15rem] rounded-full border border-ink/15 bg-white px-5 text-center text-ink placeholder:text-ink/35 transition focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/30"
          />
        </div>
        <CTAButton
          href={fallbackHref}
          size="lg"
          prefill={{
            industry: selected ?? undefined,
            zip: zip || undefined,
          }}
        />
      </Reveal>
    </div>
  );
}
