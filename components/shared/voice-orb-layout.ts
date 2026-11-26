/** Match the hero's tablet / desktop layout boundary (Tailwind xl). */
export function getOrbLayout(width: number, height: number, deviceDpr: number) {
  const profile = width < 768 ? 'mobile' : width < 1280 ? 'tablet' : 'desktop';
  const desktop = profile === 'desktop';
  return {
    profile,
    dpr: Math.min(deviceDpr || 1, profile === 'mobile' ? 1 : desktop ? 1.5 : 1.25),
    scale: desktop ? 0.53 : Math.min(0.64, (width / Math.max(height, 1)) * 0.64),
    centerY: desktop ? 0.12 : 0,
    pointSize: desktop ? 1.95 : 2.1,
    atmosphere: desktop ? 1 : profile === 'mobile' ? 0.9 : 0.95,
    shells: desktop
      ? [
          { r: 0.78, rings: 52, eqDots: 104, s: 2 },
          { r: 0.89, rings: 76, eqDots: 152, s: 1 },
          { r: 1.0, rings: 112, eqDots: 224, s: 0 },
        ]
      : profile === 'tablet'
        ? [
            { r: 0.78, rings: 44, eqDots: 88, s: 2 },
            { r: 0.89, rings: 64, eqDots: 128, s: 1 },
            { r: 1.0, rings: 92, eqDots: 184, s: 0 },
          ]
        : [
            { r: 0.78, rings: 32, eqDots: 64, s: 2 },
            { r: 0.89, rings: 44, eqDots: 88, s: 1 },
            { r: 1.0, rings: 64, eqDots: 128, s: 0 },
          ],
  };
}
