/**
 * Shared scroll helpers. Lenis is only created when motion is allowed
 * (see motion.ts); everything here falls back to native scrolling.
 */
import type Lenis from 'lenis';

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis) {
  lenis = instance;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  // `force`: a dialog may have paused Lenis a moment ago and not resumed it yet.
  if (lenis) lenis.scrollTo(el, { duration: 1.2, force: true });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  history.replaceState(null, '', `#${id}`);
}

export function lockScroll(locked: boolean) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

export function prefersReducedMotion() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}
