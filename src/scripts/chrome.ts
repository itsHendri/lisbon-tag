import { lockScroll, scrollToId } from './scroll';

/* ---------- Which section is on screen ---------- */
const langLink = document.querySelector<HTMLAnchorElement>('[data-lang-link]');
const sheetLinks = document.querySelectorAll<HTMLAnchorElement>('[data-section-link]');

function setCurrent(id: string) {
  // The language switch lands on the same section in the other language.
  if (langLink) langLink.href = `${langLink.dataset.base}${id === 'home' ? '' : `#${id}`}`;
  sheetLinks.forEach((a) => a.setAttribute('aria-current', String(a.dataset.sectionLink === id)));
}

// A thin line across the middle of the viewport: whichever section crosses it is current.
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
  },
  { rootMargin: '-50% 0px -50% 0px' },
);
document.querySelectorAll<HTMLElement>('[data-section]').forEach((s) => io.observe(s));

/* ---------- Castle colour follows whatever is behind it ---------- */
// Anything marked data-tone="dark" (video, photos, navy and granite panels) gets
// a limestone castle; everything else gets navy.
const logo = document.querySelector<HTMLElement>('.chrome-logo');
let toneQueued = false;

function updateTone() {
  toneQueued = false;
  if (!logo) return;
  const r = logo.getBoundingClientRect();
  const under = document
    .elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)
    .find((el) => !el.closest('.chrome-top, .chrome-film'));
  const dark = under?.closest('[data-tone]')?.getAttribute('data-tone') === 'dark';
  document.documentElement.dataset.chromeTone = dark ? 'dark' : 'light';
}

function queueTone() {
  if (toneQueued) return;
  toneQueued = true;
  requestAnimationFrame(updateTone);
}

addEventListener('scroll', queueTone, { passive: true });

/* ---------- In-page links go through Lenis when it runs ---------- */
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
  if (!a || e.defaultPrevented) return;
  const id = a.getAttribute('href')!.slice(1);
  if (!id || !document.getElementById(id)) return;
  e.preventDefault();
  if (a.hasAttribute('data-sheet-link')) {
    closeDialog(sheet);
    lockScroll(false);
  }
  scrollToId(id);
  // Move focus for keyboard and screen-reader users.
  const target = document.getElementById(id)!;
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
});

/* ---------- Dialogs ---------- */
const sheet = document.querySelector<HTMLDialogElement>('#sheet')!;
const film = document.querySelector<HTMLDialogElement>('#film')!;
const filmFrame = film.querySelector<HTMLElement>('[data-film-frame]')!;

function openDialog(d: HTMLDialogElement) {
  d.showModal();
  lockScroll(true);
}

function closeDialog(d: HTMLDialogElement) {
  if (d.open) d.close();
}

for (const d of [sheet, film]) {
  d.addEventListener('close', () => {
    lockScroll(false);
    // Removing the player is the reliable way to stop a YouTube video.
    if (d === film) filmFrame.replaceChildren();
  });
  // Tap on the backdrop closes.
  d.addEventListener('click', (e) => {
    if (e.target === d) closeDialog(d);
  });
}

document.querySelector('[data-sheet-open]')?.addEventListener('click', () => openDialog(sheet));
document.querySelector('[data-sheet-close]')?.addEventListener('click', () => closeDialog(sheet));

document.querySelectorAll('[data-film-open]').forEach((b) => b.addEventListener('click', openFilm));

function openFilm() {
  // Opened from inside the menu: swap one dialog for the other.
  closeDialog(sheet);
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${filmFrame.dataset.youtube}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;
  iframe.title = filmFrame.dataset.title ?? '';
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen = true;
  // YouTube refuses embeds that arrive without a referrer (player error 153).
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  filmFrame.replaceChildren(iframe);
  openDialog(film);
}
document.querySelector('[data-film-close]')?.addEventListener('click', () => closeDialog(film));
