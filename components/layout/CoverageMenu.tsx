"use client";

import Link from "next/link";
import { coverageGroups } from "@/data/coverages";

type CoverageMenuProps = {
  open: boolean;
  onNavigate: () => void;
  id: string;
};

/**
 * Desktop "Coverage" dropdown — a full-width panel with one column per coverage
 * tier (Core · Management & Professional · Property & Specialty ·
 * Industry-Specific). Each line jumps to its section on /solutions.
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
      className={[
        "absolute left-0 right-0 top-full bg-ink text-sand shadow-2xl",
        "border-t border-sand/10",
        "transition-all duration-300 ease-out origin-top",
        open
          ? "visible opacity-100 translate-y-0"
          : "invisible opacity-0 -translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      <div className="container-page py-10">
        <div className="mb-7 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-rust text-sm">Lines of coverage</p>
            <h3 className="mt-1 font-heading text-2xl text-white max-w-md">
              Coverage we structure for established businesses.
            </h3>
          </div>
          <Link
            href="/solutions"
            onClick={onNavigate}
            className="hidden shrink-0 items-center gap-2 text-sm font-medium text-rust transition-colors hover:text-white sm:inline-flex"
          >
            View all coverage
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {coverageGroups.map((group) => (
            <div key={group.id}>
              <Link
                href={`/solutions#${group.id}`}
                onClick={onNavigate}
                className="block text-sm font-medium text-white hover:text-rust transition-colors"
              >
                {group.heading}
              </Link>
              <ul className="mt-3 space-y-2 border-t border-sand/10 pt-3">
                {group.lines.map((c) => (
                  <li key={c.name}>
                    <Link
                      href={`/solutions#${group.id}`}
                      onClick={onNavigate}
                      className="group flex items-start gap-2 text-sm text-sand/70 transition-colors hover:text-white"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="mt-1 h-3 w-3 shrink-0 text-rust"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="m4 10.5 4 4 8-9" />
                      </svg>
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
