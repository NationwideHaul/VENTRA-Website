import type { Metadata } from "next";
import PlaceholderPage from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about working with Ventra Insurance Group.",
};

export default function FaqPage() {
  return (
    <PlaceholderPage
      eyebrow="FAQ"
      title="Questions, answered."
      intro="Common questions about how we work, what we cover, and what to expect when you partner with Ventra. The full FAQ is on its way — in the meantime, start a conversation and we'll answer anything specific to your business."
      phaseNote="full FAQ content pending"
    />
  );
}
