import type { ReactNode } from "react";
import Section from "@/components/motion/Section";
import CTAButton from "@/components/ui/CTAButton";

type PlaceholderPageProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  /** What this page becomes in a later phase. */
  phaseNote?: string;
  children?: ReactNode;
};

/**
 * Consistent stub for pages that get their real content in a later build
 * phase. Establishes the route, metadata, and brand styling now so the nav
 * is fully navigable during phase-1 review.
 */
export default function PlaceholderPage({
  eyebrow,
  title,
  intro,
  phaseNote,
  children,
}: PlaceholderPageProps) {
  return (
    <Section className="min-h-[60vh]">
      {eyebrow && <p className="eyebrow text-rust mb-4">{eyebrow}</p>}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl text-ink max-w-4xl">
        {title}
      </h1>
      <p className="mt-6 text-lg text-ink/70 max-w-4xl leading-relaxed">
        {intro}
      </p>

      {children && <div className="mt-10">{children}</div>}

      <div className="mt-10">
        <CTAButton size="lg" />
      </div>

      {phaseNote && (
        <p className="mt-12 inline-block rounded-full border border-ink/15 px-4 py-1.5 text-xs text-ink/50">
          Placeholder &middot; {phaseNote}
        </p>
      )}
    </Section>
  );
}
