"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { PRIMARY_CTA } from "@/data/site";
import {
  useContactModal,
  type ContactPrefill,
} from "@/components/contact/contact-modal";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type CTAButtonProps = {
  /** Link target used as the no-JS fallback (defaults to /contact). */
  href?: string;
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Industry / state to pre-fill the Find an Agent form when opened. */
  prefill?: ContactPrefill;
};

const base =
  "inline-flex items-center justify-center font-medium rounded-full " +
  "transition-colors duration-200 ease-out whitespace-nowrap " +
  "focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  // Rust accent — the primary action.
  primary: "bg-rust text-white hover:bg-ink",
  // For use on dark surfaces.
  outline: "border border-sand/40 text-sand hover:bg-sand hover:text-ink",
  ghost: "text-ink hover:text-rust",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-13 px-8 text-base",
};

/**
 * Primary call to action ("Find an Agent"). Opens the global contact form
 * modal; falls back to navigating to /contact when JavaScript is unavailable.
 */
export default function CTAButton({
  href = PRIMARY_CTA.href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  prefill,
}: CTAButtonProps) {
  const modal = useContactModal();

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (modal) {
          e.preventDefault();
          modal.open(prefill);
        }
      }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
    >
      {children ?? PRIMARY_CTA.label}
    </Link>
  );
}
