/**
 * Hand-drawn outlines and lines.
 *
 * Every `.sketch` element gets a small SVG with a rectangle roughened by the
 * #rough filter (Base.astro). Filters applied inside SVG render reliably in
 * Safari, unlike a CSS `filter: url(#…)` on an HTML element. The CSS mask
 * outline in global.css stays as the fallback if this script doesn't run.
 *
 * Lines use the same pen: a `.rule` element becomes one, and `data-rule="top"`,
 * `"bottom"` or `"top bottom"` draws one along that edge of any element.
 */
const NS = 'http://www.w3.org/2000/svg';

function svgWith(className: string, shape: SVGElement) {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', className);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.append(shape);
  return svg;
}

document.querySelectorAll<HTMLElement>('.sketch').forEach((el) => {
  const rect = document.createElementNS(NS, 'rect');
  rect.setAttribute('width', '100%');
  rect.setAttribute('height', '100%');
  rect.setAttribute('filter', 'url(#rough)');
  el.append(svgWith('sketch-svg', rect));
  el.classList.add('has-sketch-svg');
});

// A flat bar across the middle of an 8px-tall SVG; the filter roughens its
// edges. --rule-w sets the weight (2.5px unless a component says otherwise).
function line(el: HTMLElement, edge: 'fill' | 'top' | 'bottom') {
  const w = parseFloat(getComputedStyle(el).getPropertyValue('--rule-w')) || 2.5;
  const bar = document.createElementNS(NS, 'rect');
  bar.setAttribute('width', '100%');
  bar.setAttribute('height', String(w));
  bar.setAttribute('y', String(4 - w / 2));
  bar.setAttribute('filter', 'url(#rough-line)');
  return svgWith(`rule-svg rule-svg--${edge}`, bar);
}

document.querySelectorAll<HTMLElement>('.rule').forEach((el) => {
  el.append(line(el, 'fill'));
  el.classList.add('has-rule-svg');
});

document.querySelectorAll<HTMLElement>('[data-rule]').forEach((el) => {
  for (const edge of el.dataset.rule!.split(' ') as ('top' | 'bottom')[]) el.append(line(el, edge));
  el.classList.add('has-rule-svg');
});
