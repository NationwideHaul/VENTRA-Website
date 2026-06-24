import type { Metadata } from "next";
import PlaceholderPage from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "The venture idea behind Ventra: building, investing, and taking calculated risks for growth, backed by strategic protection.",
};

export default function AboutPage() {
  return (
    <PlaceholderPage
      eyebrow="About"
      title="Built for the businesses that build."
      intro="Ventra is named for the idea of a venture: the willingness to build, invest, expand, and take calculated risks in pursuit of growth. The full brand story, our three pillars, the carrier network, and the advisor spotlight land in phase 6."
      phaseNote="company story + advisor spotlight in phase 6"
    />
  );
}
