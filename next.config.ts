import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Brand logos and future imagery are served from /public.
    // Add remote patterns here when a CMS / DAM is introduced.
    formats: ["image/avif", "image/webp"],
    // Cap at 1920: our hero source is 2000px wide, so a 4K (3840) variant
    // only upscales — and on some local filesystems that variant gets
    // corrupted in the optimizer cache. Production (Vercel) is unaffected.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
