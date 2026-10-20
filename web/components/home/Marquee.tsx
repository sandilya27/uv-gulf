"use client";

// Standards / NDT methods / industries strip, styled as a calibration ruler.
// Base speed always runs left; scroll velocity speeds it up, reverses it and skews it slightly.
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MethodTag } from "@/components/ds";
import { METHODS } from "@/lib/content";

function Run({ hidden }: { hidden?: boolean }) {
  return (
    <div className="marquee-run" aria-hidden={hidden || undefined}>
      <span className="marquee-std">ISO/IEC 17020:2012</span>
      <span className="marquee-dot" />
      <span className="marquee-std">ISO 9001:2015</span>
      <span className="marquee-dot" />
      {METHODS.map((m) => <span key={m.code} className="marquee-tag"><MethodTag code={m.code} label={m.label} /></span>)}
      <span className="marquee-dot" />
      <span className="marquee-industries">Oil and gas · Petrochemical · Energy · Construction</span>
      <span className="marquee-dot" />
    </div>
  );
}

const BASE_SPEED = 50 / 45; // percent of the track per second: half the track in 45s, as before
const MAX_SKEW = 4;

export function Marquee() {
  const track = useRef<HTMLDivElement>(null);
  const hover = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = track.current;
    if (!el) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const reactive = window.matchMedia("(min-width: 760px)").matches;
      const setX = gsap.quickSetter(el, "xPercent");
      const setSkew = gsap.quickSetter(el, "skewX", "deg");
      let position = 0;
      let factor = 1;
      let slow = 1;
      let velocity = 0;
      let stamp = 0;
      const trigger = reactive ? ScrollTrigger.create({
        start: 0, end: "max",
        onUpdate: (self) => { velocity = self.getVelocity(); stamp = performance.now(); },
      }) : null;
      const tick = () => {
        const dt = Math.min(gsap.ticker.deltaRatio(60) / 60, 0.1);
        const v = performance.now() - stamp > 120 ? 0 : velocity;
        // Down = left and faster; up = right; idle returns to base speed.
        const target = Math.abs(v) < 20 ? 1 : Math.sign(v) * (1 + Math.min(Math.abs(v) / 300, 6));
        factor += (target - factor) * Math.min(dt * 5, 1);
        slow += ((hover.current ? 0.15 : 1) - slow) * Math.min(dt * 8, 1);
        position = gsap.utils.wrap(-50, 0, position - BASE_SPEED * factor * slow * dt);
        setX(position);
        if (reactive) setSkew(gsap.utils.clamp(-MAX_SKEW, MAX_SKEW, -(factor - 1) * 0.8));
      };
      gsap.ticker.add(tick);
      return () => { gsap.ticker.remove(tick); trigger?.kill(); gsap.set(el, { clearProps: "transform" }); };
    });
    return () => media.revert();
  }, []);

  return (
    <section className="marquee" onMouseEnter={() => { hover.current = true; }} onMouseLeave={() => { hover.current = false; }}>
      <div ref={track} className="marquee-track">
        <Run />
        <Run hidden />
      </div>
    </section>
  );
}
