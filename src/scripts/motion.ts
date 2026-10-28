/**
 * Scroll motion: Lenis smooth scroll + GSAP ScrollTrigger.
 *
 * Everything here is an enhancement. With reduced motion (or if this file
 * fails), the page is complete and readable: no element is hidden by CSS
 * waiting for an animation to reveal it.
 *
 * Hooks, set in markup:
 *   data-reveal            fade up when it enters
 *   data-reveal-stagger    fade up its children, one after another
 *   data-split             reveal text line by line
 *   data-parallax="0.15"   drift vertically while scrolling (fraction of height)
 *   data-zoom              image inside settles from 1.15 to 1 while its section scrolls in
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { setLenis, prefersReducedMotion } from './scroll';

if (!prefersReducedMotion()) {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Native scroll on touch devices keeps iOS momentum scrolling intact.
  const lenis = new Lenis({ autoRaf: false, syncTouch: false, lerp: 0.11 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  setLenis(lenis);

  // Arriving on /#section: let Lenis take over from where the browser jumped.
  if (location.hash) requestAnimationFrame(() => ScrollTrigger.refresh());

  const ease = 'power3.out';

  /* Fade-ups */
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 32,
      duration: 0.9,
      ease,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
    gsap.from(group.children, {
      autoAlpha: 0,
      y: 36,
      duration: 0.8,
      stagger: 0.08,
      ease,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });

  /* Line-by-line text */
  document.fonts.ready.then(() => {
    gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 105,
            duration: 1,
            stagger: 0.07,
            ease,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        },
      });
    });
    ScrollTrigger.refresh();
  });

  /* Parallax drift */
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || '0.12');
    gsap.fromTo(
      el,
      { yPercent: amount * 100 },
      {
        yPercent: -amount * 100,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  /* Full-bleed images (the Beach Tag banner) settle into place */
  gsap.utils.toArray<HTMLElement>('[data-zoom]').forEach((wrap) => {
    const media = wrap.querySelector('img, video');
    if (!media) return;
    gsap.fromTo(
      media,
      { scale: 1.18 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  /* Hero: the title lifts away as you scroll off it */
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    gsap.to(hero.querySelector('[data-hero-content]'), {
      yPercent: -18,
      autoAlpha: 0.2,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.from(hero.querySelectorAll('[data-hero-in]'), {
      autoAlpha: 0,
      y: 40,
      duration: 1.1,
      stagger: 0.12,
      ease,
      delay: 0.15,
    });
  }
}
