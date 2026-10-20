"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { COUNTERS } from "@/lib/content";
import { DURATION, EASE } from "@/lib/motion";

const CREDENTIALS = [
  { code: "ISO/IEC 17020:2012", text: "Inspection-body accreditation" },
  { code: "ISO 9001:2015", text: "Quality-management system certification" },
];

/** Equipment data plate: settles in with a small tilt, rivets pop, values stamp in turn. */
export function AboutNameplate() {
  const plate = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add({
      motion: "(prefers-reduced-motion: no-preference)",
      pointer: "(prefers-reduced-motion: no-preference) and (hover: hover) and (min-width: 761px)",
    }, (context) => {
      const root = plate.current;
      const inner = tilt.current;
      if (!root || !inner) return;
      const q = gsap.utils.selector(root);
      const desktop = window.innerWidth > 760;
      gsap.timeline({ defaults: { ease: EASE.enter }, scrollTrigger: { trigger: root, start: "top 85%", toggleActions: "play none none reset" } })
        .fromTo(root, { opacity: 0, y: desktop ? 36 : 20, rotateX: desktop ? 8 : 0, transformPerspective: 900, transformOrigin: "50% 100%" },
          { opacity: 1, y: 0, rotateX: 0, duration: DURATION.hero * (desktop ? 1 : 0.6), clearProps: "opacity,transform" }, 0)
        .fromTo(q(".nameplate-rivet"), { scale: 0 }, { scale: 1, duration: DURATION.stamp, ease: EASE.stamp, stagger: 0.14, clearProps: "transform" }, 0.45);

      if (!context.conditions?.pointer) return;
      const rx = gsap.quickTo(inner, "rotateX", { duration: 0.5, ease: "power3.out" });
      const ry = gsap.quickTo(inner, "rotateY", { duration: 0.5, ease: "power3.out" });
      const sx = gsap.quickTo(root, "--sx", { duration: 0.4, ease: "power3.out" });
      const sy = gsap.quickTo(root, "--sy", { duration: 0.4, ease: "power3.out" });
      gsap.set(inner, { transformPerspective: 900 });
      const move = (event: PointerEvent) => {
        const box = root.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width;
        const y = (event.clientY - box.top) / box.height;
        ry((x - 0.5) * 6);
        rx(-(y - 0.5) * 6);
        sx(x * 100);
        sy(y * 100);
      };
      const enter = () => root.classList.add("is-hot");
      const leave = () => { rx(0); ry(0); root.classList.remove("is-hot"); };
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerenter", enter);
      root.addEventListener("pointerleave", leave);
      return () => {
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerenter", enter);
        root.removeEventListener("pointerleave", leave);
        root.classList.remove("is-hot");
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={plate} className="nameplate">
      <div ref={tilt} className="nameplate-tilt">
        <div className="nameplate-surface">
          <i className="nameplate-rivet nameplate-rivet--tl" aria-hidden="true" />
          <i className="nameplate-rivet nameplate-rivet--tr" aria-hidden="true" />
          <i className="nameplate-rivet nameplate-rivet--bl" aria-hidden="true" />
          <i className="nameplate-rivet nameplate-rivet--br" aria-hidden="true" />
          <p className="nameplate-title">United Vetting Gulf Co. Ltd.</p>
          <div className="nameplate-grid">
            {COUNTERS.map((k, i) => (
              <div key={k.label} data-stamp="1" data-delay={650 + i * 220} className="nameplate-cell">
                <span data-count={k.n} className="nameplate-value">{k.n}</span>
                <span className="nameplate-label">{k.label}</span>
                <span className="nameplate-sub">{k.sub}</span>
              </div>
            ))}
          </div>
          <h3 className="nameplate-caption">Accreditation &amp; certification</h3>
          <dl className="nameplate-grid">
            {CREDENTIALS.map((c, i) => (
              <div key={c.code} data-stamp="1" data-delay={1100 + i * 220} className="nameplate-cell">
                <dt className="nameplate-value nameplate-value--code">{c.code}</dt>
                <dd className="nameplate-sub">{c.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
