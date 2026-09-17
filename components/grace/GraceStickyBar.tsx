"use client";

import { useEffect, useRef, useState } from "react";
import { GRACE_FORMS_ID, requestGraceTab } from "@/components/grace/formBus";

/**
 * Sticky bottom action bar for mobile. Hidden until the visitor scrolls past
 * the hero (tracked via an IntersectionObserver on a sentinel the page drops at
 * the end of the hero), then slides up with the two primary CTAs. Desktop never
 * shows it. Sits above the iOS home indicator via the safe-area inset.
 */

export const GRACE_HERO_SENTINEL_ID = "grace-hero-sentinel";

const btn =
  "inline-flex h-12 flex-1 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors";

export default function GraceStickyBar() {
  const [shown, setShown] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const sentinel = document.getElementById(GRACE_HERO_SENTINEL_ID);
    if (!sentinel || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Visible only once the hero (and its sentinel) is scrolled up and out.
        const past =
          !entry.isIntersecting && entry.boundingClientRect.top < 0;
        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => setShown(past));
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => {
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-white/95 backdrop-blur-sm transition-transform duration-300 ease-out sm:hidden ${
        shown ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Anchors (not buttons) so the global Lenis handler owns the smooth-scroll
          — and reduced-motion is respected — exactly like the hero CTAs. */}
      <div className="flex items-center gap-2 px-4 py-3">
        <a
          href={`#${GRACE_FORMS_ID}`}
          tabIndex={shown ? 0 : -1}
          onClick={() => requestGraceTab("review")}
          className={`${btn} bg-rust text-white hover:bg-ink`}
        >
          Free Policy Review
        </a>
        <a
          href={`#${GRACE_FORMS_ID}`}
          tabIndex={shown ? 0 : -1}
          onClick={() => requestGraceTab("contact")}
          className={`${btn} border border-ink/20 text-ink hover:border-ink/40`}
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
