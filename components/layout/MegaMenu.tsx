"use client";

import { useState } from "react";
import Link from "next/link";
import { frontIndustries, moreIndustries } from "@/data/industries";

type MegaMenuProps = {
  open: boolean;
  /** Called when a link inside the menu is activated (so the header can close it). */
  onNavigate: () => void;
  id: string;
};

/**
 * Desktop two-panel Industries mega-menu.
 *
 * Left panel: the 7 primary-focus industries (featured, hover swaps the right
 * panel) above a lighter "More industries" breadth list. Right panel: the
 * active industry's name, one-line value prop, and its Core coverage tier.
 */
export default function MegaMenu({ open, onNavigate, id }: MegaMenuProps) {
  const [activeSlug, setActiveSlug] = useState(frontIndustries[0].slug);
  const active =
    frontIndustries.find((s) => s.slug === activeSlug) ?? frontIndustries[0];

  return (
    <div
      id={id}
      role="region"
      aria-label="Industries"
      aria-hidden={!open}
      className={[
        "absolute left-0 right-0 top-full bg-ink text-sand shadow-2xl",
        "border-t border-sand/10",
        "transition-all duration-300 ease-out origin-top",
        open
          ? "visible opacity-100 translate-y-0"
          : "invisible opacity-0 -translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      <div className="container-page grid grid-cols-12 gap-10 py-10">
        {/* Left: primary focus + breadth */}
        <div className="col-span-5">
          <p className="eyebrow text-rust text-sm mb-4">Primary focus</p>
          <ul className="space-y-1">
            {frontIndustries.map((s) => {
              const isActive = s.slug === active.slug;
              return (
                <li key={s.slug}>
                  <Link
                    href={s.href}
                    onMouseEnter={() => setActiveSlug(s.slug)}
                    onFocus={() => setActiveSlug(s.slug)}
                    onClick={onNavigate}
                    className={[
                      "group flex items-center justify-between rounded-lg px-3 py-2 -mx-3",
                      "transition-colors duration-200",
                      isActive ? "bg-sand/10 text-white" : "hover:bg-sand/5",
                    ].join(" ")}
                  >
                    <span className="font-heading text-[1.05rem]">{s.name}</span>
                    <span
                      aria-hidden
                      className={[
                        "text-rust transition-transform duration-200",
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0",
                      ].join(" ")}
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-7 pt-6 border-t border-sand/10">
            <p className="text-sand/60 text-sm mb-3">More industries</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5">
              {moreIndustries.map((i) => (
                <li key={i.slug}>
                  <Link
                    href={i.href}
                    onClick={onNavigate}
                    className="text-sm text-sand/70 hover:text-white transition-colors"
                  >
                    {i.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: active industry detail */}
        <div className="col-span-7 border-l border-sand/10 pl-10">
          <h3 className="font-heading text-2xl text-white">{active.name}</h3>
          <p className="mt-2 text-sand/80 max-w-md">{active.valueProp}</p>

          <p className="eyebrow text-rust text-xs mt-6 mb-3">Core coverage</p>
          <div className="grid grid-cols-2 gap-3">
            {active.core.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-sand/10 bg-sand/[0.03] px-4 py-3 text-sm text-sand/90"
              >
                {c.name}
              </div>
            ))}
          </div>

          <Link
            href={active.href}
            onClick={onNavigate}
            className="mt-6 inline-flex items-center gap-2 text-rust hover:text-white transition-colors text-sm font-medium"
          >
            Explore {active.shortName} &middot; {active.specialty.length} specialty
            lines
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
