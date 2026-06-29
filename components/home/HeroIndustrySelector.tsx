import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { frontIndustries } from "@/data/industries";

// The home grid shows the 7 primary-focus industries plus a "View more" tile.
const homeIndustries = frontIndustries;

/**
 * Hero industry selector.
 *
 * A tile per broad industry plus a "More industries" tile. Selecting an
 * industry takes the visitor to the contact page with that industry
 * pre-selected; the "More industries" tile goes to the /industries page.
 * The illustration breaks out above the top edge of each tile.
 */

// Change to "svg" if you drop SVG art into /public/branding/illustrations.
const ILLUSTRATION_EXT = "png";

// Slugs that have a real illustration in /public/branding/illustrations.
// Others fall back to the branded placeholder until art is provided.
// All illustrations are pre-normalized to a uniform 3:2 canvas (drawing
// trimmed, scaled, and centered) so they read at a consistent size.
// `?v=` cache-busts after re-exporting over the same filenames.
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

const TILE_BASE =
  "group relative flex w-full flex-col items-center rounded-2xl bg-white px-3 pb-5 pt-16 text-center transition-all duration-200";
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

/** Industry illustration, or the branded placeholder when art isn't ready. */
function TileArt({ slug }: { slug: string }) {
  if (!ILLUSTRATED.has(slug)) {
    return (
      <span className="block h-24 w-36">
        <PlaceholderArt />
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/branding/illustrations/${slug}.${ILLUSTRATION_EXT}?v=${ART_VERSION}`}
      alt=""
      aria-hidden
      className="h-24 w-36 object-contain"
    />
  );
}

/** "See more" art for the More industries tile — the magnifying-glass
 *  illustration, normalized to the same canvas as the industry tiles. */
function MoreArt() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/branding/illustrations/more-industries.${ILLUSTRATION_EXT}?v=${ART_VERSION}`}
      alt=""
      aria-hidden
      className="h-24 w-36 object-contain"
    />
  );
}

export default function HeroIndustrySelector() {
  return (
    <div className="w-full">
      <Reveal delay={100}>
        <p className="eyebrow text-rust text-center">Explore by industry</p>
      </Reveal>

      <div
        aria-label="Explore by industry"
        className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-16 pt-12 pb-6 sm:grid-cols-4"
      >
        {homeIndustries.map((t, i) => (
          <Reveal key={t.slug} delay={140 + i * 70}>
            <Link
              href={`/contact?industry=${t.slug}`}
              className={`${TILE_BASE} ${TILE_IDLE}`}
            >
              <span className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2">
                <TileArt slug={t.slug} />
              </span>
              <span className="font-heading text-sm font-medium leading-snug text-ink">
                {t.name}
              </span>
            </Link>
          </Reveal>
        ))}

        {/* More industries — links to the Industries page */}
        <Reveal delay={140 + homeIndustries.length * 70}>
          <Link href="/industries" className={`${TILE_BASE} ${TILE_IDLE}`}>
            <span className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2">
              <MoreArt />
            </span>
            <span className="font-heading text-sm font-bold leading-snug text-ink">
              View more industries
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
