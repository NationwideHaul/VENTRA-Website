import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteChrome from "@/components/layout/SiteChrome";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { ContactModalProvider } from "@/components/contact/contact-modal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — Strategic protection for established businesses`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Strategic protection for established businesses`,
    description: site.description,
    url: `https://${site.domain}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Strategic protection for established businesses`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Mark JS as available before first paint so scroll-reveal only
            hides content when it can actually be revealed. No-JS and
            crawlers render everything visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        {/* Global smooth scroll (no-op under prefers-reduced-motion) */}
        <SmoothScroll />

        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sand"
        >
          Skip to content
        </a>

        <ContactModalProvider>
          {/* Header + Footer render on every route except bare landing pages
              (e.g. /grace), which own their own minimal chrome. */}
          <SiteChrome header={<Header />} footer={<Footer />}>
            {children}
          </SiteChrome>
        </ContactModalProvider>
      </body>
    </html>
  );
}
