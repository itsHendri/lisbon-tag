/**
 * The weekly Thursday event, shared by the .ics file and the Google Calendar
 * link so both always agree.
 */
import { site } from './site';

/** The first Thursday on or after the build date, as YYYYMMDD. */
export function nextThursday() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + ((4 - d.getUTCDay() + 7) % 7));
  return d.toISOString().slice(0, 10).replaceAll('-', '');
}

/** "18:30" → "183000" */
export const hhmmss = (t: string) => t.replace(':', '') + '00';

function endTime() {
  const [h, m] = site.thursday.start.split(':').map(Number);
  const end = h * 60 + m + site.thursday.durationHours * 60;
  return `${String(Math.floor(end / 60)).padStart(2, '0')}${String(end % 60).padStart(2, '0')}00`;
}

/** A Google Calendar "add event" link that repeats every Thursday, in Lisbon time. */
export function googleCalendarUrl(title: string, details: string) {
  const day = nextThursday();
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${day}T${hhmmss(site.thursday.start)}/${day}T${endTime()}`,
    ctz: 'Europe/Lisbon',
    details,
    location: site.thursday.venue,
    recur: 'RRULE:FREQ=WEEKLY;BYDAY=TH',
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
