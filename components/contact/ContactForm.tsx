"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { frontIndustries, moreIndustries } from "@/data/industries";
import { usStates } from "@/data/states";

/**
 * The single "Start a Conversation" intake form, used in two places:
 *   - full-page on /contact (app/contact/page.tsx)
 *   - inside the global modal opened by every CTA (contact-modal.tsx)
 *
 * It renders only the stepper + fields + nav; the parent supplies the card /
 * dialog chrome. Three guided stages:
 *   1. Contact information — name, email, phone
 *   2. Your business       — name, address, industry, about, year started
 *   3. How can we help     — current insurance? + consultation vs. new quote
 *
 * Submits to /api/contact and routes to /thank-you on success. Per the client,
 * this collects a full business address (incl. ZIP) and a quote/consultation
 * intent — a deliberate override of the earlier "no ZIP / no quote" default.
 */

type Props = {
  /** Industry slug pre-selected from the home hero (?industry=…). */
  initialIndustry?: string;
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
  address: string;
  city: string;
  state: string;
  zip: string;
  industry: string;
  about: string;
  yearStarted: string;
  // Step 3 — intent
  hasInsurance: "" | "yes" | "no";
  intent: "" | "consultation" | "quote";
};

const STEPS = [
  { id: 1, label: "Contact" },
  { id: 2, label: "Business" },
  { id: 3, label: "How we help" },
] as const;

const INTENT_OPTIONS = [
  {
    value: "consultation" as const,
    label: "Schedule a consultation",
    desc: "Talk through your business with an advisor.",
  },
  {
    value: "quote" as const,
    label: "Request a new quote",
    desc: "Get coverage options and pricing.",
  },
];

const emailOk = (v: string) => /^\S+@\S+\.\S+$/.test(v);
const yearOk = (v: string) => /^(19|20)\d{2}$/.test(v) && Number(v) <= 2026;

export default function ContactForm({
  initialIndustry,
  initialState,
  onClose,
}: Props) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    address: "",
    city: "",
    state: initialState ?? "",
    zip: "",
    industry: initialIndustry ?? "",
    about: "",
    yearStarted: "",
    hasInsurance: "",
    intent: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [touched, setTouched] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  // Per-step required-field validation gates the Continue / Submit buttons.
  const stepValid = useMemo(() => {
    if (step === 1)
      return (
        data.firstName.trim() !== "" &&
        data.lastName.trim() !== "" &&
        emailOk(data.email) &&
        data.phone.trim() !== ""
      );
    if (step === 2)
      return (
        data.businessName.trim() !== "" &&
        data.address.trim() !== "" &&
        data.city.trim() !== "" &&
        data.state !== "" &&
        /^\d{5}$/.test(data.zip) &&
        data.industry !== "" &&
        yearOk(data.yearStarted)
      );
    return data.hasInsurance !== "" && data.intent !== "";
  }, [step, data]);

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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
                Email
              </label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
                className={field + errCls(!emailOk(data.email))}
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelCls}>
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => set("phone", e.target.value)}
                autoComplete="tel"
                className={field + errCls(data.phone.trim() === "")}
              />
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
              <label htmlFor="industry" className={labelCls}>
                Industry
              </label>
              <select
                id="industry"
                value={data.industry}
                onChange={(e) => set("industry", e.target.value)}
                className={field + errCls(data.industry === "")}
              >
                <option value="">Select your industry…</option>
                <optgroup label="Primary focus">
                  {frontIndustries.map((i) => (
                    <option key={i.slug} value={i.slug}>
                      {i.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="More industries">
                  {moreIndustries.map((i) => (
                    <option key={i.slug} value={i.slug}>
                      {i.name}
                    </option>
                  ))}
                </optgroup>
                <option value="other">Other / not sure yet</option>
              </select>
            </div>
            <div>
              <label htmlFor="address" className={labelCls}>
                Business address
              </label>
              <input
                id="address"
                value={data.address}
                onChange={(e) => set("address", e.target.value)}
                autoComplete="street-address"
                placeholder="Street address"
                className={field + errCls(data.address.trim() === "")}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className={labelCls}>
                  City
                </label>
                <input
                  id="city"
                  value={data.city}
                  onChange={(e) => set("city", e.target.value)}
                  autoComplete="address-level2"
                  className={field + errCls(data.city.trim() === "")}
                />
              </div>
              <div>
                <label htmlFor="state" className={labelCls}>
                  State
                </label>
                <select
                  id="state"
                  value={data.state}
                  onChange={(e) => set("state", e.target.value)}
                  autoComplete="address-level1"
                  className={field + errCls(data.state === "")}
                >
                  <option value="">Select…</option>
                  {usStates.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="zip" className={labelCls}>
                  ZIP code
                </label>
                <input
                  id="zip"
                  value={data.zip}
                  onChange={(e) => set("zip", e.target.value)}
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  placeholder="12345"
                  className={field + errCls(!/^\d{5}$/.test(data.zip))}
                />
              </div>
              <div>
                <label htmlFor="yearStarted" className={labelCls}>
                  Year started
                </label>
                <input
                  id="yearStarted"
                  value={data.yearStarted}
                  onChange={(e) => set("yearStarted", e.target.value)}
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="2015"
                  className={field + errCls(!yearOk(data.yearStarted))}
                />
              </div>
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

        {/* Step 3 — How can we help */}
        {step === 3 && (
          <div className="panel-in space-y-6">
            <fieldset>
              <legend className={labelCls}>
                Do you currently have insurance?
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "yes", label: "Yes, I have coverage" },
                  { value: "no", label: "No, not yet" },
                ].map((o) => {
                  const selected = data.hasInsurance === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() =>
                        set(
                          "hasInsurance",
                          o.value as FormState["hasInsurance"],
                        )
                      }
                      aria-pressed={selected}
                      className={`rounded-lg border px-4 py-3 text-left text-[0.95rem] font-medium transition ${
                        selected
                          ? "border-rust bg-rust/[0.06] text-ink ring-1 ring-rust/30"
                          : "border-ink/15 text-ink/80 hover:border-ink/30"
                      } ${touched && data.hasInsurance === "" ? "border-rust/60" : ""}`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className={labelCls}>What would you like to do?</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {INTENT_OPTIONS.map((o) => {
                  const selected = data.intent === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => set("intent", o.value)}
                      aria-pressed={selected}
                      className={`flex flex-col rounded-lg border px-4 py-3 text-left transition ${
                        selected
                          ? "border-rust bg-rust/[0.06] ring-1 ring-rust/30"
                          : "border-ink/15 hover:border-ink/30"
                      } ${touched && data.intent === "" ? "border-rust/60" : ""}`}
                    >
                      <span className="text-[0.95rem] font-medium text-ink">
                        {o.label}
                      </span>
                      <span className="mt-1 text-sm leading-snug text-ink/55">
                        {o.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
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
              {status === "submitting" ? "Sending…" : "Start a Conversation"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
