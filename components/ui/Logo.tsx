import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

import logoDark from "@/public/logos/ventra-logo-dark.png";
import logoWhite from "@/public/logos/ventra-logo-white.png";
import logoSand from "@/public/logos/ventra-logo-sand.png";
import submarkDark from "@/public/logos/ventra-submark-dark.png";
import submarkWhite from "@/public/logos/ventra-submark-white.png";
import submarkSand from "@/public/logos/ventra-submark-sand.png";

type Variant = "dark" | "white" | "sand";

const WORDMARK = { dark: logoDark, white: logoWhite, sand: logoSand };
const SUBMARK = { dark: submarkDark, white: submarkWhite, sand: submarkSand };

type LogoProps = {
  /** Color treatment. "dark" for light backgrounds, "white"/"sand" for dark. */
  variant?: Variant;
  /** Use the shield submark instead of the full wordmark. */
  submark?: boolean;
  /** Rendered height in px (width scales to the logo's aspect ratio). */
  height?: number;
  /** Wrap the logo in a link to home (default true). */
  link?: boolean;
  /** Eager-load (use for the header logo). */
  priority?: boolean;
  className?: string;
};

/**
 * Ventra logo. Source of truth for the mark is /branding (the brand guide
 * and Logos folder); the web-optimized PNGs live in /public/logos.
 */
export default function Logo({
  variant = "dark",
  submark = false,
  height = 36,
  link = true,
  priority = false,
  className = "",
}: LogoProps) {
  const src = submark ? SUBMARK[variant] : WORDMARK[variant];
  const ratio = src.width / src.height;
  const width = Math.round(height * ratio);

  const img = (
    <Image
      src={src}
      alt={`${site.name} logo`}
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={className}
    />
  );

  if (!link) return img;

  return (
    <Link href="/" aria-label={`${site.name} — home`} className="inline-flex">
      {img}
    </Link>
  );
}
