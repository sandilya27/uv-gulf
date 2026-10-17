"use client";

import dynamic from "next/dynamic";

const InspectionCore = dynamic(() => import("@/components/home/InspectionCore"), { ssr: false });

const CALLOUTS = {
  inspection: ["Inspection & testing", "Technical advisory", "Precision calibration", "Traceable certification"],
  training: ["Industrial skills", "Safety training", "Practical sessions", "Operator certification"],
  contact: ["Inspection enquiries", "Training enquiries", "Khobar, Saudi Arabia", "sales@uvgulf.com"],
} satisfies Record<string, [string, string, string, string]>;

/** Shared cube, lighting and interaction; only the page's callouts vary. */
export function DivisionArtifact({ division }: { division: keyof typeof CALLOUTS }) {
  return <InspectionCore callouts={CALLOUTS[division]} />;
}