/** Drawing-style tags around the hero spool: service on the first line, detail on the second. */
export type HeroCallouts = readonly [readonly [string, string], readonly [string, string], readonly [string, string], readonly [string, string]];

export const HERO_CALLOUTS = {
  spool: [
    ["Ultrasonic testing", "Phased-array ring scan"],
    ["Girth weld W-01", "Butt weld · 100% UT"],
    ["Weld-neck flange", "WN · RF · Class 150"],
    ["Wall-thickness map", "NPS 12 · SCH 40"],
  ],
  training: [
    ["Rigger training", "Safe slinging · signalling"],
    ["Scaffolding training", "Erection · inspection"],
    ["Health & safety", "Hazards · controls"],
    ["Training records", "Attendance · outcomes"],
  ],
  contact: [
    ["Inspection enquiries", "Asset · scope · timing"],
    ["Training enquiries", "Roles · site activities"],
    ["Khobar, Saudi Arabia", "Head office"],
    ["Email", "sales@uvgulf.com"],
  ],
  verify: [
    ["Certificate number", "Printed under the QR code"],
    ["Issued by UV Gulf", "Inspection & training"],
    ["Status check", "Result shown on screen"],
    ["Verification record", "Valid · expired · not found"],
  ],
} satisfies Record<string, HeroCallouts>;
