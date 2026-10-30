/**
 * robots.txt: search engines welcome, the /styles reference kept out.
 * AI crawlers are turned away by Cloudflare at the edge (Block AI bots), not here.
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *
Allow: /
Disallow: /styles

Sitemap: ${new URL('sitemap.xml', site).href}
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
