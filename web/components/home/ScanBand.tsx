"use client";

// Pinned inspection sweep: a scan bar crosses the band, turning the photo from navy duotone
// to full colour, drawing an ultrasonic trace and revealing the heading as it passes.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

// Ultrasonic A-scan style trace: flat baseline broken by a few echo pulses.
const WAVE = "M0 30 L90 30 L96 26 L102 34 L108 30 L220 30 L226 22 L232 38 L238 30 L350 30 L356 28 L362 32 L368 30 L470 30 L476 8 L484 52 L492 14 L500 30 L610 30 L616 27 L622 33 L628 30 L740 30 L746 20 L752 40 L758 30 L860 30 L866 28 L872 32 L878 30 L980 30 L986 12 L994 48 L1002 26 L1010 30 L1100 30 L1106 27 L1112 33 L1118 30 L1200 30";
const clamp = (n: number) => Math.min(1, Math.max(0, n));

export function ScanBand({ slotId, src, placeholder, height, title, children }: { slotId: string; src: string; placeholder: string; height: string; title: string; children?: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const band = root.current;
    if (!band) return;
    gsap.registerPlugin(ScrollTrigger);
    const color = band.querySelector<HTMLElement>(".scan-color")!;
    const inner = band.querySelector<HTMLElement>(".scan-color-inner")!;
    const zoom = band.querySelector<HTMLElement>(".scan-zoom")!;
    const bar = band.querySelector<HTMLElement>(".scan-bar")!;
    const wave = band.querySelector<SVGPathElement>(".scan-wave path")!;
    const words = Array.from(band.querySelectorAll<HTMLElement>("[data-scan-word]"));
    let offsets: number[] = [];
    let width = 1;

    const measure = () => {
      const box = band.getBoundingClientRect();
      width = box.width || 1;
      offsets = words.map((word) => word.getBoundingClientRect().left - box.left);
    };
    // One progress value (0 to 1) drives every layer of the sweep.
    const apply = (p: number) => {
      const x = p * width;
      bar.style.transform = `translate3d(${x}px,0,0)`;
      bar.style.opacity = p > 0 && p < 1 ? "1" : "0";
      // Reveal by sliding a clipping window and counter-sliding its image: compositor-only, no repaint.
      color.style.transform = `translate3d(${-(1 - p) * 100}%,0,0)`;
      inner.style.transform = `translate3d(${(1 - p) * 100}%,0,0)`;
      zoom.style.transform = `scale(${1.1 - 0.1 * p})`;
      wave.style.strokeDashoffset = String(1 - p);
      words.forEach((word, i) => { word.style.opacity = String(0.18 + 0.82 * clamp((x - offsets[i]) / 60 + 0.5)); });
    };

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference) and (min-width: 760px)", () => {
      band.classList.add("is-scanning");
      measure();
      apply(0);
      const trigger = ScrollTrigger.create({
        trigger: band, start: "top top", end: () => `+=${Math.round(window.innerHeight * 1.2)}`,
        pin: true, scrub: true, invalidateOnRefresh: true,
        onRefresh: (self) => { measure(); apply(clamp(self.progress / 0.92)); },
        onUpdate: (self) => apply(clamp(self.progress / 0.92)),
      });
      return () => { trigger.kill(); band.classList.remove("is-scanning"); };
    });
    media.add("(prefers-reduced-motion: no-preference) and (max-width: 759px)", () => {
      band.classList.add("is-scanning");
      measure();
      apply(0);
      const progress = { p: 0 };
      const tween = gsap.to(progress, {
        p: 1, duration: 1.2, ease: "power2.inOut", onUpdate: () => apply(progress.p),
        scrollTrigger: { trigger: band, start: "top 75%", once: true },
      });
      return () => { tween.scrollTrigger?.kill(); tween.kill(); band.classList.remove("is-scanning"); };
    });
    return () => {
      media.revert();
      [color, inner, zoom, bar, wave, ...words].forEach((el) => el.removeAttribute("style"));
    };
  }, []);

  return (
    <section ref={root} className="photo-band photo-band--scan" style={{ height }}>
      <div className="scan-zoom">
        <img id={slotId} src={src} alt={placeholder} loading="lazy" decoding="async" className="photo-slot-img scan-base" />
        <div className="photo-band-overlay" />
        <div className="scan-color"><div className="scan-color-inner"><img src={src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="photo-slot-img" /></div></div>
      </div>
      <div className="scan-shade" aria-hidden="true" />
      <div className="scan-bar" aria-hidden="true" />
      <svg className="scan-wave" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d={WAVE} pathLength="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="uvg-deep photo-band-copy">
        <div className="wrap photo-band-text">
          {children}
          <h2 className="h-band">{title.split(" ").map((word, i) => <span key={i}>{i > 0 ? " " : ""}<span data-scan-word>{word}</span></span>)}</h2>
        </div>
      </div>
    </section>
  );
}
