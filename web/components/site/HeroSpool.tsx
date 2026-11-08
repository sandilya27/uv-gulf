"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { HeroCallouts } from "@/lib/hero-callouts";

/** Same box as the live scene, so nothing shifts when it mounts. */
function Frame({ poster }: { poster?: boolean }) {
  return (
    <div className="inspection-artifact spool-scan" aria-hidden="true">
      <div className="artifact-canvas">
        {poster ? <img className="spool-poster" src="/assets/images/spool-poster.webp" alt="" decoding="async" /> : null}
      </div>
    </div>
  );
}

// While the scene's chunk downloads, keep the frame in place rather than collapsing the hero.
const SpoolScan = dynamic(() => import("@/components/home/SpoolScan"), { ssr: false, loading: () => <Frame /> });

type Mode = "waiting" | "live" | "poster";

/** Save-Data and weak hardware get a still image instead of a WebGL scene. */
function prefersStill() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return !!nav.connection?.saveData || (nav.deviceMemory ?? 8) <= 2 || (nav.hardwareConcurrency ?? 8) <= 2;
}

/**
 * The pipe-spool scan shared by every hero. The WebGL scene mounts after first paint so it never
 * competes with the headline, and falls back to a still poster where WebGL isn't a good idea.
 */
export function HeroSpool({ callouts }: { callouts?: HeroCallouts }) {
  const [mode, setMode] = useState<Mode>("waiting");

  useEffect(() => {
    if (prefersStill()) { setMode("poster"); return; }
    const start = () => setMode("live");
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 200);
    return () => window.clearTimeout(id);
  }, []);

  return mode === "live" ? <SpoolScan callouts={callouts} onFallback={() => setMode("poster")} /> : <Frame poster={mode === "poster"} />;
}
