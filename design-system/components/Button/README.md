# Button

Buttons start an action or take the visitor to an enquiry, a division or the verification page.

- **primary**: the one action the view exists for ("Request inspection", "Send enquiry"). One per view.
- **secondary**: an alternative next to a primary ("Download company profile").
- **ghost**: inline text action with `arrow`, for "see all" links at the end of a section.
- **on-deep** / **outline-deep**: on `surface-deep` bands only (hero, division panel, footer).

Provide: `children` (label), `href` to render a link, `arrow` when the button navigates. Labels are verb first, sentence case, no exclamation marks: "Verify certificate", not "VERIFY NOW!". Do not put two primaries side by side; do not use `signal` amber for buttons.
