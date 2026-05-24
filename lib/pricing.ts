// Service catalog driving the booking flow + the Square availability call.
// Keep these keys in sync with `SERVICE_MAP` in lib/square.ts.

export const SERVICES = {
  carbonFull:      { name: 'Carbon, Full Vehicle',  startPrice: 290, durationHours: 3.0, hasRear: true },
  ceramicFull:     { name: 'Ceramic, Full Vehicle', startPrice: 390, durationHours: 3.0, hasRear: true },
  ceramicPlusFull: { name: 'Ceramic Plus, Full Vehicle', startPrice: 500, durationHours: 3.0, hasRear: true },
  frontTwo:        { name: 'Front Two Windows',     startPrice: 120, durationHours: 1.0, hasRear: false },
  windshield:      { name: 'Windshield',            startPrice: 140, durationHours: 1.0, hasRear: false },
  sunroof:         { name: 'Sunroof',               startPrice: 80,  durationHours: 0.5, hasRear: false },
  panoramic:       { name: 'Panoramic Sunroof',     startPrice: 120, durationHours: 0.75, hasRear: false },
  sunStrip:        { name: 'Sun Strip',             startPrice: 50,  durationHours: 0.5, hasRear: false },
  tintRemoval:     { name: 'Tint Removal',          startPrice: 50,  durationHours: 1.5, hasRear: true },
  custom:          { name: 'Custom / Not Sure',     startPrice: 0,   durationHours: 1.0, hasRear: true },
} as const;

export type ServiceKey = keyof typeof SERVICES;

export type RearGlass = 'standard' | 'one-piece' | 'unsure';

export const REAR_GLASS_LABEL: Record<RearGlass, string> = {
  standard: 'Standard',
  'one-piece': 'Full / One-Piece (custom quote)',
  unsure: "Not Sure (we'll confirm)",
};
