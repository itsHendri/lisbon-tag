/**
 * English copy. `pt.ts` must have exactly the same shape (TypeScript checks it).
 * Places, times and links live in src/data/site.ts.
 */
export const en = {
  meta: {
    title: 'Lisbon Tag Rugby · Tag rugby every Thursday in Lisbon',
    description:
      'A friendly, mixed tag rugby group in Lisbon. We play every Thursday, beginners welcome. How tag works, where we play and how to join.',
  },

  nav: {
    skip: 'Skip to content',
    home: 'Lisbon Tag Rugby, back to top',
    menu: 'Menu',
    sections: 'Sections',
    close: 'Close',
    otherLang: 'PT',
    otherLangLabel: 'Ver em português',
    film: 'How to play',
    filmSub: 'Watch the video',
    closeFilm: 'Close video',
  },

  sections: {
    home: 'Lisbon Tag',
    about: 'Who we are',
    thursdays: 'Thursdays',
    how: 'How to play',
    outfit: 'What to wear',
    kit: 'The kit',
    where: 'Where',
    social: '3rd half',
    faq: 'FAQ',
    join: 'Join us',
  },

  facts: {
    day: 'Every Thursday',
    // TODO: confirm.
    cost: 'Free, just turn up',
    bring: 'Water & trainers',
    level: 'Beginners welcome',
  },

  hero: {
    sub: 'Every Thursday. Beginners welcome.',
    join: 'How to join',
    pause: 'Pause background video',
    play: 'Play background video',
  },

  about: {
    // Not shown: names the section for screen readers.
    heading: 'Who we are',
    statement:
      'A mixed bunch of locals, expats and passers-through who meet every Thursday to play tag rugby, have a laugh and, usually, a drink after.',
    body: 'No tackles, no experience needed, no pressure. Some of us played rugby for years, some had never held the ball before their first Thursday. Tag is fast, social and easy to pick up: come once and you will know half the team by the end of the night.',
  },

  thursdays: {
    title: 'Tag Rugby Thursdays',
    place: 'Belém, Lisbon',
    rows: {
      place: 'Place',
      time: 'Time',
      cost: 'Cost',
      bring: 'Bring',
    },
    calendar: 'Add to calendar',
    directions: 'Get directions',
  },

  how: {
    title: 'How tag works',
    intro:
      'Tag is rugby without the tackles. Everyone wears a belt with two tags, one on each hip. Instead of bringing the ball carrier down, you pull one off. That is the tackle.',
    rulesTitle: 'The rules',
    // Titles only: each one has an icon in HowToPlay.astro, in this order.
    rules: [
      'Seven a side',
      'Tag = tackle',
      'Pass within 3 seconds',
      'Defence back 5\u00a0m',
      'Six tags, then turnover',
      'Pass backwards only',
      'Grubber kicks any time',
      'No contact',
      'Ground it for a try',
    ],
    first: {
      title: 'Never played?',
      steps: [
        'Arrive ten minutes early and say olá. We will lend you a belt.',
        'Wear comfortable sportswear and trainers or boots.',
        'Play. We explain as we go, and nobody minds a forward pass on your first night.',
      ],
    },
  },

  outfit: {
    title: 'What to wear',
    intro: 'You don’t need much.',
    items: {
      sportswear: {
        title: 'Comfortable sportswear',
        body: 'Whatever you would go for a run in. Shorts or leggings and a T-shirt.',
      },
      boots: {
        title: 'Trainers or boots',
        body: 'Moulded studs or astro shoes on grass, trainers are fine too. No metal studs. Barefoot on the beach.',
      },
      essentials: {
        title: 'Essentials',
        body: 'Water, sunscreen and a hat. Lisbon is warm most of the year.',
      },
    },
  },

  kit: {
    title: 'The Lisbon Tag shirt',
    body: 'Our playing shirt is a love letter to the city: azulejo tiles like the ones on Lisbon’s walls, our name on the chest, and the castle and waves down the side. It is the shirt you see on Thursdays and on the beach.',
    priceLabel: 'Price',
    // TODO: confirm product details.
    details: ['Light, sleeveless, made to play in', 'Full tile print, front and back', 'Ordered and shipped through Fourthwall'],
    buy: 'Buy on Fourthwall',
    ask: 'Sizing question? Message us',
    frontAlt: 'Front of the Lisbon Tag shirt: blue and white azulejo tiles, “Lisbon Tag” and a crest on the chest',
    backAlt: 'Back of the Lisbon Tag shirt: azulejo tiles with “Lisbon Tag” across the shoulders',
  },

  where: {
    title: 'Where we play',
    body: 'Every Thursday in Lisbon. Look for the group in blue and white tiles.',
    transport: 'Tram 15E or the Cascais line train to Belém',
    showMap: 'Show map',
    mapNote: 'Loads Google Maps',
    openMaps: 'Open in Google Maps',
    mapTitle: 'Map of where we play on Thursdays',
    beach: {
      title: 'Beach Tag Sundays',
      body: 'A few times a season we take it to the sand at Praia de Carcavelos, 20 minutes by train from Cais do Sodré. Dates go up on WhatsApp and Instagram first.',
    },
  },

  social: {
    title: 'The 3rd half.',
    body: 'Tag is the excuse. Afterwards there is usually a drink, and a few times a year there are beach days, tournaments and the odd pub crawl.',
    cta: 'Follow along on Instagram',
  },

  faq: {
    title: 'Good to know',
    items: [
      {
        q: 'I’ve never played rugby. Can I come?',
        a: 'Yes. Most people who join have never played tag before. We explain the rules in five minutes and you will be playing in ten.',
      },
      {
        q: 'Do I need to sign up?',
        a: 'No, just show up. Joining the WhatsApp group helps: that is where we share last-minute changes and the occasional cancellation.',
      },
      {
        // TODO: confirm.
        q: 'How much does it cost?',
        a: 'Thursdays are free. Just bring water and good vibes.',
      },
      {
        q: 'Is it mixed?',
        a: 'Yes. Men and women play together, and everyone gets the ball.',
      },
      {
        // TODO: confirm cut-off time.
        q: 'What if it rains?',
        a: 'Light rain, we play. If the weather is properly bad we call it off in the WhatsApp group in the afternoon.',
      },
      {
        q: 'I’m only in Lisbon for a week. Can I still come?',
        a: 'Absolutely. Travellers are always welcome. Pack your trainers.',
      },
    ],
  },

  join: {
    title: 'See you Thursday.',
    body: 'No sign-up, no experience needed. Turn up ten minutes early and say olá.',
    whatsapp: 'Join the WhatsApp group',
    instagram: 'Follow on Instagram',
    calendar: 'Add Thursdays to my calendar',
  },

  footer: {
    made: 'Feito em Lisboa',
    credits: 'Placeholder video from Pexels, boots photo from Unsplash.',
    rights: 'Lisbon Tag Rugby',
  },

  calendar: {
    summary: 'Lisbon Tag Rugby',
    description: 'Tag rugby every Thursday. Beginners welcome. Bring water and trainers.',
  },
};

export type Dict = typeof en;
