import type { Metadata } from "next";
import Section from "@/components/motion/Section";
import ContactForm from "@/components/contact/ContactForm";
import { contact } from "@/data/site";
import { resolveIndustryLabel } from "@/data/industries";

export const metadata: Metadata = {
  title: "Start a Conversation",
  description:
    "An advisor will reach out to understand your business. This is a conversation about your business, not an instant quote bot.",
};

const ASSURANCES = [
  "A dedicated advisor — not a call center.",
  "We learn your business before we talk coverage.",
  "No instant-quote bots, no pressure.",
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string }>;
}) {
  const { industry } = await searchParams;
  const label = resolveIndustryLabel(industry);
  const tel = contact.phone.replace(/[^\d+]/g, "");

  return (
    <Section className="min-h-[70vh]">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_minmax(0,32rem)] lg:gap-16">
        {/* Left — context + direct contact */}
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
          <p className="eyebrow text-rust mb-3">Start a Conversation</p>
          <h1 className="font-heading text-4xl font-bold text-ink sm:text-5xl">
            Let&rsquo;s talk about what you&rsquo;ve built.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">
            Tell us a little about your business and an advisor will reach out.
            It&rsquo;s a conversation, not an instant quote.
          </p>

          {label && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-rust/30 bg-rust/[0.06] px-4 py-1.5 text-sm text-ink">
              <span className="text-ink/60">Industry:</span>
              <span className="font-medium">{label}</span>
            </p>
          )}

          <ul className="mt-8 space-y-3">
            {ASSURANCES.map((a) => (
              <li key={a} className="flex items-start gap-3 text-ink/75">
                <svg
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-5 w-5 shrink-0 text-rust"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="m4 10 4 4 8-9" />
                </svg>
                <span>{a}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-ink/10 pt-6">
            <p className="text-sm font-medium text-ink/80">
              Prefer to talk now?
            </p>
            <div className="mt-2 flex flex-col gap-1.5 text-ink/75">
              {/* [CONFIRM] CallRail number + routing inbox */}
              <a className="hover:text-rust" href={`tel:${tel}`}>
                {contact.phone}
              </a>
              <a className="hover:text-rust" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Right — multi-step form */}
        <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-xl shadow-ink/[0.04] sm:p-8">
          <ContactForm initialIndustry={industry} />
        </div>
      </div>
    </Section>
  );
}
