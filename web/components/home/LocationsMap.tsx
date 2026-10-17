"use client";

import { MaskedHeading } from "@/components/site/MaskedHeading";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button, Eyebrow } from "@/components/ds";
import { CITY_DATA } from "@/lib/content";
import { SAUDI_PATH } from "@/lib/saudi-path";
const cities = CITY_DATA.map(([name,lon,lat,anchor,dx,dy]) => { const x=(lon-34.3)/21.6*600,y=(32.4-lat)/16.2*500; return {name,lon,lat,x,y,anchor,lx:x+dx,ly:y+dy-5}; });
const hq=cities[0];
const route=(c:typeof hq)=>`M${hq.x},${hq.y} Q${(hq.x+c.x)/2},${Math.min(hq.y,c.y)-Math.abs(hq.x-c.x)*.22-18} ${c.x},${c.y}`;
export function LocationsMap() {
 const [selected,setSelected]=useState(0),[entered,setEntered]=useState(false);
 const ref=useRef<HTMLElement>(null),city=cities[selected];
 useEffect(()=>{const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setEntered(true);observer.disconnect();}},{threshold:.15});if(ref.current)observer.observe(ref.current);return ()=>observer.disconnect();},[]);
 return <section ref={ref} id="where" aria-labelledby="atlas-title" className={`section anchor coverage-atlas${entered?" is-visible":""}`}><div className="wrap">
 <header className="atlas-heading"><div><Eyebrow>Where we work</Eyebrow><MaskedHeading id="atlas-title" className="">One home base.<br/><span>Across the Kingdom.</span></MaskedHeading></div><p data-reveal="1">From our home in Khobar to your site.<br/>Inspection, testing and technical expertise,<br/>wherever your operations take you.</p></header>
 <div className="atlas-stage"><div className="atlas-map"><div className="atlas-caption"><span>Kingdom of Saudi Arabia</span><span>26°16′ N / 50°12′ E · HQ</span></div>
 <svg viewBox="-40 -25 700 560" role="img" aria-label={`Saudi Arabia service network. ${city.name} selected.`}><defs><pattern id="atlas-dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="var(--border-strong)" opacity=".25"/></pattern><linearGradient id="atlas-land" x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--sky-100)"/><stop offset="1" stopColor="var(--surface)"/></linearGradient></defs>
 <rect x="-40" y="-25" width="700" height="560" fill="url(#atlas-dots)"/><path d={SAUDI_PATH} className="atlas-land"/><text x="275" y="335" className="atlas-country" textAnchor="middle">SAUDI ARABIA</text><text x="60" y="335" className="atlas-sea" transform="rotate(58 60 335)">RED SEA</text>
 {cities.slice(1).map((c,i)=><path key={c.name} d={route(c)} pathLength="1" className={`atlas-route${selected===i+1?" is-active":""}`} style={{"--route-delay":`${i*85}ms`} as CSSProperties}/>)}
 {selected>0&&<path key={city.name} d={route(city)} pathLength="1" className="atlas-trace"/>}<circle cx={hq.x} cy={hq.y} r="18" className="atlas-hq"/>
 {cities.map((c,i)=><g key={c.name} className={`atlas-pin${selected===i?" is-active":""}`} aria-hidden="true" onMouseEnter={()=>setSelected(i)} onClick={()=>setSelected(i)}><circle cx={c.x} cy={c.y} r="12" fill="transparent"/><circle cx={c.x} cy={c.y} r={i===0?5:3.5} className="atlas-dot"/><text x={c.lx} y={c.ly} textAnchor={c.anchor} dominantBaseline="middle">{c.name}</text></g>)}</svg>
 <div className="atlas-legend"><span><i/> Head office · Khobar</span><span><i/> Service locations</span></div></div>
 <aside className="atlas-panel" aria-label="Explore service locations"><div className="atlas-caption"><span>Our reach</span><span>{String(selected+1).padStart(2,"0")} / {String(cities.length).padStart(2,"0")}</span></div><div className="atlas-detail" key={city.name}><span className="atlas-kicker">{selected===0?"The heart of our network":"Connected from Khobar"}</span><h3>{city.name}<span>↗</span></h3><p>{selected===0?"Our head office. Your starting point for inspection and technical support across Saudi Arabia.":"On-site inspection, testing and technical support for your operations. Coordinated from our Khobar head office."}</p><span className="atlas-coordinates">{city.lat.toFixed(2)}° N &nbsp; {city.lon.toFixed(2)}° E</span></div>
 <div className="atlas-cities" aria-label="Select a city">{cities.map((c,i)=><button key={c.name} type="button" aria-pressed={selected===i} className={selected===i?"is-active":""} onClick={()=>setSelected(i)} onFocus={()=>setSelected(i)} onMouseEnter={()=>setSelected(i)}><span>{c.name}</span><span>{i===0?"HQ":String(i).padStart(2,"0")}</span></button>)}</div><Button arrow href="/contact?type=inspection">Discuss your site</Button></aside></div>
 <footer className="atlas-footer"><span><strong>01</strong> Khobar head office</span><span><strong>{String(cities.length-1).padStart(2,"0")}</strong> Service locations</span><p>Your site. Our expertise. <span>Across Saudi Arabia.</span></p></footer></div></section>;
}
