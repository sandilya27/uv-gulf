"use client";

// NDT methods grid; selecting (click or hover) a method swaps the sticky detail panel.
import { useRef, useState } from "react";
import { Button, Eyebrow } from "@/components/ds";
import { pop } from "@/components/site/Motion";
import { enquiryHref, METHODS } from "@/lib/content";

export function MethodExplorer({ limitations }: { limitations: Record<string, string> }) {
  const [code, setCode] = useState("UT");
  const panel = useRef<HTMLDivElement>(null);
  const select = (c: string) => {
    if (c === code) return;
    setCode(c);
    requestAnimationFrame(() => pop(panel.current, 8));
  };
  const m = METHODS.find((x) => x.code === code)!;

  return (
    <section className="section bg-alt" aria-labelledby="methods">
      <div className="wrap method-grid">
        <div data-reveal="1" className="stack-24">
          <div className="stack-12">
            <Eyebrow>Methods & limitations</Eyebrow>
            <h2 id="methods" className="h2">Different methods answer different questions.</h2>
            <p className="body-muted">Select a method to see what it finds and where its limitations apply.</p>
          </div>
          <div className="method-btns">
            {METHODS.map((x) => (
              <button key={x.code} type="button" className={"method-btn" + (x.code === code ? " is-active" : "")} aria-pressed={x.code === code} onClick={() => select(x.code)} onMouseEnter={() => select(x.code)}>
                <span className="method-btn-code">{x.code}</span>
                <span className="method-btn-label">{x.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div data-reveal="1" data-delay="120" className="sticky-panel">
          <div ref={panel} className="method-panel" aria-live="polite">
            <span className="method-panel-code">{m.code}</span>
            <h3 className="method-panel-title">{m.label} testing ({m.code})</h3>
            <p className="method-panel-text">{m.desc}</p>
            <p className="method-panel-text">{limitations[m.code]}</p>
            <div><Button variant="ghost" arrow href={enquiryHref("Inspection")}>Ask about this method</Button></div>
          </div>
        </div>
      </div>
    </section>
  );
}
