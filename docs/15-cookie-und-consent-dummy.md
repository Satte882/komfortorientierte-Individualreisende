# Cookie- und Consent-Konzept – Dummy-Vorlage

> Diese Datei beschreibt die geplante technische und redaktionelle Umsetzung.  
> Vor dem Livegang an die tatsächlich eingesetzten Technologien anpassen und rechtlich prüfen.

## 1. Grundregel

Nicht technisch notwendige Cookies oder vergleichbare Zugriffe auf Informationen im Endgerät werden erst nach einer wirksamen Einwilligung aktiviert, soweit keine gesetzliche Ausnahme greift.

Technisch notwendige Funktionen werden getrennt behandelt.

## 2. Footer-Link

Auf **jeder Seite** dauerhaft sichtbar:

- Impressum
- Datenschutzerklärung
- Cookie-Einstellungen

Der Link **„Cookie-Einstellungen“** öffnet die Consent-Auswahl erneut, sodass Nutzer eine einmal getroffene Auswahl ändern oder widerrufen können.

## 3. Consent-Banner – erste Ebene

### Dummy-Text

**Datenschutz-Einstellungen**

Wir verwenden notwendige Technologien für den Betrieb dieser Website. Mit deiner Einwilligung verwenden wir außerdem optionale Technologien zur Reichweitenmessung und – soweit eingesetzt – zur Zuordnung von Affiliate-Klicks und Buchungen.

[Alle akzeptieren]  
[Nur notwendige]  
[Einstellungen]

**Links:**  
[Datenschutzerklärung] · [Impressum]

## 4. Consent-Banner – Einstellungen

### Notwendig

**Status:** immer aktiv

Beispiele:

- Consent-Speicherung;
- Sicherheitsfunktionen;
- technisch notwendige Seitenauslieferung.

**Konkrete Dienste:**  
[eintragen]

### Analyse

**Status:** standardmäßig aus

**Dienst:**  
[Google Analytics / Plausible / Matomo / anderes]

**Zweck:**  
Reichweitenmessung und Verbesserung der Inhalte.

**Cookies / lokale Speicherung:**  
[eintragen]

**Speicherdauer:**  
[eintragen]

### Affiliate / Marketing

**Status:** standardmäßig aus, soweit die konkrete Technik eine Einwilligung erfordert

**Dienste / Partner:**  
[Booking.com / GetYourGuide / DiscoverCars / Awin / CJ / Travelpayouts / andere]

**Zweck:**  
Zuordnung von Klicks, Buchungen und Provisionen.

**Technologien:**  
[Cookies / Tracking-Parameter / Local Storage / sonstige Mechanismen]

**Speicherdauer:**  
[eintragen]

### Externe Medien

**Status:** standardmäßig aus, sofern externe Inhalte ohne Einwilligung nicht datenschutzkonform geladen werden können

**Dienste:**  
[YouTube / Google Maps / andere]

## 5. Technische Aktivierungslogik

Vor Einwilligung:

- notwendige Website-Funktionen laden;
- optionale Analytics-Skripte blockieren;
- optionale Marketing-/Affiliate-Tracking-Skripte blockieren, soweit erforderlich;
- externe Medien gegebenenfalls als Platzhalter anzeigen.

Nach Einwilligung:

- nur die ausgewählten Kategorien aktivieren;
- Auswahl dokumentieren;
- Widerruf jederzeit ermöglichen.

## 6. Affiliate-Links

Jeder kommerzielle Affiliate-Link erhält im sichtbaren Kontext eine Kennzeichnung.

Beispiel:

```html
<div class="affiliate-box">
  <span class="commercial-label">Werbung · Affiliate-Link</span>

  <a
    href="[AFFILIATE-URL]"
    rel="sponsored"
    data-affiliate="[PARTNER]"
    data-placement="[PLACEMENT]">
    [CTA]
  </a>

  <small>
    Wenn du über diesen Link buchst, erhalten wir eine Provision.
    Für dich ändert sich der Preis nicht.
  </small>
</div>
```

Wichtig:

Ob bereits der reine Linkklick, die Weiterleitung oder erst das Tracking des Partnernetzwerks eine Einwilligung voraussetzt, muss anhand der **tatsächlich eingesetzten Technik** geprüft werden.

## 7. Event-Tracking

Geplanter Eventname:

```text
affiliate_click
```

Mögliche Parameter:

```text
partner = [PARTNER]
destination = [DESTINATION]
article_type = [ARTICLE_TYPE]
interest = [INTEREST]
placement = [PLACEMENT]
```

Vor Implementierung festlegen:

- welches Analytics-System diese Events verarbeitet;
- ob Identifier verwendet werden;
- ob Cookies oder lokale Speicherung genutzt werden;
- wie lange Events gespeichert werden;
- ob Einwilligung erforderlich ist;
- ob Daten in Drittländer übertragen werden.

## 8. Consent-Protokoll

Zu dokumentieren:

- Zeitpunkt der Entscheidung;
- Consent-Version;
- ausgewählte Kategorien;
- pseudonyme Consent-ID, soweit technisch erforderlich;
- Zeitpunkt eines späteren Widerrufs oder einer Änderung.

**Consent-Anbieter / System:**  
[eintragen]

**Speicherdauer:**  
[eintragen]

## 9. Gestaltung

Der Consent-Banner darf die Ablehnung optionaler Technologien nicht unnötig erschweren.

MVP-Anforderung:

- „Alle akzeptieren“;
- „Nur notwendige“;
- „Einstellungen“;
- vergleichbar verständliche Darstellung;
- keine vorangekreuzten optionalen Kategorien;
- Änderung später über Footer möglich.

## 10. Go-live-Check

- [ ] Consent-Tool ausgewählt
- [ ] tatsächliche Cookies/Technologien inventarisiert
- [ ] notwendige vs. optionale Technologien klassifiziert
- [ ] Analytics vor Einwilligung korrekt blockiert, falls erforderlich
- [ ] Affiliate-Tracking vor Einwilligung korrekt behandelt
- [ ] externe Medien korrekt behandelt
- [ ] „Alle akzeptieren“ implementiert
- [ ] „Nur notwendige“ implementiert
- [ ] individuelle Einstellungen implementiert
- [ ] Widerruf über Footer möglich
- [ ] Consent dokumentiert
- [ ] Datenschutzerklärung entspricht der realen Implementierung
- [ ] Affiliate-Links sichtbar gekennzeichnet
- [ ] `rel="sponsored"` gesetzt
