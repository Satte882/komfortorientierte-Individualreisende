export type LngLat = [number, number];

export type WalkingPoi = {
  id: string;
  name: string;
  coordinates: LngLat;
  shortContext: string;
};

export type WalkingExperience = {
  id: string;
  title: string;
  subtitle: string;
  routeUrl: string;
  routeMode: 'walking' | 'editorial';
  pois: WalkingPoi[];
};
