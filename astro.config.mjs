// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // The live domain, used for canonical URLs, hreflang and the sitemap. SITE_URL/BASE_PATH override it for test builds.
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
    domains: ['i.ytimg.com'],
  },
});
