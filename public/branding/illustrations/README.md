# Industry illustrations (hero selector)

Drop one illustration per specialty here and the home hero tiles will use
them automatically. Until a file exists, the tile shows a branded placeholder
box (no broken image).

Expected files (referenced by `components/home/HeroIndustrySelector.tsx`):

- `construction.png`
- `hospitality.png`
- `real-estate.png`
- `transportation.png`

(The "More industries" tile uses a built-in grid icon, no file needed.)

Guidance:
- Square-ish artwork (roughly 1:1), transparent PNG or SVG.
- Designed to sit half-above the tile's top edge (Progressive-style), so keep
  the subject centered with a little breathing room.
- `.svg` is preferred for crispness; if you use SVG, change the `ext` in
  `HeroIndustrySelector.tsx` from `png` to `svg`.
