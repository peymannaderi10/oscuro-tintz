// Server-only — never import this from client components.
import { SquareClient, SquareEnvironment } from 'square';

export const square = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN ?? '',
  environment:
    process.env.SQUARE_ENV === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

// Appointment-service variation IDs from the Square catalog.
// Regenerate by running: npm run fetch-square-services

// ---- Full-vehicle appointment services (one variation per tier) ----
// The catalog item is generic per tier ("Carbon IR - Full Vehicle");
// the body style / pricing details go into the customer note.
const FULL_VEHICLE: Record<string, string> = {
  carbonFull:      'UXYQQ5O2LUJ3AFNEVXMFLTFN',
  ceramicFull:     'J3KRUNFQUQ6RVT2VEOGRZ3UR',
  ceramicPlusFull: 'ONDOPBSHWAMCARGIFK5S6BUA',
};

// ---- Fixed (body-independent) appointment services ----
const FIXED_SERVICES: Record<string, string> = {
  frontTwo:     'KKRH2RC2O62T64KFPF6GHUOI',
  windshield:   'JZQW54KLIBFGAGHKGRF6GLWE',
  sunroof:      'BFB5UM7QWFCAOE7GTVNVKXO4',
  panoramic:    'MWS4J3UFUM65FHYVOP76H5MF',
  sunStrip:     'L5WSAHN2ZJEIA6IF6TSKPT36',
  tintRemoval:  'XXSM6RZJLBLLXLH6JDQILF75',
  custom:       'A5WRZYYMDKN47YN4SSYMZYNO',
};

// All services in one flat lookup — used for both availability search
// and booking creation. Body style goes into the customer note, not
// the catalog variation.
const ALL_SERVICES: Record<string, string> = {
  ...FULL_VEHICLE,
  ...FIXED_SERVICES,
};

/**
 * Resolve the Square catalog ITEM_VARIATION id for the given service key.
 */
export function resolveVariationId(serviceKey: string): string | null {
  return ALL_SERVICES[serviceKey] ?? null;
}

/**
 * Default variation id for a service key — used for availability search.
 */
export function defaultVariationId(serviceKey: string): string | null {
  return ALL_SERVICES[serviceKey] ?? null;
}

/** Recursively convert BigInt values to strings so the object is JSON-safe. */
export function serializeBigInts(obj: unknown): unknown {
  if (typeof obj === 'bigint') return obj.toString();
  if (Array.isArray(obj)) return obj.map(serializeBigInts);
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [k, serializeBigInts(v)]),
    );
  }
  return obj;
}
