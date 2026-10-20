"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type FormEvent, type ReactNode } from "react";
import { Button, Field } from "@/components/ds";
import { DURATION, EASE } from "@/lib/motion";

const GRID = 11;
// Decorative QR-style pattern: three finder squares plus a fixed scatter. It encodes nothing.
const CELLS = Array.from({ length: GRID * GRID }, (_, i) => {
  const x = i % GRID;
  const y = Math.floor(i / GRID);
  for (const [fx, fy] of [[0, 0], [GRID - 3, 0], [0, GRID - 3]]) {
    if (x >= fx && x < fx + 3 && y >= fy && y < fy + 3) return !(x === fx + 1 && y === fy + 1);
  }
  return (x * 7 + y * 13 + x * y) % 3 === 0;
});

/** Home page entry point; all verification results live on the Verify page. The closing enquiry line sits under the certificate. */
export function HomeVerify({ intro, closing }: { intro: ReactNode; closing: ReactNode }) {
  const form = useRef<HTMLFormElement>(null);
  const sweep = useRef<HTMLSpanElement>(null);
  const scan = useRef<HTMLSpanElement>(null);
  const idle = useRef<gsap.core.Tween | null>(null);
  const submitting = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = form.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);
      const k = window.innerWidth > 760 ? 1 : 0.6;
      const [top, right, bottom, left] = q(".verify-cert-edge");
      gsap.timeline({ defaults: { ease: EASE.enter }, scrollTrigger: { trigger: root, start: "top 80%", toggleActions: "play none none reset" } })
        .fromTo([top, bottom], { scaleX: 0 }, { scaleX: 1, duration: DURATION.standard * k, stagger: 0.12 }, 0)
        .fromTo([right, left], { scaleY: 0 }, { scaleY: 1, duration: DURATION.standard * k, stagger: 0.12 }, 0.25 * k)
        .fromTo(q(".verify-cert-title"), { opacity: 0, x: -24 * k }, { opacity: 1, x: 0, duration: DURATION.standard * k }, 0.5 * k)
        .fromTo(q(".verify-cert-qr-cell"), { opacity: 0 }, { opacity: 1, duration: DURATION.micro, stagger: { amount: 0.9 * k, from: "random", grid: [GRID, GRID] } }, 0.6 * k)
        .fromTo(q(".verify-cert-ref, .verify-cert-hint"), { opacity: 0, y: 14 * k }, { opacity: 1, y: 0, duration: DURATION.standard * k, stagger: 0.12, clearProps: "opacity,transform" }, 0.9 * k);
      return () => { idle.current?.kill(); };
    });
    return () => mm.revert();
  }, []);

  const startScan = () => {
    const el = scan.current;
    const track = el?.parentElement;
    if (!el || !track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    idle.current?.kill();
    gsap.set(el, { opacity: 1 });
    idle.current = gsap.fromTo(el, { x: 0 }, {
      x: () => track.clientWidth - el.offsetWidth, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true, invalidateOnRefresh: true,
    });
  };
  const stopScan = () => {
    idle.current?.kill();
    if (scan.current) gsap.to(scan.current, { opacity: 0, duration: DURATION.micro });
  };

  // A scan line passes over the whole certificate, then the form submits as it always did.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const root = form.current;
    const line = sweep.current;
    if (!root || !line || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    if (submitting.current || !root.reportValidity()) return;
    submitting.current = true;
    idle.current?.kill();
    gsap.fromTo(line, { y: 0, opacity: 1 }, {
      y: () => root.clientHeight - line.offsetHeight, duration: 0.6, ease: "power1.inOut",
      onComplete: () => {
        root.submit();
        // Leaving via bfcache returns to this page: reset the line.
        window.setTimeout(() => { gsap.set(line, { opacity: 0, y: 0 }); submitting.current = false; }, 1200);
      },
    });
  };

  return (
    <div className="wrap">
      <div className="verify-home-grid">
        <div className="stack-16">{intro}</div>
        <form ref={form} className="verify-cert" action="/verify" method="get" onSubmit={onSubmit}>
          <span className="verify-cert-edge verify-cert-edge--t" aria-hidden="true" />
          <span className="verify-cert-edge verify-cert-edge--r" aria-hidden="true" />
          <span className="verify-cert-edge verify-cert-edge--b" aria-hidden="true" />
          <span className="verify-cert-edge verify-cert-edge--l" aria-hidden="true" />
          <span ref={sweep} className="verify-cert-sweep" aria-hidden="true" />
          <div className="verify-cert-head">
            <div className="verify-cert-title">
              <img className="verify-cert-mark verify-cert-mark--light" src="/assets/uvgulf-mark.png" alt="" aria-hidden="true" />
              <img className="verify-cert-mark verify-cert-mark--dark" src="/assets/uvgulf-mark-reversed.png" alt="" aria-hidden="true" />
              <span><b>UV Gulf</b><span>Certificate verification</span></span>
            </div>
            <div className="verify-cert-qr" aria-hidden="true">
              <div className="verify-cert-qr-grid">{CELLS.map((on, i) => <i key={i} className={on ? "verify-cert-qr-cell is-on" : "verify-cert-qr-cell"} />)}</div>
              <span>QR area</span>
            </div>
          </div>
          <div className="verify-cert-ref">
            <div className="verify-row" onFocus={(e) => { if (e.target instanceof HTMLInputElement) startScan(); }} onBlur={(e) => { if (e.target instanceof HTMLInputElement) stopScan(); }}>
              <Field label="Certificate number" name="certificate" mono required placeholder="UVG-TR-2026-000000" />
              <Button size="lg" type="submit">Verify</Button>
              <div className="verify-cert-track" aria-hidden="true"><span ref={scan} className="verify-cert-scan" /></div>
            </div>
          </div>
          <span className="verify-cert-hint verify-hint">Printed under the QR code on the certificate or ID card. Results open on the verification page.</span>
        </form>
      </div>
      <div className="verify-closing">{closing}</div>
    </div>
  );
}
