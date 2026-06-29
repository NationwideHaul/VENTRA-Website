"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import CTAButton from "@/components/ui/CTAButton";
import MegaMenu from "./MegaMenu";
import CoverageMenu from "./CoverageMenu";
import MobileMenu from "./MobileMenu";
import { mainNav, contact } from "@/data/site";

type MenuName = "industries" | "coverage";

const PANEL_IDS: Record<MenuName, string> = {
  industries: "industries-mega-menu",
  coverage: "coverage-menu",
};
const MOBILE_ID = "mobile-menu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  // When a menu is opened by click it is "pinned" — it stays open like a page
  // and ignores mouse-leave; only a click elsewhere, the toggle, Escape, or a
  // route change closes it.
  const [pinned, setPinned] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
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
    setOpenMenu(null);
    setPinned(false);
    setMobileOpen(false);
  }, [pathname]);

  // Escape closes menus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setPinned(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // A click outside the header closes a pinned menu.
  useEffect(() => {
    if (!pinned) return;
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setPinned(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [pinned]);

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  // Hover-intent open/close (small close delay so moving the cursor into the
  // panel doesn't dismiss it).
  const open = (name: MenuName) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    // Hovering a different menu than the pinned one reverts to hover behavior.
    if (openMenu !== name) setPinned(false);
    setOpenMenu(name);
  };
  const scheduleClose = () => {
    // A pinned (click-opened) menu stays open until dismissed explicitly.
    if (pinned) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };
  // Click toggles the menu and pins it open like a page.
  const togglePinned = (name: MenuName) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openMenu === name && pinned) {
      setOpenMenu(null);
      setPinned(false);
    } else {
      setOpenMenu(name);
      setPinned(true);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={[
          "fixed inset-x-0 top-0 z-50 h-[var(--header-h)]",
          "bg-ink/95 backdrop-blur-md transition-colors duration-300",
          scrolled || openMenu || mobileOpen
            ? "border-b border-white/10"
            : "border-b border-transparent",
        ].join(" ")}
        onMouseLeave={scheduleClose}
      >
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
          {/* Left group: logo with the nav links pinned right beside it */}
          <div className="flex items-center gap-9">
            <Logo variant="sand" height={58} priority />

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
              {mainNav.map((item) =>
                item.menu ? (
                  <button
                    key={item.label}
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.menu}
                    aria-controls={PANEL_IDS[item.menu]}
                    onMouseEnter={() => open(item.menu!)}
                    onFocus={() => open(item.menu!)}
                    onClick={() => togglePinned(item.menu!)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.95rem] font-medium text-sand/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {item.label}
                    <svg
                      aria-hidden
                      viewBox="0 0 12 12"
                      className={`h-3 w-3 text-sand/50 transition-transform duration-200 ${
                        openMenu === item.menu ? "rotate-180" : ""
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
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onMouseEnter={scheduleClose}
                    className="rounded-lg px-3 py-2 text-[0.95rem] font-medium text-sand/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ),
              )}
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

        {/* Desktop dropdown panels */}
        <div onMouseEnter={() => open("industries")} className="hidden lg:block">
          <MegaMenu
            id={PANEL_IDS.industries}
            open={openMenu === "industries"}
            onNavigate={() => setOpenMenu(null)}
          />
        </div>
        <div onMouseEnter={() => open("coverage")} className="hidden lg:block">
          <CoverageMenu
            id={PANEL_IDS.coverage}
            open={openMenu === "coverage"}
            onNavigate={() => setOpenMenu(null)}
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
