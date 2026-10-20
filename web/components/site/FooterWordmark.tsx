"use client";

// Footer wordmark: rises with scrubbed parallax, draws as an outline once, then fills in.
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE } from "@/lib/motion";

export function FooterWordmark() {
  const wrap = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const stroke = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = wrap.current;
    if (!el) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const footer = el.closest("footer") ?? el;
      gsap.fromTo(el, { yPercent: 28 }, {
        yPercent: 0, ease: EASE.scrub,
        scrollTrigger: { trigger: footer, start: "top bottom", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
      });
      gsap.set(fill.current, { opacity: 0 });
      gsap.set(stroke.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top 100%", toggleActions: "play none none reset" } })
        .to(stroke.current, { clipPath: "inset(0 0% 0 0)", duration: DURATION.hero * 1.4, ease: EASE.enter })
        .to(fill.current, { opacity: 1, duration: DURATION.standard * 1.5, ease: "power2.out" }, "-=0.2")
        .to(stroke.current, { opacity: 0, duration: DURATION.standard }, "<");
    });
    return () => media.revert();
  }, []);

  return (
    <div ref={wrap} className="footer-wordmark" aria-hidden="true">
      <div ref={fill} className="footer-gradient-wordmark">UV GULF</div>
      <div ref={stroke} className="footer-wordmark-stroke">UV GULF</div>
    </div>
  );
}
