"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { grace, graceTel, GRACE_FORMS } from "@/data/grace";
import {
  GRACE_TAB_EVENT,
  type GraceTab,
} from "@/components/grace/formBus";
import SearchSelect, { type SelectOption } from "@/components/ui/SearchSelect";
import { usStates } from "@/data/states";
import {
  businessClasses,
  OTHER_BUSINESS_CLASS,
} from "@/data/business-classes";

/**
 * The two intake forms on Grace's page, behind a segmented toggle — only one is
 * visible at a time:
 *   • "Policy Review" — first/last name, business, email, phone, state,
 *     industry, and optional comments (mirrors the site's main intake form).
 *   • "Contact Us"    — first/last name, email, phone.
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

const STATE_OPTIONS: SelectOption[] = usStates.map((s) => ({
  value: s.code,
  label: s.name,
}));
const INDUSTRY_OPTIONS: SelectOption[] = businessClasses.map((c) => ({
  value: c,
  label: c,
}));

// Shared field styling — identical to the site's ContactForm so the two forms
// read as one design system.
const field =
  "w-full h-12 rounded-lg border border-ink/15 bg-white px-3.5 text-[0.95rem] text-ink placeholder:text-ink/35 focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/25 transition";
const area =
  "w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-ink/35 focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/25 transition resize-none";
const labelCls =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/55";

type ReviewState = {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  state: string;
  industry: string;
  otherIndustry: string;
  comments: string;
};
type ContactState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const EMPTY_REVIEW: ReviewState = {
  firstName: "",
  lastName: "",
  businessName: "",
  email: "",
  phone: "",
  state: "",
  industry: "",
  otherIndustry: "",
  comments: "",
};
const EMPTY_CONTACT: ContactState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

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

  const needsOther = review.industry === OTHER_BUSINESS_CLASS;

  const reviewValid = useMemo(
    () =>
      review.firstName.trim() !== "" &&
      review.lastName.trim() !== "" &&
      review.businessName.trim() !== "" &&
      emailOk(review.email) &&
      phoneOk(review.phone) &&
      review.state !== "" &&
      review.industry !== "" &&
      (!needsOther || review.otherIndustry.trim() !== ""),
    [review, needsOther],
  );
  const contactValid = useMemo(
    () =>
      contactData.firstName.trim() !== "" &&
      contactData.lastName.trim() !== "" &&
      emailOk(contactData.email) &&
      phoneOk(contactData.phone),
    [contactData],
  );
  const valid = tab === "review" ? reviewValid : contactValid;

  function switchTab(next: GraceTab) {
    setTab(next);
    setTouched(false);
    setStatus("idle");
  }

  const setR = <K extends keyof ReviewState>(key: K, value: ReviewState[K]) =>
    setReview((s) => ({ ...s, [key]: value }));
  const setC = <K extends keyof ContactState>(key: K, value: ContactState[K]) =>
    setContactData((s) => ({ ...s, [key]: value }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid) {
      setTouched(true);
      return;
    }
    setStatus("submitting");

    const isReview = tab === "review";
    const src = isReview ? review : contactData;
    const firstName = src.firstName.trim();
    const lastName = src.lastName.trim();
    const email = src.email.trim();
    const phone = src.phone.trim();

    // `rep` tags the lead as Grace's everywhere. The review form also carries
    // the business, state, industry, and any comments the CRM surfaces in notes.
    const fields: Record<string, string> = { rep: "grace" };
    let company = "";
    if (isReview) {
      company = review.businessName.trim();
      const stateLabel =
        STATE_OPTIONS.find((o) => o.value === review.state)?.label ??
        review.state;
      if (stateLabel) fields.state = stateLabel;
      fields.industry = needsOther
        ? `Other: ${review.otherIndustry.trim()}`
        : review.industry;
      if (review.comments.trim()) fields.comments = review.comments.trim();
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: isReview ? GRACE_FORMS.review : GRACE_FORMS.contact,
          name: `${firstName} ${lastName}`.trim(),
          firstName,
          lastName,
          email,
          phone,
          company,
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
    { id: "review", label: "Policy Review" },
    { id: "contact", label: "Contact Us" },
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
            {/* Honeypot — off-screen; only bots fill it. Neutral name + ignore
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
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    id={`${uid}-r-first`}
                    label="First name"
                    autoComplete="given-name"
                    value={review.firstName}
                    onChange={(v) => setR("firstName", v)}
                    invalid={touched && review.firstName.trim() === ""}
                  />
                  <Field
                    id={`${uid}-r-last`}
                    label="Last name"
                    autoComplete="family-name"
                    value={review.lastName}
                    onChange={(v) => setR("lastName", v)}
                    invalid={touched && review.lastName.trim() === ""}
                  />
                </div>
                <Field
                  id={`${uid}-r-business`}
                  label="Business name"
                  autoComplete="organization"
                  placeholder="Acme Construction LLC"
                  value={review.businessName}
                  onChange={(v) => setR("businessName", v)}
                  invalid={touched && review.businessName.trim() === ""}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    id={`${uid}-r-email`}
                    label="Email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@business.com"
                    value={review.email}
                    onChange={(v) => setR("email", v)}
                    invalid={touched && !emailOk(review.email)}
                  />
                  <Field
                    id={`${uid}-r-phone`}
                    label="Phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(555) 123-4567"
                    value={review.phone}
                    onChange={(v) => setR("phone", formatPhone(v))}
                    invalid={touched && !phoneOk(review.phone)}
                  />
                </div>
                <div>
                  <label htmlFor={`${uid}-r-state`} className={labelCls}>
                    State
                  </label>
                  <SearchSelect
                    id={`${uid}-r-state`}
                    value={review.state}
                    onChange={(v) => setR("state", v)}
                    options={STATE_OPTIONS}
                    placeholder="Select your state…"
                    searchPlaceholder="Search states…"
                    invalid={touched && review.state === ""}
                  />
                </div>
                <div>
                  <label htmlFor={`${uid}-r-industry`} className={labelCls}>
                    Industry
                  </label>
                  <SearchSelect
                    id={`${uid}-r-industry`}
                    value={review.industry}
                    onChange={(v) => setR("industry", v)}
                    options={INDUSTRY_OPTIONS}
                    placeholder="Select your industry…"
                    searchPlaceholder="Search 120+ classes…"
                    invalid={touched && review.industry === ""}
                  />
                  {needsOther && (
                    <input
                      id={`${uid}-r-other`}
                      value={review.otherIndustry}
                      onChange={(e) => setR("otherIndustry", e.target.value)}
                      placeholder="Please specify your industry"
                      className={
                        field +
                        " mt-3" +
                        (touched && review.otherIndustry.trim() === ""
                          ? " border-rust/70 ring-2 ring-rust/15"
                          : "")
                      }
                    />
                  )}
                </div>
                <div>
                  <label htmlFor={`${uid}-r-comments`} className={labelCls}>
                    Comments{" "}
                    <span className="font-normal normal-case tracking-normal text-ink/40">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id={`${uid}-r-comments`}
                    rows={3}
                    value={review.comments}
                    onChange={(e) => setR("comments", e.target.value)}
                    placeholder="Anything that shapes your risk, or what you'd like us to look at."
                    className={area}
                  />
                </div>
              </div>
            ) : (
              <div className="panel-in space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    id={`${uid}-c-first`}
                    label="First name"
                    autoComplete="given-name"
                    value={contactData.firstName}
                    onChange={(v) => setC("firstName", v)}
                    invalid={touched && contactData.firstName.trim() === ""}
                  />
                  <Field
                    id={`${uid}-c-last`}
                    label="Last name"
                    autoComplete="family-name"
                    value={contactData.lastName}
                    onChange={(v) => setC("lastName", v)}
                    invalid={touched && contactData.lastName.trim() === ""}
                  />
                </div>
                <Field
                  id={`${uid}-c-email`}
                  label="Email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@business.com"
                  value={contactData.email}
                  onChange={(v) => setC("email", v)}
                  invalid={touched && !emailOk(contactData.email)}
                />
                <Field
                  id={`${uid}-c-phone`}
                  label="Phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(555) 123-4567"
                  value={contactData.phone}
                  onChange={(v) => setC("phone", formatPhone(v))}
                  invalid={touched && !phoneOk(contactData.phone)}
                />
              </div>
            )}

            {touched && !valid && (
              <p className="mt-4 text-sm text-rust">
                Please complete the highlighted fields.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-rust">
                Something went wrong. Please try again, or call us at{" "}
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
                  ? "Get My Free Policy Review"
                  : "Send"}
            </button>
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
        Thanks. Your details are on their way and someone will reach out soon.
        Keep an eye on your phone.
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
