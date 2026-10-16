"use client";

// Standards / NDT methods / industries strip. Scrolls continuously; slows on hover.
import { useEffect, useRef } from "react";
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
  const anim = useRef<Animation | null>(null);

  useEffect(() => {
    if (!track.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    anim.current = track.current.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], { duration: 45000, iterations: Infinity });
    return () => anim.current?.cancel();
  }, []);

  return (
    <section className="marquee" onMouseEnter={() => anim.current?.updatePlaybackRate(0.15)} onMouseLeave={() => anim.current?.updatePlaybackRate(1)}>
      <div ref={track} className="marquee-track">
        <Run />
        <Run hidden />
      </div>
    </section>
  );
}
