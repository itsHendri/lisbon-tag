/**
 * Facts that are the same in every language. Edit here, not in the copy files.
 * Every `TODO` is a placeholder waiting for the real detail.
 */

export const site = {
  name: 'Lisbon Tag Rugby',
  shortName: 'Lisbon Tag',

  thursday: {
    // The park; the pin is the "Lisbon Tag Rugby" listing on Google Maps (plus code MQWX+H3).
    venue: 'Jardim Vasco da Gama, Belém',
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
    // Community WhatsApp group invite. Set it to null to hide the WhatsApp
    // buttons and make Instagram the way to get in touch.
    whatsapp: 'https://chat.whatsapp.com/Frk6E5ynkac4GsV9DxysBk' as string | null,
    instagram: 'https://www.instagram.com/lisbontagrugby/',
    instagramHandle: '@lisbontagrugby',
  },

  kit: {
    fourthwallUrl: 'https://lisbon-tag-rugby-shop.fourthwall.com/en-eur/products/lisbon-tag-shirt',
  },

  howToPlay: {
    // "How to play TAG RUGBY and the rules EXPLAINED!" by Tag Rugby Coach.
    // Swap the id for any YouTube video (the part after watch?v=).
    youtubeId: 'v7e8Y8g3sGY',
  },
} as const;
