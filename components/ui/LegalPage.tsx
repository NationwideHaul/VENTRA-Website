import Section from "@/components/motion/Section";

export type LegalSection = {
  heading: string;
  /** One or more paragraphs of body copy. */
  body: string[];
};

type LegalPageProps = {
  eyebrow?: string;
  title: string;
  /** Human-readable effective date, e.g. "June 29, 2026". */
  effectiveDate: string;
  intro: string;
  sections: LegalSection[];
};

/**
 * Shared layout for legal / policy pages (Privacy Policy, Terms &
 * Conditions). Renders a constrained, readable measure with consistent
 * heading rhythm. Content is supplied per-page.
 */
export default function LegalPage({
  eyebrow,
  title,
  effectiveDate,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <Section className="min-h-[60vh]">
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow text-rust mb-4">{eyebrow}</p>}
        <h1 className="text-4xl sm:text-5xl text-ink">{title}</h1>
        <p className="mt-4 text-sm text-ink/50">
          Effective {effectiveDate}
        </p>
        <p className="mt-6 text-lg text-ink/70 leading-relaxed">{intro}</p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl sm:text-2xl text-ink">{s.heading}</h2>
              <div className="mt-3 space-y-4 text-ink/70 leading-relaxed">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
