import type { WalkingExperience } from '../../types/walking-experience';

export const walkingExperiences: Record<string, WalkingExperience> = {
  'munich-altstadt-walk': {
    id: 'munich-altstadt-walk',
    title: 'München Altstadt Walk',
    subtitle: 'Vom Odeonsplatz über die Altstadt bis zur Museumsinsel',
    routeUrl: '/data/routes/munich-altstadt-walk.geojson',
    routeMode: 'walking',
    pois: [
      {
        id: 'odeonsplatz',
        name: 'Odeonsplatz',
        coordinates: [11.57803, 48.14358],
        shortContext: 'Start am nördlichen Rand der Altstadt.'
      },
      {
        id: 'hofgarten',
        name: 'Hofgarten',
        coordinates: [11.58046, 48.14274],
        shortContext: 'Kurzer grüner Übergang direkt hinter der Residenz.'
      },
      {
        id: 'max-joseph-platz',
        name: 'Max-Joseph-Platz',
        coordinates: [11.57810, 48.13984],
        shortContext: 'Oper, Residenz und klassizistischer Stadtraum.'
      },
      {
        id: 'marienplatz',
        name: 'Marienplatz',
        coordinates: [11.57557, 48.13712],
        shortContext: 'Der zentrale Altstadtanker der Route.'
      },
      {
        id: 'viktualienmarkt',
        name: 'Viktualienmarkt',
        coordinates: [11.57618, 48.13550],
        shortContext: 'Kurzer Genuss- und Pausenstopp südlich des Marienplatzes.'
      },
      {
        id: 'gaertnerplatz',
        name: 'Gärtnerplatz',
        coordinates: [11.57647, 48.13228],
        shortContext: 'Vom historischen Zentrum in ein lebendigeres Viertel.'
      },
      {
        id: 'deutsches-museum',
        name: 'Deutsches Museum',
        coordinates: [11.58339, 48.12988],
        shortContext: 'Abschluss auf der Museumsinsel an der Isar.'
      }
    ]
  }
};
