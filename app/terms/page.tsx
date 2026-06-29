import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern your use of the Ventra Insurance Group website.",
};

/**
 * Starter Terms & Conditions. The copy below is professional boilerplate for
 * a commercial insurance brokerage — it should be reviewed and finalized by
 * legal counsel before launch. Company-specific details flagged [CONFIRM].
 */
export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      effectiveDate="June 29, 2026"
      intro="These Terms & Conditions govern your access to and use of the Ventra Insurance Group LLC website. By using this site, you agree to these terms. If you do not agree, please do not use the site."
      sections={[
        {
          heading: "About Ventra",
          body: [
            "Ventra Insurance Group LLC is a licensed commercial insurance brokerage operating in all 50 states. All policies are placed under Complete Carrier Coverage LLC and provided by third-party licensed insurers.",
            "Nothing on this website constitutes an offer to insure, a binder, or a contract of insurance. Coverage is only bound when confirmed in writing by an authorized insurer.",
          ],
        },
        {
          heading: "Use of the Site",
          body: [
            "You agree to use this website only for lawful purposes and not to interfere with its operation, security, or availability. You may not attempt to gain unauthorized access to any portion of the site or its related systems.",
            "We may modify, suspend, or discontinue any part of the site at any time without notice.",
          ],
        },
        {
          heading: "No Professional Advice",
          body: [
            "Content on this website is provided for general informational purposes only and does not constitute insurance, legal, tax, or financial advice. Products, coverage terms, availability, and pricing may vary by state and are subject to insurer underwriting guidelines.",
            "You should review your policy documents for the full terms, conditions, and exclusions that apply to your coverage, and consult a qualified advisor regarding your specific situation.",
          ],
        },
        {
          heading: "Intellectual Property",
          body: [
            "All content on this site — including text, graphics, logos, and the Ventra name and marks — is owned by or licensed to Ventra and is protected by applicable intellectual property laws. You may not use, reproduce, or distribute it without our prior written permission.",
          ],
        },
        {
          heading: "Third-Party Links",
          body: [
            "This site may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of those sites, and links do not imply our endorsement.",
          ],
        },
        {
          heading: "Disclaimer & Limitation of Liability",
          body: [
            "This website is provided “as is” and “as available” without warranties of any kind, whether express or implied. To the fullest extent permitted by law, Ventra is not liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, this site.",
          ],
        },
        {
          heading: "Governing Law & Changes",
          body: [
            "These terms are governed by the laws of the state in which Ventra is organized, without regard to conflict-of-law principles.", // [CONFIRM] governing-law state
            "We may update these Terms & Conditions from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.",
          ],
        },
      ]}
    />
  );
}
