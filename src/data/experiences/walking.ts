import type { WalkingExperience } from '../../types/walking-experience';

export const walkingExperiences: Record<string, WalkingExperience> = {
  'munich-altstadt-walk': {
    id: 'munich-altstadt-walk',
    title: 'München Altstadt Walk',
    subtitle: 'Entspannt vom Odeonsplatz durch die Altstadt bis zur Isar',
    routeUrl: '/data/routes/munich-altstadt-walk.geojson',
    routeMode: 'walking',
    pois: [
      {
        id: 'odeonsplatz',
        name: 'Odeonsplatz',
        coordinates: [11.57803, 48.14358],
        shortContext: '10–15 Min. Feldherrnhalle 2026 eingerüstet – kurz orientieren, dann weiter.'
      },
      {
        id: 'hofgarten',
        name: 'Hofgarten',
        coordinates: [11.58046, 48.14274],
        shortContext: '10–20 Min. Ruhiger Übergang oder kurze Sitzpause.'
      },
      {
        id: 'max-joseph-platz',
        name: 'Max-Joseph-Platz',
        coordinates: [11.57810, 48.13984],
        shortContext: 'Ca. 10 Min außen. Residenz nur als separaten Besichtigungsblock einplanen.'
      },
      {
        id: 'marienplatz',
        name: 'Marienplatz',
        coordinates: [11.57557, 48.13712],
        shortContext: '20–30 Min. Glockenspiel nur mitnehmen, wenn das Timing natürlich passt.'
      },
      {
        id: 'viktualienmarkt',
        name: 'Viktualienmarkt',
        coordinates: [11.57618, 48.13550],
        shortContext: '45–60 Min Pause. Sonntags ist der Markt geschlossen.'
      },
      {
        id: 'gaertnerplatz',
        name: 'Gärtnerplatz',
        coordinates: [11.57647, 48.13228],
        shortContext: '15–20 Min Atmosphäre. Bei Müdigkeit der erste Skip-Kandidat.'
      },
      {
        id: 'deutsches-museum',
        name: 'Deutsches Museum',
        coordinates: [11.58339, 48.12988],
        shortContext: 'Endpunkt an der Isar. Museumsbesuch nur mit eigenem Zeitblock.'
      }
    ]
  },
  'heidelberg-ein-tag-entspannt': {
    id: 'heidelberg-ein-tag-entspannt',
    title: 'Heidelberg an einem Tag',
    subtitle: 'Schloss, Altstadt und Neckarblick mit nur einem optionalen Höhenblock',
    routeUrl: '/data/routes/heidelberg-ein-tag-entspannt.geojson',
    routeMode: 'editorial',
    pois: [
      {
        id: 'kornmarkt',
        name: 'Kornmarkt & Bergbahn',
        coordinates: [8.71158, 49.41183],
        shortContext: 'Start ohne ersten Kraftakt: Bergbahn statt zusätzlichem Schlossanstieg.'
      },
      {
        id: 'schloss',
        name: 'Schloss Heidelberg',
        coordinates: [8.71532, 49.41056],
        shortContext: '1,5–2 Std. Priorität; Innenführung nur bei starkem Geschichtsinteresse.'
      },
      {
        id: 'altstadt',
        name: 'Altstadt & Pause',
        coordinates: [8.71024, 49.41219],
        shortContext: '1,5–2 Std. inklusive echter Pause; Studentenkarzer bleibt optional.'
      },
      {
        id: 'alte-bruecke',
        name: 'Alte Brücke',
        coordinates: [8.70953, 49.41424],
        shortContext: '20–30 Min. Aussicht und Entscheidungspunkt für den letzten Tagesblock.'
      },
      {
        id: 'neckar-entscheidung',
        name: 'Neckarufer oder Philosophenweg',
        coordinates: [8.70955, 49.41518],
        shortContext: 'Bei guter Energie aufsteigen; sonst den Tag ohne weiteren Höhenblock auslaufen lassen.'
      }
    ]
  },
  'salzburg-ein-entspannter-tag': {
    id: 'salzburg-ein-entspannter-tag',
    title: 'Salzburg – ein entspannter Tag',
    subtitle: 'Mirabell, Altstadt und Festung mit nur einem großen Höhenblock',
    routeUrl: '/data/routes/salzburg-ein-entspannter-tag.geojson',
    routeMode: 'editorial',
    pois: [
      {
        id: 'mirabellgarten',
        name: 'Mirabellgarten',
        coordinates: [13.04136, 47.80564],
        shortContext: 'Ruhiger Einstieg mit Blickachse Richtung Altstadt und Festung; Eintritt frei.'
      },
      {
        id: 'makartsteg',
        name: 'Makartsteg & Salzach',
        coordinates: [13.04008, 47.80264],
        shortContext: 'Kurzer Übergang über die Salzach; Stadtbild statt zusätzlichem Programmpunkt.'
      },
      {
        id: 'getreidegasse',
        name: 'Getreidegasse & Altstadt',
        coordinates: [13.04315, 47.80033],
        shortContext: 'Altstadt bewusst langsam erleben; Mozarts Geburtshaus nur bei echtem Interesse.'
      },
      {
        id: 'dom-kapitelplatz',
        name: 'Dom & Kapitelplatz',
        coordinates: [13.04554, 47.79823],
        shortContext: 'Barockes Zentrum und natürlicher Übergang zur Festungsbahn.'
      },
      {
        id: 'festung',
        name: 'Festung Hohensalzburg',
        coordinates: [13.04775, 47.79517],
        shortContext: 'Der eine große Höhenblock des Tages; per Festungsbahn komfortabel erreichbar.'
      }
    ]
  }
};