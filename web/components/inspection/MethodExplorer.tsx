"use client";

// NDT methods grid; selecting (click or hover) a method swaps the sticky detail panel.
import { useRef, useState } from "react";
import { Button, Eyebrow } from "@/components/ds";
import { pop } from "@/components/site/Motion";
import { enquiryHref, METHODS } from "@/lib/content";
import styles from "./MethodExplorer.module.css";

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
    <section className={`section bg-alt ${styles.explorer}`} aria-labelledby="methods">
      <div className="wrap method-grid">
        <div data-reveal="1" className="stack-24">
          <div className="stack-12">
            <Eyebrow>Methods & limitations</Eyebrow>
            <h2 id="methods" className="h2">Different methods answer different questions.</h2>
            <p className="body-muted">Select a method to see what it finds and where its limitations apply.</p>
          </div>
          <div className={styles.selectorHeading}><span>Explore the methods</span><span>01 — 08</span></div>
          <div className="method-btns">
            {METHODS.map((x, index) => (
              <button key={x.code} type="button" className={"method-btn" + (x.code === code ? " is-active" : "")} aria-pressed={x.code === code} onClick={() => select(x.code)} onMouseEnter={() => select(x.code)}>
                <span className={styles.buttonTop}><span className="method-btn-code">{x.code}</span><span className={styles.buttonIndex}>{String(index + 1).padStart(2, "0")}</span></span>
                <span className="method-btn-label">{x.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div data-reveal="1" data-delay="120" className="sticky-panel">
          <div ref={panel} className="method-panel" aria-live="polite">
            <div className={styles.visual} aria-hidden="true">
              <div className={styles.visualHeader}><span>Examination method</span><span>{String(METHODS.indexOf(m) + 1).padStart(2, "0")} / 08</span></div>
              <span className="method-panel-code">{m.code}</span>
              <svg className={styles.signal} viewBox="0 0 320 130" fill="none"><path d="M0 90H320M0 45H320M40 0V130M100 0V130M160 0V130M220 0V130M280 0V130" className={styles.signalGrid}/><circle cx="190" cy="65" r="48"/><circle cx="190" cy="65" r="30"/><path d="M0 65H100L112 50L124 80L139 24L154 105L171 51L186 70L202 65H320" className={styles.wave}/><circle cx="190" cy="65" r="4" className={styles.signalDot}/></svg>
              <div className={styles.visualFooter}><span>Non-destructive testing</span><span>UV GULF · {m.code}</span></div>
            </div>
            <div className={styles.details}>
            <h3 className="method-panel-title">{m.label} testing ({m.code})</h3>
            <p className="method-panel-text">{m.desc}</p>
            <div className={styles.limitation}><span>Suitability & limitations</span><p className="method-panel-text">{limitations[m.code]}</p></div>
            <div className={styles.action}><Button variant="ghost" arrow href={enquiryHref("Inspection")}>Ask about this method</Button><span>Scope agreed for your asset</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
