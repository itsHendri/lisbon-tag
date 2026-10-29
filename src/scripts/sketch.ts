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
 *
 * Buttons too: every `.btn` is drawn as a rough shape (fill and line), with an
 * offset copy behind it for the hover. Colours come from global.css.
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

function roughRect(className?: string) {
  const rect = document.createElementNS(NS, 'rect');
  if (className) rect.setAttribute('class', className);
  rect.setAttribute('width', '100%');
  rect.setAttribute('height', '100%');
  rect.setAttribute('filter', 'url(#rough)');
  return rect;
}

document.querySelectorAll<HTMLElement>('.sketch').forEach((el) => {
  el.append(svgWith('sketch-svg', roughRect()));
  el.classList.add('has-sketch-svg');
});

document.querySelectorAll<HTMLElement>('.btn').forEach((el) => {
  const svg = svgWith('btn-svg', roughRect('btn-shadow'));
  svg.append(roughRect('btn-shape'));
  el.prepend(svg);
  el.classList.add('has-btn-svg');
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
