# Lisbon Tag Rugby

A one-page site for Lisbon Tag Rugby: who we are, how tag works, where and when we play, and the club kit. Mobile first, in English (`/`) and Portuguese (`/pt/`).

Built with Astro, plain CSS, GSAP (ScrollTrigger + SplitText) and Lenis. No UI framework.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run deploy     # build + Cloudflare Pages (needs wrangler login)
```

## Editing content

| What | Where |
| --- | --- |
| Venue, times, coordinates, Maps links, WhatsApp/Instagram, Fourthwall URL, kit price | `src/data/site.ts` |
| All wording, English | `src/i18n/en.ts` |
| All wording, Portuguese | `src/i18n/pt.ts` (same shape; TypeScript complains if a key is missing) |
| Photos | `src/data/photos.ts` |
| Hero loop video | `public/video/hero-loop.mp4` (desktop) and `hero-loop-540.mp4` (phones) |
| "How to play" video (card bottom-right) | `site.howToPlay.youtubeId` in `src/data/site.ts` |
| Rule icons | `src/components/HowToPlay.astro` ([Phosphor](https://phosphoricons.com), MIT, bold weight) |

Search the project for `TODO` to find every placeholder still waiting for a real detail.

### Swapping in real photos

1. Put the file in `src/assets/photos/`.
2. In `src/data/photos.ts`, import it and use the import as `src`:

   ```ts
   import pitch from '../assets/photos/pitch.jpg';
   // …
   thursday: { src: pitch, alt: { en: 'Our Thursday pitch', pt: 'O nosso campo às quintas' } },
   ```

3. Astro resizes it and converts it to WebP at build time. Add `position: '50% 30%'` if the crop needs nudging.

Once no `images.unsplash.com` URLs are left, remove `image.domains` from `astro.config.mjs`.

### Swapping the videos

- **Hero loop:** keep it short (6–15 s), muted, H.264 MP4, ideally under 4 MB at 720p and under 2 MB at 540p. Replace both files and keep the names.
- **How-to-play video:** any YouTube video. Put its id (the part after `watch?v=`) in `site.howToPlay.youtubeId`; the thumbnail on the card updates at the next build. The player only loads when someone opens it, through youtube-nocookie.

### The map

`site.thursday.mapsUrl` is what "Open in Google Maps" and "Get directions" open: use the share link of your existing Google Maps place. For `mapsEmbed`, use Google Maps → Share → *Embed a map* and copy the `src` from the iframe code. The map only loads when someone taps "Show map", so Google's cookies stay off the page until then.

### The shirt

The kit section shows the two 3D renders from the Figma size-chart post (`src/assets/kit/shirt-front-3d.png`, `shirt-back-3d.png`). The **Buy** button links to `site.kit.fourthwallUrl`.

## Fonts

`public/fonts/lisbon-tag-core.woff2` (basic Latin) and `lisbon-tag-ext.woff2` (Portuguese accents only, loaded only when an accented character appears in a heading) are subsets of `Lisbon Tag.ttf`. To regenerate them after a font change:

```bash
pip install fonttools brotli
pyftsubset "Lisbon Tag.ttf" --unicodes="U+0020-007E,U+00A0,U+2013-2014,U+2018-201E,U+2022,U+2026" --layout-features='*' --flavor=woff2 --output-file=public/fonts/lisbon-tag-core.woff2
pyftsubset "Lisbon Tag.ttf" --text="àáâãçéêíóôõúüÀÁÂÃÇÉÊÍÓÔÕÚÜªº€" --layout-features='*' --flavor=woff2 --output-file=public/fonts/lisbon-tag-ext.woff2
```

## How it fits together

- `src/components/Home.astro` puts the page together in order. Each section has an `id` that matches `sectionIds` in `src/i18n/index.ts`, which drives the section pill and its sheet.
- `src/scripts/motion.ts` contains every scroll animation, applied through `data-` attributes (`data-reveal`, `data-split`, `data-parallax`, `data-zoom`). With *Reduce motion* turned on, it does nothing and the page is still complete: no content is hidden waiting for an animation.
- `src/styles/tokens.css` holds the colours, type and spacing. Sections switch theme with `.theme-light`, `.theme-navy` or `.theme-granite`.
- Every dark section sits in `TileFrame.astro`: an azulejo border with a navy (or granite) card inside, like the Figma posts.
- `.sketch` (in `global.css`) draws the hand-drawn stroke on cards and frames. It roughens a plain border with the `#rough` SVG filter defined in `Base.astro`.
- The castle top-left changes colour with what's behind it. Mark anything dark with `data-tone="dark"`.
- `/thursdays-en.ics` and `/thursdays-pt.ics` are weekly calendar events generated from `site.ts`.

Placeholder photos from [Unsplash](https://unsplash.com), placeholder video from [Pexels](https://www.pexels.com).
