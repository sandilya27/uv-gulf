"use client";

import { animate } from "animejs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// GSAP owns scroll choreography; Anime.js owns the technical graphic details.
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        anchors: { offset: -88 },
        prevent: (node) => node.classList.contains("chat-body"),
      });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      const seen = new WeakSet<Element>();
      const details: ReturnType<typeof animate>[] = [];
      const context = gsap.context(() => {});
      const setup = () => context.add(() => {
        const once = (selector: string, fn: (el: HTMLElement) => void) => {
          document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
            if (seen.has(el)) return;
            seen.add(el);
            fn(el);
          });
        };
        once("[data-reveal]", (el) => {
          el.setAttribute("data-revealed", "");
          // Keep hero copy readable through refreshes and delayed artwork mounts.
          // Decorative artwork owns its animation; hero text never fades.
          if (el.closest("[data-hero]")) return;
          gsap.fromTo(el, { opacity: 0, y: 28 }, {
            opacity: 1, y: 0, duration: 0.85, delay: Number(el.dataset.delay || 0) / 1000,
            ease: "power3.out", clearProps: "opacity,transform",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });
        once("[data-words]", (el) => {
          el.setAttribute("data-revealed", "");
          if (el.closest("[data-hero]")) return;
          gsap.fromTo(el.children, { opacity: 0, y: "0.55em", filter: "blur(6px)" }, {
            opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.075,
            delay: 0.12, ease: "power3.out", clearProps: "all",
          });
        });
        once("[data-parallax]", (el) => {
          const distance = () => window.innerHeight * Number(el.dataset.parallax || 0);
          gsap.fromTo(el, { y: () => -distance() }, {
            y: distance, ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
          });
        });
        once("[data-spin]", (el) => {
          const duration = Number(el.dataset.spin || 160000);
          details.push(animate(el, { rotate: [0, duration < 0 ? -360 : 360], duration: Math.abs(duration), loop: true, ease: "linear" }));
        });
        once("[data-scan]", (el) => {
          details.push(animate(el, { top: ["0%", "100%"], opacity: [0.15, 0.8, 0.15], duration: 7000, loop: true, ease: "inOutSine" }));
        });
        once("[data-pulse]", (el) => {
          details.push(animate(el, { scale: [1, 3], opacity: [0.9, 0], duration: 2200, loop: true, ease: "outCubic" }));
        });
        once("[data-count]", (el) => {
          const value = { n: 0 };
          gsap.to(value, {
            n: Number(el.dataset.count), duration: 1.6, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
            onUpdate: () => { el.textContent = String(Math.round(value.n)); },
          });
        });
        once("[data-draw]", (el) => {
          ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => {
            const lines = el.querySelectorAll("line");
            lines.forEach((line, index) => {
              const length = line.getTotalLength();
              line.style.strokeDasharray = String(length);
              details.push(animate(line, {
                strokeDashoffset: [length, 0], duration: 1100,
                delay: 200 + index * 110, ease: "outCubic",
              }));
            });
          } });
        });
      });
      setup();
      let pending = 0;
      const observer = new MutationObserver((records) => {
        if (!records.some((record) => [...record.addedNodes].some((node) => node.nodeType === Node.ELEMENT_NODE))) return;
        if (!pending) pending = requestAnimationFrame(() => {
          pending = 0;
          setup();
          lenis.resize();
          ScrollTrigger.refresh();
        });
      });
      observer.observe(document.getElementById("main")!, { childList: true, subtree: true });
      const refresh = () => { lenis.resize(); ScrollTrigger.refresh(); };
      document.fonts.ready.then(() => { if (!disposed) refresh(); });
      let disposed = false;
      window.addEventListener("load", refresh);
      ScrollTrigger.refresh();
      return () => {
        disposed = true;
        observer.disconnect();
        cancelAnimationFrame(pending);
        window.removeEventListener("load", refresh);
        gsap.ticker.remove(tick);
        lenis.destroy();
        context.revert();
        details.forEach((animation) => animation.revert());
      };
    });
    return () => media.revert();
  }, [pathname]);

  return null;
}

/** Animate a newly selected panel without taking ownership of its layout. */
export function pop(el: HTMLElement | null, dy = 10) {
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  animate(el, { opacity: [0, 1], translateY: [dy, 0], duration: 420, ease: "outCubic" });
}
