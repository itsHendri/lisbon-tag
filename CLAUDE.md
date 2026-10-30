# Lisbon Tag Rugby

Astro static site, EN at `/` and PT at `/pt/`. Copy in `src/i18n/{en,pt}.ts` (same shape), facts in `src/data/site.ts`.

## Design system

Everything is documented, with live examples, at `/styles` (`src/pages/styles.astro`). Add a pattern there when you add it to `global.css`.

Variables (`src/styles/tokens.css`), by what they are for:
- Palette: `--palette-*` (navy, limestone, granite…). Only tokens.css uses them.
- Layers: `--background` (section/panel) · `--card` (quieter surface inside it) · `--foreground` (text, icons, drawn lines)
- Hierarchy: `--foreground-secondary`, `--stroke`, `--stroke-secondary`
- Brand: `--brand` / `--brand-foreground` (solid buttons, anything filled in) · `--brand-secondary` / `--brand-secondary-foreground` (outline buttons)
- `--focus` (focus ring) · `--overlay`, `--overlay-strong`, `--scrim-photo` (photos, backdrops, shadows)
- Rhythm: `--space-1…8` (4px grid), `--gutter`, `--section-y`, `--radius-sm` `--radius` `--radius-lg` (the brand is square), `--line-weight`
- Type: `--font-display` (titles only), `--font-sans`, `--font-mono`; `--text-xs…xl`, `--text-statement`, `--display-xs…xl`
- Elevation: `--shadow-card`, `--shadow-overlay`

Themes are the same names with other values: `.theme-light` (default), `.theme-navy`, `.theme-granite` on a section or element. Never a second set of classes.

Shared patterns (`src/styles/global.css`, drawn by `src/scripts/sketch.ts`):
- `.btn` primary, `.btn .btn--ghost` secondary: pen-drawn, offset-ink hover.
- `.ink` the pen-drawn hover for any control that isn't a button (menu items, toggles, link rows); `.ink--outline`, `.is-current` / `aria-current`, `--ink-inset`. `.segmented` groups ink items.
- `.rule` and `data-rule="top|bottom"` hand-drawn lines; `.sketch` outline, `.sketch--fill` drawn solid box.
- Components: `Icon`, `DetailsTable`, `TileFrame` (never two TileFrames back to back), `CalendarButton`, `MapArt`.

Rules:
- No raw hex or palette variables in components: roles only. Pattern settings (`--sketch-color`, `--btn-fill`…) are set to a role.
- No hand-rolled `:hover { background }` on controls: use `.ink` or `.btn`.
- Drawn lines and outlines use the classes above, never a CSS border.
