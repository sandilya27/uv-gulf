"use client";

// The step crossing 55% of the viewport drives the photo and active timeline card.
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MaskedHeading } from "@/components/site/MaskedHeading";
import { Button, Eyebrow, Icon } from "@/components/ds";
import { enquiryHref, STEPS } from "@/lib/content";

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
        .set(outgoing, { opacity: 0, xPercent: 0, scale: 1 })
        .set(incoming, { xPercent: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)" });
    }, root);
    return () => media.revert();
  }, [step]);

  useEffect(() => {
    const root = list.current;
    if (!root) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = Array.from(root.querySelectorAll<HTMLElement>(".process-step"));
      const nodes = cards.map(card => card.querySelector<HTMLElement>(".process-step-node")!);
      if (!nodes.length) return;
      const bounds = root.getBoundingClientRect();
      const centers = nodes.map(node => {
        const rect = node.getBoundingClientRect();
        return rect.top + rect.height / 2 - bounds.top;
      });
      const first = centers[0];
      const last = centers[centers.length - 1];
      // A continuous scroll position joins the node centers, including wrapped mobile cards.
      const position = Math.max(first, Math.min(last, window.innerHeight * 0.55 - bounds.top));
      root.style.setProperty("--track-start", `${first}px`);
      root.style.setProperty("--track-length", `${last - first}px`);
      root.style.setProperty("--track-progress", `${position - first}px`);
      let active = 0;
      centers.forEach((center, i) => { if (position >= center - 1) active = i; });
      setStep(active);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section className="section bg-alt inspection-process">
      <div className="wrap process-grid">
        <div className="process-aside">
          <div className="stack-12">
            <Eyebrow>How an inspection runs</Eyebrow>
            <MaskedHeading>From enquiry to verified certificate.</MaskedHeading>
          </div>
          <div ref={visual} className="process-visual">
            {IMAGES.map((image, i) => (
              <img key={image.file} className={`process-stage-photo${i === step ? " is-active" : ""}`} src={`/assets/images/process-${image.file}.webp`} alt={i === step ? `Illustrative image: ${image.alt}` : ""} aria-hidden={i !== step} loading="lazy" decoding="async" />
            ))}
            <div className="process-image-scan" aria-hidden="true" />
          </div>
        </div>
        <div>
          <div ref={list} className="process-timeline">
            <span className="process-track-fill" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <div key={s.title} className={`process-step${i <= step ? " is-reached" : ""}${i === step ? " is-active" : ""}`} aria-current={i === step ? "step" : undefined}>
                <span className="process-step-node" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="process-step-title">{s.title}</h3>
                <p className="process-step-text">{s.text}</p>
                <div className="process-outcome"><Icon name={i === STEPS.length - 1 ? "shield" : "check"} size={18} /><span><strong>You receive:</strong> {s.deliverable}</span></div>
              </div>
            ))}
          </div>
          <div className="btn-row process-actions">
            <Button arrow href={enquiryHref("Inspection")}>Request an inspection</Button>
            <Button variant="ghost" href="/verify">Verify a certificate</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
