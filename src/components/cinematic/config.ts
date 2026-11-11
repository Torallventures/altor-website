/** All artistic and device-quality controls live here. Times are seconds. */
export const PARTICLE_CONFIG = {
  desktop: { particles: 22000, ambient: 4200, pixelRatio: 1.75, fps: 60 },
  mobile: { particles: 10000, ambient: 1600, pixelRatio: 1.35, fps: 40 },
  lowPower: { particles: 6000, ambient: 900, pixelRatio: 1, fps: 30 },
  mobileBreakpoint: 768,
  formationDuration: 8,
  transitionDuration: 3.1,
  constructionDuration: 4.2,
  globeRotationSpeed: 0.045,
  turbulence: 0.46,
  glowStrength: 0.22,
  particleSize: 1.6,
  cameraDistance: 11.5,
  fieldOfView: 42,
} as const;

export const FORMATIONS = [
  { name: 'Website Construction' },
  { name: 'Connected Globe' },
  { name: 'Business Network' },
  { name: 'Responsive Transformation' },
  { name: 'Connected Digital Ecosystem' },
] as const;

export const CYCLE_DURATION = FORMATIONS.length * PARTICLE_CONFIG.formationDuration;

/** A wrapped clock keeps ecosystem → website construction continuous. */
export function sequenceAt(seconds: number) {
  const time = ((seconds % CYCLE_DURATION) + CYCLE_DURATION) % CYCLE_DURATION;
  const current = Math.floor(time / PARTICLE_CONFIG.formationDuration);
  return { time, current, previous: (current + FORMATIONS.length - 1) % FORMATIONS.length,
    localTime: time - current * PARTICLE_CONFIG.formationDuration };
}
