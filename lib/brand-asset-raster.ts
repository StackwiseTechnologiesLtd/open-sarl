/** PNG export dimensions for vector brand assets. */
export const brandAssetRaster = {
  logo: { width: 1600, height: Math.round((1600 * 2974) / 4408) },
  "logo-white": { width: 1600, height: Math.round((1600 * 2974) / 4408) },
  mark: { width: 800, height: Math.round((800 * 2720) / 1535) },
  envelope: { width: 2200, height: 1260 },
  "envelope-paper": { width: 2200, height: 1260 },
  "envelope-print": { width: 2200, height: 1260 },
  "envelope-print-plain": { width: 2200, height: 1260 },
  "envelope-paper-print": { width: 2200, height: 1260 },
  "envelope-paper-print-plain": { width: 2200, height: 1260 },
} as const;

export type BrandAssetRasterKind = keyof typeof brandAssetRaster;
