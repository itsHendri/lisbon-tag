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
| Hero slideshow photos | `hero` list in `src/data/photos.ts` |
| "How to play tag" video | `site.howToPlay.youtubeId` in `src/data/site.ts` |
| WhatsApp group link | `site.links.whatsapp` in `src/data/site.ts`. While it's `null` the WhatsApp buttons are hidden and Instagram is the contact |
| Kick-off time | `site.thursday.start` (one time only; the calendar file assumes `durationHours`) |
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

### Videos

- **Hero:** a slow crossfade through the `hero` photos (pausable, still with reduced motion). When there's a club video, it can replace the slideshow in `src/components/Hero.astro`; keep it short (6–15 s), muted, H.264, under 4 MB at 720p.
- **How-to-play video:** any YouTube video. Put its id (the part after `watch?v=`) in `site.howToPlay.youtubeId`; the thumbnail on the card updates at the next build. The player only loads when someone opens it, through youtube-nocookie.

### The map

`site.thursday.mapsUrl` is what "Get directions" opens: use the share link of your existing Google Maps place. For `mapsEmbed`, use Google Maps → Share → *Embed a map* and copy the `src` from the iframe code. Google's embed can't be restyled, so `Where.astro` greys it out and lays two blend layers on top (navy for the darks, limestone for the lights) to match the site; clicks pass through, so it still pans and zooms.

### How-to-play video

The pill in the header (between the castle and Menu) and the first row of the menu both open the video in a full-screen player. It's a YouTube embed that loads only when opened.

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
- `.sketch` (in `global.css`) draws the hand-drawn stroke on cards and frames: four hand-drawn edges (`--edge-*` in `tokens.css`) used as masks, so it renders the same in Safari. The rule icons get their wobble from the `#rough-icon` SVG filter in `Base.astro`, applied inside each icon.
- The castle top-left changes colour with what's behind it. Mark anything dark with `data-tone="dark"`.
- `/thursdays-en.ics` and `/thursdays-pt.ics` are weekly calendar events generated from `site.ts`.

