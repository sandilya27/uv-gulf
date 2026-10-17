"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Button } from "@/components/ds";
import { enquiryHref, SERVICES } from "@/lib/content";

const PHOTOS = ["inspection", "process-site", "calibration", "process-plan"];
const number = (index: number) => String(index + 1).padStart(2, "0");

/** Window-scroll stacking, adapted to the site's existing Lenis instance.
 * Inspired by React Bits ScrollStack: https://reactbits.dev/components/scroll-stack
 */
export function ServiceExplorer() {
  const root = useRef<HTMLDivElement>(null);
  const slots = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 760px), (max-height: 700px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = slots.current.filter((card): card is HTMLElement => !!card);
      const pin = 116;
      // Equalize sticky boundaries so every card releases as one completed stack.
      const height = Math.max(0, ...cards.map(slot => (slot.firstElementChild as HTMLElement | null)?.offsetHeight ?? 0));
      root.current?.style.setProperty("--stack-card-height", `${height}px`);
      const tops = cards.map(card => card.getBoundingClientRect().top);
      cards.forEach((slot, i) => {
        const card = slot.firstElementChild as HTMLElement | null;
        if (!card) return;
        let depth = 0;
        if (!motion.matches && !compact.matches) {
          for (let j = i + 1; j < cards.length; j++) {
            const span = Math.max(1, slot.offsetHeight - 18);
            depth += Math.max(0, Math.min(1, (pin + i * 18 + slot.offsetHeight - tops[j]) / span));
          }
        }
        card.style.transform = depth ? `scale(${Math.max(.88, 1 - depth * .035)})` : "";
        card.style.setProperty("--stack-dim", String(Math.min(.24, depth * .08)));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    if (root.current) observer.observe(root.current);
    slots.current.forEach(slot => { if (slot?.firstElementChild) observer.observe(slot.firstElementChild); });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    compact.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      compact.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={root} className="service-stack" style={{ "--stack-count": SERVICES.length } as CSSProperties}>
      <div className="service-stack-toolbar">
        <p className="service-stack-caption">Explore our inspection expertise</p>
      </div>
      <div className="service-stack-cards">
        {SERVICES.map((service, i) => (
          <article id={`inspection-service-${i}`} key={service.title} ref={el => { slots.current[i] = el; }} className="service-stack-slot" style={{ "--stack-index": i } as CSSProperties} aria-labelledby={`inspection-service-title-${i}`}>
            <div className="service-stack-card" style={{ backgroundImage: `url(/assets/images/${PHOTOS[i]}.webp)` }}>
              <div className="service-stack-counter" aria-hidden="true"><span className="service-stack-card-number">{number(i)}<span> / {number(SERVICES.length - 1)}</span></span></div>
              <div className="service-stack-body">
                <span className="service-stack-caption">SERVICE</span>
                <h3 id={`inspection-service-title-${i}`}>{service.title}</h3>
                <p>{service.summary}</p>
                <ul className="uvg-list">{service.items.map(item => <li key={item}>{item}</li>)}</ul>
                <div className="service-stack-action"><Button arrow href={service.href ?? enquiryHref("Inspection")}>{service.href ? "Explore service" : "Request this service"}<span className="sr-only">: {service.title}</span></Button></div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
