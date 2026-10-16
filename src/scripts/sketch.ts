/**
 * Hand-drawn outlines for every `.sketch` element.
 *
 * Each one gets a small SVG with a rectangle roughened by the #rough filter
 * (Base.astro). Filters applied inside SVG render reliably in Safari, unlike a
 * CSS `filter: url(#…)` on an HTML element. The CSS mask outline in global.css
 * stays as the fallback if this script doesn't run.
 */
const NS = 'http://www.w3.org/2000/svg';

document.querySelectorAll<HTMLElement>('.sketch').forEach((el) => {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'sketch-svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');

  const rect = document.createElementNS(NS, 'rect');
  rect.setAttribute('width', '100%');
  rect.setAttribute('height', '100%');
  rect.setAttribute('filter', 'url(#rough)');

  svg.append(rect);
  el.append(svg);
  el.classList.add('has-sketch-svg');
});
