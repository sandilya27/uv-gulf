// Site copy and data. Counters, certificate demo records and chatbot replies are
// placeholder content from the design-system kit: UV Gulf must confirm them before launch.
import type { CertificateRecord, VerifyStatus } from "@/components/ds";

export const SITE_CONFIG = {
  /** "light" | "dark" — the dark theme is fully tokenised in colors.css. */
  theme: "light" as "light" | "dark",
  /** Cursor crosshair with X/Y readout on the home hero. */
  crosshair: true,
  /** Floating UV Gulf assistant. */
  chatbot: true,
};

export type EnquiryType = "Inspection" | "Training" | "General";
export const enquiryHref = (type: EnquiryType) => "/contact?type=" + type.toLowerCase();

export const NAV_ITEMS = [
  { label: "Inspection", href: "/inspection" },
  { label: "Training", href: "/training" },
  { label: "Industries", href: "/#where" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export const SERVICES = [
  { title: "Third-Party Inspection", href: "/inspection/third-party-inspection", summary: "Independent inspection of equipment, materials and construction against code and contract.", items: ["Vendor and shop inspection", "Lifting equipment inspection", "Pressure equipment"] },
  { title: "Non-Destructive Testing", href: "/inspection/non-destructive-testing", code: "NDT", summary: "Examine welds, pipework and vessels using methods selected for the material, access and service conditions.", items: ["Ultrasonic testing (UT)", "Radiography testing (RT)", "Magnetic particle testing (MT)", "Dye penetrant testing (PT)"] },
  { title: "Calibration", href: "/inspection/calibration", summary: "Instrument calibration scoped to your measurement and site requirements, with pressure relief valve work agreed separately.", items: ["Pressure and temperature", "Flow meters and gas detectors", "Pressure relief valve enquiries", "Dimensional and electrical"] },
  { title: "Technical Advisory", href: "/inspection/technical-advisory", summary: "Advice on standards, materials, lifting equipment and site risk.", items: ["Regulations and standards", "Risk and hazard assessment", "On-site consultation"] },
];

export const METHODS = [
  { code: "VT", label: "Visual", desc: "Direct and remote visual examination of welds, surfaces and coatings. Usually the first check on any asset." },
  { code: "UT", label: "Ultrasonic", desc: "High-frequency sound finds internal flaws in welds and plate, and measures remaining wall thickness." },
  { code: "RT", label: "Radiography", desc: "X-ray or gamma imaging of welds and castings to reveal internal defects such as porosity and lack of fusion." },
  { code: "ET", label: "Eddy current", desc: "Electromagnetic induction detects surface and near-surface cracks in conductive materials, including heat-exchanger tubing." },
  { code: "MT", label: "Magnetic particle", desc: "Reveals surface and near-surface cracks in ferromagnetic materials such as carbon-steel welds." },
  { code: "PT", label: "Dye penetrant", desc: "Shows surface-breaking defects in non-porous materials, including stainless steel and aluminium." },
  { code: "AE", label: "Acoustic emission", desc: "Listens for active defects in vessels and tanks while they are under load." },
  { code: "LT", label: "Leak", desc: "Locates and sizes leaks in pressure-containing systems, vessels and pipework." },
];

export type CourseCategory = "Lifting" | "Scaffolding" | "Safety";
export const COURSES: { slug: string; href?: string; title: string; cat: CourseCategory; body?: string; summary: string; audience: string; duration?: string; format: string }[] = [
  { slug: "rigger-training", href: "/training/rigger-training", title: "Rigger Training", cat: "Lifting", summary: "Safe slinging, load calculation and signalling for lifting operations.", audience: "Riggers, lifting supervisors", duration: "On request", format: "Classroom + practical" },
  { slug: "scaffolding-training", title: "Scaffolding Training", cat: "Scaffolding", summary: "Erection, inspection and dismantling of tube-and-fitting and system scaffolds.", audience: "Scaffolders, inspectors", duration: "On request", format: "On-site or Khobar centre" },
  { slug: "occupational-health-safety", title: "Occupational Health & Safety", cat: "Safety", body: "NEBOSH", summary: "Internationally recognised safety qualification for supervisors and managers.", audience: "Supervisors, HSE staff", format: "Classroom" },
];

export const STEPS = [
  { title: "Enquiry", text: "Share the asset, site and timing so we can confirm the applicable standard.", deliverable: "Confirmed inspection scope" },
  { title: "Inspection plan", text: "We assign qualified inspectors and agree methods, hold points and site access.", deliverable: "Agreed inspection plan" },
  { title: "On-site inspection", text: "Our inspectors examine and test the asset against the agreed plan.", deliverable: "Recorded measurements and test results" },
  { title: "Report", text: "We assess the findings against the applicable acceptance criteria.", deliverable: "Inspection report with documented findings" },
  { title: "Certificate", text: "We issue the certificate with a reference you can check on the Verify page.", deliverable: "Certificate with a verifiable reference number" },
];

/** [name, longitude, latitude, label anchor, label dx, label dy, tag] */
export const CITY_DATA: [string, number, number, "start" | "middle" | "end", number, number, string?][] = [
  ["Khobar", 50.21, 26.28, "start", 12, 14, "Head office"],
  ["Dammam", 50.10, 26.43, "start", 12, -6],
  ["Jubail", 49.66, 27.01, "end", -10, -4],
  ["Riyadh", 46.68, 24.71, "start", 10, 5],
  ["Jeddah", 39.19, 21.49, "end", -10, 4],
  ["Mecca", 39.86, 21.39, "middle", 0, 24],
  ["Taif", 40.42, 21.27, "start", 10, -4],
  ["Medina", 39.61, 24.47, "start", 10, 4],
  ["Yanbu", 38.06, 24.09, "end", -10, 5],
  ["Tabuk", 36.57, 28.38, "start", 10, 5],
];

export const INDUSTRIES = ["Oil and gas", "Petrochemical", "Energy", "Construction"];

export const COUNTERS = [
  { n: 9, label: "Service locations", sub: "Served from the Khobar head office" },
  { n: 8, label: "NDT methods", sub: "From visual to acoustic emission" },
];

export const DIVISION_LINKS = {
  inspection: ["Third-party inspection", "Non-destructive testing", "Calibration", "Technical advisory"],
  training: ["Industrial safety", "Operator certification", "Rigging", "Scaffolding"],
};

/** Demo records until the real verification API is connected. */
export const CERT_RECORDS: Record<string, { status: VerifyStatus; record: CertificateRecord }> = {
  "UVG-TR-2026-004812": { status: "valid", record: { number: "UVG-TR-2026-004812", type: "training", holder: "A. Al-Harbi", course: "Rigger Training", issued: "12 Mar 2026", expires: "11 Mar 2028" } },
  "UVG-TR-2023-001207": { status: "expired", record: { number: "UVG-TR-2023-001207", type: "training", holder: "M. Rahman", course: "Scaffolding Training", issued: "04 Feb 2023", expires: "03 Feb 2025" } },
  "UVG-IN-2026-000001": { status: "valid", record: { number: "UVG-IN-2026-000001", type: "inspection", client: "Demonstration client", asset: "Mobile crane · DEMO-001", scope: "Third-party lifting equipment inspection", issued: "12 Mar 2026", expires: "11 Mar 2027" } },
};

export const CERT_DEMOS = [
  { label: "Inspection", dot: "var(--success)", num: "UVG-IN-2026-000001" },
  { label: "Valid", dot: "var(--success)", num: "UVG-TR-2026-004812" },
  { label: "Expired", dot: "var(--warning)", num: "UVG-TR-2023-001207" },
  { label: "Not found", dot: "var(--danger)", num: "UVG-TR-2026-999999" },
];

export const FOOTER_COLS = [
  { title: "Inspection", links: [["Third-party inspection", "/inspection/third-party-inspection"], ["Non-destructive testing", "/inspection/non-destructive-testing"], ["Calibration", "/inspection/calibration"], ["Technical advisory", "/inspection/technical-advisory"]] },
  { title: "Training", links: [["All courses", "/training"], ["Rigger Training", "/training/rigger-training"], ["Training enquiry", enquiryHref("Training")], ["Verify a certificate", "/verify"]] },
  { title: "Company", links: [["About", "/#about"], ["Industries", "/#where"], ["Contact", "/contact"]] },
];
