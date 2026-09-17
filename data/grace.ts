/**
 * Grace Vengelis — personal landing page (/grace).
 *
 * Reached by scanning the QR code on Grace's business card right after meeting
 * her in person, so everything here is tuned for a warm, zero-friction mobile
 * hand-off. All contact values fall back to the shared brand details in
 * data/site.ts and can be overridden per-rep via env vars WITHOUT touching any
 * component — drop the real values in .env.local when they arrive.
 */

import { contact } from "@/data/site";
import portrait from "@/public/team/grace.jpg";

/**
 * The Next.js image optimizer corrupts variants in its on-disk cache on this
 * project's local filesystem (see the note in next.config.ts — the homepage
 * sidesteps it with `unoptimized`). Vercel optimizes fine, so we only bypass the
 * optimizer in dev: production still ships fully optimized images for Lighthouse.
 */
export const DEV_IMAGE_UNOPTIMIZED = process.env.NODE_ENV !== "production";

export const grace = {
  name: "Grace Vengelis",
  /** Job title — shown as the hero eyebrow. */
  title: "Market Development Representative",
  /** Optimized by next/image on the page (StaticImageData → width/height baked in). */
  portrait,
  /**
   * Tap-to-call number for the "Prefer to talk now?" fallback and the sticky
   * bar. Defaults to the brand line until Grace's direct DID is provided.
   * Override with NEXT_PUBLIC_GRACE_PHONE (client-readable — it is public).
   */
  phone: process.env.NEXT_PUBLIC_GRACE_PHONE ?? contact.phone,
  /** The main marketing site (logo + trust strip link). */
  homeUrl: "/",
} as const;

/** Phone as a bare `tel:` value, e.g. "(888) 592-8446" → "+18885928446" is not
 *  assumed — we only strip to digits/plus so any provided format works. */
export const graceTel = grace.phone.replace(/[^\d+]/g, "");

/**
 * The two forms on Grace's page both post to /api/lead (Supabase + Resend + CRM),
 * exactly like every other form on the site. `formId` selects the CRM Form
 * Mapping / destination; `rep: "grace"` is attached in each form's `fields` so
 * the lead is unmistakably hers in Supabase, the notification email, and GHL.
 */
export const GRACE_FORMS = {
  review: "grace-review",
  contact: "grace-contact",
} as const;
