"use client";

// Standards / NDT methods / industries strip. Scrolls continuously; slows on hover.
import { useEffect, useRef } from "react";
import gsap from "gsap";
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

export function Marquee() {
  const track = useRef<HTMLDivElement>(null);
  const anim = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      anim.current = gsap.fromTo(track.current, { xPercent: 0 }, { xPercent: -50, duration: 45, repeat: -1, ease: "none" });
      return () => { anim.current = null; };
    });
    return () => media.revert();
  }, []);

  return (
    <section className="marquee" onMouseEnter={() => anim.current?.timeScale(0.15)} onMouseLeave={() => anim.current?.timeScale(1)}>
      <div ref={track} className="marquee-track">
        <Run />
        <Run hidden />
      </div>
    </section>
  );
}
