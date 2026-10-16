"use client";

// Inspection | Training split. The hovered side widens and lightens; the other side's links dim.
import { useState } from "react";
import { Button, Eyebrow } from "@/components/ds";
import { DIVISION_LINKS } from "@/lib/content";

type Side = "i" | "t";

const PANELS: { key: Side; num: string; eyebrow: string; title: string; text: string; links: string[]; cta: string; href: string }[] = [
  { key: "i", num: "01", eyebrow: "Inspection", title: "Inspection & testing", text: "Third-party inspection, NDT, calibration and technical advisory for oil and gas, petrochemical, energy and construction projects.", links: DIVISION_LINKS.inspection, cta: "Explore inspection", href: "/inspection" },
  { key: "t", num: "02", eyebrow: "Training", title: "Training & certification", text: "Industrial skills, safety and operator certification for individuals and workforces across the Kingdom.", links: DIVISION_LINKS.training, cta: "Explore training", href: "/training" },
];

export function Divisions() {
  const [hover, setHover] = useState<Side | null>(null);
  return (
    <section className="uvg-deep divisions">
      <div className="divisions-row" onMouseLeave={() => setHover(null)}>
        {PANELS.map((p) => {
          const active = hover === p.key;
          const dimmed = hover !== null && !active;
          return (
            <div
              key={p.key}
              className="division"
              onMouseEnter={() => setHover(p.key)}
              style={{ flexGrow: active ? 1.7 : 1, background: active ? "var(--navy-800)" : "var(--navy-900)" }}
            >
              <img className="division-photo" src={`/assets/images/${p.key === "i" ? "inspection" : "training"}.webp`} alt="" loading="lazy" decoding="async" aria-hidden="true" />
              <span aria-hidden="true" className="division-num">{p.num}</span>
              <Eyebrow>{p.eyebrow}</Eyebrow>
              <h2 className="division-title">{p.title}</h2>
              <p className="division-text">{p.text}</p>
              <div className="division-links" style={{ opacity: dimmed ? 0.35 : 1, transform: active ? "translateY(0)" : "translateY(4px)" }}>
                {p.links.map((l) => <span key={l}><span className="sq" />{l}</span>)}
              </div>
              <div style={{ marginTop: "var(--space-4)" }}>
                <Button variant="on-deep" arrow href={p.href}>{p.cta}</Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
