# Komfortorientierte Individualreisende

Arbeitsrepository für das Konzept einer redaktionellen Affiliate-Reisewebsite für **komfortorientierte Individualreisende**.

## Aktueller strategischer Stand

Das Projekt soll **keine Reise-Software, keine Recommendation Engine und kein Live-Datenprodukt** werden. Ausgangspunkt bleibt eine normale Content-Website.

Die ursprüngliche Idee, 5–10 Reiseblogs pro Destination zusammenzufassen, wurde weiterentwickelt:

> Fremde Reiseblogs und andere Quellen dienen als Recherchematerial. Der eigentliche Mehrwert der Website entsteht durch **Kuration, Auswahl, Gewichtung, Trade-offs und konkrete Entscheidungshilfe für bestimmte Reisetypen und Interessen**.

Ziel ist nicht, möglichst viele Reiseinformationen erneut zu veröffentlichen, sondern Menschen bei konkreten Entscheidungen zu helfen:

- Was lohnt sich für mich?
- Was kann ich weglassen?
- Welche Orte passen zu meinem Interesse?
- Wie viele Tage sollte ich wo verbringen?
- Welche Route ist für meinen Reisestil sinnvoll?
- Wo sollte ich übernachten?
- Welche Aktivitäten oder Tickets sollte ich buchen?

## Aktuelle ICP-Arbeitshypothese

> **Deutschsprachige, komfortorientierte Individualreisende, Kernalter ca. 50–64 Jahre, häufig als Paar reisend, mit mittlerem bis überdurchschnittlichem Reisebudget, die Reisen selbst online organisieren und Kultur, Architektur, Geschichte, Natur, Genuss und moderate Aktivitäten höher gewichten als Minimalpreis, Backpacking oder Pauschalprogramm.**

Wichtiger als das Alter ist das Verhalten:

> **Zahlungsbereite Selbstbucher mit mehreren Buchungsentscheidungen, die Kuration höher bewerten als den billigsten Preis.**

## Dokumentation

1. [01-konzept-und-entwicklung.md](docs/01-konzept-und-entwicklung.md)  
   Ausgangsidee, Entwicklung des Modells, Beispiele und verworfene Varianten.

2. [02-recht-und-quellennutzung.md](docs/02-recht-und-quellennutzung.md)  
   Urheberrecht, § 23/§ 51/§ 63 UrhG, Quellenverwendung, Zitate, Bilder und praktische Leitplanken.

3. [03-seo-eeat-und-ai-search.md](docs/03-seo-eeat-und-ai-search.md)  
   SEO, E-E-A-T, Trust, AI Search, Commodity Content, Scaled Content Abuse und Affiliate-Kennzeichnung.

4. [04-kuration-und-content-modell.md](docs/04-kuration-und-content-modell.md)  
   Interessenbasierte Kuration, Destination-first/Interest-first, Seitentypen, Beispiele und Taxonomie.

5. [05-icp-und-zielgruppe.md](docs/05-icp-und-zielgruppe.md)  
   ICP, Alter, Reiseverhalten, Camper, Sportsegmente, Geschlecht und AI-Nutzung.

6. [06-monetarisierung-und-unit-economics.md](docs/06-monetarisierung-und-unit-economics.md)  
   Affiliate-Modell, Booking/GetYourGuide/DiscoverCars, Traffic, Conversion, RPM, Werbung und eigene Produkte.

7. [07-redaktionelle-methodik.md](docs/07-redaktionelle-methodik.md)  
   Rechercheprozess, Bewertungsraster, Transparenz, Quellenrollen und Qualitätscheck.

8. [08-risiken-und-offene-annahmen.md](docs/08-risiken-und-offene-annahmen.md)  
   Trust, Aufwand, Konkurrenz, Conversion, AI Search, Google-Abhängigkeit und ungeklärte Hypothesen.

9. [09-mvp-und-validierung.md](docs/09-mvp-und-validierung.md)  
   Schlanker Markttest ohne Software-Overengineering, Metriken, Hypothesen und Stop-/Go-Fragen.

10. [10-quellen-und-referenzlinks.md](docs/10-quellen-und-referenzlinks.md)  
    Im bisherigen Austausch genannte Rechts-, Google-, Markt-, AI- und Affiliate-Quellen.

11. [11-feedback-und-entscheidungsprotokoll.md](docs/11-feedback-und-entscheidungsprotokoll.md)  
    Die drei ausführlichen Gegenanalysen, akzeptierte Kritikpunkte, Korrekturen und verworfene Ansätze.

12. [12-finales-html-und-template-design.md](docs/12-finales-html-und-template-design.md)  
    Finales HTML-/Template-Konzept inklusive Affiliate-Kennzeichnung, Tracking, Structured Data und Legal-Footer.

13. [13-impressum-dummy.md](docs/13-impressum-dummy.md)  
    Dummy-Vorlage für das Impressum mit Platzhaltern für Anbieter-, Kontakt- und Registerangaben.

14. [14-datenschutzerklaerung-dummy.md](docs/14-datenschutzerklaerung-dummy.md)  
    Dummy-Vorlage für die Datenschutzerklärung inklusive Hosting, Consent, Analytics, Affiliate-Tracking und Betroffenenrechten.

15. [15-cookie-und-consent-dummy.md](docs/15-cookie-und-consent-dummy.md)  
    Dummy-Konzept für Consent-Banner, Cookie-Einstellungen, Affiliate-Tracking und Widerruf.

## Nicht-Ziele

Aktuell ausdrücklich **nicht** vorgesehen:

- Live-Wetterdaten;
- Live-Straßenzustände;
- Preis-Scraping für Hotels, Mietwagen oder Flüge;
- eigene Buchungsengine;
- dynamische Recommendation Engine;
- Nutzerprofile oder Login;
- Massengenerierung aller Destination-×-Interesse-×-Reisedauer-Kombinationen;
- vorgetäuschte persönliche Reiseerfahrung;
- reine Zusammenfassung fremder Reiseblogs als Produkt.

## Leitprinzip

> **Content zuerst. Kuration als redaktionelle Methode. Einfache Taxonomie. Software nur dann, wenn später echte Nutzerdaten zeigen, dass sie benötigt wird.**

## Zentraler offener Business-Test

> **Kann eine klar fokussierte, zahlungsbereite Zielgruppe mit mehreren Affiliate-relevanten Buchungsentscheidungen wirtschaftlich genug erreicht und konvertiert werden, um den redaktionellen Aufwand zu rechtfertigen?**


## Go-live-Mindestbasis

Vor Veröffentlichung müssen mindestens umgesetzt und geprüft sein:

- Impressum;
- Datenschutzerklärung;
- dauerhaft erreichbare Cookie-Einstellungen;
- Consent-Management passend zu den tatsächlich eingesetzten Technologien;
- sichtbare Affiliate-Kennzeichnung;
- `rel="sponsored"` für Affiliate-Links;
- dokumentierter Bildrechteprozess;
- Affiliate-Event-Tracking;
- Structured Data;
- vollständige Ersetzung aller Dummy-Felder durch reale Angaben.
