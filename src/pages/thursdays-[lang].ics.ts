/**
 * A weekly "Lisbon Tag Rugby" calendar event (every Thursday), one file per
 * language: /thursdays-en.ics and /thursdays-pt.ics.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { site } from '../data/site';
import { nextThursday, hhmmss } from '../data/calendar';
import { homeHref, langs, useT, type Lang } from '../i18n';

export const getStaticPaths = (() => langs.map((lang) => ({ params: { lang } }))) satisfies GetStaticPaths;

// Lines are folded well under the 75-octet limit (accents are multi-byte); commas and semicolons escaped.
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n');
const fold = (line: string) => line.match(/.{1,60}/g)!.join('\r\n ');

export const GET: APIRoute = ({ params, site: siteUrl }) => {
  const lang = params.lang as Lang;
  const t = useT(lang);
  const th = site.thursday;
  const day = nextThursday();
  const url = new URL(homeHref(lang), siteUrl).href;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Lisbon Tag Rugby//Thursdays//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VTIMEZONE',
    'TZID:Europe/Lisbon',
    'BEGIN:DAYLIGHT',
    'TZOFFSETFROM:+0000',
    'TZOFFSETTO:+0100',
    'TZNAME:WEST',
    'DTSTART:19700329T010000',
    'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
    'END:DAYLIGHT',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0100',
    'TZOFFSETTO:+0000',
    'TZNAME:WET',
    'DTSTART:19701025T020000',
    'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:thursdays-${lang}@lisbontagrugby`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;TZID=Europe/Lisbon:${day}T${hhmmss(th.start)}`,
    `DURATION:PT${th.durationHours}H`,
    'RRULE:FREQ=WEEKLY;BYDAY=TH',
    `SUMMARY:${esc(t.calendar.summary)}`,
    `DESCRIPTION:${esc(`${t.calendar.description}\n${url}`)}`,
    `LOCATION:${esc(th.venue)}`,
    `GEO:${th.lat};${th.lng}`,
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return new Response(lines.map(fold).join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
