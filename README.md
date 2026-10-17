# UV Gulf (United Vetting Gulf Co. Ltd.)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=flat&logo=threedotjs)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=flat&logo=greensock)](https://greensock.com/)
[![ISO Standard](https://img.shields.io/badge/ISO%2FIEC-17020%3A2012-004E72?style=flat)](https://www.iso.org/)
[![ISO Standard](https://img.shields.io/badge/ISO-9001%3A2015-279BD6?style=flat)](https://www.iso.org/)

**UV Gulf (United Vetting Gulf Co. Ltd.)** is a Khobar-based, ISO/IEC 17020:2012 and ISO 9001:2015 accredited industrial quality assurance provider. UV Gulf delivers third-party inspection (TPI), non-destructive testing (NDT), instrument calibration, technical advisory, and certified industrial training programs across the Kingdom of Saudi Arabia.

---

## Repository Overview

This repository houses the complete digital presence and design engineering assets for UV Gulf:

```
uv_gulf/
├── design-system/             # Core industrial design system
│   ├── assets/                # Official brand logos, marks, and vectors
│   ├── components/            # Reusable UI component specs, CSS, and HTML previews
│   ├── design-system.json     # Design system metadata & component definitions
│   ├── tokens.json            # Design tokens (colors, typography, spacing, shadows)
│   └── README.md              # Comprehensive design & brand guidelines
├── web/                       # Production Next.js (App Router) web application
│   ├── app/                   # Route segments (Home, Inspection, Training, Verify, Contact)
│   ├── components/            # React UI components, Three.js inspection visualizer, layout
│   │   ├── ds/                # Ported design system components
│   │   ├── home/              # Hero, InspectionCore (3D), ServiceExplorer, LocationsMap
│   │   └── site/              # Motion orchestration, Header, Footer, Chatbot
│   ├── lib/                   # Copy data, site configuration, pre-projected Saudi map paths
│   ├── public/                # Static assets, WebP illustrations, process graphics
│   └── styles/                # Global CSS and UV Gulf design tokens
└── README.md                  # Root documentation (this file)
```

---

## Key Features

- **Industrial 3D Inspection Core**: An interactive Three.js viewport featuring a real-time rotating pipeline spool piece with animated ultrasonic scanning rings, laser crosshairs, and live coordinate telemetry.
- **Motion & Scroll Choreography**: Built with GSAP ScrollTrigger and Anime.js for smooth data reveals, counter roll-ups, and laser pulse effects. Powered by Lenis smooth scrolling with full respect for `prefers-reduced-motion`.
- **Credential Verification Portal**: Dedicated online lookup portal (`/verify`) for client verification of inspection certificates and training credentials against standard registries.
- **Division Explorers**:
  - **Inspection & Testing**: Ultrasonic Testing (UT), Magnetic Particle Testing (MT), Radiographic Testing (RT), Liquid Penetrant Testing (PT), Visual Inspection (VT), Positive Material Identification (PMI), and Hardness Testing.
  - **Calibration Services**: On-shore and off-shore pressure, temperature, electrical, and dimensional instrument calibration traceable to national standards.
  - **Industrial Training Academy**: ASNT NDT Level I/II, welding inspection, lifting equipment, and HSE certifications.
- **Nationwide Coverage Map**: Dynamic interactive SVG map highlighting UV Gulf operational hubs across Saudi Arabia: Khobar (HQ), Riyadh, Dammam, Jubail, Jeddah, Yanbu, Tabuk, Taif, Medina, and Mecca.

---

## Design System & Brand Identity

The interface follows a modern industrial aesthetic engineered for clarity and authority:

- **Color Palette**:
  - **Navy** (`#004E72`): Ground authority, primary deep bands, and headers.
  - **Sky** (`#279BD6`): Interactive accents, motion indicators, and active states.
  - **Signal Amber** (`#D97706`): Used strictly for verified seals, status chips, and inspection highlights.
- **Typography**:
  - **Display**: [Saira](https://fonts.google.com/specimen/Saira) — Engineered, squared structural headings.
  - **Body**: [Barlow](https://fonts.google.com/specimen/Barlow) — Clean industrial sans-serif for high readability.
  - **Mono**: [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) — Certificate IDs, telemetry data, and NDT method codes.

---

## Getting Started

### Prerequisites

- **Node.js**: v18.18.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Development

1. Navigate to the `web` workspace:
   ```bash
   cd web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   npm run start
   ```

5. Type check:
   ```bash
   npm run typecheck
   ```

---

## Company Information

- **Legal Entity**: United Vetting Gulf Co. Ltd.
- **Headquarters**: Khobar, Kingdom of Saudi Arabia
- **Accreditations**: ISO/IEC 17020:2012 | ISO 9001:2015
- **Inquiries & RFQs**: sales@uvgulf.com
- **Website**: [www.uvgulf.com](https://www.uvgulf.com)
