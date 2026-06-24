import Link from "next/link";
import Section from "@/components/motion/Section";
import CTAButton from "@/components/ui/CTAButton";

export default function NotFound() {
  return (
    <Section className="min-h-[60vh]">
      <p className="eyebrow text-rust mb-4">404</p>
      <h1 className="text-4xl sm:text-5xl text-ink max-w-2xl">
        This page took a different route.
      </h1>
      <p className="mt-6 text-lg text-ink/70 max-w-xl">
        The page you&rsquo;re looking for isn&rsquo;t here. Head back home, or talk
        to an advisor and we&rsquo;ll point you the right way.
      </p>
      <div className="mt-9 flex flex-wrap gap-4">
        <CTAButton size="lg" />
        <Link
          href="/"
          className="inline-flex h-13 items-center rounded-full border border-ink/20 px-8 text-ink hover:border-rust hover:text-rust transition-colors"
        >
          Back home
        </Link>
      </div>
    </Section>
  );
}
