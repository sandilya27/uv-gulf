"use client";

import { animate, stagger, svg } from "animejs";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { createViewportMotion } from "@/lib/viewport-motion";

/** Opt-in decorative strokes; the server graphic stays complete until visible. */
export function TechnicalDrawing({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const paths = Array.from(root.current?.querySelectorAll<SVGGeometryElement>("[data-technical-stroke]") ?? []);
    if (!paths.length) return;
    // Drawable proxies write attributes outside scope's style tracking. Preserve
    // every touched attribute, including original dashes, on finish and teardown.
    const attributes = ["pathLength", "draw", "stroke-dasharray", "stroke-dashoffset", "style"];
    const originals = paths.map((path) => attributes.map((name) => path.getAttribute(name)));
    const restore = () => paths.forEach((path, index) => attributes.forEach((name, attribute) => {
      const value = originals[index][attribute];
      if (value === null) path.removeAttribute(name);
      else path.setAttribute(name, value);
    }));
    const dispose = createViewportMotion(root.current, {
      prepare: () => {},
      play: () => {
        try {
          animate(svg.createDrawable(paths), {
            draw: ["0 0", "0 1"],
            duration: 1000,
            delay: stagger(80),
            ease: "outCubic",
            onComplete: restore,
          });
        } catch (error) {
          restore();
          throw error;
        }
      },
    });
    // The shared helper reverts on live reduced-motion changes. Restore the
    // proxy's attributes too, after its animation has been stopped.
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreferenceChange = () => { if (preference.matches) restore(); };
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      dispose();
      preference.removeEventListener("change", onPreferenceChange);
      restore();
    };
  }, [pathname]);

  return <span ref={root} className={className}>{children}</span>;
}
