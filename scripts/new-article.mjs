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
  munchen: ['munchen','münchen'],
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
editorial_method: "docs/07-redaktionelle-methodik.md"
writing_standard: "docs/23-icp-schreibstandard.md"
public_perspective: "Reiseentscheidung des ICP; keine interne Projekt-, Technik- oder Testperspektive"
editorial_gate_version: 2
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

## ICP-Fragen, praktische Hinweise und typische Fehler

TODO: Recherchiere die für den ICP relevanten Fragen aus docs/05-icp-und-zielgruppe.md, insbesondere beste Zeitpunkte, Reservierung, sinnvolle Kombinationen, Wege/Wartezeiten, Pausen, typische Planungsfehler, konkrete Tipps zur Reibungsreduktion und Plan B.

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

## Entscheidungsblöcke

Für jeden wesentlichen Hauptabschnitt vor der Prosa mindestens einen Block ausfüllen:

### <Abschnitt / Stop>

ICP-Frage:
TODO

Entscheidung:
TODO

Warum:
TODO

Zeit / Aufwand:
TODO

Bewusst weglassen / Alternative:
TODO

Insight:
TODO

Affiliate-Prüfung:
TODO: natürliche buchbare Handlung ja/nein; falls ja bestehende AffiliateBox verwenden.

## Full Article Review

- [ ] Titel/Intro-Versprechen wird tatsächlich erfüllt
- [ ] jeder Hauptabschnitt reduziert eine reale Reiseentscheidung
- [ ] Reihenfolge ergibt als echte Reise Sinn
- [ ] Zeit, Wege, Pausen und Energie sind realistisch
- [ ] unnötige Wiederholungen entfernt
- [ ] keine wesentlichen Informationslücken
- [ ] echte Insights statt Allgemeinplätze
- [ ] natürliche Affiliate-Chancen geprüft, aber nicht künstlich erzeugt
- [ ] Text, Bild, Karte und CTA sind semantisch konsistent
- [ ] Artikel besitzt einen klaren roten Faden
- [ ] ICP müsste für die Kernentscheidung nicht sofort wieder selbst recherchieren

## Redaktionsfreigabe

### Fakten und Kuration

- [ ] zentrale Fakten gegen geeignete Primärquellen geprüft
- [ ] volatile Angaben aktuell geprüft
- [ ] keine unbelegten Mengenbehauptungen
- [ ] keine längeren Fremdformulierungen übernommen
- [ ] eigene Artikelstruktur
- [ ] Quellen für wesentliche Aussagen dokumentiert
- [ ] Kuration / Priorisierung freigegeben

### ICP und Schreibstandard

- [ ] öffentlicher Text folgt docs/23-icp-schreibstandard.md
- [ ] jeder Hauptabschnitt reduziert mindestens eine reale Reiseentscheidung
- [ ] Priorität, Zeit/Aufwand, Komfort oder Trade-off werden dort konkret, wo sie relevant sind
- [ ] generische Ortsbeschreibung wurde zugunsten konkreter Entscheidungshilfe gekürzt
- [ ] keine interne Projekt-, Spike-, Framework-, State-, Routing- oder QA-Sprache im Nutzertext
- [ ] UI/Map wird nicht erklärt, wenn das für die Reiseentscheidung keinen Nutzen hat
`);

writeFileSync(join(researchDir,'agent-task.md'), `# Agent-Auftrag – ${topic}

1. Lies zuerst brief.yml.
2. Lies verbindlich docs/05-icp-und-zielgruppe.md, docs/07-redaktionelle-methodik.md und docs/23-icp-schreibstandard.md.
3. Recherchiere aktuelle Primärquellen im Web.
4. Fülle sources.md und research.md mit paraphrasierten Erkenntnissen.
5. Erstelle in curation.md eine begründete Auswahl: Priorität, optional, bewusst weglassen.
6. Trenne Fakten von redaktionellem Urteil.
7. Keine persönliche Reiseerfahrung erfinden.
8. Finalisiere den MDX-Text erst nach der Kuration und schreibe ausschließlich aus Sicht des komfortorientierten Individualreisenden.
9. Jeder Hauptabschnitt soll konkrete Entscheidungshilfe liefern: Was lohnt sich? Wie viel Zeit? Reingehen oder außen? Pause oder weiter? Was weglassen? Welcher Trade-off?
10. Interne Projekt-/Techniksprache wie Spike, Framework, State, GeoJSON, Routing-Implementierung oder Browser-QA gehört nicht in den öffentlichen Artikel.
11. Die UI nicht erklären. Karte/Experience visualisieren den Inhalt; der Text spricht über die Reise.
12. Fülle für jeden wesentlichen Hauptabschnitt in curation.md einen Decision-Block aus.
13. Prüfe natürliche Affiliate-Aktionen über die bestehende AffiliateBox-Logik; keine künstlichen Links erzeugen.
14. Führe den Full Article Review in curation.md vollständig durch.
15. Vor Abschluss müssen alle Gate-v2-Checkboxen in curation.md geschlossen sein.
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
editorialGateVersion: 2
affiliateDisclosure: false
sources:
${sourceIndent}
editorialApproval: false
---

## Für wen wir hier entscheiden

TODO: Zielprofil nur so konkretisieren, wie es für die Reiseentscheidung relevant ist.

## Unsere Auswahl

TODO: klare Prioritäten mit Zeit/Aufwand, Komfort und kurzer Begründung.

## Was wir bewusst weglassen

TODO: mindestens einen echten Verzicht oder Trade-off sichtbar machen.

## Realistischer Ablauf

TODO: Reihenfolge, Pausen, Wege und Puffer aus Sicht des ICP.

## Was vor der Reise geprüft werden muss

TODO: nur volatile Informationen, die die Entscheidung oder Planung tatsächlich verändern.
`);

console.log(`Artikelpfad angelegt: ${slug}`);
console.log(`Research: ${researchDir}`);
console.log(`Draft: ${contentPath}`);
console.log('Nächster Schritt: research/<slug>/agent-task.md abarbeiten.');
