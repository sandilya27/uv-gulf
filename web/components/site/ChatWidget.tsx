"use client";

// UV Gulf assistant. Replies are fixed, approved sample answers (placeholder until
// a real assistant is connected); each one links to the relevant page.
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "@/components/ds";
import { enquiryHref } from "@/lib/content";

type Msg = { from: "bot" | "user"; text: string; link?: [string, string] };

const SUGGESTIONS = ["Find an inspection service", "Training courses", "Verify a certificate", "Talk to sales"];

function reply(text: string): Required<Pick<Msg, "text" | "link">> {
  const t = text.toLowerCase();
  if (/verif|certif|card|qr/.test(t)) return { text: "You can check any UV Gulf certificate by its number on the Verify page.", link: ["Verify a certificate", "/verify"] };
  if (/train|course|rigg|scaffold|nebosh|safety/.test(t)) return { text: "We run Rigger Training, Scaffolding Training and Occupational Health & Safety (NEBOSH). Group training can be arranged on site or at our Khobar centre.", link: ["View training", "/training"] };
  if (/inspect|ndt|ultrason|radiograph|calibrat|test|advis|weld/.test(t)) return { text: "Our Inspection division covers Third-Party Inspection, Non-Destructive Testing, Calibration and Technical Advisory.", link: ["View inspection services", "/inspection"] };
  if (/price|quote|cost|sales|contact|enquir|talk/.test(t)) return { text: "Send an enquiry with the asset, the site and the timing. Our sales team replies from sales@uvgulf.com.", link: ["Send an enquiry", "/contact"] };
  if (/where|location|city|riyadh|jeddah|jubail|dammam|khobar/.test(t)) return { text: "Our head office is in Khobar. We serve Riyadh, Dammam, Jubail, Jeddah, Yanbu, Tabuk, Taif, Medina and Mecca.", link: ["See locations", "/#where"] };
  return { text: "I do not have an approved answer for that yet. Our team can help at sales@uvgulf.com.", link: ["Send an enquiry", enquiryHref("General")] };
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ChatWidget() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: "Hello. I can help you find an inspection service, a training course or check a certificate." }]);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (open && panelRef.current && !reducedMotion()) {
      panelRef.current.animate([{ opacity: 0, transform: "translateY(16px) scale(0.96)" }, { opacity: 1, transform: "none" }], { duration: 320, easing: "cubic-bezier(.2,.7,.2,1)" });
    }
  }, [open]);

  useEffect(() => {
    if (typing && typingRef.current && !reducedMotion()) {
      typingRef.current.querySelectorAll("span").forEach((d, i) => d.animate(
        [{ transform: "translateY(0)", opacity: 0.4 }, { transform: "translateY(-4px)", opacity: 1 }, { transform: "translateY(0)", opacity: 0.4 }],
        { duration: 900, delay: i * 150, iterations: Infinity }));
    }
  }, [typing]);

  useEffect(() => {
    const b = bodyRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  }, [msgs.length, typing, open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTyping(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const r = reply(q);
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", ...r }]);
    }, 1000);
  };

  return (
    <div className="chat">
      {open ? (
        <div ref={panelRef} role="dialog" aria-label="UV Gulf assistant" className="chat-panel">
          <div className="uvg-deep chat-head">
            <img src="/assets/uvgulf-mark-reversed.png" alt="" />
            <div>
              <span className="chat-title">UV Gulf assistant</span>
              <span className="chat-sub">Answers from approved UV Gulf information</span>
            </div>
          </div>
          <div ref={bodyRef} className="chat-body" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={"chat-msg chat-msg-" + m.from}>
                <span>{m.text}</span>
                {m.link ? (
                  <button type="button" className="chat-link" onClick={() => router.push(m.link![1])}>
                    {m.link[0]}<Icon name="arrow" size={16} />
                  </button>
                ) : null}
              </div>
            ))}
            {typing ? <div ref={typingRef} className="chat-typing" aria-label="Assistant is typing"><span /><span /><span /></div> : null}
          </div>
          <div className="chat-suggestions">
            {SUGGESTIONS.map((s) => <button key={s} type="button" onClick={() => send(s)}>{s}</button>)}
          </div>
          <div className="chat-input">
            <input className="uvg-input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(input); }} placeholder="Ask about a service or course" aria-label="Message" />
            <Button onClick={() => send(input)}>Send</Button>
          </div>
        </div>
      ) : null}
      <button type="button" className="chat-fab" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close assistant" : "Open UV Gulf assistant"} aria-expanded={open}>
        {open ? <Icon name="x" size={24} /> : <img src="/assets/uvgulf-mark-reversed.png" alt="" />}
      </button>
    </div>
  );
}
