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
  rom: ['rom','roma'],
  heidelberg: ['heidelberg']
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
icp_model: "docs/05-icp-und-zielgruppe.md"
editorial_method: "docs/07-redaktionelle-methodik.md"
writing_standard: "docs/23-icp-schreibstandard.md"
public_perspective: "Reiseentscheidung des ICP; keine interne Projekt-, Technik- oder Testperspektive"
editorial_gate_version: 3
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

## Besonderes Extra / Affiliate-Check

Suchschritte:
TODO: 1 bis maximal 3 gezielte Suchen

Status:
TODO: gefunden / kein passendes Angebot gefunden nach 3 gezielten Suchen

Angebot:
TODO

Warum ICP-Fit:
TODO

Partner:
TODO: bestehender Affiliate-Partner oder konkretes affiliatefähiges Angebot

Link-Ziel:
TODO: konkrete Angebots-/Hotel-/Tour-Seite

Affiliate-Potenzial:
TODO: aktiv / Tracking-Link ausstehend / nicht verfügbar

Begründung:
TODO: nur für die 3-Suchen-Ausnahme erforderlich

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

## Relevante Research-Signale

Die 3–7 stärksten Signale aus research.md vor der Priorisierung prüfen. Nicht jedes Signal muss zu einer Empfehlung werden.

### Übernommen in die Kuration

- TODO: Signal + welche Kurationsentscheidung es beeinflusst und warum

### Verworfen / ohne Entscheidungsauswirkung

- TODO: Signal + warum es nach dem vertieften Research keine Kurationsentscheidung verändert

## Social-Media-Realitätscheck

Im öffentlichen Artikel erforderlich: TODO ja/nein

Falls ja:
- Signal / betroffener Ort: TODO
- praktische Auswirkung (Besucherandrang, Wartezeit, Umweg, Erwartung, Zusatzaufwand): TODO
- Empfehlung für den ICP: TODO
- Evidenz / Abrufstand: TODO

## Pflichtbausteine v3

Tipps im Artikel:
TODO: ja

Andrang / Social Media im Artikel:
TODO: sichtbar / nicht erforderlich – kurze Begründung

Kostenübersicht für zwei:
TODO: ja

Besonderes Extra:
TODO: gefunden / kein passendes Angebot gefunden nach 3 gezielten Suchen

Affiliate-Status:
TODO: aktiv / affiliatefähig – Tracking-Link ausstehend / nicht verfügbar nach 3 Suchen

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

## Human Gate

Nur nach ausdrücklicher Freigabe durch den Owner ausfüllen. Ein Agent darf diese Freigabe nicht selbst erteilen.

- [ ] Kuration und Decision-Blöcke vom Owner freigegeben
- [ ] Für jeden wesentlichen öffentlichen Hauptabschnitt existiert ein vollständiger Decision-Block
- [ ] Die stärksten Research-Signale wurden in der Kuration berücksichtigt oder bewusst verworfen
Freigabe durch: TODO
Freigabe am: TODO YYYY-MM-DD

## Full Article Review

- [ ] Titel/Intro-Versprechen wird tatsächlich erfüllt
- [ ] jeder Hauptabschnitt reduziert eine reale Reiseentscheidung
- [ ] Reihenfolge ergibt als echte Reise Sinn
- [ ] Zeit, Wege, Pausen und Energie sind realistisch
- [ ] unnötige Wiederholungen entfernt
- [ ] keine wesentlichen Informationslücken
- [ ] echte Insights statt Allgemeinplätze
- [ ] natürliche Affiliate-Chancen geprüft, aber nicht künstlich erzeugt
- [ ] 3–5 konkrete Tipps sind im öffentlichen Artikel kompakt sichtbar
- [ ] Andrang / Social Media ist praktisch eingeordnet oder begründet nicht erforderlich
- [ ] eine kompakte Kostenübersicht für zwei Personen ist sichtbar
- [ ] Besonderes Extra ist als Box umgesetzt oder die 3-Suchen-Ausnahme ist dokumentiert
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
9. Nutze das finale ICP-Problem als verbindlichen Bezugsrahmen für Kuration und Decision-Blöcke.
10. Prüfe vor der Priorisierung die 3–7 stärksten Research-Signale und dokumentiere in curation.md knapp, welche die Kuration beeinflussen und welche verworfen bzw. ohne Entscheidungsauswirkung bleiben.
11. Bewerte Kandidaten relativ zum finalen ICP-Problem in dieser Reihenfolge: Problembeitrag, eigenständiger Zusatzwert, Reibung (Zeit/Wege/Energie/Reservierung/Kosten), bessere Alternative. Erstelle danach in curation.md eine begründete Auswahl ausschließlich in den Kategorien Priorität, Optional und Bewusst nicht priorisieren. Die Summe der Prioritäten muss in das Zeit-, Energie- und Komfortbudget des Beitrags passen.
12. Trenne Fakten von redaktionellem Urteil.
13. Keine persönliche Reiseerfahrung erfinden.
14. Stoppe nach Kuration und Decision-Blöcken am Human Gate. Der Human-Gate-Block darf nur nach ausdrücklicher Freigabe durch den Owner ausgefüllt werden; ein Agent darf weder Checkbox, Name noch Datum selbst setzen. Finalisiere den MDX-Text erst danach und schreibe ausschließlich aus Sicht des komfortorientierten Individualreisenden.
15. Jeder Hauptabschnitt soll konkrete Entscheidungshilfe liefern: Was lohnt sich? Wie viel Zeit? Reingehen oder außen? Pause oder weiter? Was weglassen? Welcher Trade-off?
16. Interne Projekt-/Techniksprache wie Spike, Framework, State, GeoJSON, Routing-Implementierung oder Browser-QA gehört nicht in den öffentlichen Artikel.
17. Die UI nicht erklären. Karte/Experience visualisieren den Inhalt; der Text spricht über die Reise.
18. Fülle für jeden wesentlichen Hauptabschnitt in curation.md einen Decision-Block aus.
19. Verdichte 3–5 konkrete Tipps im öffentlichen Artikel und ergänze eine kompakte Kostenübersicht für zwei Personen.
20. Prüfe Social Media und Besucherandrang getrennt: keine unbelegte Kausalität; bei relevantem Andrang eine praktische öffentliche Einordnung mit Ausweichoption geben.
21. Suche für genau ein „Besonderes Extra“ maximal 3-mal gezielt nach einem ICP-passenden, kostenpflichtigen und affiliatefähigen Angebot. Bei Fund bestehende AffiliateBox wiederverwenden. Ohne Fund nach 3 Suchen die definierte Ausnahme dokumentieren; nichts Mittelmäßiges erfinden.
22. Ein vorhandenes, aber noch nicht mit Tracking versehenes Partnerziel darf mit AffiliateBox und affiliateActive={false} dargestellt werden. Erst mit echtem Tracking-Link affiliateActive aktivieren und affiliateDisclosure: true setzen.
23. Führe den Full Article Review in curation.md vollständig durch.
24. Vor Abschluss müssen alle Gate-v3-Checkboxen in curation.md geschlossen sein.
25. Vor Publish dürfen in sources.md, research.md, curation.md und dem öffentlichen MDX keine TODO-Platzhalter verbleiben; sources.md braucht mindestens eine konkrete Primär-/offizielle Quelle. Nicht relevante optionale Felder ausdrücklich als „nicht erforderlich“ kennzeichnen.
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
editorialGateVersion: 3
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

## Tipps & Tricks

TODO: 3–5 konkrete, reibungsreduzierende Tipps.

## Andrang / Realität

TODO: nur wenn laut Research praktisch relevant; sonst im finalen Artikel entfernen.

## Was kostet der Tag zu zweit?

TODO: kompakte Varianten mit konkreten Beträgen.

## Besonderes Extra

TODO: bei gefundenem Angebot die bestehende AffiliateBox verwenden; bei 3-Suchen-Ausnahme diesen Abschnitt entfernen.

## Was vor der Reise geprüft werden muss

TODO: nur volatile Informationen, die die Entscheidung oder Planung tatsächlich verändern.
`);

console.log(`Artikelpfad angelegt: ${slug}`);
console.log(`Research: ${researchDir}`);
console.log(`Draft: ${contentPath}`);
console.log('Nächster Schritt: research/<slug>/agent-task.md abarbeiten.');
