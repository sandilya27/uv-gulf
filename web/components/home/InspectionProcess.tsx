"use client";

// Sticky scroll storytelling: the step crossing 55% of the viewport becomes active and
// drives the big step number, the progress bar and the checklist.
import { useEffect, useRef, useState } from "react";
import { Eyebrow, Icon } from "@/components/ds";
import { pop } from "@/components/site/Motion";
import { STEPS } from "@/lib/content";

export function InspectionProcess() {
  const [step, setStep] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const onScroll = () => {
      const els = list.current?.children;
      if (!els) return;
      let a = 0;
      Array.from(els).forEach((s, i) => { if (s.getBoundingClientRect().top < window.innerHeight * 0.55) a = i; });
      setStep(a);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    pop(num.current, 20);
  }, [step]);

  return (
    <section className="section bg-alt">
      <div className="wrap process-grid">
        <div className="process-aside">
          <div className="stack-12">
            <Eyebrow>How an inspection runs</Eyebrow>
            <h2 className="h2">From enquiry to a certificate you can verify</h2>
          </div>
          <div className="process-counter">
            <span ref={num} className="process-num">{"0" + (step + 1)}</span>
            <span className="process-of">/ 05</span>
          </div>
          <div className="process-bar"><div style={{ width: ((step + 1) / STEPS.length) * 100 + "%" }} /></div>
          <ol className="process-checklist">
            {STEPS.map((s, i) => {
              const done = i < step, act = i === step;
              return (
                <li key={s.title} className={done ? "is-done" : act ? "is-active" : undefined}>
                  <span className="process-box"><span><Icon name="check" size={14} strokeWidth={3} /></span></span>
                  <span className="process-label">{s.title}</span>
                </li>
              );
            })}
          </ol>
        </div>
        <div ref={list}>
          {STEPS.map((s, i) => (
            <div key={s.title} className="process-step" style={{ minHeight: i === STEPS.length - 1 ? "48vh" : "62vh", opacity: i === step ? 1 : 0.32 }}>
              <span className="process-step-kicker">STEP {"0" + (i + 1)}</span>
              <h3 className="process-step-title">{s.title}</h3>
              <p className="process-step-text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
