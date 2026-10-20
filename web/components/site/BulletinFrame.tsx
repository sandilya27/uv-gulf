"use client";

// Homepage news bulletins: each header's blueprint grid draws left to right as its card rises in.
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE } from "@/lib/motion";

export function BulletinFrame({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const frame = root.current;
    if (!frame) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const grids = Array.from(frame.querySelectorAll<HTMLElement>("[data-bulletin-grid]"));
      gsap.fromTo(grids, { clipPath: "inset(0 100% 0 0)" }, {
        clipPath: "inset(0 0% 0 0)", duration: DURATION.hero, ease: EASE.enter, stagger: 0.12, delay: 0.2,
        clearProps: "clipPath",
        scrollTrigger: { trigger: frame, start: "top 85%", once: true },
      });
    });
    return () => media.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
