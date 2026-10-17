"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const DURATION = 850;
const INTERVAL = 8000;

/** Keep the real label readable to assistive tech and its character widths stable. */
export function KickerText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const playRef = useRef<() => void>(() => {});
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    let running = false;
    const stop = () => {
      cancelAnimationFrame(frame);
      running = false;
      setDisplay(text);
    };
    const play = () => {
      if (!visible || running || reduced.matches || document.hidden) return;
      running = true;
      const start = performance.now();
      let lastStep = -1;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / DURATION);
        const step = Math.floor((now - start) / 45);
        if (step !== lastStep) {
          lastStep = step;
          setDisplay(Array.from(text, (char, index) => {
            if (!/[a-z0-9]/i.test(char) || progress >= (index + 1) / text.length) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }).join(""));
        }
        if (progress < 1) frame = requestAnimationFrame(tick);
        else stop();
      };
      frame = requestAnimationFrame(tick);
    };
    playRef.current = play;
    const clearTimer = () => { clearInterval(timer); timer = undefined; };
    const sync = () => {
      clearTimer();
      if (visible && !document.hidden && !reduced.matches) {
        play();
        timer = setInterval(play, INTERVAL);
      } else stop();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.5 });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      clearTimer();
      cancelAnimationFrame(frame);
      playRef.current = () => {};
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, [text]);

  return (
    <span ref={ref} className="kicker-text" onPointerEnter={() => playRef.current()}>
      <span className="kicker-label">{text}</span>
      <span aria-hidden="true" className="kicker-visual">
        {Array.from(text, (char, index) => /\s/.test(char) ? char : (
          <span className="kicker-char" key={index}>
            <span className="kicker-char-size">{char}</span>
            <span className="kicker-char-glyph">{Array.from(display)[index] ?? char}</span>
          </span>
        ))}
      </span>
    </span>
  );
}
