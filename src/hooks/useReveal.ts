import { useEffect, useRef } from "react";

/**
 * Reveals content once. Returning upward never hides or replays it.
 * Viewport state remains available to pause decorative animation offscreen.
 * With reduced motion (or no IntersectionObserver) the element is
 * simply shown immediately and stays visible.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty("--reveal-delay", `${delay}ms`);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      el.classList.add("revealed");
      el.dataset.inView = "true";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          el.dataset.inView = String(entry.isIntersecting);
          if (entry.isIntersecting) el.classList.add("revealed");
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return ref;
}
