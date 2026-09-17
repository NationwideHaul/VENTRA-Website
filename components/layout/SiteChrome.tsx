"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Chrome gate for the app shell.
 *
 * Every normal route renders inside the site Header + Footer (passed in as
 * already-rendered server nodes, so they stay server components). Standalone
 * landing pages — currently Grace's QR-code page at /grace — opt out of the
 * global nav and footer entirely and own their own minimal chrome, per the
 * "no nav menu, zero friction" brief. Add more bare routes to BARE_ROUTES.
 */

const BARE_ROUTES = ["/grace"];

export default function SiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const isBare = BARE_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`),
  );

  // Bare pages render their own <main id="main"> so the skip link still lands.
  if (isBare) return <>{children}</>;

  return (
    <>
      {header}
      <main id="main" className="pt-[var(--header-h)]">
        {children}
      </main>
      {footer}
    </>
  );
}
