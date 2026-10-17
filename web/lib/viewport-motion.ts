import { createScope } from "animejs";

type ViewportMotionOptions = {
  /** Set entrance styles synchronously with Anime.js utilities (for example utils.set). */
  prepare: () => void;
  /** Create the entrance synchronously; keep duration, delay and easing explicit here. */
  play: () => void;
};

/**
 * Opt-in, one-shot entrance for a component-owned element. Call inside useEffect
 * and return its disposer; include usePathname() in dependencies for persistent
 * components that must reset on navigation. Effect replay creates a fresh scope.
 *
 * Example:
 *   return createViewportMotion(ref.current, {
 *     prepare: () => { utils.set(ref.current, { opacity: 0, y: 16 }); },
 *     play: () => { animate(ref.current, {
 *       opacity: 1, y: 0, duration: 500, ease: "outCubic",
 *     }); },
 *   });
 *
 * Markup/CSS must be readable in its final state before setup. Use Anime.js for
 * all owned styles so scope.revert() restores that baseline. Callbacks must be
 * synchronous; deferred animation creation is outside this scope's ownership.
 * Remove data-reveal/data-words from enhanced targets in future migrations and
 * review ancestor transforms and CSS animations to avoid competing owners.
 * Existing Motion.tsx targets and global styles are deliberately untouched.
 */
export function createViewportMotion(
  element: HTMLElement | null,
  { prepare, play }: ViewportMotionOptions,
): () => void {
  if (!element || typeof window === "undefined") return () => {};

  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let scope: ReturnType<typeof createScope> | undefined;
  let observer: IntersectionObserver | undefined;
  let settled = false;
  let disposed = false;

  // Reduced motion consumes the entrance, including changes before visibility.
  // Reverting stops active motion and restores the readable pre-setup styles.
  const settle = () => {
    settled = true;
    observer?.disconnect();
    scope?.revert();
    scope = undefined;
  };
  const onPreferenceChange = () => {
    if (!disposed && preference.matches) settle();
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    preference.removeEventListener("change", onPreferenceChange);
    observer?.disconnect();
    scope?.revert();
    scope = undefined;
  };

  preference.addEventListener("change", onPreferenceChange);
  try {
    if (preference.matches || !("IntersectionObserver" in window)) {
      settle();
    } else {
      scope = createScope({ root: element });
      observer = new IntersectionObserver((entries) => {
        if (disposed || settled || !entries.some((entry) => entry.isIntersecting)) return;
        settled = true;
        observer?.disconnect();
        try {
          scope?.execute(play);
        } catch (error) {
          dispose();
          throw error;
        }
      // Pixel margin: IntersectionObserver percentages are relative to width.
      }, { rootMargin: `0px 0px -${window.innerHeight * 0.12}px 0px`, threshold: 0 });
      scope.execute(prepare);
      observer.observe(element);
    }
  } catch (error) {
    dispose();
    throw error;
  }

  return dispose;
}
