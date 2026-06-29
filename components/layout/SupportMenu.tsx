"use client";

import Link from "next/link";

type SupportMenuProps = {
  open: boolean;
  onNavigate: () => void;
  id: string;
};

const ITEMS = [
  {
    href: "/faq",
    title: "FAQs",
    desc: "Answers to common questions about working with Ventra.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3" />
        <path d="M12 17h.01" />
      </>
    ),
  },
  {
    href: "/report-a-claim",
    title: "Report a claim",
    desc: "Start the claims process and reach your dedicated advocate.",
    icon: (
      <>
        <path d="M12 3 3 7v5c0 4.5 3.5 7.5 9 9 5.5-1.5 9-4.5 9-9V7l-9-4Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

/**
 * Desktop "Support" dropdown — a compact full-width panel with two cards:
 * FAQs and Report a claim. Mirrors the Coverage/Industries panel behavior so
 * the header's hover + click-to-pin logic applies unchanged.
 */
export default function SupportMenu({ open, onNavigate, id }: SupportMenuProps) {
  return (
    <div
      id={id}
      role="region"
      aria-label="Support"
      aria-hidden={!open}
      // Inline open/close (Tailwind v4 doesn't reliably apply opacity-100 /
      // translate-y-0 here — it leaves the panel stuck invisible).
      style={{
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 250ms ease, visibility 250ms",
      }}
      className="absolute left-0 right-0 top-full origin-top border-t border-sand/10 bg-ink text-sand shadow-2xl"
    >
      <div className="container-page py-10">
        <p className="eyebrow text-rust text-sm">Support</p>
        <h3 className="mt-1 max-w-md font-heading text-2xl text-white">
          We&rsquo;re here when you need us.
        </h3>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
          {ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="group flex items-start gap-4 rounded-2xl border border-sand/10 bg-sand/[0.03] p-5 transition-colors hover:border-rust/50 hover:bg-sand/[0.06]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rust/15 text-rust">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {item.icon}
                </svg>
              </span>
              <span>
                <span className="flex items-center gap-1.5 font-heading text-white">
                  {item.title}
                  <span
                    aria-hidden
                    className="text-rust transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    &rarr;
                  </span>
                </span>
                <span className="mt-1 block text-sm text-sand/70">
                  {item.desc}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
