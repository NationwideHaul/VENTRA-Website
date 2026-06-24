import type { Metadata } from "next";
import PlaceholderPage from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thanks for reaching out. An advisor will be in touch shortly.",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <PlaceholderPage
      eyebrow="Thank you"
      title="Thanks. An advisor will be in touch."
      intro="We've received your note and an advisor will reach out shortly to talk through your business. This post-submit page is finalized alongside the contact form in phase 7."
      phaseNote="post-submit confirmation in phase 7"
    />
  );
}
