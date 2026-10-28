/**
 * Every photo on the site, in one place.
 *
 * Club photos live in src/assets/photos/ (p01–p29, from the Figma "Photos"
 * frame, same numbering). To swap one, change the import or point an entry at
 * another file; Astro resizes and converts it at build time. Add
 * `position: '50% 30%'` when a crop needs nudging.
 */
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';

import p01 from '../assets/photos/p01.jpg';
import p02 from '../assets/photos/p02.jpg';
import p03 from '../assets/photos/p03.jpg';
import p04 from '../assets/photos/p04.jpg';
import p05 from '../assets/photos/p05.jpg';
import p06 from '../assets/photos/p06.jpg';
import p07 from '../assets/photos/p07.jpg';
import p09 from '../assets/photos/p09.jpg';
import p10 from '../assets/photos/p10.jpg';
import p11 from '../assets/photos/p11.jpg';
import p12 from '../assets/photos/p12.jpg';
import p13 from '../assets/photos/p13.jpg';
import p15 from '../assets/photos/p15.jpg';
import p17 from '../assets/photos/p17.jpg';
import p18 from '../assets/photos/p18.jpg';
import p20 from '../assets/photos/p20.jpg';
import p21 from '../assets/photos/p21.jpg';
import p23 from '../assets/photos/p23.jpg';
import p25 from '../assets/photos/p25.jpg';
import p26 from '../assets/photos/p26.jpg';
import p29 from '../assets/photos/p29.jpg';

export type Photo = {
  src: string | ImageMetadata;
  alt: Record<Lang, string>;
  /** CSS object-position, for crops on narrow screens. */
  position?: string;
};

// Unsplash placeholder (free licence) for the one shot we don't have yet.
// Remove `images.unsplash.com` from astro.config.mjs once it's replaced.
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=80`;

export const photos = {
  // Hero slideshow, in order. The first one is also the still for reduced motion.
  hero: [
    {
      src: p01,
      alt: { en: 'The Lisbon Tag Rugby group on a park pitch', pt: 'O grupo do Lisbon Tag Rugby num relvado' },
      position: '50% 60%',
    },
    {
      src: p09,
      alt: { en: 'A game of beach tag in Lisbon Tag shirts', pt: 'Um jogo de tag na praia com camisolas Lisbon Tag' },
    },
    {
      src: p11,
      alt: { en: 'Players celebrating on the beach', pt: 'Jogadores a celebrar na praia' },
    },
    {
      src: p21,
      alt: { en: 'The group together on the sand', pt: 'O grupo junto na areia' },
      position: '50% 70%',
    },
    {
      src: p23,
      alt: { en: 'The group on the beach at sunset', pt: 'O grupo na praia ao pôr do sol' },
      position: '50% 70%',
    },
  ],

  // Who we are — collage
  intro1: {
    src: p20,
    alt: { en: 'Players on the beach after a game', pt: 'Jogadores na praia depois de um jogo' },
  },
  intro2: {
    src: p15,
    alt: { en: 'Two players in Lisbon Tag shirts giving a thumbs up', pt: 'Dois jogadores com a camisola Lisbon Tag a fazer sinal de positivo' },
  },
  intro3: {
    src: p03,
    alt: { en: 'Drinks in the sun after tag', pt: 'Bebidas ao sol depois do tag' },
  },
  intro4: {
    src: p26,
    alt: { en: 'Two players from behind in Lisbon Tag shirts on the beach', pt: 'Dois jogadores de costas com a camisola Lisbon Tag na praia' },
  },

  // Chapter
  thursday: {
    src: p02,
    alt: { en: 'The group together on the grass', pt: 'O grupo junto no relvado' },
    position: '50% 60%',
  },

  // Outfit
  sportswear: {
    src: p17,
    alt: { en: 'Players in sportswear and club shirts on the beach', pt: 'Jogadores de roupa desportiva e camisolas do clube na praia' },
  },
  boots: {
    src: u('1511886929837-354d827aae26'),
    alt: { en: 'Football boots resting on a ball', pt: 'Chuteiras encostadas a uma bola' },
  },
  essentials: {
    src: p13,
    alt: { en: 'Three players in caps and sunglasses on the beach', pt: 'Três jogadoras de boné e óculos de sol na praia' },
    position: '50% 40%',
  },

  // Where — beach Sundays
  beach: {
    src: p25,
    alt: { en: 'A game of beach tag on the sand', pt: 'Um jogo de tag na areia' },
    position: '50% 80%',
  },

  // The 3rd half — gallery (8 frames; the layout repeats every 8)
  gallery: [
    {
      src: p29,
      alt: { en: 'A player holding a trophy and grinning', pt: 'Um jogador a sorrir com um troféu' },
      position: '50% 25%',
    },
    {
      src: p04,
      alt: { en: 'The group at a bar at night', pt: 'O grupo num bar à noite' },
    },
    {
      src: p12,
      alt: { en: 'Three friends in a selfie', pt: 'Três amigas numa selfie' },
    },
    {
      src: p05,
      alt: { en: 'The group at a beach club', pt: 'O grupo num beach club' },
    },
    {
      src: p10,
      alt: { en: 'Friends on a night out', pt: 'Amigos numa saída à noite' },
    },
    {
      src: p18,
      alt: { en: 'A handstand on the pavement at night', pt: 'Um pino na calçada à noite' },
    },
    {
      src: p06,
      alt: { en: 'Two friends laughing in a bar', pt: 'Dois amigos a rir num bar' },
    },
    {
      src: p07,
      alt: { en: 'The group posing on the sand', pt: 'O grupo a posar na areia' },
    },
  ],
} satisfies Record<string, Photo | Photo[]>;
