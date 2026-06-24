"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Global smooth-scroll provider built on Lenis.
 *
 * - Initializes Lenis and drives it with a single requestAnimationFrame loop.
 * - Fully disabled when the user prefers reduced motion (we leave native
 *   scrolling in place and never touch the scroll position).
 * - Reacts live to changes in the reduced-motion setting.
 *
 * Renders nothing; it only wires behavior onto the document.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let rafId = 0;

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const stop = () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenis = null;
    };

    const sync = () => {
      if (mq.matches) stop();
      else start();
    };

    sync();
    mq.addEventListener("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return null;
}
