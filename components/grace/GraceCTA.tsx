"use client";

import {
  GRACE_FORMS_ID,
  requestGraceTab,
  type GraceTab,
} from "@/components/grace/formBus";

/**
 * A single call-to-action anchor. Plain `#grace-forms` link so the global Lenis
 * handler owns the smooth-scroll (no preventDefault); pre-selects its form tab
 * via the event bus on click. Used by the nav bar, the hero pair, and anywhere
 * else a "jump to the form" button is needed.
 */
export default function GraceCTA({
  tab,
  children,
  className = "",
}: {
  tab: GraceTab;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={`#${GRACE_FORMS_ID}`}
      onClick={() => requestGraceTab(tab)}
      className={className}
    >
      {children}
    </a>
  );
}
