import type { Metadata } from "next";
import Section from "@/components/motion/Section";
import CTAButton from "@/components/ui/CTAButton";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Report a Claim",
  description:
    "Need to file a claim? Reach your dedicated Ventra advisor and we'll guide you through the process and advocate on your behalf.",
};

export default function ReportAClaimPage() {
  return (
    <>
      <Section className="bg-ink text-sand min-h-[55vh]" innerClassName="max-w-3xl">
        <p className="eyebrow text-rust mb-4">Support</p>
        <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          Report a claim.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-sand/75">
          When something goes wrong, you shouldn&rsquo;t have to navigate it
          alone. Reach out and your dedicated advisor will open the claim, work
          directly with the carrier, and advocate for you through to resolution.
        </p>

        {/* Click-to-call — [CONFIRM] dedicated claims line */}
        <div className="mt-10 rounded-3xl border border-sand/15 bg-white/[0.03] p-8">
          <p className="text-sm uppercase tracking-[0.16em] text-sand/50">
            Call to start a claim
          </p>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="mt-2 block font-heading text-3xl font-bold text-white transition-colors hover:text-rust sm:text-4xl"
          >
            {contact.phone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="mt-3 inline-block text-sand/80 transition-colors hover:text-white"
          >
            {contact.email}
          </a>
        </div>

        <div className="mt-10">
          <CTAButton
            size="lg"
            className="border border-sand/40 bg-transparent text-sand hover:bg-sand hover:text-ink"
          >
            Contact your advisor
          </CTAButton>
        </div>
      </Section>

      {/* What to have ready */}
      <Section className="bg-white">
        <p className="eyebrow text-rust">What helps us move fast</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-bold text-ink sm:text-4xl">
          Have these ready when you reach out.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Your policy details",
              d: "The policy number or business name on the account.",
            },
            {
              t: "What happened",
              d: "A short description, with the date and location of the loss.",
            },
            {
              t: "Supporting records",
              d: "Photos, receipts, or any documentation you already have.",
            },
          ].map((c) => (
            <div
              key={c.t}
              className="h-full rounded-2xl border border-ink/10 bg-white p-6 shadow-sm"
            >
              <h3 className="font-heading text-lg text-ink">{c.t}</h3>
              <p className="mt-2 leading-relaxed text-ink/65">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
