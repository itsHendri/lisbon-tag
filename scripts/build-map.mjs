/**
 * Draws the "Where we play" map by hand, sort of: OpenStreetMap ways around
 * Jardim Vasco da Gama, sketched with rough.js in the brand colours.
 *
 *   node scripts/build-map.mjs             (downloads fresh OpenStreetMap data)
 *   node scripts/build-map.mjs osm.json    (uses an Overpass JSON export you already have)
 *
 * Writes src/assets/map/belem.svg and src/data/map.json (where the park sits,
 * so the page can pin it). Re-run only when the venue moves or OSM data should
 * be refreshed; the output is committed. Map data © OpenStreetMap contributors (ODbL).
 */
import fs from 'node:fs';
import rough from 'roughjs';

const NAVY = '#054895';
const LIMESTONE = '#f6f0e7';
const VENUE = 'Jardim Vasco da Gama';

const W = 1200, H = 800;
const C = { lat: 38.6962, lng: -9.2023 };
const SPAN_KM = 1.5; // width of the view
const BBOX = '38.6905,-9.2125,38.7015,-9.1915';
const COAST_BBOX = '38.6850,-9.2200,38.7015,-9.1850';

// ---------- Data ----------
const query = `[out:json][timeout:60];(
  way["highway"~"^(primary|secondary|tertiary|residential|unclassified|pedestrian|trunk|living_street)$"](${BBOX});
  way["railway"~"^(rail|tram)$"](${BBOX});
  way["leisure"~"^(park|garden|pitch)$"](${BBOX});
  way["natural"="coastline"](${COAST_BBOX});
);out geom;`;

// The main Overpass server is often full; try a couple of mirrors.
const servers = ['https://overpass-api.de', 'https://overpass.private.coffee', 'https://maps.mail.ru/osm/tools/overpass'];
async function fetchOsm() {
  for (const host of servers) {
    try {
      const res = await fetch(`${host}/api/interpreter`, {
        method: 'POST',
        headers: { 'User-Agent': 'lisbon-tag-site-map/1.0', 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ data: query }),
        signal: AbortSignal.timeout(45_000),
      });
      if (res.ok) return await res.json();
      console.warn(`${host}: ${res.status}`);
    } catch (e) {
      console.warn(`${host}: ${e.message}`);
    }
  }
  throw new Error('No Overpass server answered. Try again in a minute.');
}

const osm = process.argv[2] ? JSON.parse(fs.readFileSync(process.argv[2], 'utf8')) : await fetchOsm();

// ---------- Projection ----------
const KM_PER_DEG_LAT = 110.57;
const KM_PER_DEG_LNG = 111.32 * Math.cos((C.lat * Math.PI) / 180);
const pxPerKm = W / SPAN_KM;
const proj = ([lat, lng]) => [W / 2 + (lng - C.lng) * KM_PER_DEG_LNG * pxPerKm, H / 2 - (lat - C.lat) * KM_PER_DEG_LAT * pxPerKm];
const pts = (geom) => geom.map((g) => proj([g.lat, g.lon]));
const inView = (p) => p.some(([x, y]) => x > -200 && x < W + 200 && y > -200 && y < H + 200);

const ways = osm.elements.filter((e) => e.type === 'way' && e.geometry);
const tag = (e, k) => e.tags?.[k];

// ---------- River: stitch the coastline into one chain and close it along the bottom ----------
function stitch(list) {
  const chains = list.map((w) => w.geometry.map((g) => [g.lat, g.lon]));
  let merged = true;
  while (merged) {
    merged = false;
    outer: for (let i = 0; i < chains.length; i++)
      for (let j = 0; j < chains.length; j++) {
        if (i === j) continue;
        const a = chains[i], b = chains[j];
        const end = a[a.length - 1], start = b[0];
        if (end[0] === start[0] && end[1] === start[1]) {
          chains[i] = a.concat(b.slice(1));
          chains.splice(j, 1);
          merged = true;
          break outer;
        }
      }
  }
  return chains.sort((a, b) => b.length - a.length)[0];
}
const coast = stitch(ways.filter((w) => tag(w, 'natural') === 'coastline')).map(proj);
const first = coast.findIndex(([x]) => x >= -50);
const last = coast.length - 1 - [...coast].reverse().findIndex(([x]) => x <= W + 50);
let shore = coast.slice(Math.max(0, first - 1), last + 2);
if (shore[0][0] > shore[shore.length - 1][0]) shore = shore.reverse();
const river = [...shore, [W + 60, H + 60], [-60, H + 60]];

// ---------- Layers ----------
const venue = ways.find((w) => tag(w, 'name') === VENUE);
if (!venue) throw new Error(`${VENUE} isn't in the OSM data`);
const greens = ways.filter((w) => w !== venue && ['park', 'garden'].includes(tag(w, 'leisure')) && w.geometry.length > 3 && inView(pts(w.geometry)));
const pitches = ways.filter((w) => tag(w, 'leisure') === 'pitch' && inView(pts(w.geometry)));
const roadW = { pedestrian: 1.2, living_street: 1.3, residential: 1.6, unclassified: 1.6, tertiary: 2.6, secondary: 3.5, primary: 4.5, trunk: 5 };
const roads = ways.filter((w) => roadW[tag(w, 'highway')] && inView(pts(w.geometry)));
const rails = ways.filter((w) => tag(w, 'railway') === 'rail' && inView(pts(w.geometry)));
const trams = ways.filter((w) => tag(w, 'railway') === 'tram' && inView(pts(w.geometry)));

// ---------- Drawing ----------
const gen = rough.generator({ options: { seed: 7 } });
const round = (d) => d.replace(/-?\d+\.\d+/g, (n) => (+n).toFixed(1));
// Paths that share a style go in one group, so the file stays small.
const groups = new Map();
function add(drawable, attrs = '') {
  for (const p of gen.toPaths(drawable)) {
    const key = `stroke="${p.stroke}" stroke-width="${p.strokeWidth}" fill="${p.fill ?? 'none'}"${attrs}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(round(p.d));
  }
}

add(gen.polygon(river, { stroke: NAVY, strokeWidth: 2.2, roughness: 1.4, fill: NAVY, fillStyle: 'hachure', hachureGap: 10, hachureAngle: -20, fillWeight: 1.2 }));
for (const g of greens)
  add(gen.polygon(pts(g.geometry), { stroke: NAVY, strokeWidth: 1, roughness: 1.2, fill: NAVY, fillStyle: 'hachure', hachureGap: 7, hachureAngle: 50, fillWeight: 0.8 }));
for (const p of pitches) add(gen.polygon(pts(p.geometry), { stroke: NAVY, strokeWidth: 0.8, roughness: 0.9, disableMultiStroke: true }));
for (const [k, w] of Object.entries(roadW))
  for (const r of roads.filter((x) => tag(x, 'highway') === k))
    add(gen.linearPath(pts(r.geometry), { stroke: NAVY, strokeWidth: w, roughness: 1.1, bowing: 1.5, disableMultiStroke: w < 2 }));
for (const r of rails) add(gen.linearPath(pts(r.geometry), { stroke: NAVY, strokeWidth: 3, roughness: 0.8 }), ' stroke-dasharray="14 8"');
for (const r of trams) add(gen.linearPath(pts(r.geometry), { stroke: NAVY, strokeWidth: 1.4, roughness: 0.8 }), ' stroke-dasharray="3 5"');
const vp = pts(venue.geometry);
add(gen.polygon(vp, { stroke: NAVY, strokeWidth: 3, roughness: 1.6, fill: NAVY, fillStyle: 'solid' }));

const body = [...groups].map(([attrs, ds]) => `<g ${attrs}>${ds.map((d) => `<path d="${d}"/>`).join('')}</g>`).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" stroke-linecap="round" stroke-linejoin="round"><rect width="${W}" height="${H}" fill="${LIMESTONE}"/>${body}</svg>`;
fs.mkdirSync('src/assets/map', { recursive: true });
fs.writeFileSync('src/assets/map/belem.svg', svg);

// Where the park is, as a percentage of the map, for the pin.
const xs = vp.map((p) => p[0]), ys = vp.map((p) => p[1]);
const at = (x, y) => ({ x: +((x / W) * 100).toFixed(2), y: +((y / H) * 100).toFixed(2) });
const map = {
  width: W,
  height: H,
  venue: at((Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2),
  venueTop: at((Math.min(...xs) + Math.max(...xs)) / 2, Math.min(...ys)),
};
fs.writeFileSync('src/data/map.json', JSON.stringify(map, null, 2) + '\n');
console.log(`belem.svg ${(svg.length / 1024).toFixed(0)} KB`, map);
