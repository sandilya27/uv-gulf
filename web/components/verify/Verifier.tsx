"use client";

// Certificate verification. Demo buttons type a number in, a progress bar runs, then the
// result pops in. Lookup uses CERT_RECORDS until the real verification API is connected:
// replace `lookup` with a fetch to that service (and return "unavailable" on failure).
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Button, Field, VerifyResult, type CertificateRecord, type VerifyStatus } from "@/components/ds";
import { pop } from "@/components/site/Motion";
import { CERT_DEMOS, CERT_RECORDS } from "@/lib/content";
import { CertificateCard } from "./CertificateCard";

type Result = { status: VerifyStatus; record?: CertificateRecord };

async function lookup(num: string): Promise<Result> {
  await new Promise((r) => setTimeout(r, 1250));
  return CERT_RECORDS[num] || { status: "not-found" };
}

function useVerifier() {
  const [num, setNum] = useState("");
  const [phase, setPhase] = useState<"idle" | "typing" | "checking" | "done">("idle");
  const [result, setResult] = useState<Result | null>(null);
  const typeT = useRef<ReturnType<typeof setInterval>>(undefined);
  const startT = useRef<ReturnType<typeof setTimeout>>(undefined);
  const runId = useRef(0);
  const bar = useRef<HTMLDivElement>(null);
  const resultEl = useRef<HTMLDivElement>(null);

  useEffect(() => () => { clearInterval(typeT.current); clearTimeout(startT.current); runId.current++; }, []);

  useEffect(() => {
    if (phase === "checking") bar.current?.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 1200, easing: "cubic-bezier(.4,0,.2,1)", fill: "both" });
    if (phase === "done") pop(resultEl.current, 12);
  }, [phase]);

  const run = useCallback(async (raw: string) => {
    const key = raw.trim().toUpperCase();
    if (!key) return;
    const id = ++runId.current;
    setNum(key);
    setResult(null);
    setPhase("checking");
    const r = await lookup(key);
    if (id !== runId.current) return;
    setResult(r);
    setPhase("done");
  }, []);

  const demo = (n: string) => {
    clearInterval(typeT.current);
    clearTimeout(startT.current);
    runId.current++;
    setNum("");
    setResult(null);
    setPhase("typing");
    let i = 0;
    typeT.current = setInterval(() => {
      i++;
      setNum(n.slice(0, i));
      if (i >= n.length) { clearInterval(typeT.current); startT.current = setTimeout(() => run(n), 250); }
    }, 40);
  };

  return { num, setNum, phase, result, run, demo, bar, resultEl };
}

type V = ReturnType<typeof useVerifier>;

function VerifyPanel({ v }: { v: V }) {
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && (e.target as HTMLInputElement).name === "certificate") v.run(v.num);
  };
  return (
    <div className="verify-panel" onKeyDown={onKey}>
      <div className="verify-row">
        <Field label="Certificate number" name="certificate" mono placeholder="UVG-TR-2026-000000" value={v.num} onChange={(e) => v.setNum(e.target.value)} />
        <Button size="lg" onClick={() => v.run(v.num)}>Verify</Button>
      </div>
      <span className="verify-hint">Printed under the QR code on the certificate or ID card.</span>
      {v.phase === "checking" ? (
        <div className="verify-checking" role="status">
          <span>Checking {v.num}</span>
          <div className="verify-bar"><div ref={v.bar} /></div>
        </div>
      ) : null}
      {v.phase === "done" && v.result ? (
        <div ref={v.resultEl}>{v.result.record ? <CertificateCard status={v.result.status} record={v.result.record} /> : <VerifyResult status={v.result.status} />}</div>
      ) : null}
    </div>
  );
}

function DemoButtons({ v }: { v: V }) {
  return (
    <>
      {CERT_DEMOS.map((d) => (
        <button key={d.label} type="button" className="demo-btn" onClick={() => v.demo(d.num)}>
          <span className="demo-dot" style={{ background: d.dot }} />
          <span>{d.label}</span>
        </button>
      ))}
    </>
  );
}

/** Home page entry point; all verification results live on the Verify page. */
export function HomeVerify({ intro }: { intro: React.ReactNode }) {
  return (
    <div className="wrap verify-home-grid">
      <div data-reveal="1" className="stack-16">
        {intro}
      </div>
      <div data-reveal="1" data-delay="120">
        <form className="verify-panel" action="/verify" method="get">
          <div className="verify-row">
            <Field label="Certificate number" name="certificate" mono required placeholder="UVG-TR-2026-000000" />
            <Button size="lg" type="submit">Verify</Button>
          </div>
          <span className="verify-hint">Printed under the QR code on the certificate or ID card. Results open on the verification page.</span>
        </form>
      </div>
    </div>
  );
}

/** Verify page: panel first, demo numbers underneath. */
export function VerifyPageForm() {
  const v = useVerifier();
  const { run } = v;

  useEffect(() => {
    const certificate = new URLSearchParams(window.location.search).get("certificate");
    if (certificate?.trim()) void run(certificate);
  }, [run]);
  return (
    <>
      <div data-reveal="1"><VerifyPanel v={v} /></div>
      <div data-reveal="1" data-delay="100" className="demo-row">
        <span className="demo-caption" style={{ marginRight: 4 }}>Try a demo number</span>
        <DemoButtons v={v} />
      </div>
    </>
  );
}
