import type { Metadata } from "next";
import PlaceholderPage from "@/components/ui/PlaceholderPage";
import { contact } from "@/data/site";
import { resolveIndustryLabel } from "@/data/industries";

export const metadata: Metadata = {
  title: "Find an Agent",
  description:
    "An advisor will reach out. This is a conversation about your business, not an instant quote bot.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string }>;
}) {
  const { industry } = await searchParams;
  const label = resolveIndustryLabel(industry);

  return (
    <PlaceholderPage
      eyebrow="Find an Agent"
      title="Let's talk about what you've built."
      intro="An advisor will reach out to understand your business. This is a conversation, not an instant quote bot. The short contact form lands in phase 7."
      phaseNote="advisor contact form in phase 7"
    >
      {label && (
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-rust/30 bg-rust/[0.06] px-4 py-1.5 text-sm text-ink">
          <span className="text-ink/60">Industry:</span>
          <span className="font-medium">{label}</span>
        </p>
      )}
      <div className="flex flex-col gap-2 text-ink/75">
        {/* [CONFIRM] CallRail number + routing inbox */}
        <a
          className="hover:text-rust"
          href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
        >
          {contact.phone}
        </a>
        <a className="hover:text-rust" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
      </div>
    </PlaceholderPage>
  );
}
