"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { coverageGroups } from "@/data/coverages";

type CoverageMenuProps = {
  open: boolean;
  onNavigate: () => void;
  id: string;
};

// One icon per coverage tier (keyed by group id).
const TIER_ICONS: Record<string, ReactNode> = {
  core: <path d="M12 3 4 6v6c0 4.2 3.5 6.8 8 8 4.5-1.2 8-3.8 8-8V6l-8-3Z" />,
  "management-professional": (
    <>
      <rect x="4" y="8" width="16" height="12" rx="1.5" />
      <path d="M9 8V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2" />
    </>
  ),
  "property-specialty": (
    <>
      <path d="M3 21h18" />
      <path d="M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16" />
      <path d="M14 21V9h4v12" />
    </>
  ),
  "industry-specific": (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </>
  ),
};

/**
 * Desktop "Coverage" dropdown — one card per coverage tier (Core ·
 * Management & Professional · Property & Specialty · Industry-Specific), each
 * led by an icon, with its lines listed beneath. Every line jumps to its
 * section on /solutions.
 */
export default function CoverageMenu({
  open,
  onNavigate,
  id,
}: CoverageMenuProps) {
  return (
    <div
      id={id}
      role="region"
      aria-label="Coverage"
      aria-hidden={!open}
      // Inline open/close (Tailwind v4 doesn't reliably apply opacity-100 /
      // translate-y-0 here — it leaves the panel stuck invisible).
      style={{
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 250ms ease, visibility 250ms",
      }}
      className="absolute left-0 right-0 top-full origin-top border-t border-ink/10 bg-white text-ink shadow-2xl"
    >
      {/* Opaque base (white) + light-beige tint to match the brand sections */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-sand/40" />
      <div className="relative container-page py-10">
        <div className="mb-7 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-rust text-sm">Lines of coverage</p>
            <h3 className="mt-1 max-w-md font-heading text-2xl font-bold text-ink">
              Coverage we structure for established businesses.
            </h3>
          </div>
          <Link
            href="/solutions"
            onClick={onNavigate}
            className="hidden shrink-0 items-center gap-2 text-sm font-medium text-rust transition-colors hover:text-ink sm:inline-flex"
          >
            View all coverage
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {coverageGroups.map((group) => (
            <div
              key={group.id}
              className="lg:border-l lg:border-ink/10 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <Link
                href={`/solutions#${group.id}`}
                onClick={onNavigate}
                className="group/tier flex items-center gap-2.5 text-rust"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {TIER_ICONS[group.id]}
                </svg>
                <span className="font-heading text-[0.95rem] font-semibold leading-tight text-ink transition-colors group-hover/tier:text-rust">
                  {group.heading}
                </span>
              </Link>

              <ul className="mt-4 space-y-2.5">
                {group.lines.map((c) => (
                  <li key={c.name}>
                    <Link
                      href={`/solutions#${group.id}`}
                      onClick={onNavigate}
                      className="block text-sm leading-snug text-ink/70 transition-colors hover:text-rust"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
