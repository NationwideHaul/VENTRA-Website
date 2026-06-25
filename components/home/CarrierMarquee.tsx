/**
 * Carrier logo marquee — an infinite, edge-faded horizontal scroll of the
 * carriers Ventra places with, rendered as uniform grayscale logos.
 *
 * The source art shipped with baked-in white backgrounds, mismatched colors,
 * and lots of internal padding (so logos read as different sizes). They were
 * pre-processed into trimmed, transparent PNGs; here `grayscale(1)` + reduced
 * opacity makes them a cohesive muted set and one shared height keeps them a
 * consistent size — no per-logo cards or white boxes.
 *
 * The set renders twice and the track translates -50% for a seamless loop; the
 * duplicate is aria-hidden, and the global reduced-motion rule freezes it.
 */

type Carrier = { name: string; src: string };

// `?v=2` cache-busts: the originals were overwritten with background-removed
// versions at the same path, so the browser would otherwise serve the stale
// white-background files (which read as solid white boxes).
const CARRIERS: Carrier[] = [
  { name: "Travelers", src: "/carriers/travelers.png?v=2" },
  { name: "The Hartford", src: "/carriers/hartford.png?v=2" },
  { name: "Chubb", src: "/carriers/chubb.png?v=2" },
  { name: "AIG", src: "/carriers/aig.svg?v=2" },
  { name: "Nationwide", src: "/carriers/nationwide.png?v=2" },
  { name: "Markel", src: "/carriers/markel.png?v=2" },
  { name: "Progressive", src: "/carriers/progressive.png?v=2" },
  { name: "GEICO", src: "/carriers/geico.png?v=2" },
  { name: "Prime Insurance", src: "/carriers/prime.png?v=2" },
];

function Logo({ carrier }: { carrier: Carrier }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={carrier.src}
      alt={carrier.name}
      className="mr-14 h-7 w-auto shrink-0 object-contain opacity-70 [filter:grayscale(1)] sm:mr-20 sm:h-8"
    />
  );
}

export default function CarrierMarquee() {
  return (
    <div
      className="group relative w-full overflow-hidden"
      aria-label="Carriers we place coverage with"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <div className="flex w-max items-center animate-[carrier-marquee_45s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {/* First pass — announced to screen readers. */}
        {CARRIERS.map((carrier) => (
          <Logo key={carrier.name} carrier={carrier} />
        ))}
        {/* Second pass — duplicate for the seamless -50% loop; hidden from SR. */}
        <div className="flex shrink-0 items-center" aria-hidden>
          {CARRIERS.map((carrier) => (
            <Logo key={`dup-${carrier.name}`} carrier={carrier} />
          ))}
        </div>
      </div>
    </div>
  );
}
