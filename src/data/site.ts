/**
 * Facts that are the same in every language. Edit here, not in the copy files.
 * Every `TODO` is a placeholder waiting for the real detail.
 */

export const site = {
  name: 'Lisbon Tag Rugby',
  shortName: 'Lisbon Tag',

  thursday: {
    // The "Lisbon Tag Rugby" listing on Google Maps (plus code MQWX+H3).
    // TODO: confirm the name people should look for, e.g. the park.
    venue: 'Belém, Lisbon',
    lat: 38.6964753,
    lng: -9.2022543,
    mapsUrl: 'https://share.google/HlnjTt3IXVK4JJ5hd',
    // Works without an API key; searching the club's name drops the pin on its listing.
    mapsEmbed: 'https://www.google.com/maps?q=Lisbon+Tag+Rugby&ll=38.6964753,-9.2022543&z=16&output=embed',
    // Kick-off (24h, Lisbon time). It shifts with the seasons, so the site only
    // ever shows this one time; change it here and it updates everywhere.
    start: '18:30',
    // Used for the calendar file only.
    durationHours: 2,
    // Price is copy (facts.cost in src/i18n), so it can read naturally in each language.
  },

  links: {
    // TODO: community WhatsApp group invite link. While it's null the WhatsApp
    // buttons are hidden and Instagram is the way to get in touch.
    whatsapp: null as string | null,
    instagram: 'https://www.instagram.com/lisbontagrugby/',
    instagramHandle: '@lisbontagrugby',
  },

  kit: {
    fourthwallUrl: 'https://hendri-shop.fourthwall.com/en-eur/products/lisbon-tag-shirt',
  },

  howToPlay: {
    // "How to play TAG RUGBY and the rules EXPLAINED!" by Tag Rugby Coach.
    // Swap the id for any YouTube video (the part after watch?v=).
    youtubeId: 'v7e8Y8g3sGY',
  },
} as const;

/** "38,7223° N, 9,1393° W" — comma decimals, the way Portugal writes them. */
export function formatCoords(lat: number, lng: number) {
  const f = (n: number) => Math.abs(n).toFixed(4).replace('.', ',');
  return `${f(lat)}° ${lat >= 0 ? 'N' : 'S'}, ${f(lng)}° ${lng >= 0 ? 'E' : 'W'}`;
}
