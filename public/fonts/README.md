# Brand fonts (self-hosted)

The site self-hosts the two licensed brand families. The licensed
`.woff2` files were **not** included in the branding hand-off, so drop them
here and the `@font-face` rules in `app/globals.css` will pick them up
automatically. Until then the site renders with the fallback stacks
(a modern grotesk for Pacaembu, a clean serif for Ellery), which is the
intended graceful-degradation behavior from the build brief.

Expected filenames (referenced by `app/globals.css`):

## Pacaembu — primary / headings
- `pacaembu-regular.woff2` (400)
- `pacaembu-medium.woff2` (500)
- `pacaembu-semibold.woff2` (600)
- `pacaembu-bold.woff2` (700)

## Ellery — secondary / accent subheads ("Elle" in the brief)
- `ellery-regular.woff2` (400)
- `ellery-italic.woff2` (400 italic)

You only need the weights you actually use; missing weights fall back
gracefully. All faces use `font-display: swap`.

If a family ships with different weights/names, update the `@font-face`
blocks in `app/globals.css` to match — that file is the single source of
truth for font wiring.
