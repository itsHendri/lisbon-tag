// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Set by the GitHub Pages workflow; locally the site lives at the root.
  // TODO: swap the fallback for the real domain once it's registered.
  site: process.env.SITE_URL ?? 'https://lisbontagrugby.com',
  base: process.env.BASE_PATH ?? '/',
  devToolbar: { enabled: false },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
  image: {
    // Unsplash placeholders. Remove once every photo in src/data/photos.ts is local.
    // i.ytimg.com: the how-to-play video thumbnail.
    domains: ['images.unsplash.com', 'i.ytimg.com'],
  },
});
