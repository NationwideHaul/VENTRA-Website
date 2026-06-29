import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/motion/Section";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thanks for reaching out. An advisor will be in touch shortly.",
  robots: { index: false },
};

const NEXT_STEPS = [
  {
    title: "We review your details",
    body: "An advisor reads through what you shared and gets familiar with your business.",
  },
  {
    title: "An advisor reaches out",
    body: "Expect a personal call or email — usually within one business day.",
  },
  {
    title: "We talk through your coverage",
    body: "A real conversation about your exposures and how to protect them. No pressure.",
  },
];

export default function ThankYouPage() {
  const tel = contact.phone.replace(/[^\d+]/g, "");

  return (
    <Section className="min-h-[70vh]">
      <div className="max-w-2xl">
        <p className="eyebrow text-rust mb-4">Thank you</p>
        <h1 className="font-heading text-4xl font-bold text-ink sm:text-5xl">
          Thanks — an advisor will be in touch.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/70">
          We&rsquo;ve received your note and an advisor will reach out shortly to
          talk through your business. Here&rsquo;s what happens next.
        </p>

        <ol className="mt-10 space-y-6">
          {NEXT_STEPS.map((s, i) => (
            <li key={s.title} className="flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rust/10 text-sm font-semibold text-rust">
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-ink">{s.title}</p>
                <p className="mt-1 text-ink/65">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-ink/75">
            <p className="text-sm font-medium text-ink/80">
              Need to reach us sooner?
            </p>
            <a className="mt-1 inline-block hover:text-rust" href={`tel:${tel}`}>
              {contact.phone}
            </a>
          </div>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-6 font-medium text-ink transition-colors hover:border-ink/30 hover:bg-ink/[0.03]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </Section>
  );
}
