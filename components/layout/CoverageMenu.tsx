"use client";

import Link from "next/link";
import { coverageLines } from "@/data/coverages";

type CoverageMenuProps = {
  open: boolean;
  onNavigate: () => void;
  id: string;
};

/**
 * Desktop "Coverage" dropdown — a full-width panel listing every line of
 * coverage we structure. Matches the Industries mega-menu styling.
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
        <div className="mb-6 flex items-end justify-between gap-6">
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
            View all solutions
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coverageLines.map((c) => (
            <li key={c.name}>
              <Link
                href="/solutions"
                onClick={onNavigate}
                className="group flex items-start gap-3 rounded-xl border border-sand/10 bg-sand/[0.03] px-4 py-3 transition-colors hover:border-sand/20 hover:bg-sand/[0.07]"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-4 w-4 shrink-0 text-rust"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="m4 10.5 4 4 8-9" />
                </svg>
                <span>
                  <span className="block text-sm font-medium text-white">
                    {c.name}
                  </span>
                  <span className="block text-xs text-sand/60">{c.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
