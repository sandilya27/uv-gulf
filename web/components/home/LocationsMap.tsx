"use client";

// "Where we work": city list + map of the Kingdom. Lines draw from Khobar to each city on
// first view; hovering a city in the list or on the map highlights it in both places.
import { useState } from "react";
import { Eyebrow } from "@/components/ds";
import { CITY_DATA } from "@/lib/content";
import { SAUDI_PATH } from "@/lib/saudi-path";

/** Equirectangular projection of lon/lat into the 600×500 map viewBox. */
const P = (lo: number, la: number) => [Math.round((lo - 34.3) / 21.6 * 600 * 10) / 10, Math.round((32.4 - la) / 16.2 * 500 * 10) / 10];

const PTS = CITY_DATA.map(([name, lo, la, anchor, dx, dy, tag]) => {
  const [x, y] = P(lo, la);
  return { name, x, y, anchor, lx: x + dx, ly: y + dy - 5, tag: tag || "Service" };
});
const HQ = PTS[0];

const GRID: { x1: number; y1: number; x2: number; y2: number }[] = [];
for (let lo = 36; lo <= 56; lo += 4) { const [x] = P(lo, 0); GRID.push({ x1: x, y1: 0, x2: x, y2: 500 }); }
for (let la = 18; la <= 32; la += 4) { const [, y] = P(0, la); GRID.push({ x1: 0, y1: y, x2: 600, y2: y }); }

const LABEL_T = { start: "translate(0,-50%)", middle: "translate(-50%,-50%)", end: "translate(-100%,-50%)" } as const;

export function LocationsMap() {
  const [city, setCity] = useState("Khobar");
  const desc = city === "Khobar" ? "Head office · Kingdom of Saudi Arabia" : "Service location";

  return (
    <section id="where" className="section bg-alt anchor">
      <div className="wrap where-grid">
        <div data-reveal="1" className="stack-24">
          <div className="stack-12">
            <Eyebrow>Where we work</Eyebrow>
            <h2 className="h2">Head office in Khobar, service across the Kingdom</h2>
          </div>
          <div className="city-list">
            {PTS.map((c) => (
              <button key={c.name} type="button" className={"city-row" + (c.name === city ? " is-active" : "")} aria-pressed={c.name === city} onMouseEnter={() => setCity(c.name)} onFocus={() => setCity(c.name)} onClick={() => setCity(c.name)}>
                <span className="city-name">{c.name}</span>
                <span className="city-tag">{c.tag}</span>
              </button>
            ))}
          </div>
        </div>
        <div data-reveal="1" data-delay="150" className="map-card">
          <svg viewBox="0 0 600 500" role="img" aria-label="Map of UV Gulf locations in Saudi Arabia" className="map-svg">
            {GRID.map((g, i) => <line key={i} {...g} className="map-grid" />)}
            <path d={SAUDI_PATH} className="map-land" />
            <g data-draw="1">
              {PTS.slice(1).map((c) => {
                const a = c.name === city;
                return <line key={c.name} x1={HQ.x} y1={HQ.y} x2={c.x} y2={c.y} className="map-route" style={{ strokeWidth: a ? 2 : 1, opacity: a ? 1 : 0.3 }} />;
              })}
            </g>
            <circle data-pulse="1" cx={HQ.x} cy={HQ.y} r="9" className="map-pulse" />
            {PTS.map((c) => {
              const a = c.name === city, isHq = c.name === "Khobar";
              return (
                <g key={c.name} onMouseEnter={() => setCity(c.name)} onClick={() => setCity(c.name)} style={{ cursor: "pointer" }}>
                  <circle cx={c.x} cy={c.y} r="14" fill="transparent" />
                  <circle cx={c.x} cy={c.y} r={a ? 8 : isHq ? 7 : 5} className="map-dot" style={{ fill: a ? "var(--signal)" : isHq ? "var(--primary)" : "var(--accent)" }} />
                </g>
              );
            })}
          </svg>
          <div className="map-labels" aria-hidden="true">
            {PTS.map((c) => {
              const a = c.name === city;
              return (
                <span key={c.name} style={{ left: c.lx / 6 + "%", top: c.ly / 5 + "%", transform: LABEL_T[c.anchor], fontWeight: a ? 700 : 500, color: a ? "var(--ink)" : "var(--ink-muted)" }}>{c.name}</span>
              );
            })}
          </div>
          <div className="map-foot" aria-live="polite">
            <span className="map-foot-city">{city}</span>
            <span className="map-foot-desc">{desc}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
