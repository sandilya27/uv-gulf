"use client";

import { useEffect, useRef } from "react";
import { createTimeline, stagger } from "animejs";
import { Button, Eyebrow } from "@/components/ds";
import styles from "./PrecisionField.module.css";

// Deterministic geometry keeps the server render and first client frame identical.
const POINTS = Array.from({ length: 216 }, (_: unknown, i = 0) => {
  const x = i % 6 - 2.5;
  const y = Math.floor(i / 6) % 6 - 2.5;
  const z = Math.floor(i / 36) - 2.5;
  return {
    cubeX: 320 + (x - z) * 35,
    cubeY: 280 + (x + z) * 17 + y * 37,
    fieldX: 65 + (i % 18) * 30,
    fieldY: 100 + Math.floor(i / 18) * 31 + Math.sin(i * 2.4) * 38,
    waveX: 45 + (i % 36) * 16,
    waveY: 260 + Math.sin((i % 36) * 0.22) * 95 + Math.floor(i / 36) * 12,
  };
});

export function PrecisionField() {
  const root = useRef<HTMLElement>(null);
  const artwork = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = root.current;
    const svg = artwork.current;
    if (!section || !svg) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce), (max-height: 680px)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (preference.matches) return;
      const dots = Array.from(svg.querySelectorAll(".precision-dot"));
      const timeline = createTimeline({ autoplay: false })
        .add(dots, {
          cx: (_: unknown, i = 0) => [POINTS[i].fieldX, POINTS[i].cubeX],
          cy: (_: unknown, i = 0) => [POINTS[i].fieldY, POINTS[i].cubeY],
          opacity: [0.25, 0.95],
          r: [1.5, 2.8],
          delay: stagger(3, { from: "center" }),
          duration: 1400,
          ease: "inOutQuint",
        }, 0)
        .add(dots, {
          cx: (_: unknown, i = 0) => POINTS[i].waveX,
          cy: (_: unknown, i = 0) => POINTS[i].waveY,
          r: 2,
          opacity: 0.65,
          delay: stagger(2),
          duration: 1200,
          ease: "inOutQuart",
        }, 2400);
      let frame = 0;
      const update = () => {
        frame = 0;
        const bounds = section.getBoundingClientRect();
        const travel = bounds.height - window.innerHeight;
        const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, travel)));
        timeline.seek(progress * timeline.duration);
        section.style.setProperty("--precision-progress", String(progress));
      };
      const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      update();
      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        timeline.revert();
        section.style.removeProperty("--precision-progress");
      };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => { cleanup(); preference.removeEventListener("change", setup); };
  }, []);

  return (
    <section ref={root} className={styles.section} aria-labelledby="precision-title">
      <div className={styles.stage}>
        <div className={`wrap ${styles.layout}`}>
          <div className={styles.copy}>
            <Eyebrow>Clarity through precision</Eyebrow>
            <h2 id="precision-title">Every detail.<br />A clearer <span>picture.</span></h2>
            <p>Complex assets. Exacting standards. We bring the details together through inspection, testing and calibration—so you can move forward with confidence.</p>
            <Button variant="outline-deep" arrow href="/inspection">Explore our expertise</Button>
          </div>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.caption}><span>UV GULF / PRECISION STUDY</span><span>01 — 03</span></div>
            <svg ref={artwork} viewBox="0 0 640 560" fill="none">
              <defs>
                <radialGradient id="precision-halo"><stop stopColor="#279bd6" stopOpacity=".2" /><stop offset="1" stopColor="#279bd6" stopOpacity="0" /></radialGradient>
              </defs>
              <circle cx="320" cy="280" r="270" fill="url(#precision-halo)" />
              <g stroke="#6cc4f0" strokeOpacity=".13"><path d="M20 280H620M320 30V530" /><circle cx="320" cy="280" r="225" strokeDasharray="2 12" /><circle cx="320" cy="280" r="155" /></g>
              {POINTS.map((point, i) => <circle className="precision-dot" key={i} cx={point.cubeX} cy={point.cubeY} r="2.8" fill={i % 7 === 0 ? "#f2a900" : "#85dcff"} />)}
              <g stroke="#85dcff" strokeWidth="1.5"><path d="M30 65V45H50M590 45H610V65M30 495V515H50M590 515H610V495" /></g>
            </svg>
            <div className={styles.legend}><span>Observe</span><span>Understand</span><span>Move forward</span></div>
            <div className={styles.track}><span /></div>
            <span className={styles.hint}>SCROLL TO BRING IT TOGETHER ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}


