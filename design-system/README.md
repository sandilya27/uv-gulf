UV Gulf (United Vetting Gulf Co. Ltd.) is a Khobar-based, ISO/IEC 17020:2012 and ISO 9001:2015 certified provider of third-party inspection, non-destructive testing, calibration, technical advisory and industrial training across the Kingdom of Saudi Arabia. The website is built around two divisions, **Inspection** and **Training**, plus certificate verification and enquiries. This system is the look and voice of that site: modern industrial, precise, calm.

## Brand in one line

Engineering precision in navy and sky, taken straight from the gear mark. Navy carries authority, sky carries motion, and one amber "inspection tag" highlight marks what has been checked and certified.

## Content fundamentals

- **Voice**: a senior inspector explaining a finding. Factual, specific, unhurried. Lead with the asset or the outcome, then the method.
- **Person**: "we" for UV Gulf, "you" for the client. Use the full legal name "United Vetting Gulf Co. Ltd." once on About and in the footer; "UV Gulf" everywhere else.
- **Casing**: sentence case for headings, buttons and labels ("Request an inspection"). Uppercase only through the `eyebrow` style. Service names are capitalised as proper nouns: Non-Destructive Testing, Third-Party Inspection.
- **Technical terms**: write the method in full the first time, then the code: "ultrasonic testing (UT)". Standards are quoted exactly: `ISO/IEC 17020:2012`, `ISO 9001:2015`.
- **Claims**: only what UV Gulf has documented. No "world-leading", no "best in the Gulf", no invented numbers of projects, clients or staff. If a duration or accreditation is unconfirmed, leave it out.
- **No emoji, no exclamation marks.**
- Examples:
  - Hero: "Third-party inspection, testing and calibration you can verify."
  - Service intro: "We calibrate pressure, temperature, flow and gas instruments on-shore and off-shore, with certificates traceable to national standards."
  - Error: "We could not find a certificate with this number. Check the number on the card and try again."
- Arabic/RTL is out of the current scope. When it is added, pair `IBM Plex Sans Arabic` with these families and mirror layouts; keep numbers and certificate references in Latin digits.

## Colour

- **Brand hues** are the exact logo colours: `logo-navy` (#004E72) and `logo-sky` (#279BD6). Never adjust them; use the semantic tokens built on them.
- **Grounds**: `surface` for pages, `surface-alt` for alternating bands and form panels, `surface-raised` for cards, `surface-tint` for info panels and selected states.
- **Deep bands**: `surface-deep` (navy) for the hero, the Inspection/Training split and the footer. Text on it is `on-deep` and `on-deep-muted`; links and eyebrows use `sky-300`. Use at most two deep bands per page plus the footer.
- **Text**: `ink` for headings and body, `ink-muted` for secondary text, `link` for inline links. `logo-sky`/`accent` is not a text colour below 24px.
- **Primary action**: `primary` with `on-primary`. It is navy in light theme and switches to sky in dark theme, with dark text on it.
- **Signal amber** (`signal`) is the inspection-tag highlight: the eyebrow tick, the credential seal, the warning state. Never a button, never a large fill, never more than a few marks per screen.
- **Status**: `success`, `warning`, `danger` with their `-bg` grounds, used for verification results and form feedback. Every status shows a word and an icon too.
- Both themes pass WCAG AA: body text 4.5:1 or more on every ground its token names, control borders and focus ring 3:1 or more.

## Typography

- **Display: Saira** (`--font-display`). Squared, engineered letterforms that sit next to the logo's lettering without copying it. Headings `display-xl` to `h4`, and `eyebrow`. Weight 600–700 only.
- **Text: Barlow** (`--font-sans`). Drawn from industrial signage; clear at small sizes and on site tablets. Styles `lead`, `body`, `body-sm`, `label`, `caption`.
- **Data: IBM Plex Mono** (`--font-mono`). Certificate numbers, standard references and NDT method codes, style `code`.
- All three load from Google Fonts (`bundle.css` imports them). Keep running text within `measure` (70ch). Headings use `text-wrap: balance`.
- Mobile: step display sizes down one level under 720px (`display-xl` → `display-l`, `h1` → 32px).

## Spacing and layout

- 4px base. Use `space-1` to `space-24`; nothing in between.
- Content sits in a `container-max` (1200px) column with `space-8` gutters on desktop and `space-4` on mobile.
- Sections get `space-24` top and bottom on desktop, `space-16` on mobile. Heading to content: `space-8`. Cards in a grid: `space-6` gap.
- Grids: three columns for services and courses on desktop, two on tablet, one on mobile.
- Header is `header-height` (72px), sticky, white (`surface-raised`) with a `border` hairline; over the hero it uses the `onDeep` variant.

## Shape, borders and depth

- Corners: `radius-sm` for tags, `radius-md` for buttons, inputs and cards (a nod to the softened corners of the logo letters), `radius-lg` for large panels. `radius-pill` only for dots and the seal.
- Separate with `border` hairlines first; use `shadow-sm` for the scrolled header and `shadow-md` for card hover and menus only.
- Card hover: border turns `accent` and `shadow-md` appears. No lifting, no scaling.
- Focus: a solid 2px `focus-ring` outline at 2px offset on every interactive element; `sky-300` on deep bands.

## Imagery

- Real site photography: inspectors at work, welds, gauges, scaffolds, training sessions in Khobar. Proposal scope excludes a photoshoot, so start from UV Gulf's own photos and licensed industrial stock that shows Gulf sites (desert light, plants, pipelines), never generic office scenes.
- Treat photos with a light navy overlay (`navy-900` at 40–60%) when text sits on them; text on photos is always `on-deep`.
- The gear mark (`uvgulf-mark`) can be used large and cropped as a background motif on deep bands at low contrast. Do not redraw or animate the logo.

## Motion

- Short and functional: 150–200ms ease for hover and focus, arrow icons nudge 3px on hover.
- Sections may fade up 12px once on first view; content is visible without it. Respect `prefers-reduced-motion` by removing all movement.

## Iconography

- The site uses **Lucide** stroke icons at 1.75 stroke, 18–24px, coloured with `currentColor` from the surrounding text token. The components include a small built-in set (arrow, check, x, alert, clock, search, shield) in the same style.
- No emoji, no filled clip-art icons, no icon inside every card. Icons mark actions and states, not decoration.
- NDT methods are shown with `MethodTag` codes rather than pictograms.

## Logo

- Use the supplied files only (see Assets → Logos). Full-colour `uvgulf-logo` on `surface`/`surface-alt`; `uvgulf-logo-reversed` (white and sky) on `surface-deep` and photos. The gear `uvgulf-mark` alone for favicons, social avatars and the chatbot.
- Clear space around the logo: the height of the "U" on all sides. Minimum width 140px for the full logo, 32px for the mark.
- Never recolour, outline, stretch, add effects, or set the wordmark in another font.

## Components

`window.UVGulf` provides Button, Eyebrow, MethodTag, CredentialSeal, ServiceCard, CourseCard, DivisionPanel, Field, VerifyResult, CertificateVerify, SiteHeader and LocationList. They need React 18, `tokens.css` and `components/bundle.css`. In the production Next.js + Tailwind build, map the tokens into the Tailwind theme as CSS variables and recreate these components with the same class structure and states.

## Contact details to use

- Email: sales@uvgulf.com
- Head office: Khobar, Kingdom of Saudi Arabia
- Service locations: Riyadh, Dammam, Jubail, Jeddah, Yanbu, Tabuk, Taif, Medina, Mecca
- Website: www.uvgulf.com
