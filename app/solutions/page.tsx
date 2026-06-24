import type { Metadata } from "next";
import PlaceholderPage from "@/components/ui/PlaceholderPage";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "The lines of coverage Ventra structures for established businesses.",
};

export default function SolutionsPage() {
  return (
    <PlaceholderPage
      eyebrow="Solutions"
      title="The coverage we structure for established businesses."
      intro="A working set of lines of coverage built around how established businesses actually operate. The confirmed list is being finalized with the team."
      phaseNote="lines of coverage in phase 5"
    />
  );
}
