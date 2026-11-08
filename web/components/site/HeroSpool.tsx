"use client";

import dynamic from "next/dynamic";
import type { HeroCallouts } from "@/lib/hero-callouts";

const SpoolScan = dynamic(() => import("@/components/home/SpoolScan"), { ssr: false });

/** The homepage pipe-spool scan, shared by every inner page hero. Only the callout text varies. */
export function HeroSpool({ callouts }: { callouts?: HeroCallouts }) {
  return <SpoolScan callouts={callouts} />;
}
