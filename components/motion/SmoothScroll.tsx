"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Global smooth-scroll provider built on Lenis.
 *
 * - Initializes Lenis and drives it with a single requestAnimationFrame loop.
 * - Fully disabled when the user prefers reduced motion (we leave native
 *   scrolling in place and never touch the scroll position).
 * - Reacts live to changes in the reduced-motion setting.
 * - Handles `#anchor` targets itself: Lenis swallows the browser's native hash
 *   jump, so we scroll to the target (offset for the fixed header) on same-page
 *   hash changes and after cross-page navigation to a hash.
 *
 * Renders nothing; it only wires behavior onto the document.
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;

    const start = () => {
      if (lenisRef.current) return;
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const stop = () => {
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
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

  // Scroll to the URL hash (offset for the fixed header) on same-page hash
  // changes and after navigation lands on a new page with a hash.
  useEffect(() => {
    const headerOffset = () => {
      const root = document.documentElement;
      const rem = parseFloat(getComputedStyle(root).fontSize) || 16;
      const raw = getComputedStyle(root).getPropertyValue("--header-h").trim();
      const px = raw.endsWith("rem") ? parseFloat(raw) * rem : parseFloat(raw);
      return (Number.isNaN(px) ? 92 : px) + 24;
    };

    const scrollToId = (id: string) => {
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      const lenis = lenisRef.current;
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -headerOffset() });
      else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
    };

    const scrollToHash = () => scrollToId(window.location.hash);

    // Intercept same-page `#anchor` clicks (e.g. the /solutions jump nav). Lenis
    // owns the scroll position, so a native hash jump gets reverted — we drive
    // it through Lenis instead and update the URL without a native jump.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as Element | null;
      const anchor = target?.closest('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      if (!document.querySelector(url.hash)) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      scrollToId(url.hash);
    };

    // Defer so the target section exists after the route renders.
    const t = window.setTimeout(scrollToHash, 100);
    window.addEventListener("hashchange", scrollToHash);
    document.addEventListener("click", onClick);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", scrollToHash);
      document.removeEventListener("click", onClick);
    };
  }, [pathname]);

  return null;
}
