"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { frontIndustries } from "@/data/industries";

/**
 * Global "Start a Conversation" contact modal.
 *
 * Any CTA (header, hero, footer, pages) opens the same form via
 * useContactModal().open(prefill). The hero passes the chosen industry and
 * ZIP code so they arrive pre-filled. Submits to /api/contact and, on success,
 * routes to /thank-you. This is a consultative contact form — not a quote.
 */

export type ContactPrefill = {
  industry?: string; // specialty slug or "other"
  zip?: string; // 5-digit ZIP code
};

type ContactModalCtx = {
  open: (prefill?: ContactPrefill) => void;
  close: () => void;
  isOpen: boolean;
};

const Ctx = createContext<ContactModalCtx | null>(null);

export function useContactModal(): ContactModalCtx | null {
  return useContext(Ctx);
}

const INDUSTRY_OPTIONS = [
  ...frontIndustries.map((i) => ({ value: i.slug, label: i.name })),
  { value: "other", label: "Other / not sure yet" },
];

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<ContactPrefill>({});

  const open = useCallback((p?: ContactPrefill) => {
    setPrefill(p ?? {});
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <Ctx.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen && <ContactModal prefill={prefill} onClose={close} />}
    </Ctx.Provider>
  );
}

function ContactModal({
  prefill,
  onClose,
}: {
  prefill: ContactPrefill;
  onClose: () => void;
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">(
    "idle",
  );

  // Lock scroll, focus first field, restore focus on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, []);

  // Escape to close + simple focus trap.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      onClose();
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-ink placeholder:text-ink/35 focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/30 transition";
  const labelCls = "mb-1.5 block text-sm font-medium text-ink/80";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/60 px-4 py-[6vh] backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <svg
            viewBox="0 0 20 20"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="m5 5 10 10M15 5 5 15" />
          </svg>
        </button>

        <p className="eyebrow text-rust">Start a Conversation</p>
        <h2
          id="contact-modal-title"
          className="mt-1 font-heading text-2xl text-ink"
        >
          Let&rsquo;s connect you with an advisor.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">
          An advisor will reach out to understand your business. This is a
          conversation, not an instant quote.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className={labelCls}>
                First name
              </label>
              <input
                ref={firstFieldRef}
                id="firstName"
                name="firstName"
                required
                autoComplete="given-name"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelCls}>
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                required
                autoComplete="family-name"
                className={field}
              />
            </div>
          </div>

          <div>
            <label htmlFor="businessName" className={labelCls}>
              Business name
            </label>
            <input
              id="businessName"
              name="businessName"
              required
              autoComplete="organization"
              className={field}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className={labelCls}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelCls}>
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className={field}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="industry" className={labelCls}>
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                defaultValue={prefill.industry ?? ""}
                className={field}
              >
                <option value="">Select…</option>
                {INDUSTRY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="zip" className={labelCls}>
                ZIP code
              </label>
              <input
                id="zip"
                name="zip"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                pattern="[0-9]{5}"
                maxLength={5}
                placeholder="12345"
                defaultValue={prefill.zip ?? ""}
                className={field}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className={labelCls}>
              What do you need? <span className="text-ink/40">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className={`${field} resize-none`}
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-rust">
              Something went wrong. Please try again or call us directly.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-rust px-6 font-medium text-white transition-colors hover:bg-ink disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Start a Conversation"}
          </button>
        </form>
      </div>
    </div>
  );
}
