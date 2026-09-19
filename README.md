# Komfortorientierte Individualreisende

Arbeitsrepository für eine redaktionelle Affiliate-Reisewebsite für **komfortorientierte Individualreisende**.

## Technischer MVP

- Astro + TypeScript
- statische Ausgabe, kein Backend und keine Datenbank
- Markdown/MDX als Content
- GitHub als Source of Truth
- kontrollierte Content Collections für `destinations`, `guides` und `decisions`
- ein schlanker MVP-Validator plus GitHub Actions
- Review-Content nur bei explizitem `PREVIEW_CONTENT=true`
- öffentliche Freigabe mit Dummy-Rechtstexten wird durch `PUBLIC_LAUNCH=true` blockiert

### Lokal starten

```bash
npm install
npm run dev
```

Review-Artikel lokal sichtbar machen:

```bash
PREVIEW_CONTENT=true npm run dev
```

### Prüfen und bauen

```bash
npm run check
npm run build
```

Ein späterer öffentlicher Build soll mit

```bash
PUBLIC_LAUNCH=true npm run check
```

geprüft werden. Solange offensichtliche Dummy-Felder in Impressum oder Datenschutzerklärung vorhanden sind, schlägt dieser Check absichtlich fehl.

## Strategischer Stand

Das Projekt ist **keine Reise-Software, keine Recommendation Engine und kein Live-Datenprodukt**. Fremde Reiseblogs und andere Quellen dienen als Recherchematerial. Der eigentliche Mehrwert entsteht durch **Kuration, Auswahl, Gewichtung, Trade-offs und konkrete Entscheidungshilfe**.

> **Content zuerst. Kuration als redaktionelle Methode. Einfache Taxonomie. Software nur dann, wenn echte Nutzerdaten zeigen, dass sie benötigt wird.**

## ICP-Arbeitshypothese

> **Deutschsprachige, komfortorientierte Individualreisende, Kernalter ca. 50–64 Jahre, häufig als Paar reisend, mit mittlerem bis überdurchschnittlichem Reisebudget, die Reisen selbst online organisieren und Kultur, Architektur, Geschichte, Natur, Genuss und moderate Aktivitäten höher gewichten als Minimalpreis, Backpacking oder Pauschalprogramm.**

Verhaltensbezogen wichtiger:

> **Zahlungsbereite Selbstbucher mit mehreren Buchungsentscheidungen, die Kuration höher bewerten als den billigsten Preis.**

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

research/
  <article-slug>/
    brief.yml
    sources.md
    research.md
    curation.md

assets/articles/
  <article-slug>/
    manifest.yml

scripts/
  validate-content.mjs

.github/workflows/
  validate.yml

docs/
```

Research enthält paraphrasierte Erkenntnisse und Quellenverweise, **keine Archive kopierter Fremdtexte**.

## Aktuelle Pilotartikel

Alle drei Piloten stehen zunächst auf `status: review` und `editorialApproval: false`:

- `paris-kunst-4-tage`
- `cordoba-tagesausflug-oder-uebernachten`
- `andalusien-kultur-9-tage`

Damit können Technik und Preview geprüft werden, ohne eine menschliche Redaktionsfreigabe vorzutäuschen.

## Dokumentation

- [Konzept und Entwicklung](docs/01-konzept-und-entwicklung.md)
- [Recht und Quellennutzung](docs/02-recht-und-quellennutzung.md)
- [SEO, E-E-A-T und AI Search](docs/03-seo-eeat-und-ai-search.md)
- [Kuration und Content-Modell](docs/04-kuration-und-content-modell.md)
- [ICP und Zielgruppe](docs/05-icp-und-zielgruppe.md)
- [Monetarisierung und Unit Economics](docs/06-monetarisierung-und-unit-economics.md)
- [Redaktionelle Methodik](docs/07-redaktionelle-methodik.md)
- [Risiken und offene Annahmen](docs/08-risiken-und-offene-annahmen.md)
- [MVP und Validierung](docs/09-mvp-und-validierung.md)
- [Quellen und Referenzlinks](docs/10-quellen-und-referenzlinks.md)
- [Feedback und Entscheidungsprotokoll](docs/11-feedback-und-entscheidungsprotokoll.md)
- [Finales HTML- und Template-Design](docs/12-finales-html-und-template-design.md)
- [Impressum Dummy](docs/13-impressum-dummy.md)
- [Datenschutzerklärung Dummy](docs/14-datenschutzerklaerung-dummy.md)
- [Cookie- und Consent-Dummy](docs/15-cookie-und-consent-dummy.md)
- [Ordnerstruktur, Taxonomie und Research](docs/16-ordnerstruktur-taxonomie-und-research.md)
- [MVP-Content-Pipeline und Human Gate](docs/17-mvp-content-pipeline-und-human-gate.md)
- [Deployment](docs/18-deployment.md)
- [Pilotthemen und Validierungskriterien](docs/19-pilotthemen-und-validierungskriterien.md)

## Nicht-Ziele des MVP

Noch nicht vorgesehen:

- Live-Wetter- oder Straßendaten
- Preis-Scraping
- eigene Buchungsengine
- Recommendation Engine
- Nutzerprofile/Login
- Suchfunktion
- automatisch indexierte Taxonomie-Landingpages
- wöchentliche Review-Jobs
- Broken-Link-Crawler
- AI-Similarity-Audit
- komplexe Multi-Agent-Orchestrierung

## Go-live-Mindestbasis

Vor einem öffentlichen Launch müssen mindestens erfüllt sein:

- reales Impressum
- reale Datenschutzerklärung passend zu den tatsächlich eingesetzten Diensten
- dauerhaft erreichbare Cookie-Einstellungen
- Consent-Management passend zur realen Tracking-Technik
- sichtbare Affiliate-Kennzeichnung
- `rel="sponsored"` für Affiliate-Links
- dokumentierter Bildrechteprozess
- freigegebene Artikel mit `editorialApproval: true`
- finale Domain/Hosting-Konfiguration
