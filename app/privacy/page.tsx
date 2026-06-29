import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Ventra Insurance Group collects, uses, and protects the information you share with us.",
};

/**
 * Starter Privacy Policy. The copy below is professional boilerplate for a
 * commercial insurance brokerage — it should be reviewed and finalized by
 * legal counsel before launch. Company-specific details flagged [CONFIRM].
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      effectiveDate="June 29, 2026"
      intro="Ventra Insurance Group LLC (“Ventra,” “we,” “us,” or “our”) respects your privacy. This policy explains what information we collect, how we use it, and the choices you have when you visit our website or request our services."
      sections={[
        {
          heading: "Information We Collect",
          body: [
            "We collect information you provide directly to us — such as your name, business name, email address, phone number, state, industry, and any details you share when you request a consultation or contact us.",
            "We also automatically collect certain technical information when you visit our site, including your IP address, browser type, device information, and pages viewed, through cookies and similar technologies.",
          ],
        },
        {
          heading: "How We Use Your Information",
          body: [
            "We use the information we collect to respond to your inquiries, prepare and present insurance proposals, place and service coverage, comply with legal and regulatory obligations, and improve our website and services.",
            "We may use your contact details to follow up about your request or to share information we believe is relevant to your business. You can opt out of non-essential communications at any time.",
          ],
        },
        {
          heading: "How We Share Information",
          body: [
            "To place and service coverage, we may share your information with third-party licensed insurers, Complete Carrier Coverage LLC, and service providers who support our operations. We require these parties to protect your information and use it only for the purposes for which it was shared.",
            "We do not sell your personal information. We may disclose information when required by law, regulation, or legal process, or to protect the rights, property, or safety of Ventra, our clients, or others.",
          ],
        },
        {
          heading: "Data Security & Retention",
          body: [
            "We maintain reasonable administrative, technical, and physical safeguards designed to protect your information. No method of transmission or storage is completely secure, however, and we cannot guarantee absolute security.",
            "We retain your information for as long as needed to provide our services and to meet legal, regulatory, and recordkeeping requirements.",
          ],
        },
        {
          heading: "Your Choices",
          body: [
            "You may request access to, correction of, or deletion of your personal information, subject to applicable law and our recordkeeping obligations. You can also manage cookies through your browser settings.",
            "Depending on your state of residence, you may have additional privacy rights. To exercise any of these rights, contact us using the details below.", // [CONFIRM] state-specific rights (e.g. CCPA)
          ],
        },
        {
          heading: "Contact Us",
          body: [
            "If you have questions about this Privacy Policy or how we handle your information, please contact us through the details listed on our Contact page.", // [CONFIRM] privacy contact email / mailing address
          ],
        },
      ]}
    />
  );
}
