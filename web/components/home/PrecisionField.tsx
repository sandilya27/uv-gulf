"use client";

import { useEffect, useRef } from "react";
import { createTimeline, stagger } from "animejs";
import { Button, Eyebrow } from "@/components/ds";
import styles from "./PrecisionField.module.css";

// Open, machined frames form a sectional sculpture inspired by asset inspection.
const PLATES = Array.from({ length: 11 }, (_, i) => ({
  assembledY: (i - 5) * 17,
  openX: Math.sin(i * 0.65) * 90,
  openY: (i - 5) * 32,
  fanX: (i - 5) * 31,
  fanY: Math.abs(i - 5) * 13 - 30,
}));

const FRAME = "M-142-24 Q-160-34-142-44 L-16-110 Q0-119 16-110 L142-44 Q160-34 142-24 L16 42 Q0 51-16 42 Z M-96-34 L0 16 L96-34 L0-84 Z";

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
      cleanup = () => {};
      if (preference.matches) return;
      const plates = Array.from(svg.querySelectorAll(".precision-plate"));
      const timeline = createTimeline({ autoplay: false })
        .add(plates, {
          x: (_: unknown, i = 0) => [PLATES[i].openX, 0],
          y: (_: unknown, i = 0) => [PLATES[i].openY - PLATES[i].assembledY, 0],
          rotate: (_: unknown, i = 0) => [(i - 5) * 8, 0],
          delay: stagger(65, { from: "center" }),
          duration: 1400,
          ease: "inOutQuint",
        }, 0)
        .add(plates, {
          x: (_: unknown, i = 0) => PLATES[i].fanX,
          y: (_: unknown, i = 0) => PLATES[i].fanY - PLATES[i].assembledY,
          rotate: (_: unknown, i = 0) => (i - 5) * 12,
          delay: stagger(45),
          duration: 1400,
          ease: "inOutQuart",
        }, 2300);
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
            <div className={styles.caption}><span>UV GULF / SECTIONAL STUDY</span><span>01 — 03</span></div>
            <svg ref={artwork} viewBox="0 0 640 560" fill="none">
              <defs>
                <linearGradient id="precision-metal" x1="-150" y1="-110" x2="140" y2="50" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#d2f3ff" /><stop offset=".28" stopColor="#4aa2c7" /><stop offset=".58" stopColor="#126083" /><stop offset="1" stopColor="#082f49" />
                </linearGradient>
                <linearGradient id="precision-edge"><stop stopColor="#bdefff" /><stop offset="1" stopColor="#279bd6" stopOpacity=".25" /></linearGradient>
                <linearGradient id="precision-gold"><stop stopColor="#ffe4a1" /><stop offset=".5" stopColor="#f2a900" /><stop offset="1" stopColor="#895300" /></linearGradient>
                <radialGradient id="precision-halo"><stop stopColor="#279bd6" stopOpacity=".2" /><stop offset="1" stopColor="#279bd6" stopOpacity="0" /></radialGradient>
              </defs>
              <circle cx="320" cy="280" r="270" fill="url(#precision-halo)" />
              <ellipse cx="320" cy="455" rx="170" ry="22" fill="#000" opacity=".22" />
              <g transform="translate(320 300)">
                {PLATES.map((plate, i) => (
                  <g key={i} transform={`translate(0 ${plate.assembledY})`}>
                    <g className="precision-plate" style={{ transformOrigin: "0px -34px" }}>
                      <path d={FRAME} transform="translate(0 7)" fill={i === 5 ? "#895300" : "#072c41"} fillRule="evenodd" stroke="#062236" strokeWidth="1" />
                      <path d={FRAME} fill={`url(#${i === 5 ? "precision-gold" : "precision-metal"})`} fillRule="evenodd" stroke="url(#precision-edge)" strokeWidth="1" />
                      <path d="M-141-24 L-16 42 Q0 51 16 42 L141-24" stroke={i === 5 ? "#ffe4a1" : "#a2ddf3"} strokeOpacity=".7" />
                    </g>
                  </g>
                ))}
              </g>
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


