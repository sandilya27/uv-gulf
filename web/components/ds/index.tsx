// UV Gulf design system components, ported from the design-system bundle
// (_ds/uv-gulf-design-system-…/_ds_bundle.js). Markup and class names are
// unchanged so components.css styles them exactly as in the design.
import Link from "next/link";
import { Fragment, useId, type ChangeEventHandler, type MouseEventHandler, type ReactNode } from "react";

const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");

/* Icon: stroke icons, 24px grid, 1.75 stroke (Lucide-compatible style). */
const ICON_PATHS = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  x: "M7 7l10 10M17 7L7 17",
  alert: "M12 8v5M12 16.5v.01",
  clock: "M12 7v5l3 2",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
  shield: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3zM9 12l2 2 4-4",
  menu: "M4 7h16M4 12h16M4 17h16",
} as const;
export type IconName = keyof typeof ICON_PATHS;

export function Icon({ name, strokeWidth = 1.75, className, size }: { name: IconName; strokeWidth?: number; className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size} aria-hidden="true">
      {name === "clock" ? <circle cx="12" cy="12" r="9" /> : null}
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("uvg-eyebrow", className)}>{children}</p>;
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "on-deep" | "outline-deep";
type ButtonProps = {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  href?: string;
  arrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  children: ReactNode;
};

/** Internal hrefs render as next/link so navigation stays client-side. */
export function Button({ variant = "primary", size = "md", href, arrow, type = "button", disabled, onClick, className, children }: ButtonProps) {
  const cls = cx("uvg-btn", "uvg-btn-" + variant, size !== "md" && "uvg-btn-" + size, className);
  const kids = (
    <>
      {children}
      {arrow ? <Icon name="arrow" className="uvg-arrow" /> : null}
    </>
  );
  if (href) {
    return href.startsWith("/") ? (
      <Link href={href} className={cls} onClick={onClick}>{kids}</Link>
    ) : (
      <a href={href} className={cls} onClick={onClick}>{kids}</a>
    );
  }
  return <button type={type} className={cls} disabled={disabled} onClick={onClick}>{kids}</button>;
}

export function MethodTag({ code, label }: { code: string; label?: string }) {
  return (
    <span className="uvg-tag" title={label ? label + " testing (" + code + ")" : code}>
      <span className="uvg-tag-code">{code}</span>
      {label ? <span className="uvg-tag-label">{label}</span> : null}
    </span>
  );
}

export function CredentialSeal({ standard, label }: { standard: string; label?: string }) {
  return (
    <span className="uvg-seal">
      <span className="uvg-seal-dot"><Icon name="shield" strokeWidth={2} /></span>
      <span>
        <span className="uvg-seal-std">{standard}</span>
        {label ? <span className="uvg-seal-label">{label}</span> : null}
      </span>
    </span>
  );
}

function CardShell({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return <div className="uvg-card">{children}</div>;
  return <Link href={href} className="uvg-card">{children}</Link>;
}

export function ServiceCard({ title, summary, items, code, href, cta = "View service" }: { title: string; summary?: string; items?: string[]; code?: string; href?: string; cta?: string }) {
  return (
    <CardShell href={href}>
      <div className="uvg-card-head">
        <h3 className="uvg-card-title">{title}</h3>
        {code ? <span className="uvg-card-code">{code}</span> : null}
      </div>
      {summary ? <p className="uvg-card-text">{summary}</p> : null}
      {items && items.length ? <ul className="uvg-list">{items.map((it, i) => <li key={i}>{it}</li>)}</ul> : null}
      {href ? <span className="uvg-card-foot">{cta}<Icon name="arrow" /></span> : null}
    </CardShell>
  );
}

export function CourseCard({ title, body, summary, audience, duration, format, href, cta = "Course details" }: { title: string; body?: string; summary?: string; audience?: string; duration?: string; format?: string; href?: string; cta?: string }) {
  const meta = ([["Audience", audience], ["Duration", duration], ["Format", format]] as const).filter((m) => m[1]);
  return (
    <CardShell href={href}>
      <div className="uvg-card-head">
        <h3 className="uvg-card-title">{title}</h3>
        {body ? <span className="uvg-course-body">{body}</span> : null}
      </div>
      {summary ? <p className="uvg-card-text">{summary}</p> : null}
      {meta.length ? (
        <dl className="uvg-course-meta">
          {meta.map((m) => <Fragment key={m[0]}><dt>{m[0]}</dt><dd>{m[1]}</dd></Fragment>)}
        </dl>
      ) : null}
      {href ? <span className="uvg-card-foot">{cta}<Icon name="arrow" /></span> : null}
    </CardShell>
  );
}

type FieldProps = {
  label: string;
  as?: "input" | "select" | "textarea";
  type?: string;
  name?: string;
  options?: readonly string[];
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  hint?: string;
  error?: string | null;
  required?: boolean;
  mono?: boolean;
  className?: string;
};

export function Field({ label, as = "input", type = "text", name, options = [], placeholder, defaultValue, value, onChange, hint, error, required, mono, className }: FieldProps) {
  const fieldId = "uvg-f-" + useId().replace(/:/g, "");
  const props = {
    id: fieldId,
    className: "uvg-input" + (mono ? " uvg-mono" : ""),
    placeholder,
    required,
    defaultValue,
    value,
    onChange,
    name,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": hint || error ? fieldId + "-d" : undefined,
  };
  let control: ReactNode;
  if (as === "select") control = <select {...props}>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select>;
  else if (as === "textarea") control = <textarea {...props} />;
  else control = <input type={type} {...props} />;
  return (
    <div className={cx("uvg-field", error && "uvg-field-invalid", className)}>
      <label className="uvg-label" htmlFor={fieldId}>
        {label}
        {required ? <span className="uvg-req" aria-hidden="true">*</span> : null}
      </label>
      {control}
      {error ? (
        <span className="uvg-error-text" id={fieldId + "-d"}><Icon name="alert" strokeWidth={2.5} />{error}</span>
      ) : hint ? (
        <span className="uvg-hint" id={fieldId + "-d"}>{hint}</span>
      ) : null}
    </div>
  );
}

export type VerifyStatus = "valid" | "expired" | "not-found" | "unavailable";
export type CertificateRecord = { number: string; holder?: string; course?: string; issued?: string; expires?: string };

export const VERIFY_STATUS: Record<VerifyStatus, { icon: IconName; title: string; msg: string }> = {
  "valid": { icon: "check", title: "Valid certificate", msg: "This certificate was issued by United Vetting Gulf Co. Ltd. and is current." },
  "expired": { icon: "clock", title: "Certificate expired", msg: "This certificate was issued by UV Gulf but is past its expiry date. Contact us to arrange renewal." },
  "not-found": { icon: "x", title: "No certificate found", msg: "We could not find a certificate with this number. Check the number on the card and try again." },
  "unavailable": { icon: "alert", title: "Verification unavailable", msg: "The verification service is not responding. Try again in a few minutes or email sales@uvgulf.com." },
};

export function VerifyResult({ status, record, message }: { status: VerifyStatus; record?: CertificateRecord; message?: string }) {
  const s = VERIFY_STATUS[status] || VERIFY_STATUS["not-found"];
  const rows = record
    ? ([["Certificate no.", record.number, true], ["Holder", record.holder], ["Course / scope", record.course], ["Issued", record.issued], ["Expires", record.expires]] as [string, string | undefined, boolean?][]).filter((x) => x[1])
    : [];
  return (
    <div className={"uvg-result uvg-result-" + status} role="status">
      <div className="uvg-result-head">
        <span className="uvg-result-icon"><Icon name={s.icon} strokeWidth={2.5} /></span>
        {s.title}
      </div>
      <p className="uvg-result-msg">{message || s.msg}</p>
      {rows.length ? (
        <dl className="uvg-result-data">
          {rows.map((x) => <div key={x[0]}><dt>{x[0]}</dt><dd className={x[2] ? "uvg-mono" : undefined}>{x[1]}</dd></div>)}
        </dl>
      ) : null}
    </div>
  );
}

const CITIES = ["Riyadh", "Dammam", "Jubail", "Jeddah", "Yanbu", "Tabuk", "Taif", "Medina", "Mecca"];

export function LocationList({ hq = "Khobar", hqLabel = "Head office · Kingdom of Saudi Arabia", cities = CITIES }: { hq?: string; hqLabel?: string; cities?: string[] }) {
  return (
    <div className="uvg-locations">
      <div className="uvg-hq">
        <span className="uvg-hq-city">{hq}</span>
        <span className="uvg-hq-label">{hqLabel}</span>
      </div>
      <ul className="uvg-cities" aria-label="Service locations">
        {cities.map((c) => <li key={c}>{c}</li>)}
      </ul>
    </div>
  );
}
