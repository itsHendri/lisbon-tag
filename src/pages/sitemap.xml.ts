/**
 * The sitemap: the home page in each language, each pointing at its
 * translations, the same pairs the <head> lists. /styles is left out on
 * purpose (it's noindex).
 */
import type { APIRoute } from 'astro';
import { homeHref, htmlLang, langs } from '../i18n';

export const GET: APIRoute = ({ site }) => {
  const url = (l: (typeof langs)[number]) => new URL(homeHref(l), site).href;
  const alternates = [
    ...langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${htmlLang[l]}" href="${url(l)}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en')}"/>`,
  ].join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${langs.map((l) => `  <url>\n    <loc>${url(l)}</loc>\n${alternates}\n  </url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
