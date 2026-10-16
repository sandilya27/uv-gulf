// UV Gulf components — window.UVGulf. Requires React 18 and tokens.css + bundle.css on the page.
import type { ReactNode } from "react";

export interface ButtonProps {
  /** primary: the one main action per view. secondary: outlined alternative. ghost: inline text action. on-deep / outline-deep: on navy bands. */
  variant?: "primary" | "secondary" | "ghost" | "on-deep" | "outline-deep";
  size?: "sm" | "md" | "lg";
  /** Renders an <a> when set. */
  href?: string;
  /** Trailing arrow for "go somewhere" actions. */
  arrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export interface EyebrowProps { children: ReactNode; }

export interface MethodTagProps {
  /** NDT method code: VT, UT, RT, ET, MT, AE, PT, LT. */
  code: string;
  /** Method name without "testing": "Ultrasonic". */
  label?: string;
}

export interface CredentialSealProps {
  /** Standard reference exactly as on the certificate: "ISO/IEC 17020:2012". */
  standard: string;
  label?: string;
}

export interface ServiceCardProps {
  title: string;
  summary?: string;
  /** Up to 5 scope items. */
  items?: string[];
  /** Optional method or service code shown top-right. */
  code?: string;
  href?: string;
  cta?: string;
}

export interface CourseCardProps {
  title: string;
  /** Awarding body, e.g. "NEBOSH", "IOSH". Only when confirmed. */
  body?: string;
  summary?: string;
  audience?: string;
  duration?: string;
  format?: string;
  href?: string;
  cta?: string;
}

export interface Division {
  eyebrow?: string;
  title: string;
  text?: string;
  links?: { label: string; href?: string }[];
  cta?: { label: string; href?: string };
}
export interface DivisionPanelProps { divisions: Division[]; }

export interface FieldProps {
  label: string;
  as?: "input" | "select" | "textarea";
  type?: string;
  name?: string;
  id?: string;
  options?: string[];
  placeholder?: string;
  defaultValue?: string;
  hint?: string;
  /** Replaces the hint and marks the field invalid. */
  error?: string;
  required?: boolean;
  /** Monospace, uppercase input for certificate and reference numbers. */
  mono?: boolean;
}

export interface CertificateRecord { number: string; holder?: string; course?: string; issued?: string; expires?: string; }

export interface VerifyResultProps {
  status: "valid" | "expired" | "not-found" | "unavailable";
  /** Only fields approved for public display. */
  record?: CertificateRecord;
  message?: string;
}

export interface CertificateVerifyProps {
  status?: VerifyResultProps["status"];
  record?: CertificateRecord;
  defaultValue?: string;
  onVerify?: (certificateNumber: string) => void;
}

export interface SiteHeaderProps {
  logoSrc?: string;
  logoReversedSrc?: string;
  items?: { label: string; href: string }[];
  /** Label of the current section, marked aria-current. */
  current?: string;
  /** Transparent-on-navy variant for the hero. */
  onDeep?: boolean;
}

export interface LocationListProps { hq?: string; hqLabel?: string; cities?: string[]; }
