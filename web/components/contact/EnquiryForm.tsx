"use client";

// Enquiry form with Inspection / Training / General tabs (sliding indicator, different fields).
// Submission is client-only for now: wire `submit` to the sales@uvgulf.com mail/CRM endpoint.
import { useRef, useState } from "react";
import { Button, Field, VerifyResult } from "@/components/ds";
import { MaskedHeading } from "@/components/site/MaskedHeading";
import { pop } from "@/components/site/Motion";
import { COURSES, SERVICES, type EnquiryType } from "@/lib/content";

const TABS: EnquiryType[] = ["Inspection", "Training", "General"];
const TAB_DETAILS = { Inspection: "Assets, sites & technical services", Training: "Courses, teams & certification", General: "Questions & other enquiries" };

export function EnquiryForm({ initialType }: { initialType: EnquiryType }) {
  const [type, setType] = useState<EnquiryType>(initialType);
  const [sent, setSent] = useState(false);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const sentEl = useRef<HTMLDivElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = String(new FormData(form.current!).get("email") || "");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setEmailErr("Enter a full email address, like name@company.com");
      return;
    }
    setEmailErr(null);
    setSent(true);
    requestAnimationFrame(() => pop(sentEl.current, 12));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (sent) {
    return (
      <div ref={sentEl} className="enq-sent">
        <VerifyResult status="valid" message="Thank you. Your enquiry has been sent to our sales team, and we will reply by email." />
        <Button variant="secondary" onClick={() => setSent(false)}>Send another enquiry</Button>
      </div>
    );
  }

  return (
    <div className="enquiry-card">
      <div className="enquiry-heading"><div><span className="contact-kicker">YOUR NEXT STEP</span><MaskedHeading className="">How can we help?</MaskedHeading></div><span className="enquiry-heading-mark" aria-hidden="true">↗</span></div>
      <p data-reveal="1" className="enquiry-intro">Choose an enquiry type and tell us a little about what you need.</p>
      <div className="enquiry-options" role="group" aria-label="Enquiry type">
        {TABS.map((t) => (
          <button key={t} type="button" aria-pressed={t === type} className={t === type ? "is-active" : undefined} onClick={() => { setType(t); setEmailErr(null); }}><span className="enquiry-option-top"><strong>{t}</strong><span className="enquiry-radio" aria-hidden="true" /></span><span>{TAB_DETAILS[t]}</span></button>
        ))}
      </div>
      <form ref={form} className="enq-form" onSubmit={submit} noValidate>
        <input type="hidden" name="type" value={type} />
        <div className="enquiry-section-title span-all"><span>01</span><h3>Your details</h3><small>* Required fields</small></div>
        <Field label="Full name" name="name" placeholder="Your full name" required />
        <Field label="Company" name="company" placeholder="Company or organisation" required />
        <Field label="Work email" name="email" type="email" placeholder="you@company.com" required error={emailErr} />
        <Field label="Phone (optional)" name="phone" type="tel" placeholder="Include country code" />
        <div className="enquiry-section-title enquiry-section-title--project span-all"><span>02</span><h3>{type === "Training" ? "Your training needs" : type === "Inspection" ? "Your project" : "Your enquiry"}</h3></div>
        {type === "Inspection" ? (
          <>
            <Field label="Service" as="select" name="service" options={SERVICES.map((s) => s.title)} />
            <Field label="Project location" name="location" placeholder="e.g. Jubail" />
            <Field className="span-all" label="Technical requirements" as="textarea" name="message" hint="Asset, code or standard, and preferred dates help us respond faster." />
          </>
        ) : type === "Training" ? (
          <>
            <Field label="Course" as="select" name="course" options={COURSES.map((c) => c.title)} />
            <Field label="Number of participants" name="participants" type="number" />
            <Field label="Preferred dates" name="dates" placeholder="e.g. First week of December" />
            <Field label="Delivery" as="select" name="delivery" options={["On site", "Khobar centre", "To be agreed"]} />
            <Field className="span-all" label="Additional requirements" as="textarea" name="message" hint="Optional." />
          </>
        ) : (
          <>
            <Field label="Country or project location" name="location" />
            <Field label="Area of interest" as="select" name="area" options={["Inspection", "Training", "Certificate verification", "Other"]} />
            <Field className="span-all" label="Message" as="textarea" name="message" />
          </>
        )}
        <div className="enquiry-submit span-all"><p>Your enquiry goes to our sales team.<br />We’ll follow up at the email you provide.</p><Button type="submit" size="lg" arrow>Send enquiry</Button></div>
      </form>
    </div>
  );
}
