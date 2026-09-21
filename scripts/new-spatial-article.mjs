import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const topic = args.filter((arg) => !arg.startsWith('--'))[0];
if (!topic) {
  console.error('Usage: npm run article:new -- "Toskana Kunst Genuss 7 Tage" [--type=guide|decision]');
  process.exit(1);
}

const result = spawnSync(process.execPath, ['scripts/new-article.mjs', ...args], { stdio: 'inherit' });
if (result.status !== 0) process.exit(result.status ?? 1);

const slugify = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/ß/g,'ss').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const getFlag = (name) => args.find((arg) => arg.startsWith(`--${name}=`))?.split('=').slice(1).join('=');
const type = getFlag('type') || (topic.toLowerCase().includes(' oder ') ? 'decision' : 'guide');
const slug = slugify(topic);
const collection = type === 'decision' ? 'decisions' : 'guides';
const contentPath = join('src', 'content', collection, `${slug}.mdx`);

let content = readFileSync(contentPath, 'utf8');
if (!content.includes('spatialExperienceVersion:')) {
  content = content.replace('editorialGateVersion: 3\n', 'editorialGateVersion: 3\nspatialExperienceVersion: 1\n');
  writeFileSync(contentPath, content);
}

const taskPath = join('research', slug, 'agent-task.md');
if (existsSync(taskPath)) {
  appendFileSync(taskPath, `\n## Spatial Experience v1 – Pflicht vor Publish\n\n- Lies docs/SPATIAL-EXPERIENCE-DEFAULT.md und docs/EXPERIENCE-DATA-CONTRACT.md.\n- Wähle und dokumentiere ein freigegebenes lokales Hero-Video plus Poster/Fallback nach dem bestehenden Cinematic-Hero-Vertrag.\n- Lege mindestens zwei relevante POIs in src/data/experiences/walking.ts an. Der Dateiname ist Legacy; neue Daten folgen trotzdem dem gemeinsamen Spatial-Experience-Vertrag.\n- Wähle routeMode: editorial für redaktionelle Abfolge/Reiseetappen oder walking für echte lokale Weggeometrie.\n- Bei walking: lokale GeoJSON-routeUrl anlegen. Kein Runtime-Routing.\n- Karte und Route müssen dieselbe redaktionelle Empfehlung ausdrücken wie der Artikel.\n- Kein destinationsspezifisches Layout anlegen. Keine separate Decision-Summary-Pflicht.\n- npm run validate:content muss vor Publish grün sein.\n`);
}

console.log(`Spatial Experience v1 scaffold activated for ${slug}.`);
