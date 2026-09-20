import type { WalkingExperience } from '../../types/walking-experience';

export const munichWalkingExperience: WalkingExperience = {
  id: 'munich-old-town-walk',
  title: 'München Walking Spike',
  subtitle: 'Odeonsplatz → Altstadt → Gärtnerplatz → Museumsinsel',
  routeUrl: '/data/routes/munich-old-town-walk.geojson',
  routeMode: 'walking',
  pois: [
    {
      id: 'odeonsplatz',
      name: 'Odeonsplatz',
      coordinates: [11.5775, 48.142222],
      shortContext: 'Start am nördlichen Rand der Altstadt.'
    },
    {
      id: 'max-joseph-platz',
      name: 'Max-Joseph-Platz',
      coordinates: [11.578061, 48.13985],
      shortContext: 'Kurzer nächster Schritt entlang der Residenz in Richtung Altstadt.'
    },
    {
      id: 'marienplatz',
      name: 'Marienplatz',
      coordinates: [11.5755, 48.1374],
      shortContext: 'Zentraler Orientierungspunkt der Route.'
    },
    {
      id: 'viktualienmarkt',
      name: 'Viktualienmarkt',
      coordinates: [11.57618, 48.1355],
      shortContext: 'Die Route verlässt den zentralen Platz und wird kleinteiliger.'
    },
    {
      id: 'gaertnerplatz',
      name: 'Gärtnerplatz',
      coordinates: [11.57603, 48.1317],
      shortContext: 'Der Weg zieht deutlich nach Süden in die Isarvorstadt.'
    },
    {
      id: 'deutsches-museum',
      name: 'Deutsches Museum',
      coordinates: [11.583031, 48.130025],
      shortContext: 'Finaler Schwenk nach Osten auf die Museumsinsel.'
    }
  ]
};
