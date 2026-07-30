"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Accessible searchable select (combobox) used by the contact form for the
 * State and Industry fields.
 *
 * The options panel renders in normal document flow (not absolutely
 * positioned) so it can never be clipped by the contact modal's scroll
 * container — it simply expands the scrollable area and the modal scrolls to
 * it. Supports type-to-filter, arrow-key navigation, Enter to select, Escape /
 * click-outside to close.
 */

export type SelectOption = { value: string; label: string };

type Props = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  invalid?: boolean;
};

export default function SearchSelect({
  id,
  value,
  onChange,
  options,
  placeholder = "Select…",
  searchPlaceholder = "Type to search…",
  invalid = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  // Reset the highlighted row whenever the filter changes.
  useEffect(() => setActive(0), [query]);

  // Focus the search box on open; clear the query on close.
  useEffect(() => {
    if (open) inputRef.current?.focus();
    else setQuery("");
  }, [open]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Keep the active row scrolled into view.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[active]) choose(filtered[active].value);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex h-12 w-full items-center justify-between rounded-lg border bg-white px-3.5 text-left text-[0.95rem] transition focus:outline-none focus:ring-2 focus:ring-rust/25 ${
          invalid
            ? "border-rust/70 ring-2 ring-rust/15"
            : "border-ink/15 focus:border-rust"
        } ${selected ? "text-ink" : "text-ink/35"}`}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <svg
          viewBox="0 0 20 20"
          className={`ml-2 h-4 w-4 shrink-0 text-ink/40 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </button>

      {open && (
        <div className="relative z-20 mt-1.5 overflow-hidden rounded-lg border border-ink/15 bg-white shadow-lg">
          <div className="border-b border-ink/10 p-2">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={searchPlaceholder}
              className="h-9 w-full rounded-md border border-ink/15 px-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-rust focus:outline-none"
            />
          </div>
          <ul
            ref={listRef}
            role="listbox"
            className="max-h-56 overflow-y-auto overscroll-contain py-1"
          >
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-ink/45">No matches</li>
            )}
            {filtered.map((o, i) => (
              <li
                key={o.value}
                role="option"
                aria-selected={o.value === value}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(o.value);
                }}
                className={`cursor-pointer px-3 py-2 text-sm ${
                  i === active ? "bg-rust/10 text-ink" : "text-ink/80"
                } ${o.value === value ? "font-semibold" : ""}`}
              >
                {o.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
