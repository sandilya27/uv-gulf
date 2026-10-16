import type { Metadata } from "next";
import { Icon, VERIFY_STATUS, type VerifyStatus } from "@/components/ds";
import { PageHero } from "@/components/site/Chrome";
import { VerifyPageForm } from "@/components/verify/Verifier";

export const metadata: Metadata = { title: "Verify a certificate" };

const OUTCOME_COLOR: Record<VerifyStatus, string> = {
  "valid": "var(--success)",
  "expired": "var(--warning)",
  "not-found": "var(--danger)",
  "unavailable": "var(--ink-muted)",
};

export default function VerifyPage() {
  return (
    <>
      <PageHero eyebrow="Training" title="Verify a certificate" lead="Enter the number printed under the QR code on a UV Gulf certificate or ID card." titleMeasure={false} />

      <section className="section-verify">
        <div className="verify-col">
          <VerifyPageForm />
          <h2 data-reveal="1" className="h-outcomes">What each result means</h2>
          <div className="outcomes">
            {(Object.keys(VERIFY_STATUS) as VerifyStatus[]).map((k, i) => (
              <div key={k} data-reveal="1" data-delay={i * 80} className="outcome">
                <span className="outcome-title" style={{ color: OUTCOME_COLOR[k] }}><Icon name={VERIFY_STATUS[k].icon} size={18} strokeWidth={2.5} />{VERIFY_STATUS[k].title}</span>
                <span className="outcome-msg">{VERIFY_STATUS[k].msg}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
