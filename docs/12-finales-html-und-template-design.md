Ja. **Fünf Punkte würde ich übernehmen, einen nur teilweise.** Am Grundlayout würde ich nichts mehr ändern.

| Sonnet-Punkt | Änderung |
|---|---|
| Affiliate-Kennzeichnung | **Ja, verbindlich ins Template** |
| Bildrechte/Bildquelle | **Ja, verbindliche Asset-Regel** |
| „Zuletzt aktualisiert“ | **Ja** |
| Methodik pro Artikel | **Ja, kurzer Footer-Baustein** |
| Affiliate-Event-Tracking | **Ja, zwingend für MVP-Validierung** |
| Schema.org / FAQ | **Article + Breadcrumb ja; FAQ nicht standardmäßig** |

## 1. Affiliate direkt im Template

Sonnet hat hier den wichtigsten fehlenden Punkt gefunden. Affiliate-Links haben kommerziellen Charakter und müssen transparent gemacht werden. Die Medienanstalten nennen ausdrücklich Affiliate-Links und empfehlen eine Erklärung **in unmittelbarer Nähe**. Google bevorzugt zusätzlich `rel="sponsored"`. ([die-medienanstalten.de](https://www.die-medienanstalten.de/fileadmin/user_upload/die_medienanstalten/Service/Merkblaetter_Leitfaeden/Leitfaden_Werbekennzeichnung_Online-Medien_interaktiv.pdf))

Ich würde jede Affiliate-Box so standardisieren:

```html
<div class="affiliate-box">
  <span class="commercial-label">Werbung · Affiliate-Link</span>

  <h3>Tickets für das Musée d'Orsay</h3>
  <p>Für diesen Besuch empfehlen wir eine Vorabreservierung.</p>

  <a
    href="..."
    rel="sponsored"
    data-affiliate="getyourguide"
    data-placement="musee-orsay-ticket">
    Tickets ansehen
  </a>

  <small>
    Wenn du über diesen Link buchst, erhalten wir eine Provision.
    Für dich ändert sich der Preis nicht.
  </small>
</div>
```

Nicht irgendwo im Footer ein allgemeiner Disclaimer und fertig.

---

## 2. Bilder bekommen eine feste Quellenregel

Auch das gehört in die Basisarchitektur.

Für den MVP würde ich nur verwenden:

**eigene Fotos → lizenzierte Fotos → Unsplash/Pexels unter dokumentierter Lizenz.**

Unsplash und Pexels erlauben derzeit grundsätzlich auch kommerzielle Website-Nutzung ohne verpflichtende Namensnennung. Unsplash weist aber ausdrücklich darauf hin, dass beispielsweise **erkennbare Personen, Marken/Logos und abgebildete Kunstwerke zusätzliche Rechte betreffen können**. Gerade für deine Kunst-/Architekturartikel ist das relevant. ([unsplash.com](https://unsplash.com/license))

Deshalb würde ich zu jedem Bild intern speichern:

```yaml
image:
  file: paris-orsay.webp
  source: unsplash
  creator: "Name"
  source_url: "..."
  downloaded: 2026-09-19
  license: unsplash-license
```

Für Museumskunst würde ich **nicht einfach irgendein Unsplash-Foto eines Gemäldes nehmen**.

---

## 3. Aktualisierungsdatum sichtbar

Direkt unter Titel/Autor:

```text
Paris für Kunstinteressierte
4 Tage · Kunst & Museen

Veröffentlicht: 12. Oktober 2026
Zuletzt geprüft: 4. März 2027
```

Und dasselbe technisch als:

```json
"datePublished": "...",
"dateModified": "..."
```

Google unterstützt diese Angaben explizit im `Article`-Markup. ([developers.google.com](https://developers.google.com/search/docs/appearance/structured-data/article?hl=de))

Ich würde sogar **„Zuletzt geprüft“** statt nur „aktualisiert“ verwenden. Dann kannst du einen Artikel prüfen, ohne zwanghaft Text verändern zu müssen.

---

## 4. Methodik an jeden Artikel

Nicht die komplette Methodik wiederholen.

Am Artikelende nur:

> **Wie wir auswählen**  
> Unsere Empfehlungen basieren auf offiziellen Informationen, mehreren Erfahrungsquellen und eigener redaktioneller Bewertung nach Interesse, Zeit, Logistik und Komfort. Nicht jede vorgestellte Destination wurde von uns persönlich besucht.  
> **[Mehr über unsere Methodik →]**

Das reicht.

Damit sitzt der Trust-Baustein genau dort, wo ein Leser ihn braucht.

---

## 5. Affiliate-Klicks werden von Tag 1 an gemessen

Das würde ich tatsächlich als **MVP-Pflicht** betrachten.

Nicht nur:

`page_view`

sondern beispielsweise:

```text
affiliate_click

partner = getyourguide
destination = paris
article_type = interest-guide
interest = art
placement = musee-orsay-ticket
```

Dann kannst du später beantworten:

> Paris-Kunst bekommt 3.000 Besucher, aber nur 0,8 % klicken Affiliate.

versus:

> Andalusien-Kultur bekommt nur 1.200 Besucher, aber 9 % klicken Hotels/Tickets.

**Das ist für dein Geschäftsmodell erheblich wichtiger als Pageviews.**

Bei eingesetzten Analytics-/Trackingdiensten muss die konkrete Datenschutz-/Consent-Umsetzung natürlich dazu passen.

---

## 6. Schema.org: hier würde ich Sonnet bremsen

**Structured Data ja. Aber nicht künstlich übertreiben.**

Google sagt selbst, dass strukturierte Daten dabei helfen können, Seiteninhalte expliziter zu verstehen. Für redaktionelle Seiten unterstützt Google `Article` bzw. `BlogPosting`. ([developers.google.com](https://developers.google.com/search/docs/appearance/structured-data/search-gallery?hl=de))

Ich würde standardmäßig verwenden:

```text
WebSite
Organization
BreadcrumbList
Article / BlogPosting
```

Beim Artikel insbesondere:

```text
headline
description
image
author
datePublished
dateModified
```

**FAQ-Schema würde ich nicht standardmäßig einbauen.**

Nur wenn die Seite tatsächlich einen echten FAQ-Bereich enthält.

Und vor allem würde ich nicht versuchen, daraus jetzt:

```text
PrioritySchema
SkipSchema
RecommendationSchema
```

oder ähnliche Fantasiestrukturen zu konstruieren.

Die redaktionelle Semantik machen wir zunächst über sauberes HTML:

```html
<section>
  <h2>Unsere Auswahl</h2>
</section>

<section>
  <h2>Was wir bewusst weglassen</h2>
</section>

<section>
  <h2>Für wen wir anders entscheiden würden</h2>
</section>
```

Das ist ausreichend.

---

# Damit ist die finale Artikelseite jetzt fest

```text
HEADER

BREADCRUMB

H1
Paris für Kunstinteressierte

Untertitel
4 Tage · Kunst & Museen · komfortorientierte Reise

Veröffentlicht / zuletzt geprüft

HERO-BILD
mit sauber dokumentierter Bildquelle

────────────────────

UNSERE AUSWAHL

Kurzes redaktionelles Fazit

Priorität
Optional
Bei wenig Zeit weglassen

────────────────────

DIE ORTE, DIE WIR PRIORISIEREN

Musée d'Orsay
Warum?
Zeitbedarf
Für wen besonders interessant?

[Werbung · Affiliate-Link]
Tickets ansehen
Affiliate-Erklärung

Louvre
...

────────────────────

WAS WIR BEWUSST WEGLASSEN

Versailles
Warum?
Wann wir anders entscheiden würden

────────────────────

SO WÜRDEN WIR 4 TAGE AUFTEILEN

einfache Tabelle

────────────────────

WO ÜBERNACHTEN?

2–3 passende Gebiete

[Werbung · Affiliate-Link]
Hotels ansehen
Affiliate-Erklärung

────────────────────

WAS VORHER BUCHEN?

Tickets / Touren

────────────────────

WIE WIR AUSGEWÄHLT HABEN

Kurzfassung der Methodik
[Methodik vollständig lesen]

Quellen

Zuletzt geprüft: xx.xx.xxxx

────────────────────

FOOTER
```

## Damit würde ich die Design-/Architekturphase jetzt beenden

Es gibt aus meiner Sicht **keinen relevanten offenen UI-Punkt mehr**, bevor echter Content vorhanden ist.

Die erste Version braucht jetzt nur noch:

**sauberes Theme + diese Templates + Tracking + Affiliate-Kennzeichnung + Bildprozess + Structured Data.**

Danach sollte die nächste Optimierung **aus Nutzerdaten kommen**, nicht aus einer weiteren theoretischen Designrunde.

---

## Verbindliche Legal-/Footer-Basis vor Go-live

Der Footer muss auf jeder Seite mindestens folgende Links dauerhaft und leicht erreichbar enthalten:

```text
FOOTER

Über uns
Methodik

Impressum
Datenschutzerklärung
Cookie-Einstellungen

Affiliate-Hinweis
```

Dazu gehören im Repository folgende Dummy-Vorlagen:

- [13-impressum-dummy.md](13-impressum-dummy.md)
- [14-datenschutzerklaerung-dummy.md](14-datenschutzerklaerung-dummy.md)
- [15-cookie-und-consent-dummy.md](15-cookie-und-consent-dummy.md)

Vor dem Livegang müssen alle Dummy-Felder durch reale Angaben ersetzt, nicht verwendete Abschnitte entfernt und eingesetzte Dienste vollständig dokumentiert werden.

Die Go-live-Mindestbasis lautet damit:

**sauberes Theme + Content-Templates + Affiliate-Kennzeichnung + Bildrechteprozess + Event-Tracking + Consent-Management + Structured Data + Impressum + Datenschutzerklärung + dauerhaft erreichbare Cookie-Einstellungen.**
