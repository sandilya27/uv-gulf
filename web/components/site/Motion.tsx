"use client";

// Declarative motion, driven by data attributes so server-rendered sections can opt in:
//   data-reveal [data-delay=ms]   fade up 18px once on first view
//   data-words                    children slide in word by word on mount
//   data-spin=±ms                 continuous rotation (sign = direction)
//   data-scan                     scan line sweeping top → bottom of its parent
//   data-pulse                    radar pulse (SVG)
//   data-parallax=factor          translateY relative to the parent's distance from viewport centre
//   data-count=n                  counts up from 0 on first view
//   data-draw                     draws child <line>s on first view
// Everything is skipped under prefers-reduced-motion; content stays visible.
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const EASE = "cubic-bezier(.2,.7,.2,1)";

export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = new WeakSet<Element>();
    const reveal = (el: HTMLElement) => el.setAttribute("data-revealed", "");

    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      io.unobserve(el);
      if (el.dataset.reveal !== undefined) {
        reveal(el);
        el.animate([{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "none" }], { duration: 750, delay: +(el.dataset.delay || 0), easing: EASE, fill: "backwards" });
      }
      if (el.dataset.count) countUp(el);
      if (el.dataset.draw !== undefined) drawLines(el);
    }), { threshold: 0.12 });

    const once = (sel: string, fn: (el: HTMLElement) => void) =>
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => { if (seen.has(el)) return; seen.add(el); fn(el); });

    const setup = () => {
      if (rm) {
        once("[data-reveal],[data-words]", reveal);
        return;
      }
      once("[data-reveal],[data-count],[data-draw]", (el) => io.observe(el));
      once("[data-words]", (el) => {
        reveal(el);
        Array.from(el.children).forEach((w, i) => w.animate(
          [{ opacity: 0, transform: "translateY(0.45em)", filter: "blur(6px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }],
          { duration: 800, delay: 120 + i * 75, easing: EASE, fill: "backwards" }));
      });
      once("[data-spin]", (el) => {
        const d = +(el.dataset.spin || 0);
        el.animate([{ transform: "rotate(0deg)" }, { transform: d < 0 ? "rotate(-360deg)" : "rotate(360deg)" }], { duration: Math.abs(d), iterations: Infinity });
      });
      once("[data-scan]", (el) => el.animate(
        [{ top: "0%", opacity: 0 }, { opacity: 1, offset: 0.1 }, { opacity: 1, offset: 0.9 }, { top: "100%", opacity: 0 }],
        { duration: 7000, iterations: Infinity, easing: "cubic-bezier(.45,0,.55,1)" }));
      once("[data-pulse]", (el) => el.animate(
        [{ transform: "scale(1)", opacity: 0.9 }, { transform: "scale(3)", opacity: 0 }],
        { duration: 2200, iterations: Infinity, easing: "ease-out" }));
      parallax();
    };

    let raf = 0;
    const parallax = () => {
      if (rm) return;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const r = el.parentElement!.getBoundingClientRect();
        const c = r.top + r.height / 2 - window.innerHeight / 2;
        el.style.transform = "translate3d(0," + (-c * parseFloat(el.dataset.parallax || "0")).toFixed(1) + "px,0)";
      });
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(parallax); };

    setup();
    let pending = 0;
    const mo = new MutationObserver(() => { if (!pending) pending = requestAnimationFrame(() => { pending = 0; setup(); }); });
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect(); mo.disconnect(); cancelAnimationFrame(raf); cancelAnimationFrame(pending);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Soft fade between pages.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.getElementById("main")?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: "ease-out" });
  }, [pathname]);

  return null;
}

function countUp(el: HTMLElement) {
  const n = +(el.dataset.count || 0), t0 = performance.now(), dur = 1400;
  const tick = (t: number) => {
    const p = Math.min(1, Math.max(0, (t - t0) / dur));
    el.textContent = String(Math.round(n * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(tick);
  };
  el.textContent = "0";
  requestAnimationFrame(tick);
}

function drawLines(el: HTMLElement) {
  el.querySelectorAll("line").forEach((l, i) => {
    const len = Math.hypot(l.x2.baseVal.value - l.x1.baseVal.value, l.y2.baseVal.value - l.y1.baseVal.value);
    l.style.strokeDasharray = String(len);
    l.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 1100, delay: 200 + i * 110, easing: EASE, fill: "backwards" });
  });
}

/** Pop-in used when a panel's content swaps (service, method, step number, results). */
export function pop(el: HTMLElement | null, dy = 10) {
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  el.animate([{ opacity: 0, transform: "translateY(" + dy + "px)" }, { opacity: 1, transform: "none" }], { duration: 420, easing: EASE });
}
