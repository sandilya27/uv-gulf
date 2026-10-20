"use client";

// Homepage team badges flip in one after another when the grid scrolls into view.
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE } from "@/lib/motion";

export function BadgeGrid({ className, children }: { className?: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const grid = root.current;
    if (!grid) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const badges = Array.from(grid.children);
      gsap.fromTo(badges, { rotateY: 90, opacity: 0, transformPerspective: 900, transformOrigin: "50% 50%" }, {
        rotateY: 0, opacity: 1, duration: DURATION.hero, ease: EASE.enter, stagger: 0.12,
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: grid, start: "top 85%", toggleActions: "play none none reset" },
      });
    });
    return () => media.revert();
  }, []);

  return <div ref={root} className={className}>{children}</div>;
}
