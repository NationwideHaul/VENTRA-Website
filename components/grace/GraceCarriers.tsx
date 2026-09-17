/**
 * Static carrier logo wall for Grace's page — every logo visible at once (no
 * marquee / carousel), rendered as a cohesive grayscale set. Mirrors the
 * per-logo sizing tweaks from the homepage CarrierMarquee so no single mark
 * reads too large or small. Plain <img> (like the marquee) sidesteps the local
 * image optimizer; these are tiny pre-trimmed PNGs.
 */

type Carrier = { name: string; src: string; className?: string };

const DEFAULT_SIZE = "h-7 sm:h-8";

// `?v=2` matches the background-removed versions used site-wide.
const CARRIERS: Carrier[] = [
  { name: "Travelers", src: "/carriers/travelers.png?v=2" },
  { name: "The Hartford", src: "/carriers/hartford.png?v=2" },
  { name: "Chubb", src: "/carriers/chubb.png?v=2" },
  { name: "AIG", src: "/carriers/aig.svg?v=2" },
  { name: "Nationwide", src: "/carriers/nationwide.png?v=2", className: "h-10 sm:h-12" },
  { name: "Markel", src: "/carriers/markel.png?v=2" },
  { name: "Progressive", src: "/carriers/progressive.png?v=2", className: "h-5 sm:h-6" },
  { name: "GEICO", src: "/carriers/geico.png?v=2" },
  { name: "Prime Insurance", src: "/carriers/prime.png?v=2" },
];

export default function GraceCarriers() {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14"
      aria-label="Carriers we place coverage with"
    >
      {CARRIERS.map((c) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={c.name}
          src={c.src}
          alt={c.name}
          className={`w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 ${
            c.className ?? DEFAULT_SIZE
          }`}
        />
      ))}
    </div>
  );
}
