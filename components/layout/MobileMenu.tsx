"use client";

import { useState } from "react";
import Link from "next/link";
import { frontIndustries, moreIndustries } from "@/data/industries";
import { coverageGroups } from "@/data/coverages";
import { mainNav, contact } from "@/data/site";
import CTAButton from "@/components/ui/CTAButton";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  id: string;
};

function AccordionToggle({
  label,
  isOpen,
  onToggle,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between py-4 font-heading text-xl"
    >
      {label}
      <span
        aria-hidden
        className={`text-rust transition-transform duration-200 ${
          isOpen ? "rotate-45" : ""
        }`}
      >
        +
      </span>
    </button>
  );
}

/**
 * Mobile navigation: full-height panel with accordions for Industries and
 * Coverage, then the remaining top-level links.
 */
export default function MobileMenu({ open, onClose, id }: MobileMenuProps) {
  const [industriesOpen, setIndustriesOpen] = useState(true);
  const [coverageOpen, setCoverageOpen] = useState(false);

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
          <AccordionToggle
            label="Industries"
            isOpen={industriesOpen}
            onToggle={() => setIndustriesOpen((v) => !v)}
          />
          {industriesOpen && (
            <div className="pb-5">
              <p className="eyebrow text-rust text-sm mb-2">Primary focus</p>
              <ul className="space-y-1 mb-5">
                {frontIndustries.map((s) => (
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

              <p className="text-sand/60 text-sm mb-2">More industries</p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {moreIndustries.map((i) => (
                  <li key={i.slug}>
                    <Link
                      href={i.href}
                      onClick={onClose}
                      className="block py-1 text-sm text-sand/70 hover:text-white"
                    >
                      {i.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Coverage accordion */}
        <div className="border-b border-sand/10">
          <AccordionToggle
            label="Coverage"
            isOpen={coverageOpen}
            onToggle={() => setCoverageOpen((v) => !v)}
          />
          {coverageOpen && (
            <div className="pb-5 space-y-5">
              {coverageGroups.map((group) => (
                <div key={group.id}>
                  <Link
                    href={`/solutions#${group.id}`}
                    onClick={onClose}
                    className="eyebrow text-rust text-sm mb-2 block"
                  >
                    {group.heading}
                  </Link>
                  <ul className="space-y-0.5">
                    {group.lines.map((c) => (
                      <li key={c.name}>
                        <Link
                          href={`/solutions#${group.id}`}
                          onClick={onClose}
                          className="block py-1.5 text-sm text-sand/80 hover:text-white"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Remaining top-level links (Solutions, About) */}
        {mainNav
          .filter((item) => !item.menu)
          .map((item) => (
            <Link
              key={item.label}
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
