# Lokaler MVP – Definition of Done

Stand: 19.09.2026

## Ziel

Die Website soll lokal vollständig bewertbar sein, ohne externe Hosting-, Analytics- oder Affiliate-Abhängigkeit.

## Erfüllt

- Astro-/TypeScript-Website läuft lokal.
- Responsive redaktionelles Design für Desktop und Mobile.
- Startseite, Reiseziele, Interessen, Entscheidungen, Methodik, Impressum und Datenschutz vorhanden.
- Drei vollständige Pilotartikel sichtbar.
- Drei projekteneigene Demo-Visuals plus Homepage-Visual vorhanden.
- Pilotartikel für den Test durch den Owner freigegeben.
- Affiliate-Komponenten sichtbar, aber mit klaren Dummy-Links.
- Consent-Einstellungen funktionsfähig.
- Impressum/Datenschutz enthalten bewusst Dummywerte für die lokale Bewertung.
- Content Collections und Validator prüfen Struktur, Quellen, Freigabe, Bildmetadaten und Affiliate-Kennzeichnung.
- CI baut die Site.
- Neuer Artikel kann über `npm run article:new` strukturiert angelegt werden.
- Publishing kann über `npm run article:publish` nach vollständig abgehaktem Human Gate erfolgen.
- Keine Laufzeitabhängigkeit von Lucid oder anderen externen Tools.

## Lokal starten

```bash
npm install
npm run demo
```

Danach:

```text
http://localhost:4321
```

## Qualitätscheck

```bash
npm run check
```

## Neuen Artikel starten

```bash
npm run article:new -- "Toskana Kunst Genuss 7 Tage"
```

Danach den erzeugten `research/<slug>/agent-task.md` mit einem Web-fähigen KI-Agenten abarbeiten.

## Grenzen des lokalen MVP

Bewusst Dummy/Test:
- Rechtstexte mit persönlichen Angaben;
- Affiliate-URLs;
- Analytics-Anbieter;
- Domain/Hosting;
- Demo-Visuals statt final lizenzierter Reisefotografie.

Diese Punkte blockieren die lokale Produktbewertung nicht.
