# uvgulf.com

Next.js (App Router) implementation of the Claude Design handoff `project/UV Gulf Website.dc.html`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

- `app/` — routes: `/`, `/inspection`, `/training`, `/verify`, `/contact` (`?type=inspection|training|general` preselects the enquiry tab). "Industries" and "About" are the `#where` / `#about` sections of the home page.
- `components/ds/` — UV Gulf design-system components (Button, Eyebrow, Field, VerifyResult, …), ported 1:1 from the design-system bundle.
- `styles/uvgulf/` — design-system tokens and component CSS, copied verbatim. `app/globals.css` holds the site layout.
- `components/site/Motion.tsx` — all declarative motion (`data-reveal`, `data-words`, `data-spin`, `data-scan`, `data-parallax`, `data-count`, `data-draw`, `data-pulse`). Disabled under `prefers-reduced-motion`.
- `lib/content.ts` — copy and data, plus `SITE_CONFIG` (theme, hero crosshair, chatbot).
- `lib/saudi-path.ts` — the map outline, pre-projected (no runtime fetch).

## Before launch

- **Photos**: `PhotoSlot` shows placeholders. Pass `src` (a file in `public/`) once UV Gulf supplies site photos.
- **Placeholder content to confirm with UV Gulf**: the four counters, the certificate demo records, and the chatbot's fixed replies.
- **Certificate verification**: `lookup()` in `components/verify/Verifier.tsx` reads demo records; point it at the real API.
- **Enquiry form**: `submit` in `components/contact/EnquiryForm.tsx` only validates and shows the confirmation; connect it to email/CRM.
- **Gear mark animation**: the design system says not to animate the logo; the hero rotates it slowly at low opacity, which the client chose. Get UV Gulf's approval.
