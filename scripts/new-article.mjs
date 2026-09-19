import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const topic = args.filter((arg) => !arg.startsWith('--'))[0];
if (!topic) {
  console.error('Usage: npm run article:new -- "Toskana Kunst Genuss 7 Tage" [--type=guide|decision]');
  process.exit(1);
}

const getFlag = (name) => args.find((arg) => arg.startsWith(`--${name}=`))?.split('=').slice(1).join('=');
const slugify = (value) => value
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/ß/g,'ss').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

const knownDestinations = {
  paris: ['paris'],
  andalusien: ['andalusien'],
  cordoba: ['cordoba','córdoba'],
  island: ['island'],
  toskana: ['toskana'],
  rom: ['rom','roma']
};
const knownInterests = {
  kunst: ['kunst','museum','malerei','impressionismus'],
  geschichte: ['geschichte','historisch','kultur'],
  architektur: ['architektur','baukunst'],
  natur: ['natur','wandern','hiking'],
  genuss: ['genuss','essen','wein','kulinarik']
};

const lower = topic.toLowerCase();
const destination = getFlag('destination') || Object.entries(knownDestinations).find(([,words]) => words.some((w)=>lower.includes(w)))?.[0];
const interestsFlag = getFlag('interests');
const interests = interestsFlag
  ? interestsFlag.split(',').map((x)=>x.trim()).filter(Boolean)
  : Object.entries(knownInterests).filter(([,words])=>words.some((w)=>lower.includes(w))).map(([key])=>key);
const type = getFlag('type') || (lower.includes(' oder ') ? 'decision' : 'guide');
const days = Number(getFlag('days') || lower.match(/(\d+)\s*(tage|tag)/)?.[1] || 4);

if (!destination) {
  console.error('Destination konnte nicht sicher erkannt werden. Nutze z. B. --destination=toskana');
  process.exit(1);
}
if (!interests.length) {
  console.error('Interesse konnte nicht sicher erkannt werden. Nutze z. B. --interests=kunst,genuss');
  process.exit(1);
}
if (!['guide','decision'].includes(type)) {
  console.error('--type muss guide oder decision sein.');
  process.exit(1);
}

const slug = slugify(topic);
const researchDir = join('research', slug);
const assetDir = join('assets','articles',slug);
const collection = type === 'decision' ? 'decisions' : 'guides';
const contentPath = join('src','content',collection,`${slug}.mdx`);

for (const path of [researchDir, assetDir]) mkdirSync(path,{recursive:true});
if (existsSync(contentPath)) {
  console.error(`Abbruch: ${contentPath} existiert bereits.`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0,10);
const sixMonths = new Date();
sixMonths.setMonth(sixMonths.getMonth()+6);
const reviewAfter = sixMonths.toISOString().slice(0,10);

writeFileSync(join(researchDir,'brief.yml'), `slug: ${slug}
topic: "${topic.replaceAll('"','\"')}"
destination: ${destination}
content_type: ${type}
duration_days: ${days}
interests:
${interests.map((x)=>`  - ${x}`).join('\n')}
target_profile: "komfortorientierte Individualreisende"
status: research
`);

writeFileSync(join(researchDir,'sources.md'), `# Quellen – ${topic}

Abrufstand: ${today}

## Primär-/offizielle Quellen

- TODO: mindestens 2 geeignete Primärquellen

## Ergänzende Erfahrungsquellen

- TODO: nur als Perspektivensignal, nicht als Ersatz für Primärquellen

## Regel

Keine längeren Passagen kopieren. Erkenntnisse paraphrasieren und Quellen sauber zuordnen.
`);

writeFileSync(join(researchDir,'research.md'), `# Research – ${topic}

## Belastbare Fakten

TODO

## Widersprüche / Unsicherheiten

TODO

## Volatile Informationen

TODO

## Nicht als Fakt ausgeben

TODO
`);

writeFileSync(join(researchDir,'curation.md'), `# Kuration – ${topic}

## Priorität

TODO

## Optional

TODO

## Bewusst nicht priorisieren

TODO

## Begründung / Trade-offs

TODO

## Redaktionsfreigabe

- [ ] zentrale Fakten gegen geeignete Primärquellen geprüft
- [ ] volatile Angaben aktuell geprüft
- [ ] keine unbelegten Mengenbehauptungen
- [ ] keine längeren Fremdformulierungen übernommen
- [ ] eigene Artikelstruktur
- [ ] Quellen für wesentliche Aussagen dokumentiert
- [ ] Kuration / Priorisierung freigegeben
`);

writeFileSync(join(researchDir,'agent-task.md'), `# Agent-Auftrag – ${topic}

1. Lies zuerst brief.yml und die redaktionellen Regeln in docs/07-redaktionelle-methodik.md.
2. Recherchiere aktuelle Primärquellen im Web.
3. Fülle sources.md und research.md mit paraphrasierten Erkenntnissen.
4. Erstelle in curation.md eine begründete Auswahl: Priorität, optional, bewusst weglassen.
5. Trenne Fakten von redaktionellem Urteil.
6. Keine persönliche Reiseerfahrung erfinden.
7. Erst nach Freigabe den MDX-Entwurf finalisieren.
`);

writeFileSync(join(assetDir,'manifest.yml'), `slug: ${slug}
images: []
note: "Bilder erst mit dokumentierter Quelle/Lizenz ergänzen."
`);

const sourceIndent = '  - label: "TODO Primärquelle"\n    url: "https://example.com/replace-me"';
writeFileSync(contentPath, `---
title: "${topic.replaceAll('"','\"')}"
description: "Redaktioneller Entwurf für ${topic.replaceAll('"','\"')} – Auswahl, Trade-offs und konkrete Entscheidungshilfe werden nach der Recherche ergänzt."
slug: ${slug}
type: ${type}
country: tbd
destination: ${destination}
interests:
${interests.map((x)=>`  - ${x}`).join('\n')}
duration:
  ideal: ${days}
targetProfile:
  - komfortorientiert
  - individualreisend
commercialIntent:
  - none
datePublished: ${today}
dateReviewed: ${today}
reviewAfter: ${reviewAfter}
status: draft
affiliateDisclosure: false
sources:
${sourceIndent}
editorialApproval: false
---

## Arbeitsstand

Dieser Draft wurde automatisch aus dem Thema erzeugt.

## Unsere Auswahl

TODO nach Research und Kuration.

## Was wir bewusst weglassen

TODO.

## Was vor der Reise geprüft werden muss

TODO.
`);

console.log(`Artikelpfad angelegt: ${slug}`);
console.log(`Research: ${researchDir}`);
console.log(`Draft: ${contentPath}`);
console.log('Nächster Schritt: research/<slug>/agent-task.md abarbeiten.');
