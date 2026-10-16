"use client";

// Numbered service list; hovering (or focusing) a row swaps the sticky detail panel.
import { useRef, useState } from "react";
import { Button, Icon } from "@/components/ds";
import { pop } from "@/components/site/Motion";
import { enquiryHref, SERVICES } from "@/lib/content";

export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const select = (i: number) => {
    if (i === active) return;
    setActive(i);
    requestAnimationFrame(() => pop(panel.current, 8));
  };
  const sv = SERVICES[active];
  const num = "0" + (active + 1);

  return (
    <div className="svc-grid">
      <div data-reveal="1" className="svc-rows">
        {SERVICES.map((s, i) => {
          const a = i === active;
          return (
            <button key={s.title} type="button" className={"svc-row" + (a ? " is-active" : "")} aria-pressed={a} onMouseEnter={() => select(i)} onFocus={() => select(i)} onClick={() => select(i)}>
              <span className="svc-row-num">{"0" + (i + 1)}</span>
              <span className="svc-row-title">{s.title}</span>
              <span className="svc-row-arrow"><Icon name="arrow" size={22} /></span>
            </button>
          );
        })}
      </div>
      <div data-reveal="1" data-delay="120" className="sticky-panel">
        <div ref={panel} className="svc-panel" aria-live="polite">
          <span className="svc-panel-kicker">SERVICE {num} / 04</span>
          <h3 className="svc-panel-title">{sv.title}</h3>
          <p className="svc-panel-text">{sv.summary}</p>
          <ul className="uvg-list">{sv.items.map((it) => <li key={it}>{it}</li>)}</ul>
          <div style={{ marginTop: "var(--space-2)" }}>
            <Button arrow href={enquiryHref("Inspection")}>Request this service</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
