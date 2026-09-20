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

## ICP-Signal-Scan

### Reibung / realer Aufwand
TODO: Schritte, Steigungen, Wege, Transfers, Wartezeiten, volle Zeiten, Parken und unnötige Umwege.

### Social-Media-Hype vs. Realität
TODO: Aktuell sichtbare Instagram-/TikTok-/YouTube-/Community-Signale prüfen. Für relevante Spots einordnen: problemlos mitnehmen / Zusatzaufwand einplanen / andere Zeit / bessere Alternative / eher vermeiden. „Trendend“ nur mit aktuellem Trend-Signal oder wiederkehrenden Hinweisen aus mindestens zwei unabhängigen Quellen/Plattformen. Keine Social-Media-Kausalität für Besucherandrang behaupten, wenn sie nicht belegt ist.

### Tipps & Tricks
TODO: bessere Uhrzeit/Reihenfolge, Abkürzungen, sinnvoller Transport, Pausen, Plan B und andere nicht offensichtliche Reibungsreduzierer.

### Reale Kosten
TODO: soweit sinnvoll realistische Gesamtkosten für zwei Personen recherchieren; Familienkosten nur ergänzen, wenn Familien für den Beitrag relevant sind.

### Bessere Alternativen / echte Geheimtipps
TODO: nur mit konkretem Vorteil aufnehmen, z. B. weniger voll, entspannter, kürzer, bessere Aussicht oder besseres Preis-Leistungs-Verhältnis.

### Signal-Output
Primäre ICP-Problemahypothese:
TODO

Nebenfragen (max. 2):
- TODO

Stärkste Signale (3–7; Quelle/Abrufstand; Fakt / Signal / zu verifizieren):
- TODO

Social-Media-Realitätscheck im öffentlichen Artikel:
TODO: ja/nein + kurze Begründung; bei ja: praktischen Effekt und Empfehlung festhalten.

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

## Hypothesen-Review nach vertieftem Research

Status: TODO bestätigt / präzisiert / verworfen

Finales ICP-Problem:
TODO

Begründung:
TODO: Welche Research-Erkenntnisse bestätigen oder verändern die Ausgangshypothese? Das finale ICP-Problem ist der verbindliche Input für Kuration und Decision-Blöcke.
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

## Social-Media-Realitätscheck

Im öffentlichen Artikel erforderlich: TODO ja/nein

Falls ja:
- Signal / betroffener Ort: TODO
- praktische Auswirkung (Besucherandrang, Wartezeit, Umweg, Erwartung, Zusatzaufwand): TODO
- Empfehlung für den ICP: TODO
- Evidenz / Abrufstand: TODO

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

- [ ] ICP-Problemahypothese nach vertieftem Research bestätigt/präzisiert/verworfen und finales ICP-Problem in research.md festgehalten
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
3. Führe zuerst den ICP-Signal-Scan durch: Reibung, Social-Media-Hype vs. Realität, Tipps & Tricks, reale Kosten sowie bessere Alternativen/Geheimtipps.
4. Dokumentiere 1 primäre ICP-Problemahypothese, maximal 2 Nebenfragen und 3–7 stärkste Signale. Kennzeichne Fakt / Signal / noch zu verifizieren.
5. Entscheide explizit, ob der öffentliche Artikel einen eigenen Social-Media-Realitätscheck braucht. Bei relevantem Signal: sichtbar aufnehmen und praktische Empfehlung geben; ohne relevantes Signal keinen künstlichen Abschnitt erzeugen.
6. Recherchiere danach aktuelle Primärquellen im Web und verifiziere faktische bzw. volatile Signale.
7. Fülle sources.md und research.md mit paraphrasierten Erkenntnissen.
8. Führe nach dem vertieften Research den Hypothesen-Review durch: Ausgangshypothese bestätigt, präzisiert oder verworfen; finales ICP-Problem mit kurzer Begründung in research.md festhalten.
9. Nutze ausschließlich dieses finale ICP-Problem als Input für Kuration und Decision-Blöcke.
10. Erstelle in curation.md eine begründete Auswahl: Priorität, optional, bewusst weglassen.
11. Trenne Fakten von redaktionellem Urteil.
12. Keine persönliche Reiseerfahrung erfinden.
13. Stoppe nach Kuration und Decision-Blöcken am Human Gate. Finalisiere den MDX-Text erst nach ausdrücklicher Freigabe und schreibe ausschließlich aus Sicht des komfortorientierten Individualreisenden.
14. Jeder Hauptabschnitt soll konkrete Entscheidungshilfe liefern: Was lohnt sich? Wie viel Zeit? Reingehen oder außen? Pause oder weiter? Was weglassen? Welcher Trade-off?
15. Interne Projekt-/Techniksprache wie Spike, Framework, State, GeoJSON, Routing-Implementierung oder Browser-QA gehört nicht in den öffentlichen Artikel.
16. Die UI nicht erklären. Karte/Experience visualisieren den Inhalt; der Text spricht über die Reise.
17. Fülle für jeden wesentlichen Hauptabschnitt in curation.md einen Decision-Block aus.
18. Prüfe natürliche Affiliate-Aktionen über die bestehende AffiliateBox-Logik; keine künstlichen Links erzeugen.
19. Führe den Full Article Review in curation.md vollständig durch.
20. Vor Abschluss müssen alle Gate-v2-Checkboxen in curation.md geschlossen sein.
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
