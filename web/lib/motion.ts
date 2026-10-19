// Shared motion tokens. The CSS custom properties of the same names live in app/globals.css.
export const EASE = {
  enter: "power3.out",
  stamp: "back.out(1.6)",
  scrub: "none",
} as const;

// Seconds, for GSAP.
export const DURATION = {
  micro: 0.18,
  standard: 0.6,
  hero: 1.0,
  stamp: 0.28,
} as const;
