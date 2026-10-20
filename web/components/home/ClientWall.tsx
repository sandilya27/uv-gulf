"use client";

// Still client logo wall. Tiles assemble on a diagonal stagger and each border draws on.
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE } from "@/lib/motion";

const CLIENTS = [
  ["SABIC", "sabic"],
  ["Saudi Aramco", "aramco"],
  ["Yasref", "yasref"],
  ["Saudi Electricity Company", "saudi-electricity"],
  ["Marafiq", "marafiq"],
  ["Ma’aden", "maaden"],
];

export function ClientWall() {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = list.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const tiles = Array.from(root.children) as HTMLElement[];
      const columns = getComputedStyle(root).gridTemplateColumns.split(" ").length;
      const rise = window.matchMedia("(max-width: 759px)").matches ? 10 : 18;
      const rects = tiles.map((tile) => tile.querySelector<SVGRectElement>("rect")!);
      const order = tiles.map((_, i) => Math.floor(i / columns) + (i % columns));
      gsap.set(tiles, { opacity: 0, y: rise });
      gsap.set(rects, { strokeDasharray: 1, strokeDashoffset: 1 });
      const timeline = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 85%", toggleActions: "play none none reset" } });
      tiles.forEach((tile, i) => {
        const at = order[i] * 0.14;
        timeline.to(tile, { opacity: 1, y: 0, duration: DURATION.standard, ease: EASE.enter, clearProps: "opacity,transform" }, at);
        timeline.to(rects[i], { strokeDashoffset: 0, duration: DURATION.hero, ease: EASE.enter }, at);
      });
    });
    return () => media.revert();
  }, []);

  return (
    <ul ref={list} className="client-wall">
      {CLIENTS.map(([name, logo]) => (
        <li key={name}>
          <img src={`/assets/clients/${logo}.jpeg`} alt={name} className="home-client-logo" width={370} height={202} loading="lazy" />
          <svg className="client-wall-edge" aria-hidden="true"><rect x="0" y="0" width="100%" height="100%" rx="8" pathLength={1} /></svg>
        </li>
      ))}
    </ul>
  );
}
