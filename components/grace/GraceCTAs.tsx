"use client";

import {
  GRACE_FORMS_ID,
  requestGraceTab,
  type GraceTab,
} from "@/components/grace/formBus";

/**
 * The two primary calls to action, side by side (stacked on mobile). Each is a
 * plain anchor to #grace-forms — the global Lenis handler smooth-scrolls it (no
 * preventDefault) — and pre-selects its form tab via the event bus on click.
 */

const base =
  "inline-flex h-13 items-center justify-center rounded-full px-7 text-base font-medium transition-colors duration-200 ease-out";

function CTA({
  tab,
  children,
  className,
}: {
  tab: GraceTab;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <a
      href={`#${GRACE_FORMS_ID}`}
      onClick={() => requestGraceTab(tab)}
      className={`${base} ${className}`}
    >
      {children}
    </a>
  );
}

export default function GraceCTAs() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <CTA tab="review" className="bg-rust text-white hover:bg-ink">
        Get Your Free Policy Review
      </CTA>
      <CTA
        tab="contact"
        className="border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/[0.03]"
      >
        Question? Contact Us
      </CTA>
    </div>
  );
}
