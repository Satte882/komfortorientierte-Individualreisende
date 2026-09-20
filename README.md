# Reiseauswahl – komfortorientierte Individualreisen

Redaktionelle Reisewebsite für Menschen, die selbst buchen, aber **weniger Optionen und bessere Entscheidungen** wollen.

## Lokal ansehen

Voraussetzung: Node.js 22+.

```bash
npm install
npm run demo
```

Dann öffnen:

```text
http://localhost:4321
```

Die drei Pilotartikel sind für den Test freigegeben und direkt über die Startseite erreichbar.

## Qualitätscheck

```bash
npm run check
```

Der Check umfasst:
- Astro/TypeScript;
- Content-Schema;
- Pflicht-Metadaten;
- Quellen;
- Redaktionsfreigabe;
- Bild-/Lizenzmetadaten;
- Affiliate-Kennzeichnung;
- statischen Build.

## Neuer Beitrag: ein Thema als Startpunkt

Beispiel:

```bash
npm run article:new -- "Toskana Kunst Genuss 7 Tage"
```

Automatisch entstehen:

```text
research/<slug>/brief.yml
research/<slug>/sources.md
research/<slug>/research.md
research/<slug>/curation.md
research/<slug>/agent-task.md
assets/articles/<slug>/manifest.yml
src/content/<guides|decisions>/<slug>.mdx
```

Danach:
1. `agent-task.md` mit einem Web-fähigen KI-Agenten abarbeiten;
2. Research und Kuration prüfen;
3. Human-Gate-Checkboxen setzen;
4. veröffentlichen:

```bash
npm run article:publish -- <slug>
npm run check
```

Details: [docs/21-content-automation.md](docs/21-content-automation.md)

## Architektur

```text
Thema
  ↓
Research-Ordner
  ↓
Quellen + Fakten
  ↓
Kuration / Trade-offs
  ↓
Human Gate
  ↓
MDX-Artikel
  ↓
Validator + Astro Build
  ↓
lokale Website / später Deployment
```

### Stack

- Astro + TypeScript
- Markdown/MDX
- statische Ausgabe
- kein Backend
- keine Datenbank
- keine Recommendation Engine
- minimales Client-JavaScript
- GitHub als Source of Truth

## Repo-Struktur

```text
src/
  components/
  content/
    destinations/
    guides/
    decisions/
  data/
  layouts/
  pages/
  styles/

public/images/
  Demo-Visuals

research/
  <article-slug>/
    brief.yml
    sources.md
    research.md
    curation.md
    agent-task.md

assets/articles/
  <article-slug>/
    manifest.yml

scripts/
  new-article.mjs
  publish-article.mjs
  validate-content.mjs

docs/
```

## Pilotartikel

- Paris für Kunstinteressierte: 4 Tage
- Córdoba: Tagesausflug oder übernachten?
- Andalusien in 9 Tagen: Kultur & Architektur

## Demo-Hinweis

Der lokale MVP ist bewusst vollständig sichtbar. Einige Informationen sind Dummy/Testwerte:

- Impressumsdaten;
- Datenschutz-Anbieterangaben;
- Affiliate-URLs;
- finale Reisefotografie.

Die Demo-Visuals im Repository sind projekterzeugte Platzhalter und keine fremden Stockbilder.

## Dokumentation

Die fachliche Entwicklung liegt unter `docs/01...` bis `docs/22...`.

Besonders relevant:
- `docs/12-finales-html-und-template-design.md`
- `docs/16-ordnerstruktur-taxonomie-und-research.md`
- `docs/17-mvp-content-pipeline-und-human-gate.md`
- `docs/19-pilotthemen-und-validierungskriterien.md`
- `docs/20-mvp-auswertung.md`
- `docs/21-content-automation.md`
- `docs/22-lokaler-mvp-dod.md`
- `docs/23-icp-schreibstandard.md` – verbindlicher Schreibstandard für öffentlichen Content

## Leitprinzip

> Content zuerst. Kuration als redaktionelle Methode. Einfache Taxonomie. Automatisierung dort, wo sie Wiederholarbeit beseitigt – nicht dort, wo das redaktionelle Urteil entsteht.
