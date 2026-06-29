"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { frontIndustries } from "@/data/industries";

/**
 * Footer "Industries" disclosure. Renders a single Industries button that
 * expands an inline dropdown of the focus industries on click. The links stay
 * in the DOM (the panel collapses via max-height, not removal) so crawlers and
 * no-JS users still reach them.
 *
 * The open/close animation uses inline styles on purpose: Tailwind's content
 * scanner does not reliably emit arbitrary utilities (e.g. grid-rows-[1fr])
 * from this file, so we drive the dynamic values directly instead.
 */
export default function FooterIndustries() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <nav className="md:col-span-3" aria-label="Industries">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex items-center gap-2 text-sm font-medium text-sand/80 transition-colors hover:text-white"
      >
        Industries
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 300ms ease",
          }}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* max-height collapse: reliable across browsers and not dependent on
          Tailwind-generated utilities. 24rem comfortably fits the 8 links. */}
      <div
        id={panelId}
        style={{
          overflow: "hidden",
          maxHeight: open ? "24rem" : 0,
          opacity: open ? 1 : 0,
          marginTop: open ? "1rem" : 0,
          transition:
            "max-height 300ms ease, opacity 300ms ease, margin-top 300ms ease",
        }}
      >
        <ul className="space-y-2.5">
          {frontIndustries.map((s) => (
            <li key={s.slug}>
              <Link
                href={s.href}
                tabIndex={open ? undefined : -1}
                className="text-sm text-sand/80 transition-colors hover:text-white"
              >
                {s.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/industries"
              tabIndex={open ? undefined : -1}
              className="text-sm font-medium text-rust transition-colors hover:text-white"
            >
              View all industries
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
