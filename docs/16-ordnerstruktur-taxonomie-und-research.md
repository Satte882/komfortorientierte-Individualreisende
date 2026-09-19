# Ordnerstruktur, Taxonomie und Research-Ablage

## 1. Taxonomie-Seiten: zunächst nicht indexieren

Astro darf intern bereits wissen:

```yaml
destination: paris

interests:
  - kunst
  - kultur
```

Aber daraus sollte bei drei Artikeln **nicht automatisch eine indexierbare SEO-Landschaft** entstehen:

```text
/interessen/kunst/
/interessen/kultur/
/reiseziele/frankreich/
/reiseziele/paris/
```

Google empfiehlt ausdrücklich, Seiten mit geringem eigenem Nutzwert nicht unnötig indexieren zu lassen; `noindex` ist dafür vorgesehen. Google warnt außerdem vor vielen unoriginellen Seiten mit geringem Zusatznutzen. ([developers.google.com](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share?utm_source=chatgpt.com))

Ich würde es noch einfacher machen:

### Anfang

Taxonomie existiert **nur als Metadaten**.

Einzelne Artikel werden indexiert:

```text
/guides/paris-kunstinteressierte/
/guides/andalusien-kultur/
/decisions/cordoba-uebernachten/
```

### Später

Eine Seite wie:

```text
/interessen/kunst/
```

wird erst freigeschaltet, wenn wir dafür eine **wirklich eigenständige Landingpage** bauen:

> Kunstreisen: Welche Städte eignen sich für welche Kunstepoche? Florenz vs. Paris vs. Madrid etc.

Also nicht:

> „Hier sind unsere zwei Kunst-Artikel.“

Kein fixes „ab fünf Artikeln“. Das wäre wieder eine künstliche Zahl.

Stattdessen im Datenmodell:

```yaml
kunst:
  name: Kunst
  indexable: false
```

Später:

```yaml
kunst:
  name: Kunst
  indexable: true
```

**bewusste redaktionelle Entscheidung statt automatischer Schwelle.**

---

## 2. `research/` im Repo: privat und ohne Copy-Paste

Ich habe dein Repository geprüft: **Es ist bereits `private`.** Das passt. Cloudflare Pages unterstützt aktuell ausdrücklich auch private GitHub-Repositories. ([developers.cloudflare.com](https://developers.cloudflare.com/pages/get-started/git-integration/?utm_source=chatgpt.com))

Deshalb kann unsere Struktur bleiben:

```text
research/
src/content/
assets/
```

Aber für `research/` gilt eine harte Regel:

> **Research enthält Erkenntnisse und Quellenverweise, nicht kopierte Blogartikel.**

Also nicht:

```md
## Reiseblog X

"Wir sind morgens um sieben losgefahren und hatten ..."

[weitere 500 Wörter kopiert]
```

sondern:

```md
## Quelle: Blog X

URL: ...
Abruf: 20.09.2026

Relevante Erkenntnisse:
- Autor empfand Ringstraße in 10 Tagen als fahrintensiv
- längste beschriebene Etappe ca. X
- empfiehlt zusätzliche Nacht im Norden

Verwendbar für:
- Argument Fahranteil
- Routengeschwindigkeit
```

Der Agent soll **Information extrahieren**, nicht ein privates Textarchiv fremder Blogs aufbauen.

---

## 3. Finale Ordnerstruktur

```text
komfortorientierte-Individualreisende/
│
├── src/
│   ├── content/
│   │   ├── destinations/
│   │   ├── guides/
│   │   └── decisions/
│   │
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── data/
│   └── styles/
│
├── research/
│   └── <article-slug>/
│       ├── brief.yml
│       ├── sources.md
│       ├── research.md
│       └── curation.md
│
├── assets/
│   └── articles/
│       └── <article-slug>/
│           ├── hero.webp
│           └── manifest.yml
│
├── scripts/
│   └── validate-content.ts
│
├── .github/
│   └── workflows/
│       └── validate.yml
│
└── docs/
```

Die Struktur ist damit bereits für 40+ Artikel sauber, ohne die technische Implementierung unnötig aufzublähen.
