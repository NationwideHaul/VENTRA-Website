import Link from "next/link";
import Logo from "@/components/ui/Logo";
import CTAButton from "@/components/ui/CTAButton";
import { contact, footerLinks, site } from "@/data/site";
import { specialties } from "@/data/industries";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-sand">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand + CTA */}
          <div className="md:col-span-4">
            <Logo variant="sand" height={64} />
            <p className="mt-5 max-w-xs text-sand/70 text-sm leading-relaxed">
              Strategic protection for established businesses. For what you&rsquo;ve
              built, and what&rsquo;s next.
            </p>
            <div className="mt-6">
              <CTAButton variant="outline" size="sm" />
            </div>
          </div>

          {/* Specialties */}
          <nav className="md:col-span-3" aria-label="Industries">
            <h2 className="text-sm font-medium text-sand/50 mb-4">
              What we focus on
            </h2>
            <ul className="space-y-2.5">
              {specialties.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.href}
                    className="text-sand/80 hover:text-white transition-colors text-sm"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company quick links */}
          {footerLinks.map((group) => (
            <nav
              key={group.heading}
              className="md:col-span-2"
              aria-label={group.heading}
            >
              <h2 className="text-sm font-medium text-sand/50 mb-4">
                {group.heading}
              </h2>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sand/80 hover:text-white transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div className="md:col-span-3">
            <h2 className="text-sm font-medium text-sand/50 mb-4">Contact</h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                {/* [CONFIRM] CallRail tracking number */}
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                  className="text-sand/80 hover:text-white transition-colors"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sand/80 hover:text-white transition-colors"
                >
                  {contact.email}
                </a>
              </li>
              {/* [CONFIRM] business address */}
              <li className="text-sand/60">{contact.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar: legal + licensing */}
        <div className="mt-14 pt-8 border-t border-sand/10 flex flex-col gap-3 text-xs text-sand/50 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          {/* [CONFIRM] licensing line */}
          <p className="max-w-xl md:text-right">
            Ventra Insurance Group is a licensed insurance agency. Licensing
            details coming soon.
          </p>
        </div>
      </div>
    </footer>
  );
}
