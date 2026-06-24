"use client";

import { useState } from "react";
import Link from "next/link";
import { specialties, industriesWeServe } from "@/data/industries";
import { mainNav, contact } from "@/data/site";
import CTAButton from "@/components/ui/CTAButton";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  id: string;
};

/**
 * Mobile navigation: a full-height panel with an accordion for Industries
 * (specialties expandable, then the breadth list), per brief section 6.
 */
export default function MobileMenu({ open, onClose, id }: MobileMenuProps) {
  const [industriesOpen, setIndustriesOpen] = useState(true);

  return (
    <div
      id={id}
      aria-hidden={!open}
      className={[
        "lg:hidden fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 bg-ink text-sand",
        "overflow-y-auto overscroll-contain",
        "transition-[opacity,transform] duration-300 ease-out",
        open
          ? "visible opacity-100 translate-y-0"
          : "invisible opacity-0 -translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      <nav className="container-page py-8" aria-label="Mobile">
        {/* Industries accordion */}
        <div className="border-b border-sand/10">
          <button
            type="button"
            onClick={() => setIndustriesOpen((v) => !v)}
            aria-expanded={industriesOpen}
            className="flex w-full items-center justify-between py-4 font-heading text-xl"
          >
            Coverage
            <span
              aria-hidden
              className={`text-rust transition-transform duration-200 ${
                industriesOpen ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </button>

          {industriesOpen && (
            <div className="pb-5">
              <p className="eyebrow text-rust text-sm mb-2">What we focus on</p>
              <ul className="space-y-1 mb-5">
                {specialties.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={s.href}
                      onClick={onClose}
                      className="block py-2 text-sand/90 hover:text-white"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="text-sand/60 text-sm mb-2">Industries we serve</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {industriesWeServe.map((label) => (
                  <li key={label}>
                    <Link
                      href="/industries"
                      onClick={onClose}
                      className="text-sm text-sand/70 hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Remaining top-level links (Solutions, About) */}
        {mainNav
          .filter((item) => !item.hasMegaMenu)
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block border-b border-sand/10 py-4 font-heading text-xl"
            >
              {item.label}
            </Link>
          ))}

        <div className="pt-8">
          <CTAButton size="lg" className="w-full" />
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            onClick={onClose}
            className="mt-4 flex items-center justify-center gap-2 text-sand/90 hover:text-white"
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
        </div>
      </nav>
    </div>
  );
}
