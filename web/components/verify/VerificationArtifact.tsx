"use client";

import dynamic from "next/dynamic";

const InspectionCore = dynamic(() => import("@/components/home/InspectionCore"), { ssr: false });

export function VerificationArtifact() {
  return <InspectionCore verification />;
}
