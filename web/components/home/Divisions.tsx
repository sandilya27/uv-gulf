"use client";

// Equal-width division panels share content rows for consistent alignment.
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ds";
import { DIVISION_LINKS } from "@/lib/content";

type Side = "i" | "t";

const PANELS: { key: Side; num: string; eyebrow: string; title: string; text: string; links: string[]; cta: string; href: string }[] = [
  { key: "i", num: "01", eyebrow: "Inspection", title: "Inspection & testing", text: "Independent inspection, testing and calibration for industrial projects across the Kingdom.", links: DIVISION_LINKS.inspection, cta: "Explore inspection", href: "/inspection" },
  { key: "t", num: "02", eyebrow: "Training", title: "Training & certification", text: "Practical safety training and operator certification for individuals and industrial teams.", links: DIVISION_LINKS.training, cta: "Explore training", href: "/training" },
];

export function Divisions() {
  const section = useRef<HTMLElement>(null);
  const stampId = useId().replace(/:/g, "");
  const [stamped, setStamped] = useState<string[]>([]);
  const [revealed, setRevealed] = useState<string[]>([]);

  useEffect(() => {
    const cards = section.current?.querySelectorAll<HTMLElement>(".division");
    if (!cards) return;
    // Observe the row, not the panels: a clip-path on the target itself zeroes its intersection area.
    const row = section.current?.querySelector(".divisions-row");
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.15);
      setRevealed(visible ? PANELS.map((panel) => panel.key) : []);
      if (!visible) setStamped([]);
    }, { threshold: 0.15 });
    const stampObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.8) return;
        const key = (entry.target.closest(".division") as HTMLElement).dataset.division!;
        setStamped((previous) => previous.includes(key) ? previous : [...previous, key]);
      });
    }, { threshold: 0.8 });
    if (row) observer.observe(row);
    cards.forEach((card) => {
      const cta = card.querySelector(".division-cta");
      if (cta) stampObserver.observe(cta);
    });
    return () => {
      observer.disconnect();
      stampObserver.disconnect();
    };
  }, []);

  return (
    <section ref={section} className="uvg-deep divisions">
      <div className="divisions-row">
        {PANELS.map((p) => (
            <div
              key={p.key}
              className={`division${revealed.includes(p.key) ? " is-visible" : ""}${stamped.includes(p.key) ? " is-stamped" : ""}`}
              data-division={p.key}
            >
              <img className="division-photo" data-parallax="0.06" src={`/assets/images/${p.key === "i" ? "inspection" : "training"}.webp`} alt="" loading="lazy" decoding="async" aria-hidden="true" />
              <svg className={`division-stamp division-stamp--${p.key}`} viewBox="0 0 120 120" role="img" aria-label={p.key === "i" ? "UV Gulf: inspection, testing and calibration" : "UV Gulf: industrial skills and safety training"}>
                <defs>
                  <path id={`${stampId}-${p.key}`} d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
                </defs>
                <circle cx="60" cy="60" r="56" />
                <circle cx="60" cy="60" r="51" className="division-stamp-dashed" />
                <circle cx="60" cy="60" r="33" />
                <text className="division-stamp-ring" textLength="264" lengthAdjust="spacing">
                  <textPath href={`#${stampId}-${p.key}`} startOffset="0">{p.key === "i" ? "INSPECTION · TESTING · CALIBRATION · " : "INDUSTRIAL SKILLS · SAFETY TRAINING · "}</textPath>
                </text>
                <text x="60" y="57" className="division-stamp-brand">UV GULF</text>
                <path d="m49 68 7 7 15-16" className="division-stamp-check" />
              </svg>
              <h2 className="division-title">{p.title}</h2>
              <p className="division-text">{p.text}</p>
              <ul className="division-links">
                {p.links.map((l) => <li key={l}><span className="sq" aria-hidden="true" />{l}</li>)}
              </ul>
              <div className="division-cta">
                <Button variant="on-deep" arrow href={p.href}>{p.cta}</Button>
              </div>
            </div>
        ))}
      </div>
    </section>
  );
}
