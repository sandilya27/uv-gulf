"use client";

// Sticky scroll storytelling: the step crossing 55% of the viewport becomes active and
// drives the big step number, the progress bar and the checklist.
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Eyebrow, Icon } from "@/components/ds";
import { pop } from "@/components/site/Motion";
import { STEPS } from "@/lib/content";

const OUTCOMES = ["Scope & applicable standard confirmed", "Methods, inspectors & site access agreed", "Inspection and test results recorded", "Findings & acceptance criteria documented", "Reference number ready for verification"];
const IMAGES = [
  { file: "enquiry", alt: "Project coordinators discussing an inspection enquiry and site drawings" },
  { file: "plan", alt: "An engineer preparing an inspection plan with technical drawings and equipment" },
  { file: "site", alt: "A technician visually inspecting an industrial flange on site" },
  { file: "report", alt: "An engineer documenting inspection findings at a workstation" },
  { file: "certificate", alt: "An inspection certificate being handed to a client" },
];

export function InspectionProcess() {
  const [step, setStep] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const first = useRef(true);
  const visual = useRef<HTMLDivElement>(null);
  const previousStep = useRef(0);

  useEffect(() => {
    const root = visual.current;
    if (!root) return;
    const previous = previousStep.current;
    previousStep.current = step;
    if (previous === step) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const photos = root.querySelectorAll<HTMLImageElement>(".process-stage-photo");
      const incoming = photos[step];
      const outgoing = photos[previous];
      const forward = step > previous;
      const scan = root.querySelector(".process-image-scan");
      const caption = root.querySelectorAll(".process-visual-caption span");

      // Restore a clean pair when scrolling quickly interrupts an earlier reveal.
      gsap.set(photos, { opacity: 0, zIndex: 0, xPercent: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(outgoing, { opacity: 1 });
      gsap.set(incoming, { opacity: 1, zIndex: 1 });
      const timeline = gsap.timeline();
      timeline
        .fromTo(incoming, {
          clipPath: forward ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
          scale: 1.08,
        }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.05, ease: "power3.inOut" }, 0)
        // Keep the outgoing photo covering the frame beneath the reveal.
        // Translating it exposed a navy strip before the incoming edge arrived.
        .to(outgoing, { scale: 1.025, duration: 1.05, ease: "power3.inOut" }, 0)
        .fromTo(scan, { left: forward ? "0%" : "100%", opacity: 0 }, { left: forward ? "100%" : "0%", opacity: 0.85, duration: 0.85, ease: "power3.inOut" }, 0.05)
        .to(scan, { opacity: 0, duration: 0.2 }, 0.8)
        .fromTo(caption, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: "power2.out" }, 0.4)
        .set(outgoing, { opacity: 0, xPercent: 0, scale: 1 })
        .set(incoming, { xPercent: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)" });
    }, root);
    return () => media.revert();
  }, [step]);

  useEffect(() => {
    const onScroll = () => {
      const els = list.current?.children;
      if (!els) return;
      let a = 0;
      const trigger = window.innerHeight * 0.55;
      Array.from(els).forEach((s, i) => { if (s.getBoundingClientRect().top <= trigger) a = i; });
      // Finish when the final card is fully visible, even on short viewports.
      const last = els[els.length - 1]?.getBoundingClientRect();
      if (last && last.top < window.innerHeight && last.bottom <= window.innerHeight) a = els.length - 1;
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
    <section className="section bg-alt inspection-process">
      <div className="wrap process-grid">
        <div className="process-aside">
          <div className="stack-12">
            <Eyebrow>How an inspection runs</Eyebrow>
            <h2 className="h2">From enquiry to a certificate you can verify</h2>
          </div>
          <div ref={visual} className="process-visual">
            {IMAGES.map((image, i) => (
              <img key={image.file} className={`process-stage-photo${i === step ? " is-active" : ""}`} src={`/assets/images/process-${image.file}.webp`} alt={i === step ? `Illustrative image: ${image.alt}` : ""} aria-hidden={i !== step} loading="lazy" decoding="async" />
            ))}
            <div className="process-image-scan" aria-hidden="true" />
            <div className="process-visual-caption"><span>{STEPS[step].title}</span><span>STAGE {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}</span></div>
          </div>
          <div className="process-counter">
            <span ref={num} className="process-num">{"0" + (step + 1)}</span>
            <span className="process-of">/ {String(STEPS.length).padStart(2, "0")} stages</span>
          </div>
          <div className="process-bar"><div style={{ width: ((step + 1) / STEPS.length) * 100 + "%" }} /></div>
          <ol className="process-checklist">
            {STEPS.map((s, i) => {
              const done = i <= step, act = i === step;
              return (
                <li key={s.title} className={[done && "is-done", act && "is-active"].filter(Boolean).join(" ")} aria-current={act ? "step" : undefined}>
                  <span className="process-box"><span><Icon name="check" size={14} strokeWidth={3} /></span></span>
                  <span className="process-label">{s.title}</span>
                </li>
              );
            })}
          </ol>
        </div>
        <div ref={list} className="process-timeline">
          {STEPS.map((s, i) => (
            <div key={s.title} className={`process-step${i === step ? " is-active" : ""}`}>
              <span className="process-step-node" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span className="process-step-kicker">STEP {"0" + (i + 1)}</span>
              <h3 className="process-step-title">{s.title}</h3>
              <p className="process-step-text">{s.text}</p>
              <div className="process-outcome"><Icon name={i === STEPS.length - 1 ? "shield" : "check"} size={18} /><span>{OUTCOMES[i]}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
