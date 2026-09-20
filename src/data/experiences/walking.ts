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
  }
};
