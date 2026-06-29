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
import ContactForm from "./ContactForm";

/**
 * Global "Start a Conversation" contact modal.
 *
 * Any CTA (header, hero, footer, pages) opens the SAME multi-step intake form
 * used on /contact — rendered here inside a dialog. The hero passes the chosen
 * industry/state so they arrive pre-filled. On success ContactForm closes the
 * modal and routes to /thank-you. This is a consultative intake — not an
 * instant quote.
 */

export type ContactPrefill = {
  industry?: string; // specialty slug or "other"
  state?: string; // 2-letter US state code
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
  const dialogRef = useRef<HTMLDivElement>(null);

  // Lock scroll, focus first field, restore focus on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    dialogRef.current
      ?.querySelector<HTMLElement>("input, select, button")
      ?.focus();
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
          className="mb-6 mt-1 font-heading text-2xl font-bold text-ink"
        >
          Let&rsquo;s connect you with an advisor.
        </h2>

        <ContactForm
          initialIndustry={prefill.industry}
          initialState={prefill.state}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
