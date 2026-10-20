"use client";

import { MaskedHeading } from "@/components/site/MaskedHeading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Button, Eyebrow } from "@/components/ds";
import { CITY_DATA } from "@/lib/content";
import { SAUDI_PATH } from "@/lib/saudi-path";
import { DURATION, EASE } from "@/lib/motion";

const rad = (d: number) => d * Math.PI / 180;
const COMPASS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
// Great-circle distance (km) and initial bearing from the head office.
function fromHq(lon: number, lat: number, hqLon: number, hqLat: number) {
  const dLat = rad(lat - hqLat), dLon = rad(lon - hqLon);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(hqLat)) * Math.cos(rad(lat)) * Math.sin(dLon / 2) ** 2;
  const km = 2 * 6371 * Math.asin(Math.sqrt(a));
  const y = Math.sin(dLon) * Math.cos(rad(lat)), x = Math.cos(rad(hqLat)) * Math.sin(rad(lat)) - Math.sin(rad(hqLat)) * Math.cos(rad(lat)) * Math.cos(dLon);
  const deg = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  return { km, deg, dir: COMPASS[Math.round(deg / 45) % 8] };
}
const hqData = CITY_DATA[0];
const cities = CITY_DATA.map(([name, lon, lat, anchor, dx, dy]) => {
  const x = (lon - 34.3) / 21.6 * 600, y = (32.4 - lat) / 16.2 * 500;
  return { name, lon, lat, x, y, anchor, lx: x + dx, ly: y + dy - 5, ...fromHq(lon, lat, hqData[1], hqData[2]) };
});
const hq = cities[0];
// One kilometre in map units (equirectangular projection, scaled at the head office latitude).
const KM = 0.2785;
const RINGS = [400, 800, 1200];
// City indexes (1-based, matching `cities`) nearest to Khobar first: dots and routes arrive in this order.
const byDistance = cities.slice(1).map((c, i) => ({ i: i + 1, d: c.km })).sort((a, b) => a.d - b.d).map(c => c.i);
const route = (c: typeof hq) => `M${hq.x},${hq.y} Q${(hq.x + c.x) / 2},${Math.min(hq.y, c.y) - Math.abs(hq.x - c.x) * .22 - 18} ${c.x},${c.y}`;
const TOUR_MS = 3600;

export function LocationsMap() {
  const [selected, setSelected] = useState(0), [entered, setEntered] = useState(false);
  const ref = useRef<HTMLElement>(null), city = cities[selected];
  const svg = useRef<SVGSVGElement>(null), traveler = useRef<SVGCircleElement>(null), beam = useRef<SVGPathElement>(null);
  const ready = useRef(false), travel = useRef<gsap.core.Tween | null>(null);
  const inView = useRef(false), touched = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
      if (entry.isIntersecting) setEntered(true);
    }, { threshold: .15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // The map is drawn once on enter: outline, Khobar pulse, then dots and routes outward by distance.
  useEffect(() => {
    const root = svg.current; if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const land = root.querySelector(".atlas-land"), rings = root.querySelectorAll(".atlas-range"), matrix = root.querySelector(".atlas-matrix"),
        routes = byDistance.map(i => root.querySelector(`[data-route="${i}"]`)),
        dots = byDistance.map(i => root.querySelector(`[data-pin="${i}"] .atlas-dot`)),
        labels = byDistance.map(i => root.querySelector(`[data-pin="${i}"] text`)),
        hqDot = root.querySelector('[data-pin="0"] .atlas-dot'), hqLabel = root.querySelector('[data-pin="0"] text');
      const pins = [hqDot, ...dots], texts = [hqLabel, ...labels];
      land?.setAttribute("pathLength", "1");
      gsap.set(land, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(matrix, { opacity: 0 });
      gsap.set(rings, { opacity: 0, scale: .4, transformOrigin: `${hq.x}px ${hq.y}px` });
      gsap.set(routes, { strokeDashoffset: 1 });
      gsap.set(pins, { scale: 0, transformOrigin: "50% 50%", transformBox: "fill-box" });
      gsap.set(texts, { opacity: 0 });
      const tl = gsap.timeline({ paused: true, onComplete: () => { ready.current = true; } });
      tl.to(land, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" })
        .to(matrix, { opacity: 1, duration: 1.2, ease: "power1.out" }, .5)
        .to(hqDot, { scale: 1, duration: DURATION.standard, ease: EASE.stamp }, 1.0).to(hqLabel, { opacity: 1, duration: DURATION.standard }, 1.0)
        .to(rings, { opacity: 1, scale: 1, duration: 1.3, ease: "power3.out", stagger: .14 }, 1.1)
        .to(routes, { strokeDashoffset: 0, duration: 1.1, ease: EASE.enter, stagger: .085 }, 1.5)
        .to(dots, { scale: 1, duration: DURATION.standard, ease: EASE.stamp, stagger: .085 }, 1.6)
        .to(labels, { opacity: 1, duration: DURATION.standard, stagger: .085 }, 1.6);
      const trigger = ScrollTrigger.create({ trigger: root, start: "top 80%", once: true, onEnter: () => { tl.play(); } });
      return () => { trigger.kill(); tl.kill(); travel.current?.kill(); ready.current = false; gsap.set([land, matrix, rings, ...routes, ...pins, ...texts, traveler.current], { clearProps: "all" }); };
    });
    return () => media.revert();
  }, []);

  // A dot travels from Khobar along the selected city's beam, which is drawn as it goes.
  useEffect(() => {
    const dot = traveler.current, path = beam.current;
    if (!dot || !path || selected === 0 || !ready.current) return;
    travel.current?.kill();
    const length = path.getTotalLength(), state = { p: 0 };
    gsap.set(path, { strokeDashoffset: 1 });
    travel.current = gsap.to(state, {
      p: 1, duration: 1, ease: "power2.inOut",
      onUpdate: () => { const pt = path.getPointAtLength(state.p * length); dot.setAttribute("cx", String(pt.x)); dot.setAttribute("cy", String(pt.y)); dot.style.opacity = String(state.p > 0 && state.p < 1 ? 1 : 0); path.style.strokeDashoffset = String(1 - state.p); },
      onComplete: () => { dot.style.opacity = "0"; },
    });
    return () => { travel.current?.kill(); dot.style.opacity = "0"; };
  }, [selected]);

  // Until the visitor takes over, the network tours itself city by city while in view.
  useEffect(() => {
    if (!entered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!inView.current || touched.current || !ready.current) return;
      setSelected(s => (s + 1) % cities.length);
    }, TOUR_MS);
    return () => window.clearInterval(id);
  }, [entered]);

  const pick = (i: number) => { touched.current = true; setSelected(i); };

  return <section ref={ref} id="where" aria-labelledby="atlas-title" className={`section anchor coverage-atlas${entered ? " is-visible" : ""}`}><div className="wrap">
    <header className="atlas-heading"><Eyebrow>Where we work</Eyebrow><MaskedHeading id="atlas-title" className="">One home base.<br /><span>Across the Kingdom.</span></MaskedHeading><p data-reveal="1">From our home in Khobar to your site. Inspection, testing and technical expertise, wherever your operations take you.</p></header>
    <div className="atlas-stage">
      <div className="atlas-map">
        <svg ref={svg} viewBox="-40 -25 700 560" role="img" aria-label={`Saudi Arabia service network. ${city.name} selected, ${Math.round(city.km)} kilometres from Khobar.`}>
          <defs>
            <pattern id="atlas-grid" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="1.05" /></pattern>
            <pattern id="atlas-field" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#6cc4f0" strokeOpacity=".07" /></pattern>
            <clipPath id="atlas-clip"><path d={SAUDI_PATH} /></clipPath>
            <radialGradient id="atlas-spot-fade"><stop stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
            <mask id="atlas-spot" maskUnits="userSpaceOnUse" x="-40" y="-25" width="700" height="560"><circle className="atlas-spot-mask" r="130" fill="url(#atlas-spot-fade)" style={{ transform: `translate(${city.x}px, ${city.y}px)` }} /></mask>
          </defs>
          <rect x="-40" y="-25" width="700" height="560" fill="url(#atlas-field)" />
          <g className="atlas-matrix" clipPath="url(#atlas-clip)">
            <rect x="-40" y="-25" width="700" height="560" className="atlas-matrix-dim" fill="url(#atlas-grid)" />
            <rect x="-40" y="-25" width="700" height="560" className="atlas-matrix-lit" fill="url(#atlas-grid)" mask="url(#atlas-spot)" />
          </g>
          <path d={SAUDI_PATH} className="atlas-land" />
          <text x="275" y="335" className="atlas-country" textAnchor="middle">SAUDI ARABIA</text>
          <text x="60" y="335" className="atlas-sea" transform="rotate(58 60 335)">RED SEA</text>
          {RINGS.map(km => <g key={km} className="atlas-range"><circle cx={hq.x} cy={hq.y} r={km * KM} /><text x={hq.x - km * KM * .7071 - 4} y={hq.y + km * KM * .7071 + 12} textAnchor="end">{km.toLocaleString("en")} km</text></g>)}
          {cities.slice(1).map((c, i) => <path key={c.name} d={route(c)} pathLength="1" data-route={i + 1} className={`atlas-route${selected === i + 1 ? " is-active" : ""}`} />)}
          {selected !== 0 && <path ref={beam} d={route(city)} pathLength="1" className="atlas-beam" />}
          <g className="atlas-sonar" aria-hidden="true"><circle cx={hq.x} cy={hq.y} r="14" /><circle cx={hq.x} cy={hq.y} r="14" /><circle cx={hq.x} cy={hq.y} r="14" /></g>
          {cities.map((c, i) => <g key={c.name} data-pin={i} className={`atlas-pin${selected === i ? " is-active" : ""}`} aria-hidden="true" onMouseEnter={() => pick(i)} onClick={() => pick(i)}><circle cx={c.x} cy={c.y} r="14" fill="transparent" /><circle cx={c.x} cy={c.y} r={i === 0 ? 5.5 : 3.5} className="atlas-dot" /><text x={c.lx} y={c.ly} textAnchor={c.anchor} dominantBaseline="middle">{c.name}</text></g>)}
          <circle ref={traveler} r="4.5" className="atlas-traveler" cx={hq.x} cy={hq.y} />
        </svg>
        <div className="atlas-caption"><span>Kingdom of Saudi Arabia</span><span>Range rings from Khobar</span></div>
      </div>
      <aside className="atlas-panel" aria-label="Explore service locations">
        <div className="atlas-readout" aria-live="polite">
          <span className="atlas-kicker">{selected === 0 ? "Head office" : "Connected from Khobar"}</span>
          <h3 key={city.name}><span className="atlas-name"><span>{city.name}</span></span></h3>
          <dl>
            <div><dt>Distance</dt><dd>{selected === 0 ? "Origin" : <><b>{Math.round(city.km).toLocaleString("en")}</b> km</>}</dd></div>
            <div><dt>Bearing</dt><dd>{selected === 0 ? "Base" : <><b>{city.dir}</b> {Math.round(city.deg)}°</>}</dd></div>
            <div><dt>Position</dt><dd>{city.lat.toFixed(2)}° N {city.lon.toFixed(2)}° E</dd></div>
          </dl>
          <p>{selected === 0 ? "Our head office. Your starting point for inspection and technical support across Saudi Arabia." : "On-site inspection, testing and technical support for your operations, coordinated from our Khobar head office."}</p>
        </div>
        <div className="atlas-cities" role="group" aria-label="Select a city">{cities.map((c, i) => <button key={c.name} type="button" aria-pressed={selected === i} className={selected === i ? "is-active" : ""} onClick={() => pick(i)} onFocus={() => pick(i)} onMouseEnter={() => pick(i)}><span>{c.name}</span><span>{i === 0 ? "HQ" : `${Math.round(c.km).toLocaleString("en")} km`}</span></button>)}</div>
        <Button variant="on-deep" arrow href="/contact?type=inspection">Discuss your site</Button>
      </aside>
    </div>
  </div></section>;
}
