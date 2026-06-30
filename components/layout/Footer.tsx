import Link from "next/link";
import Logo from "@/components/ui/Logo";
import CTAButton from "@/components/ui/CTAButton";
import { contact, footerLinks, site, social } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-sand">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Logo variant="sand" height={120} />
            <p className="mt-5 max-w-xs text-sand/70 text-sm leading-relaxed">
              Strategic protection for established businesses. For what you&rsquo;ve
              built, and what&rsquo;s next.
            </p>
          </div>

          {/* Quick link columns */}
          {footerLinks.map((group) => (
            <nav
              key={group.heading}
              className="md:col-span-2"
              aria-label={group.heading}
            >
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sand/80 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact: large phone, then email + address beside the CTA */}
          <div className="md:col-span-4">
            {/* [CONFIRM] CallRail tracking number */}
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="block font-heading text-3xl font-bold text-white transition-colors hover:text-rust sm:text-4xl"
            >
              {contact.phone}
            </a>

            <div className="mt-6 space-y-1.5 text-sm">
              <a
                href={`mailto:${contact.email}`}
                className="block text-base text-sand/80 hover:text-white transition-colors"
              >
                {contact.email}
              </a>
              {/* [CONFIRM] business address */}
              <p className="text-sand/60">{contact.address}</p>
            </div>

            {/* [CONFIRM] official LinkedIn URL */}
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} on LinkedIn`}
              className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand/30 text-sand transition-colors hover:border-rust hover:bg-rust hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden
              >
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>

            <div className="mt-6">
              <CTAButton size="xl">Talk With Us</CTAButton>
            </div>
          </div>
        </div>

        {/* Bottom bar: legal + licensing */}
        <div className="mt-14 pt-8 border-t border-sand/10 flex flex-col gap-3 text-xs text-sand/50 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <span>Ventra works under Complete Carrier Coverage LLC</span>
          </div>
        </div>

        {/* Legal disclaimer — full width so it reads as continuous text */}
        <p className="mt-6 text-[0.6875rem] leading-relaxed text-sand/40">
          Ventra Insurance Group LLC is a licensed commercial insurance
          brokerage operating in all 50 states. All policies are placed under
          Complete Carrier Coverage LLC, provided by third-party licensed
          insurers. Products, coverage terms, availability, and pricing may vary
          by state and are subject to insurer underwriting guidelines. Please
          refer to your policy documents for full terms, conditions, and
          exclusions.
        </p>
      </div>
    </footer>
  );
}
