export const destinations = {
  munchen: { name: 'München', country: 'deutschland', indexable: false },
  paris: { name: 'Paris', country: 'frankreich', indexable: false },
  andalusien: { name: 'Andalusien', country: 'spanien', indexable: false },
  cordoba: { name: 'Córdoba', country: 'spanien', indexable: false },
  island: { name: 'Island', country: 'island', indexable: false },
  toskana: { name: 'Toskana', country: 'italien', indexable: false },
  rom: { name: 'Rom', country: 'italien', indexable: false },
  heidelberg: { name: 'Heidelberg', country: 'deutschland', indexable: false },
  salzburg: { name: 'Salzburg', country: 'oesterreich', indexable: false }
} as const;

export const interests = {
  kunst: { name: 'Kunst & Kultur', indexable: false },
  geschichte: { name: 'Geschichte', indexable: false },
  architektur: { name: 'Architektur', indexable: false },
  natur: { name: 'Natur & Wandern', indexable: false },
  genuss: { name: 'Genuss', indexable: false }
} as const;

export type DestinationId = keyof typeof destinations;
export type InterestId = keyof typeof interests;
