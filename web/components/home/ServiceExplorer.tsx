"use client";
import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "@/components/ds";
import { pop } from "@/components/site/Motion";
import { enquiryHref, SERVICES } from "@/lib/content";
const PHOTOS = ["inspection", "process-site", "calibration", "process-plan"];
export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!root.current || !sticky.current) return;
        root.current.style.setProperty("--svc-content-height", `${sticky.current.offsetHeight}px`);
        const travel = root.current.offsetHeight - sticky.current.offsetHeight;
        const top = parseFloat(getComputedStyle(sticky.current).top) || 0;
        const progress = Math.max(0, Math.min(1, (top - root.current.getBoundingClientRect().top) / Math.max(1, travel)));
        setActive(Math.min(SERVICES.length - 1, Math.floor(progress * SERVICES.length)));
      });
    };
    updateMotion();
    updateScroll();
    media.addEventListener("change", updateMotion);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    const observer = new ResizeObserver(updateScroll);
    if (sticky.current) observer.observe(sticky.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", updateMotion);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);
  const select = (index: number) => setActive(index);

  useEffect(() => {
    if (!reducedMotion) pop(panel.current, 8);
  }, [active, reducedMotion]);
  const sv = SERVICES[active];
  const num = String(active + 1).padStart(2, "0");
  return (
    <div ref={root} className="svc-explorer">
      <div ref={sticky} className="svc-sticky">
      <div className="svc-toolbar">
        <span>Explore our inspection expertise</span>
        <span>Scroll to explore · {num} / 04</span>
      </div>
      <div className="svc-grid">
        <div data-reveal="1" className="svc-rows">
          {SERVICES.map((s, i) => {
            const selected = i === active;
            return (
              <button key={s.title} type="button" className={"svc-row" + (selected ? " is-active" : "")} aria-pressed={selected} aria-controls="inspection-service-detail" onMouseEnter={() => select(i)} onFocus={() => select(i)} onClick={() => select(i)}>
                <span className="svc-row-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="svc-row-title">{s.title}</span>
                <span className="svc-row-arrow"><Icon name="arrow" size={22} /></span>
              </button>
            );
          })}
        </div>
        <div data-reveal="1" data-delay="120" className="svc-detail">
          <div className="svc-photo" style={{ backgroundImage: `url(/assets/images/${PHOTOS[active]}.webp)` }} aria-hidden="true"><span>{num} / {String(SERVICES.length).padStart(2, "0")}</span></div>
          <div ref={panel} id="inspection-service-detail" className="svc-panel" aria-live="off">
            <span className="svc-panel-kicker">SERVICE {num} / {String(SERVICES.length).padStart(2, "0")}</span>
            <h3 className="svc-panel-title">{sv.title}</h3>
            <p className="svc-panel-text">{sv.summary}</p>
            <ul className="uvg-list">{sv.items.map((it) => <li key={it}>{it}</li>)}</ul>
            <div className="svc-panel-action"><Button arrow href={enquiryHref("Inspection")}>Request this service</Button></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
