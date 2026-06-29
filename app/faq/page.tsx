import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/motion/Section";
import CTAButton from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: "FAQ — Commercial Insurance Questions Answered",
  description:
    "Answers to common questions about working with Ventra Insurance Group: who we serve, how the process works, the coverage and carriers we offer, and what happens when you have a claim.",
};

/* ---------------------------------------------------------------------------
   FAQ content. Answers are written answer-first and concise for SEO + GEO
   (generative-engine) visibility, and emitted as FAQPage JSON-LD below.
   [CONFIRM] state count (48 vs 50) and typical bind timelines with manager.
--------------------------------------------------------------------------- */
type QA = { q: string; a: string; cta?: { href: string; label: string } };
type Category = { heading: string; items: QA[] };

const FAQ: Category[] = [
  {
    heading: "About Ventra",
    items: [
      {
        q: "What kind of businesses does Ventra work with?",
        a: "Ventra works with established mid-market businesses — companies with real assets, payroll, and exposure that have outgrown off-the-shelf coverage. We specialize in industries like construction, real estate, self-storage, hospitality, healthcare, multi-family, and warehousing & logistics.",
        cta: { href: "/industries", label: "See the industries we serve" },
      },
      {
        q: "Are you a national agency?",
        a: "Yes. Ventra is a commercial insurance brokerage operating across the United States, placing coverage through top-rated national and specialty carriers. Wherever your business operates, we can structure a program for it.",
      },
      {
        q: "How is Ventra different from a regular insurance agency?",
        a: "Most agencies sell you the policy you ask for and reappear at renewal. Ventra starts by understanding how your business actually operates, then builds coverage around your real exposures — and stays engaged as you grow. We're a strategic protection partner, not a transaction.",
      },
      {
        q: "Do you specialize in specific industries?",
        a: "Yes. We focus on industries where the exposures are complex and frequently underinsured, so your advisor already understands your business on day one rather than learning it from a generic checklist.",
        cta: { href: "/industries", label: "Explore industry coverage" },
      },
    ],
  },
  {
    heading: "Working with us",
    items: [
      {
        q: "How does the process work?",
        a: "It's three steps: tell us about your business through a short form, an advisor reaches out to learn how you operate and prepares a tailored plan, then you put coverage in place. No pressure — just a clear path to coverage that fits.",
        cta: { href: "/contact", label: "Start a conversation" },
      },
      {
        q: "Do you offer free quotes?",
        a: "Yes. Consultations and coverage proposals are always free and come with no obligation. Instead of a one-size instant quote, we build a proposal around your actual operations so the coverage and pricing reflect what your business really needs.",
      },
      {
        q: "Can I switch to Ventra if I already have coverage?",
        a: "Absolutely. Many clients come to us mid-term. We review your current policies, identify gaps or overlaps, and coordinate a smooth transition — typically timed around your renewal so there's no lapse in protection.",
      },
      {
        q: "How long does it take to get coverage in place?",
        a: "Straightforward programs can often be bound within a few days. More complex or specialty risks may take longer while we structure the right program — your advisor gives you a realistic timeline up front.",
      },
    ],
  },
  {
    heading: "Coverage and carriers",
    items: [
      {
        q: "What types of coverage do you offer?",
        a: "We structure complete commercial programs — general liability, commercial property, workers' compensation, commercial auto, umbrella and excess liability, professional and management liability, and industry-specific specialty lines.",
        cta: { href: "/solutions", label: "View all lines of coverage" },
      },
      {
        q: "Which insurance carriers do you work with?",
        a: "We place coverage through top-rated standard and E&S (excess & surplus) carriers, which gives your business access to hundreds of competitive programs rather than a single insurer's appetite.",
        cta: { href: "/about#carriers", label: "See our carrier partners" },
      },
      {
        q: "What if my business is hard to insure?",
        a: "That's where we do our best work. Through our E&S and specialty carrier relationships, we place coverage for higher-risk and hard-to-place businesses that standard markets often decline.",
      },
    ],
  },
  {
    heading: "After you're covered",
    items: [
      {
        q: "What happens when I have a claim?",
        a: "You call us first. Your dedicated advisor opens the claim, works directly with the carrier, and advocates for you through to resolution — so you're never navigating it alone.",
        cta: { href: "/report-a-claim", label: "How to report a claim" },
      },
      {
        q: "Will I hear from you only at renewal?",
        a: "No. We stay engaged year-round, adjusting your coverage as your business changes so it never goes stale — not just a once-a-year phone call.",
      },
      {
        q: "Can you review my current policy before I commit to anything?",
        a: "Yes. We're happy to review your existing policies and point out gaps or potential savings, with no obligation. Many businesses start with a complimentary policy review.",
        cta: { href: "/contact", label: "Request a policy review" },
      },
    ],
  },
];

// FAQPage structured data — helps both traditional search rich results and
// generative engines surface these answers.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.flatMap((c) =>
    c.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-white">
        <div className="container-page pt-[clamp(3.5rem,8vw,7rem)] pb-[clamp(2rem,4vw,3rem)]">
          <p className="eyebrow text-rust mb-4">FAQ</p>
          <h1 className="max-w-3xl text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
            Questions, answered.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
            Common questions about how we work, what we cover, and what to
            expect as a Ventra client. Don&rsquo;t see yours?{" "}
            <Link
              href="/contact"
              className="font-medium text-rust underline-offset-4 hover:underline"
            >
              Start a conversation
            </Link>{" "}
            and we&rsquo;ll answer anything specific to your business.
          </p>
        </div>
      </section>

      {/* Categories */}
      {FAQ.map((category) => (
        <Section key={category.heading} className="border-t border-ink/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 className="font-heading text-2xl font-bold text-ink lg:sticky lg:top-28">
                {category.heading}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <dl className="divide-y divide-ink/10">
                {category.items.map((item) => (
                  <div key={item.q} className="py-7 first:pt-0">
                    <dt className="font-heading text-lg text-ink sm:text-xl">
                      {item.q}
                    </dt>
                    <dd className="mt-3 leading-relaxed text-ink/70">
                      {item.a}
                    </dd>
                    {item.cta && (
                      <Link
                        href={item.cta.href}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-rust transition-colors hover:text-ink"
                      >
                        {item.cta.label}
                        <span aria-hidden>&rarr;</span>
                      </Link>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Section>
      ))}

      {/* Closing CTA */}
      <section className="bg-white">
        <div className="container-page pb-[var(--spacing-section)]">
          <div className="rounded-[2rem] bg-rust px-6 py-[clamp(3rem,6vw,4.5rem)] text-center text-white">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
              Still have questions?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Talk to an advisor who already understands your industry.
            </p>
            <div className="mt-8">
              <CTAButton
                variant="outline"
                size="lg"
                className="border-white/50 text-white hover:bg-white hover:text-rust"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
