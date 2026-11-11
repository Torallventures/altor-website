const INTRO_KEY = "torall-open-contour-intro-v1";
const INTRO_DURATION = 2400;

/** Runs before React's first render, avoiding a visible/static/animated flash. */
export function startBrandIntroduction(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try {
    if (window.sessionStorage.getItem(INTRO_KEY)) return;
    // Mark before rendering: StrictMode and internal navigation cannot replay it.
    window.sessionStorage.setItem(INTRO_KEY, "seen");
  } catch {
    // If storage is unavailable, prefer the static identity over repeated intros.
    return;
  }
  document.documentElement.classList.add("brand-intro");
  window.setTimeout(() => document.documentElement.classList.remove("brand-intro"), INTRO_DURATION);
}
