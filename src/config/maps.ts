export const walkingMapConfig = {
  provider: 'openfreemap',
  style: 'positron',
  styleUrl: 'https://tiles.openfreemap.org/styles/positron',
  renderer: 'maplibre',
  attribution: {
    compactOnMobile: true
  },
  scroll: {
    desktopActivationLine: 0.58,
    mobileActivationLine: 0.52
  },
  camera: {
    desktop: {
      basePadding: 48,
      focusExtraPadding: 100,
      maxZoom: 14.3,
      durationMs: 650
    },
    mobile: {
      basePadding: 24,
      focusExtraPadding: 42,
      maxZoom: 13.8,
      durationMs: 450
    }
  }
} as const;
