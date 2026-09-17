import GraceCTA from "@/components/grace/GraceCTA";

/**
 * The two primary calls to action, side by side (stacked on mobile). Each
 * smooth-scrolls to the forms and pre-selects its tab.
 */

const base =
  "inline-flex h-13 items-center justify-center rounded-full px-7 text-base font-medium transition-colors duration-200 ease-out";

export default function GraceCTAs() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <GraceCTA tab="review" className={`${base} bg-rust text-white hover:bg-ink`}>
        Get Your Free Policy Review
      </GraceCTA>
      <GraceCTA
        tab="contact"
        className={`${base} border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/[0.03]`}
      >
        Question? Contact Us
      </GraceCTA>
    </div>
  );
}
