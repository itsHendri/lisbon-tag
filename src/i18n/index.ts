import { en } from './en';
import { pt } from './pt';

export const langs = ['en', 'pt'] as const;
export type Lang = (typeof langs)[number];

const dicts = { en, pt };

export function useT(lang: Lang) {
  return dicts[lang];
}

/**
 * A site path with the deploy base in front ("/" locally, "/lisbon-tag/" on
 * GitHub Pages). Use it for every link that starts at the site root.
 */
export function withBase(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/** Root URL of each language. */
export function homeHref(lang: Lang) {
  return withBase(lang === 'en' ? '/' : '/pt/');
}

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'pt' : 'en');

export const htmlLang: Record<Lang, string> = { en: 'en', pt: 'pt-PT' };

/** Section ids, in page order. The section pill and the sheet read this. */
export const sectionIds = ['home', 'about', 'where', 'how', 'outfit', 'kit', 'social', 'faq', 'join'] as const;
export type SectionId = (typeof sectionIds)[number];
