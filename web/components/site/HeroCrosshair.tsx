"use client";

import { useEffect, useRef } from "react";
import { SITE_CONFIG } from "@/lib/content";

/** Cursor crosshair and size/position readout. Tracks the hero section that contains it. */
export function HeroCrosshair() {
  const cross = useRef<HTMLDivElement>(null);
  const crossV = useRef<HTMLDivElement>(null);
  const crossH = useRef<HTMLDivElement>(null);
  const reticle = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = cross.current?.parentElement;
    if (!hero) return;
    const onMove = (e: MouseEvent) => {
      if (!cross.current) return;
      const r = hero.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const target = e.target instanceof Element
        ? e.target.closest<HTMLElement>('a[href], button:not(:disabled), [data-crosshair-target]')
        : null;
      const box = target && hero.contains(target) ? target.getBoundingClientRect() : null;
      const pad = (v: number) => String(Math.max(0, Math.round(v))).padStart(4, "0");
      cross.current.style.opacity = "1";
      cross.current.classList.toggle("is-targeting", !!box);
      crossV.current!.style.transform = "translateX(" + x + "px)";
      crossH.current!.style.transform = "translateY(" + y + "px)";
      reticle.current!.style.transform = `translate(${box ? box.left - r.left - 6 : x - 14}px, ${box ? box.top - r.top - 6 : y - 14}px)`;
      reticle.current!.style.width = `${box ? box.width + 12 : 28}px`;
      reticle.current!.style.height = `${box ? box.height + 12 : 28}px`;
      readout.current!.textContent = box
        ? `${Math.round(box.width)} × ${Math.round(box.height)}`
        : "X " + pad(x) + "  Y " + pad(y);
    };
    const onLeave = () => { if (cross.current) cross.current.style.opacity = "0"; };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => { hero.removeEventListener("mousemove", onMove); hero.removeEventListener("mouseleave", onLeave); };
  }, []);

  if (!SITE_CONFIG.crosshair) return null;
  return (
    <div ref={cross} className="crosshair" aria-hidden="true">
      <div ref={crossV} className="crosshair-v" />
      <div ref={crossH} className="crosshair-h" />
      <div ref={reticle} className="crosshair-reticle"><span ref={readout} /></div>
    </div>
  );
}
