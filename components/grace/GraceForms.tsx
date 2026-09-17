"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { grace, graceTel, GRACE_FORMS } from "@/data/grace";
import {
  GRACE_FORMS_ID,
  GRACE_TAB_EVENT,
  type GraceTab,
} from "@/components/grace/formBus";

/**
 * The two intake forms on Grace's page, behind a segmented toggle — only one is
 * visible at a time, each capped at four fields:
 *   • "Coverage Gap Review" — Name, Business name, Phone, Email → Book My Free Review
 *   • "Contact Grace"       — Name, Phone, How can we help?      → Send to Grace
 *
 * Both post to /api/lead (the same Supabase + Resend + CRM pipeline as the rest
 * of the site), carry a hidden `rep: "grace"`, and pass through any UTM params
 * from the URL. On success we swap in an inline confirmation — no redirect —
 * with a tap-to-call fallback. The hero + sticky CTAs drive the active tab via
 * the `grace:selectTab` event.
 */

const digits = (v: string) => v.replace(/\D/g, "");
const emailOk = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());
const phoneOk = (v: string) => digits(v).length === 10;

const formatPhone = (v: string) => {
  const d = digits(v).slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

/** Read UTM / click-id params from the current URL, if any. */
function readUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const k of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
  ]) {
    const v = p.get(k);
    if (v) out[k] = v;
  }
  return out;
}

/** Split a single "Name" field into first / last for Supabase + the CRM. */
function splitName(full: string): { firstName: string; lastName: string } {
  const t = full.trim().replace(/\s+/g, " ");
  const sp = t.indexOf(" ");
  if (sp === -1) return { firstName: t, lastName: "" };
  return { firstName: t.slice(0, sp), lastName: t.slice(sp + 1) };
}

// Shared field styling — identical to the site's ContactForm so the two forms
// read as one design system.
const field =
  "w-full h-12 rounded-lg border border-ink/15 bg-white px-3.5 text-[0.95rem] text-ink placeholder:text-ink/35 focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/25 transition";
const area =
  "w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-ink/35 focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/25 transition resize-none";
const labelCls =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/55";

type ReviewState = {
  name: string;
  businessName: string;
  phone: string;
  email: string;
};
type ContactState = { name: string; phone: string; message: string };

const EMPTY_REVIEW: ReviewState = {
  name: "",
  businessName: "",
  phone: "",
  email: "",
};
const EMPTY_CONTACT: ContactState = { name: "", phone: "", message: "" };

export default function GraceForms() {
  const [tab, setTab] = useState<GraceTab>("review");
  const [review, setReview] = useState<ReviewState>(EMPTY_REVIEW);
  const [contactData, setContactData] = useState<ContactState>(EMPTY_CONTACT);
  const [hp, setHp] = useState(""); // honeypot — must stay empty
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle",
  );

  const uid = useId();

  // Hero / sticky CTAs ask us to switch tabs via a window event.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const detail = (e as CustomEvent<GraceTab>).detail;
      if (detail === "review" || detail === "contact") {
        setTab(detail);
        setTouched(false);
        setStatus("idle");
      }
    };
    window.addEventListener(GRACE_TAB_EVENT, onSelect);
    return () => window.removeEventListener(GRACE_TAB_EVENT, onSelect);
  }, []);

  const reviewValid = useMemo(
    () =>
      review.name.trim() !== "" &&
      review.businessName.trim() !== "" &&
      phoneOk(review.phone) &&
      emailOk(review.email),
    [review],
  );
  const contactValid = useMemo(
    () => contactData.name.trim() !== "" && phoneOk(contactData.phone),
    [contactData],
  );
  const valid = tab === "review" ? reviewValid : contactValid;

  function switchTab(next: GraceTab) {
    setTab(next);
    setTouched(false);
    setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid) {
      setTouched(true);
      return;
    }
    setStatus("submitting");

    const isReview = tab === "review";
    const fullName = (isReview ? review.name : contactData.name).trim();
    const { firstName, lastName } = splitName(fullName);
    const phone = (isReview ? review.phone : contactData.phone).trim();

    // `rep` tags the lead as Grace's everywhere; the review form's fields also
    // carry a short summary line the CRM surfaces in its notes.
    const fields: Record<string, string> = { rep: "grace" };
    if (!isReview && contactData.message.trim()) {
      fields.message = contactData.message.trim();
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: isReview ? GRACE_FORMS.review : GRACE_FORMS.contact,
          name: fullName,
          firstName,
          lastName,
          email: isReview ? review.email.trim() : "",
          phone,
          company: isReview ? review.businessName.trim() : "",
          fields,
          utm: readUtm(),
          pageUrl:
            typeof window !== "undefined" ? window.location.href : "",
          _hp: hp,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const tabs: { id: GraceTab; label: string }[] = [
    { id: "review", label: "Coverage Gap Review" },
    { id: "contact", label: "Contact Grace" },
  ];

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl shadow-ink/[0.06] ring-1 ring-ink/10 sm:p-8">
      {status === "done" ? (
        <SuccessPanel />
      ) : (
        <>
          {/* Segmented toggle */}
          <div
            role="tablist"
            aria-label="Choose how to reach out"
            className="grid grid-cols-2 gap-1 rounded-full bg-ink/[0.06] p-1"
          >
            {tabs.map((t) => {
              const selected = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  onClick={() => switchTab(t.id)}
                  className={`h-11 rounded-full px-3 text-sm font-medium transition-colors ${
                    selected
                      ? "bg-rust text-white shadow-sm"
                      : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            id={`${uid}-panel`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${tab}`}
            className="mt-6"
          >
            {/* Honeypot — off-screen; only bots fill it. Neutral label + ignore
                hints keep browser autofill / password managers away. */}
            <div
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor={`${uid}-hp`}>Leave this field empty</label>
              <input
                id={`${uid}-hp`}
                name="_hp"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                data-form-type="other"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
              />
            </div>

            {tab === "review" ? (
              <div className="panel-in space-y-4">
                <Field
                  id={`${uid}-r-name`}
                  label="Name"
                  autoComplete="name"
                  value={review.name}
                  onChange={(v) => setReview((s) => ({ ...s, name: v }))}
                  invalid={touched && review.name.trim() === ""}
                />
                <Field
                  id={`${uid}-r-business`}
                  label="Business name"
                  autoComplete="organization"
                  placeholder="Acme Construction LLC"
                  value={review.businessName}
                  onChange={(v) =>
                    setReview((s) => ({ ...s, businessName: v }))
                  }
                  invalid={touched && review.businessName.trim() === ""}
                />
                <Field
                  id={`${uid}-r-phone`}
                  label="Phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(555) 123-4567"
                  value={review.phone}
                  onChange={(v) =>
                    setReview((s) => ({ ...s, phone: formatPhone(v) }))
                  }
                  invalid={touched && !phoneOk(review.phone)}
                />
                <Field
                  id={`${uid}-r-email`}
                  label="Email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@business.com"
                  value={review.email}
                  onChange={(v) => setReview((s) => ({ ...s, email: v }))}
                  invalid={touched && !emailOk(review.email)}
                />
              </div>
            ) : (
              <div className="panel-in space-y-4">
                <Field
                  id={`${uid}-c-name`}
                  label="Name"
                  autoComplete="name"
                  value={contactData.name}
                  onChange={(v) =>
                    setContactData((s) => ({ ...s, name: v }))
                  }
                  invalid={touched && contactData.name.trim() === ""}
                />
                <Field
                  id={`${uid}-c-phone`}
                  label="Phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(555) 123-4567"
                  value={contactData.phone}
                  onChange={(v) =>
                    setContactData((s) => ({ ...s, phone: formatPhone(v) }))
                  }
                  invalid={touched && !phoneOk(contactData.phone)}
                />
                <div>
                  <label htmlFor={`${uid}-c-msg`} className={labelCls}>
                    How can we help?{" "}
                    <span className="font-normal normal-case tracking-normal text-ink/40">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id={`${uid}-c-msg`}
                    rows={3}
                    value={contactData.message}
                    onChange={(e) =>
                      setContactData((s) => ({ ...s, message: e.target.value }))
                    }
                    placeholder="A quick note about your business or what you're wondering about."
                    className={area}
                  />
                </div>
              </div>
            )}

            {touched && !valid && (
              <p className="mt-4 text-sm text-rust">
                Please complete the highlighted fields.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-rust">
                Something went wrong. Please try again — or call us at{" "}
                <a href={`tel:${graceTel}`} className="font-semibold underline">
                  {grace.phone}
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-6 inline-flex h-13 w-full items-center justify-center rounded-full bg-rust px-6 font-medium text-white transition-colors hover:bg-ink disabled:opacity-60"
            >
              {status === "submitting"
                ? "Sending…"
                : tab === "review"
                  ? "Book My Free Review"
                  : "Send to Grace"}
            </button>

            <p className="mt-3 text-center text-xs text-ink/45">
              No obligation. Your details go straight to Grace&rsquo;s team.
            </p>
          </form>
        </>
      )}
    </div>
  );
}

/** Inline post-submit confirmation — no redirect, with a tap-to-call fallback. */
function SuccessPanel() {
  return (
    <div className="panel-in py-4 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rust/10 text-rust">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m4 12 5 5 11-12" />
        </svg>
      </span>
      <h3 className="mt-5 font-heading text-2xl font-bold text-ink">
        Got it. An agent will contact you shortly.
      </h3>
      <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink/65">
        Thanks — your details are on their way to Grace&rsquo;s team. Keep an eye
        on your phone.
      </p>
      <div className="mt-7 border-t border-ink/10 pt-6">
        <p className="text-sm font-medium text-ink/80">Prefer to talk now?</p>
        <a
          href={`tel:${graceTel}`}
          className="mt-1 inline-flex items-center gap-2 font-heading text-xl font-bold text-ink transition-colors hover:text-rust"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.7a16 16 0 0 0 6 6l1.2-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
          </svg>
          Call Us at {grace.phone}
        </a>
      </div>
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  autoComplete?: string;
  placeholder?: string;
  invalid?: boolean;
};

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
  invalid = false,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={
          field + (invalid ? " border-rust/70 ring-2 ring-rust/15" : "")
        }
      />
    </div>
  );
}
