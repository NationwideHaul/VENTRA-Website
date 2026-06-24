"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import CTAButton from "@/components/ui/CTAButton";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import { mainNav, contact } from "@/data/site";

const MEGA_ID = "industries-mega-menu";
const MOBILE_ID = "mobile-menu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Solid bar after a little scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change.
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Escape closes menus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  // Hover-intent open/close for the mega-menu (with a small close delay so
  // moving the cursor into the panel doesn't dismiss it).
  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <>
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 h-[var(--header-h)]",
        "bg-ink/95 backdrop-blur-md transition-colors duration-300",
        scrolled || megaOpen || mobileOpen
          ? "border-b border-white/10"
          : "border-b border-transparent",
      ].join(" ")}
      onMouseLeave={scheduleCloseMega}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
        {/* Left group: logo with the nav links pinned right beside it */}
        <div className="flex items-center gap-9">
          <Logo variant="sand" height={58} priority />

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Primary"
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={megaOpen}
              aria-controls={MEGA_ID}
              onMouseEnter={openMega}
              onFocus={openMega}
              onClick={() => setMegaOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.95rem] font-medium text-sand/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              Coverage
              <svg
                aria-hidden
                viewBox="0 0 12 12"
                className={`h-3 w-3 text-sand/50 transition-transform duration-200 ${
                  megaOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 4.5 6 7.5 9 4.5" />
              </svg>
            </button>

            {mainNav
              .filter((item) => !item.hasMegaMenu)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={scheduleCloseMega}
                  className="rounded-lg px-3 py-2 text-[0.95rem] font-medium text-sand/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
          </nav>
        </div>

        {/* Right: CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          {/* Call us — [CONFIRM] CallRail number */}
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="hidden lg:inline-flex items-center gap-2 text-[0.95rem] font-medium text-sand/90 hover:text-white transition-colors"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4 text-rust"
              fill="currentColor"
              aria-hidden
            >
              <path d="M2 4.5C2 3.67 2.67 3 3.5 3H6c.46 0 .87.31.98.76l.74 2.96a1 1 0 0 1-.27.96l-1.2 1.2a11.5 11.5 0 0 0 4.87 4.87l1.2-1.2a1 1 0 0 1 .96-.27l2.96.74c.45.11.76.52.76.98V16.5c0 .83-.67 1.5-1.5 1.5C8.6 18 2 11.4 2 4.5Z" />
            </svg>
            {contact.phone}
          </a>

          <span className="hidden lg:block">
            <CTAButton size="sm" />
          </span>

          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center text-sand"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={MOBILE_ID}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition-transform duration-300 ${
                  mobileOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-6 bg-current transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-0.5 w-6 bg-current transition-transform duration-300 ${
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Desktop mega-menu panel */}
      <div onMouseEnter={openMega} className="hidden lg:block">
        <MegaMenu
          id={MEGA_ID}
          open={megaOpen}
          onNavigate={() => setMegaOpen(false)}
        />
      </div>

    </header>

      {/* Mobile accordion menu — rendered as a sibling of <header> so its
          fixed positioning is relative to the viewport. (A backdrop-filter on
          the header would otherwise make it a containing block and collapse
          the panel's height.) */}
      <MobileMenu
        id={MOBILE_ID}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
