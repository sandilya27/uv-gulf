"use client";

// Adapted from React Bits TextLoop: custom SVG path and paired text copies.
// https://reactbits.dev/text-animations/text-loop (MIT)
import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";

const WORDS = "INSPECT   ·   TEST   ·   CALIBRATE   ·   CERTIFY   ·   ";
const CURVE = "M 190 250 C 150 155, 240 130, 350 130 S 550 100, 640 15";

export function HeroTextLoop() {
  const id = useId().replace(/:/g, "");
  const root = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const head = useRef<SVGTextPathElement>(null);
  const tail = useRef<SVGTextPathElement>(null);
  const progress = useRef(0.12);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!path.current || !head.current || !tail.current || !root.current) return;
    const length = path.current.getTotalLength();
    const first = head.current;
    const second = tail.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let travel = length * progress.current;
    let inView = false;
    let running = false;
    const apply = () => {
      progress.current = travel / length;
      first.setAttribute("startOffset", String(travel));
      second.setAttribute("startOffset", String(travel - length));
    };
    const tick = (_time: number, delta: number) => {
      travel = (travel + 28 * Math.min(delta / 1000, 0.05)) % length;
      apply();
    };
    const sync = () => {
      const shouldRun = inView && !media.matches && !paused && !document.hidden;
      if (shouldRun === running) return;
      running = shouldRun;
      if (running) gsap.ticker.add(tick);
      else gsap.ticker.remove(tick);
    };
    [first, second].forEach((el) => {
      el.parentElement!.setAttribute("textLength", String(length));
    });
    apply();
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(root.current);
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      gsap.ticker.remove(tick);
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [paused]);

  return (
    <div ref={root} className="hero-text-loop">
      <svg viewBox="0 0 600 220" role="img" aria-label="Inspect, Test, Calibrate, Certify">
        <defs>
          <path ref={path} id={`${id}-path`} d={CURVE} />
          <linearGradient id={`${id}-fade`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="30%" stopColor="white" />
            <stop offset="82%" stopColor="white" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id={`${id}-mask`}>
            <rect width="600" height="220" fill={`url(#${id}-fade)`} />
          </mask>
        </defs>
        <g mask={`url(#${id}-mask)`} aria-hidden="true">
          <use href={`#${id}-path`} className="hero-text-loop-guide" />
          <text lengthAdjust="spacing" dominantBaseline="central">
            <textPath ref={head} href={`#${id}-path`}>{WORDS}</textPath>
          </text>
          <text lengthAdjust="spacing" dominantBaseline="central">
            <textPath ref={tail} href={`#${id}-path`}>{WORDS}</textPath>
          </text>
        </g>
      </svg>
      <button type="button" className="hero-text-loop-toggle" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play service text animation" : "Pause service text animation"} aria-pressed={paused}>
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}
