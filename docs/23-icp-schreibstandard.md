# ICP-Schreibstandard für öffentliche Reiseinhalte

Stand: 20.09.2026

## Zweck

Dieser Standard gilt für alle Texte, die auf der öffentlichen Reisewebsite erscheinen – einschließlich Artikeltext, Überschriften, Komponenten-Labels, Karten-/Experience-Chrome und anderer sichtbarer UI-Texte.

Er ergänzt die redaktionelle Methodik in `docs/07-redaktionelle-methodik.md`.

> **Research erklärt uns die Welt. Der Artikel reduziert Entscheidungen für den ICP.**

Interne Projekt-, Technik-, Test- oder Produktionslogik gehört nicht in den öffentlichen Artikel.

---

## 1. Für wen wir schreiben

Primärer ICP:

> **komfortorientierte Individualreisende, die selbst planen und buchen, aber nicht jede Option, jedes Detail und jeden Trade-off selbst bewerten wollen.**

Der Leser sucht keine maximale Sehenswürdigkeiten-Dichte und keine vollständige Enzyklopädie.

Er will vor allem:

- wissen, **was sich für sein Profil wirklich lohnt**;
- verstehen, **wie viel Zeit und Energie etwas realistisch kostet**;
- erkennen, **was bewusst ausgelassen werden kann**;
- gute Kombinationen und Reihenfolgen sehen;
- unnötige Wege, Wartezeit und Überplanung vermeiden;
- flexibel bleiben, ohne ständig selbst neu entscheiden zu müssen.

Der Artikel übernimmt deshalb redaktionelle Vorarbeit.

---

## 2. Leitfrage für jeden Absatz

Vor jedem Absatz prüfen:

> **Hilft dieser Text dem ICP, eine Reiseentscheidung schneller oder besser zu treffen?**

Wenn nein, streichen oder in Research/Framework-Dokumentation verschieben.

Öffentlicher Text ist kein Protokoll darüber,

- wie die Website gebaut wurde;
- warum ein Feature getestet wird;
- wie ein Agent gearbeitet hat;
- wie eine Karte technisch funktioniert;
- welche Architekturentscheidung intern getroffen wurde.

---

## 3. Was ein guter Abschnitt liefern soll

Nicht jeder Abschnitt braucht jedes Element. Bei einem relevanten Stopp oder Programmpunkt sollten aber mehrere dieser Fragen beantwortet werden:

1. **Was lohnt sich hier konkret?**
2. **Wie viel Zeit würden wir realistisch einplanen?**
3. **Reingehen oder reicht außen / ein kurzer Stopp?**
4. **Pause machen oder weitergehen?**
5. **Was würden wir hier bewusst nicht zusätzlich einbauen?**
6. **Welcher Trade-off steckt hinter der Entscheidung?**
7. **Welche Logistik macht den Stopp angenehm oder unnötig anstrengend?**
8. **Für welches Spezialinteresse würden wir anders entscheiden?**

Ein Abschnitt ist stark, wenn der Leser danach weniger offene Entscheidungen hat als vorher.

---

## 4. Ton und Sprache

### Schreiben

- klar;
- konkret;
- ruhig;
- alltagssprachlich;
- selbstbewusst, wenn die Quellenlage eine redaktionelle Entscheidung trägt;
- mit konkreten Zeit-, Reihenfolge-, Komfort- und Auswahlhinweisen;
- kurze Begründung statt abstrakter Methodenerklärung.

### Vermeiden

- Marketingfloskeln;
- KI-/Beratungssprache;
- übertriebene Begeisterung;
- Reiseführer-Poesie ohne Entscheidungswert;
- generische Aussagen wie „ein Muss“, „ein Highlight“, „wunderschön“ ohne Begründung;
- künstliche persönliche Erfahrung;
- technische Projektbegriffe.

Keine Meta-Sätze wie:

- „Dieser Guide ist als Experience-Spike gebaut.“
- „Für diesen Test ist der Punkt wichtig.“
- „Die Karte soll hier zeigen …“
- „Die Route ist lokal als GeoJSON gespeichert.“
- „Beim Seitenaufruf findet keine externe Routenberechnung statt.“
- „Dieses Kapitel validiert das Framework.“

Solche Informationen gehören in Issues, `research/` oder `docs/`.

---

## 5. Von Beschreibung zu Entscheidung

### Zu generisch

> Der Marienplatz ist der zentrale Platz Münchens und ein wichtiger Orientierungspunkt.

### Besser

> **Hier darf die Route kurz langsamer werden.** Für Platz und Rathausumfeld reichen meist 20–30 Minuten. Wer nicht gezielt zum Glockenspiel möchte, muss den Spaziergang nicht nach einer bestimmten Uhrzeit ausrichten.

---

### Zu intern

> Der Gärtnerplatz ist für diesen Test wichtig, weil die Kamera hier eine größere Distanz abbilden muss.

### Besser

> **Der Gärtnerplatz ist kein Pflichtstopp wegen einer einzelnen Sehenswürdigkeit.** Er lohnt sich als Übergang vom touristischen Altstadtkern in ein normaleres Münchner Viertel. Wenn die Energie nach dem Viktualienmarkt schon niedrig ist, kann dieser Abschnitt ohne großen Verlust gekürzt werden.

---

### Zu vollständig

> Das Deutsche Museum bietet zahlreiche Abteilungen zu Naturwissenschaft und Technik.

### Besser

> **Am Deutschen Museum kann der Spaziergang enden, ohne dass automatisch noch ein Museumsbesuch folgt.** Für das Museum selbst solltest du mehrere zusätzliche Stunden einplanen. Wenn du heute vor allem München zu Fuß erleben willst, reicht die Museumsinsel als Endpunkt.

---

## 6. Komfort ist eine Planungsdimension

Komfort bedeutet nicht Luxus.

Komfortorientierte Redaktion berücksichtigt:

- Wege und Umwege;
- Energie über den Tag;
- Warte- und Reservierungsaufwand;
- sinnvolle Pausen;
- Tagesrhythmus;
- Flexibilität bei Wetter oder Müdigkeit;
- Anzahl anspruchsvoller Programmpunkte;
- unnötige Doppelungen.

Beispiel:

> Ein freier Nachmittag ist kein „ungenutzter Slot“, wenn er verhindert, dass drei große Besichtigungen an einem Tag gegeneinander arbeiten.

---

## 7. Priorisierung sichtbar machen

Nicht alles empfehlen.

Formulierungen, die erlaubt und erwünscht sind:

- „Hier würden wir Zeit investieren.“
- „Außen reicht für diesen Walk.“
- „Dafür einen eigenen halben Tag einplanen.“
- „Bei vier Tagen würden wir das weglassen.“
- „Nur bei echtem Spezialinteresse.“
- „Hier ist die Pause wichtiger als ein weiterer Programmpunkt.“
- „Das passt besser auf den Flex-Tag.“

Urteil immer kurz begründen.

---

## 8. Fakten und redaktionelles Urteil trennen

Fakt:

> Das Museum ist montags geschlossen.

Redaktionelles Urteil:

> Deshalb würden wir den Museumsblock nicht auf den ersten Reisetag festnageln, sondern die Reihenfolge flexibel halten.

Beides darf im selben Abschnitt stehen, aber die Quelle muss den Fakt tragen; die Redaktion trägt das Urteil.

---

## 9. Interne Informationen richtig ablegen

| Information | Ziel |
| --- | --- |
| technische Kartenlogik | `docs/` / Issue |
| Route wurde mit Tool X erzeugt | `research/` / technische Doku |
| UI-/Browser-Test | Issue / QA |
| Warum ein POI für Framework-Test gewählt wurde | `research/` |
| Was der Reisende am POI tun sollte | öffentlicher Artikel |
| Zeitbedarf / Trade-off / Komfortentscheidung | öffentlicher Artikel |
| Quellen und Unsicherheiten | Research + ggf. transparenter Nutzerhinweis |

---

## 10. Struktur für Walking-/Routenartikel

Für jeden Stopp bevorzugt:

**Erster Satz:** klares redaktionelles Urteil.

Danach höchstens die Informationen, die das Urteil erklären:

- empfohlene Dauer;
- was konkret ansehen / tun;
- reingehen oder außen bleiben;
- Pause / Weiterweg;
- relevante Alternative oder Skip-Regel.

Die Karte zeigt den räumlichen Zusammenhang. Der Text muss nicht erklären, dass die Karte dies tut.

---

## 11. Struktur für klassische Guides

Ein guter Guide beantwortet früh:

- Für wen entscheiden wir?
- Was sind die 2–4 Prioritäten?
- Was ist optional?
- Was lassen wir bewusst weg?
- Wie sieht ein realistischer Tagesrhythmus aus?
- Wo sind Puffer / Plan B?
- Was muss vor der Reise aktuell geprüft werden?

Nicht zuerst eine lange allgemeine Destinationseinführung schreiben.

---

## 12. Pflichtbausteine für neue Gate-v3-Artikel

Zusätzlich zur natürlichen Artikelstruktur müssen sichtbar sein:

- **3–5 konkrete Tipps**, die Reibung reduzieren;
- bei relevantem Signal eine kurze praktische **Andrang-/Realitäts-Einordnung**; Social-Media-Kausalität nur bei belastbarer Evidenz;
- eine kompakte **Kostenübersicht für zwei Personen** mit sinnvollen Varianten;
- bei gefundenem Angebot genau eine hervorgehobene **„Besonderes Extra“-Box** über die bestehende AffiliateBox. Das Extra bleibt klar optional.

Eine dokumentierte 3-Suchen-Ausnahme ersetzt die Extra-Box, wenn kein glaubwürdiges Angebot gefunden wurde.

## 13. Qualitätscheck des fertigen Artikels

Nach Human Gate und finaler Artikelgenerierung wird der fertige öffentliche Text im Full Article Review geprüft. Vor Publish:

- Kann ein Leser nach jedem Hauptabschnitt eine konkrete Entscheidung leichter treffen?
- Sind Zeitbedarf und Aufwand dort genannt, wo sie die Entscheidung beeinflussen?
- Gibt es echte Priorisierung statt vollständiger Aufzählung?
- Wird mindestens ein sinnvoller Verzicht / Trade-off sichtbar?
- Sind Pausen, Wege und Energie berücksichtigt?
- Ist interne Technik-/Test-/Framework-Sprache vollständig entfernt?
- Erklärt der Text nicht unnötig die UI?
- Könnte der Text auch ohne Kenntnis unseres Projekts natürlich von einer guten Reise-Redaktion stammen?
- Ist klar, was für den ICP anders ist als für einen maximalistischen Sightseeing-Reisenden?

Wenn mehrere Antworten „nein“ sind, ist der Text noch kein veröffentlichungsreifer ICP-Content.


## Leser entscheidet, Redaktion empfiehlt

Interne Decision-Blöcke dürfen eine redaktionelle Entscheidung festhalten; öffentlich wird daraus eine **Empfehlung oder mögliche Priorisierung**. Das gilt für Artikeltext ebenso wie für Komponenten-Labels und Experience-UI. Formulierungen wie „Unsere Entscheidung“, „Unsere Standardentscheidung“, „Unsere Auswahl“ oder „Was wir priorisieren“ vermeiden – der Leser entscheidet selbst.

---

## 14. Verhältnis zu Decision-Blöcken und Gate v3

Dieser Schreibstandard entscheidet **wie** der öffentliche Text formuliert wird.

Die vorgelagerte inhaltliche Entscheidung entsteht in `curation.md` nach `docs/07-redaktionelle-methodik.md`.

Damit gilt:

> Decision-Block bestimmt die redaktionelle Aussage.  
> Dieser Schreibstandard übersetzt sie in nützlichen, natürlichen Lesertext.

Der Full Article Review und die Freigabe selbst sind Teil von `docs/17-mvp-content-pipeline-und-human-gate.md`; sie werden hier nicht parallel definiert.
