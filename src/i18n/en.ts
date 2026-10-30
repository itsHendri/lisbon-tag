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
    // The header's language half names the other language, in that language.
    otherLang: 'Ver em português',
    sections: 'Sections',
    close: 'Close',
    language: 'Language',
    film: 'How to play tag',
    filmSub: 'The rules in 4 minutes',
    filmShort: 'How to play',
    closeFilm: 'Close video',
  },

  sections: {
    home: 'Lisbon Tag',
    about: 'Who we are',
    how: 'The basics',
    outfit: 'What to bring',
    kit: 'The kit',
    where: 'Where',
    social: '3rd half',
    faq: 'FAQ',
    join: 'Join us',
  },

  facts: {
    day: 'Every Thursday',
    cost: 'Free, just turn up',
    bring: 'Water & trainers',
    level: 'Beginners welcome',
  },

  hero: {
    sub: 'Tag rugby in Belém. No tackles, no sign-up, no experience needed.',
    // The facts along the bottom of the photo; the level is facts.level.
    labels: { when: 'When', where: 'Where', cost: 'Cost', level: 'Level' },
    day: 'Thursdays',
    cost: 'Free',
  },

  about: {
    // Not shown: names the section for screen readers.
    heading: 'Who we are',
    statement: 'Locals, expats and passers-through playing tag rugby every Thursday, usually with a drink after.',
    body: 'No tackles, no experience needed, no pressure. Some of us played rugby for years, some had never held the ball before their first session. Tag is fun, social and easy to pick up: come once and you will know half the team by the end of the night.',
  },

  actions: {
    calendar: 'Add to calendar',
    directions: 'Get directions',
  },

  how: {
    title: 'The basics',
    intro:
      'Tag is rugby without the tackles. Everyone wears a belt with two tags, one on each hip. Instead of bringing the ball carrier down, you pull one off. That is the tackle.',
    // Titles only: each one has an icon in HowToPlay.astro, in this order.
    rules: [
      'Seven a side',
      'Tag = tackle',
      'Tagged? Stop and place',
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
        { title: 'Turn up', body: 'Arrive ten minutes early and say olá. We will lend you a belt.' },
        { title: 'Dress to run', body: 'Wear comfortable sportswear and trainers or boots.' },
        { title: 'Play', body: 'We explain as we go, and nobody minds a forward pass on your first night.' },
      ],
    },
  },

  outfit: {
    title: 'What to wear',
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
    buy: 'Buy now',
    frontAlt: 'Front of the Lisbon Tag shirt: blue and white azulejo tiles, “Lisbon Tag” and a crest on the chest',
    backAlt: 'Back of the Lisbon Tag shirt: azulejo tiles with “Lisbon Tag” across the shoulders',
  },

  where: {
    title: 'Where we play',
    transport: 'Tram 15E or the Cascais line train to Belém',
    rows: {
      time: 'Kick-off',
      cost: 'Cost',
      bring: 'Bring',
      level: 'Level',
    },
    mapAlt: 'Hand-drawn map of Belém. Jardim Vasco da Gama sits between Rua de Belém and the railway, by the river.',
    mapStation: 'Belém station',
    mapCredit: '© OpenStreetMap contributors',
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
        a: 'No, just show up. Do join our WhatsApp group (the button is at the bottom of the page): that is where we share last-minute changes and the occasional cancellation.',
      },
      {
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
    whatsapp: 'Join on WhatsApp',
    instagram: 'Follow on Instagram',
    // Shown while there's no WhatsApp link: Instagram becomes the main action.
    instagramPrimary: 'Message us on Instagram',
    instagramNote: 'Message us on Instagram and we’ll add you to the community WhatsApp group.',
  },

  footer: {
    made: 'Made in Lisbon',
    tagline: 'For the love of the game.',
    rights: 'Lisbon Tag Rugby',
  },

  calendar: {
    summary: 'Lisbon Tag Rugby',
    description: 'Tag rugby every Thursday. Beginners welcome. Bring water and trainers.',
  },
};

export type Dict = typeof en;
