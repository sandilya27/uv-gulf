"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type CSSProperties } from "react";
import { Button } from "@/components/ds";
import { enquiryHref, SERVICES } from "@/lib/content";
import { DURATION, EASE } from "@/lib/motion";

const PHOTOS = ["inspection", "process-site", "calibration", "process-plan"];
const number = (index: number) => String(index + 1).padStart(2, "0");

// One drawing callout per photo, in card percentages: the node sits on the object being worked on, the
// leader runs vertically to the label's y, then horizontally to its x. The text is the service name plus
// one item from that service's list in SERVICES.
const CALLOUTS = [
  { node: [41, 54], label: [58, 54], item: 2 }, // probe on the pipe
  { node: [71, 66], label: [77, 44], item: 2 }, // flange bolts
  { node: [38, 16], label: [53, 16], item: 0 }, // gauge dial
  { node: [40, 40], label: [58, 40], item: 0 }, // drawing on the desk
] as const;

/** Window-scroll stacking, adapted to the site's existing Lenis instance.
 * Inspired by React Bits ScrollStack: https://reactbits.dev/components/scroll-stack
 */
export function ServiceExplorer() {
  const root = useRef<HTMLDivElement>(null);
  const slots = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 760px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = slots.current.filter((card): card is HTMLElement => !!card);
      const pin = 116;
      // Equalize sticky boundaries so every card releases as one completed stack.
      const height = Math.max(0, ...cards.map(slot => (slot.firstElementChild as HTMLElement | null)?.offsetHeight ?? 0));
      if (root.current?.style.getPropertyValue("--stack-card-height") !== `${height}px`) root.current?.style.setProperty("--stack-card-height", `${height}px`);
      // Browser chrome and zoom change the usable viewport. Keep stacking unless
      // the actual content cannot fit below the header and exposed card edges.
      const fits = height + pin + (cards.length - 1) * 18 + 16 <= window.innerHeight;
      const stacking = !motion.matches && !compact.matches && fits;
      if (root.current?.hasAttribute("data-stack-static") === stacking) root.current.toggleAttribute("data-stack-static", !stacking);
      const tops = cards.map(card => card.getBoundingClientRect().top);
      cards.forEach((slot, i) => {
        const card = slot.firstElementChild as HTMLElement | null;
        if (!card) return;
        let depth = 0;
        if (stacking) {
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
    // Only measure on scroll while the stack is near the viewport; everywhere else it is idle.
    let near = false;
    const onScroll = () => { if (near) schedule(); };
    const visibility = new IntersectionObserver(([entry]) => { near = entry.isIntersecting; if (near) schedule(); }, { rootMargin: "100% 0px" });
    if (root.current) visibility.observe(root.current);
    const observer = new ResizeObserver(schedule);
    if (root.current) observer.observe(root.current);
    slots.current.forEach(slot => { if (slot?.firstElementChild) observer.observe(slot.firstElementChild); });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    compact.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      compact.removeEventListener("change", schedule);
    };
  }, []);

  // The photo zooms as the card travels. On arrival the node pulses, the leader draws, the tag wipes in,
  // the title rises through its mask and the counter rolls to its number.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add({
      full: "(min-width: 1001px) and (prefers-reduced-motion: no-preference)",
      lite: "(max-width: 1000px) and (prefers-reduced-motion: no-preference)",
    }, (context) => {
      const full = !!context.conditions?.full;
      const k = full ? 1 : 0.6;
      slots.current.forEach((slot, i) => {
        if (!slot) return;
        const q = gsap.utils.selector(slot);
        const [photo] = q(".service-stack-photo");
        if (full && photo) {
          gsap.fromTo(photo, { scale: 1.08 }, {
            scale: 1, ease: EASE.scrub,
            scrollTrigger: { trigger: slot, start: "top bottom", end: () => `top ${116 + i * 18}px`, scrub: true, invalidateOnRefresh: true },
          });
        }
        const tl = gsap.timeline({
          defaults: { ease: EASE.enter },
          scrollTrigger: { trigger: slot, start: full ? "top 62%" : "top 85%", toggleActions: "play none none reset" },
        });
        tl.fromTo(q(".service-stack-title-line"), { yPercent: 105 }, { yPercent: 0, duration: DURATION.standard * k }, 0);
        const odo = q(".service-stack-odo-col");
        // y: 0 overrides the resting CSS translate, which GSAP would otherwise add to yPercent.
        tl.fromTo(odo, { yPercent: 0, y: 0 }, {
          y: 0, yPercent: (index: number) => -Number(odo[index].getAttribute("data-digit")) * 10,
          duration: DURATION.hero * k, ease: "power3.inOut",
        }, 0);
        if (!full) return;
        const segs = q(".service-stack-leader");
        tl.fromTo(q(".service-stack-node"), { scale: 0 }, { scale: 1, duration: DURATION.micro * 1.6, ease: EASE.stamp }, 0.15)
          .fromTo(q(".service-stack-node-ring"), { scale: 1, opacity: 0.9 }, { scale: 3.4, opacity: 0, duration: 0.9 }, 0.2)
          .fromTo(segs, { scale: 0 }, { scale: 1, duration: 0.4, stagger: 0.28 }, 0.4)
          .fromTo(q(".service-stack-tag"), { clipPath: "inset(0 100% 0 0)", opacity: 0 }, { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.5, ease: "steps(14)" }, 0.4 + 0.28 * segs.length);
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="service-stack" style={{ "--stack-count": SERVICES.length } as CSSProperties}>
      <div className="service-stack-toolbar">
        <p className="service-stack-caption">Explore our inspection expertise</p>
      </div>
      <div className="service-stack-cards">
        {SERVICES.map((service, i) => (
          <article id={`inspection-service-${i}`} key={service.title} ref={el => { slots.current[i] = el; }} className="service-stack-slot" style={{ "--stack-index": i } as CSSProperties} aria-labelledby={`inspection-service-title-${i}`}>
            <div className="service-stack-card">
              <div className="service-stack-photo" style={{ backgroundImage: `url(/assets/images/${PHOTOS[i]}.webp)` }} />
              <div className="service-stack-counter" aria-hidden="true">
                <span className="service-stack-card-number">
                  {number(i).split("").map((digit, d) => (
                    <span key={d} className="service-stack-odo"><span className="service-stack-odo-col" data-digit={digit} style={{ "--digit": digit } as CSSProperties}>{"0123456789".split("").map(n => <span key={n}>{n}</span>)}</span></span>
                  ))}
                </span>
              </div>
              <Callout service={service} spec={CALLOUTS[i]} />
              <div className="service-stack-body">
                <h3 id={`inspection-service-title-${i}`}><span className="service-stack-title-mask"><span className="service-stack-title-line">{service.title}</span></span></h3>
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

function Callout({ service, spec }: { service: (typeof SERVICES)[number]; spec: (typeof CALLOUTS)[number] }) {
  const [nx, ny] = spec.node;
  const [lx, ly] = spec.label;
  const at = (values: Record<string, string>) => values as CSSProperties;
  return (
    <div className="service-stack-callout" aria-hidden="true">
      {ly !== ny ? <span className="service-stack-leader service-stack-leader--v" style={at({ left: `${nx}%`, top: `${Math.min(ny, ly)}%`, height: `${Math.abs(ly - ny)}%`, transformOrigin: ly < ny ? "50% 100%" : "50% 0" })} /> : null}
      <span className="service-stack-leader service-stack-leader--h" style={at({ left: `${nx}%`, top: `${ly}%`, width: `${lx - nx}%` })} />
      <span className="service-stack-node" style={at({ left: `${nx}%`, top: `${ny}%` })}><span className="service-stack-node-ring" /></span>
      <span className="service-stack-tag" style={at({ left: `${lx}%`, top: `${ly}%` })}>
        {service.title}<span>{service.items[spec.item]}</span>
      </span>
    </div>
  );
}
