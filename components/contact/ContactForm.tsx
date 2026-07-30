"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { usStates } from "@/data/states";
import {
  businessClasses,
  OTHER_BUSINESS_CLASS,
} from "@/data/business-classes";
import SearchSelect, { type SelectOption } from "@/components/ui/SearchSelect";

/**
 * The single "Start a Conversation" intake form, used in two places:
 *   - full-page on /contact (app/contact/page.tsx)
 *   - inside the global modal opened by every CTA (contact-modal.tsx)
 *
 * It renders only the stepper + fields + nav; the parent supplies the card /
 * dialog chrome. Two guided stages:
 *   1. Contact information — first/last name, email, phone (email + phone are
 *      auto-validated inline with a check indicator)
 *   2. Your business       — business name, state (searchable), EIN (optional),
 *      industry / business class (searchable, 126 options + Other), about
 *
 * Submits to /api/lead (formId "contact") and routes to /thank-you on success.
 */

type Props = {
  /** State code pre-selected from a CTA prefill. */
  initialState?: string;
  /** Called on successful submit (e.g. to close the modal) before navigating. */
  onClose?: () => void;
};

type FormState = {
  // Step 1 — contact info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Step 2 — business
  businessName: string;
  state: string;
  ein: string;
  industry: string;
  otherIndustry: string;
  about: string;
  // Honeypot — must stay empty; only bots fill it. Sent as `_hp` to /api/lead.
  _hp: string;
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

const STEPS = [
  { id: 1, label: "Contact" },
  { id: 2, label: "Your business" },
] as const;

const STATE_OPTIONS: SelectOption[] = usStates.map((s) => ({
  value: s.code,
  label: s.name,
}));
const INDUSTRY_OPTIONS: SelectOption[] = businessClasses.map((c) => ({
  value: c,
  label: c,
}));

const emailOk = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());
const digits = (v: string) => v.replace(/\D/g, "");
const phoneOk = (v: string) => digits(v).length === 10;
const einOk = (v: string) => digits(v).length === 9;

const formatPhone = (v: string) => {
  const d = digits(v).slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

const formatEIN = (v: string) => {
  const d = digits(v).slice(0, 9);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}-${d.slice(2)}`;
};

export default function ContactForm({ initialState, onClose }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    state: initialState ?? "",
    ein: "",
    industry: "",
    otherIndustry: "",
    about: "",
    _hp: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [touched, setTouched] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const needsOther = data.industry === OTHER_BUSINESS_CLASS;

  // Per-step required-field validation gates the Continue / Submit buttons.
  const stepValid = useMemo(() => {
    if (step === 1)
      return (
        data.firstName.trim() !== "" &&
        data.lastName.trim() !== "" &&
        emailOk(data.email) &&
        phoneOk(data.phone)
      );
    return (
      data.businessName.trim() !== "" &&
      data.state !== "" &&
      data.industry !== "" &&
      (!needsOther || data.otherIndustry.trim() !== "")
    );
  }, [step, data, needsOther]);

  function next() {
    if (!stepValid) {
      setTouched(true);
      return;
    }
    setTouched(false);
    setStep((s) => Math.min(s + 1, STEPS.length));
  }

  function back() {
    setTouched(false);
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stepValid) {
      setTouched(true);
      return;
    }
    setStatus("submitting");
    try {
      const stateLabel =
        STATE_OPTIONS.find((o) => o.value === data.state)?.label ?? data.state;
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: "contact",
          name: `${data.firstName} ${data.lastName}`.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          company: data.businessName.trim(),
          fields: {
            state: stateLabel,
            ein: data.ein.trim(),
            industry: needsOther
              ? `Other: ${data.otherIndustry.trim()}`
              : data.industry,
            about: data.about.trim(),
          },
          utm: readUtm(),
          pageUrl:
            typeof window !== "undefined" ? window.location.href : "",
          _hp: data._hp,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      onClose?.();
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full h-12 rounded-lg border border-ink/15 bg-white px-3.5 text-[0.95rem] text-ink placeholder:text-ink/35 focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/25 transition";
  const area =
    "w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-ink/35 focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/25 transition resize-none";
  const labelCls =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/55";
  const errCls = (invalid: boolean) =>
    touched && invalid ? " border-rust/70 ring-2 ring-rust/15" : "";

  const active = STEPS[step - 1];

  // Small green check shown inside a field once its value is valid.
  const Verified = ({ show }: { show: boolean }) =>
    show ? (
      <span
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-600"
        aria-label="Looks good"
        title="Looks good"
      >
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.6 7.7 9.3a1 1 0 0 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l4-4Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    ) : null;

  return (
    <div>
      {/* Progress — labeled bar */}
      <div className="mb-7">
        <div className="mb-2.5 flex items-end justify-between">
          <p className="font-heading text-sm font-bold text-ink">
            {active.label}
          </p>
          <p className="text-xs font-medium text-ink/45">
            Step {step} of {STEPS.length}
          </p>
        </div>
        <div className="flex gap-1.5" aria-hidden>
          {STEPS.map((s) => (
            <span
              key={s.id}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                s.id <= step ? "bg-rust" : "bg-ink/10"
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot — hidden off-screen, catches bots; humans never see it. */}
        <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="_hp">Company (leave blank)</label>
          <input
            id="_hp"
            name="_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={data._hp}
            onChange={(e) => set("_hp", e.target.value)}
          />
        </div>

        {/* Step 1 — Contact information */}
        {step === 1 && (
          <div className="panel-in space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={labelCls}>
                  First name
                </label>
                <input
                  id="firstName"
                  value={data.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  autoComplete="given-name"
                  className={field + errCls(data.firstName.trim() === "")}
                />
              </div>
              <div>
                <label htmlFor="lastName" className={labelCls}>
                  Last name
                </label>
                <input
                  id="lastName"
                  value={data.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  autoComplete="family-name"
                  className={field + errCls(data.lastName.trim() === "")}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className={labelCls}>
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  autoComplete="email"
                  className={field + " pr-11" + errCls(!emailOk(data.email))}
                />
                <Verified show={emailOk(data.email)} />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className={labelCls}>
                Phone number
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  value={data.phone}
                  onChange={(e) => set("phone", formatPhone(e.target.value))}
                  autoComplete="tel"
                  placeholder="(555) 123-4567"
                  className={field + " pr-11" + errCls(!phoneOk(data.phone))}
                />
                <Verified show={phoneOk(data.phone)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Your business */}
        {step === 2 && (
          <div className="panel-in space-y-5">
            <div>
              <label htmlFor="businessName" className={labelCls}>
                Business name
              </label>
              <input
                id="businessName"
                value={data.businessName}
                onChange={(e) => set("businessName", e.target.value)}
                autoComplete="organization"
                placeholder="Acme Construction LLC"
                className={field + errCls(data.businessName.trim() === "")}
              />
            </div>
            <div>
              <label htmlFor="state" className={labelCls}>
                State
              </label>
              <SearchSelect
                id="state"
                value={data.state}
                onChange={(v) => set("state", v)}
                options={STATE_OPTIONS}
                placeholder="Select your state…"
                searchPlaceholder="Search states…"
                invalid={touched && data.state === ""}
              />
            </div>
            <div>
              <label htmlFor="ein" className={labelCls}>
                EIN{" "}
                <span className="font-normal normal-case tracking-normal text-ink/40">
                  (optional)
                </span>
              </label>
              <div className="relative">
                <input
                  id="ein"
                  value={data.ein}
                  onChange={(e) => set("ein", formatEIN(e.target.value))}
                  inputMode="numeric"
                  placeholder="12-3456789"
                  className={field + " pr-11"}
                />
                <Verified show={einOk(data.ein)} />
              </div>
            </div>
            <div>
              <label htmlFor="industry" className={labelCls}>
                Industry / business class
              </label>
              <SearchSelect
                id="industry"
                value={data.industry}
                onChange={(v) => set("industry", v)}
                options={INDUSTRY_OPTIONS}
                placeholder="Select your industry…"
                searchPlaceholder="Search 120+ classes…"
                invalid={touched && data.industry === ""}
              />
              {needsOther && (
                <input
                  id="otherIndustry"
                  value={data.otherIndustry}
                  onChange={(e) => set("otherIndustry", e.target.value)}
                  placeholder="Please specify your industry"
                  className={
                    field +
                    " mt-3" +
                    errCls(data.otherIndustry.trim() === "")
                  }
                />
              )}
            </div>
            <div>
              <label htmlFor="about" className={labelCls}>
                About the business{" "}
                <span className="font-normal normal-case tracking-normal text-ink/40">
                  (optional)
                </span>
              </label>
              <textarea
                id="about"
                rows={3}
                value={data.about}
                onChange={(e) => set("about", e.target.value)}
                placeholder="What you do, who you serve, and anything that shapes your risk."
                className={area}
              />
            </div>
          </div>
        )}

        {touched && !stepValid && (
          <p className="mt-4 text-sm text-rust">
            Please complete the highlighted fields to continue.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-rust">
            Something went wrong. Please try again or call us directly.
          </p>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={back}
              className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-6 font-medium text-ink transition-colors hover:border-ink/30 hover:bg-ink/[0.03]"
            >
              Back
            </button>
          )}
          {step < STEPS.length ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-rust px-6 font-medium text-white transition-colors hover:bg-ink"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-rust px-6 font-medium text-white transition-colors hover:bg-ink disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Schedule a Consultation"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
