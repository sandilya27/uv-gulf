/* @ds-bundle: {"format":4,"namespace":"UVGulf","components":[{"name":"Button"},{"name":"Eyebrow"},{"name":"MethodTag"},{"name":"CredentialSeal"},{"name":"ServiceCard"},{"name":"CourseCard"},{"name":"DivisionPanel"},{"name":"Field"},{"name":"VerifyResult"},{"name":"CertificateVerify"},{"name":"SiteHeader"},{"name":"LocationList"}]} */
(function () {
  var React = window.React, h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }

  // Stroke icons, 24px grid, 1.75 stroke (Lucide-compatible style).
  var paths = {
    arrow: "M5 12h14M13 6l6 6-6 6",
    check: "M5 12.5l4.5 4.5L19 7.5",
    x: "M7 7l10 10M17 7L7 17",
    alert: "M12 8v5M12 16.5v.01",
    clock: "M12 7v5l3 2",
    search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
    shield: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3zM9 12l2 2 4-4"
  };
  function Icon(p) {
    var extra = p.name === "clock" ? h("circle", { cx: 12, cy: 12, r: 9 }) : null;
    return h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: p.strokeWidth || 1.75, strokeLinecap: "round", strokeLinejoin: "round", className: p.className, "aria-hidden": "true" }, extra, h("path", { d: paths[p.name] }));
  }

  function Button(p) {
    var variant = p.variant || "primary", size = p.size || "md";
    var cls = cx("uvg-btn", "uvg-btn-" + variant, size !== "md" && "uvg-btn-" + size, p.className);
    var kids = [p.children, p.arrow ? h(Icon, { key: "a", name: "arrow", className: "uvg-arrow" }) : null];
    if (p.href) return h("a", { href: p.href, className: cls }, kids);
    return h("button", { type: p.type || "button", className: cls, disabled: p.disabled, onClick: p.onClick }, kids);
  }

  function Eyebrow(p) { return h("p", { className: cx("uvg-eyebrow", p.className) }, p.children); }

  function MethodTag(p) {
    return h("span", { className: "uvg-tag", title: p.label ? p.label + " testing (" + p.code + ")" : p.code },
      h("span", { className: "uvg-tag-code" }, p.code),
      p.label ? h("span", { className: "uvg-tag-label" }, p.label) : null);
  }

  function CredentialSeal(p) {
    return h("span", { className: "uvg-seal" },
      h("span", { className: "uvg-seal-dot" }, h(Icon, { name: "shield", strokeWidth: 2 })),
      h("span", null, h("span", { className: "uvg-seal-std" }, p.standard), p.label ? h("span", { className: "uvg-seal-label" }, p.label) : null));
  }

  function ServiceCard(p) {
    var Tag = p.href ? "a" : "div";
    return h(Tag, { className: "uvg-card", href: p.href },
      h("div", { className: "uvg-card-head" },
        h("h3", { className: "uvg-card-title" }, p.title),
        p.code ? h("span", { className: "uvg-card-code" }, p.code) : null),
      p.summary ? h("p", { className: "uvg-card-text" }, p.summary) : null,
      p.items && p.items.length ? h("ul", { className: "uvg-list" }, p.items.map(function (it, i) { return h("li", { key: i }, it); })) : null,
      p.href ? h("span", { className: "uvg-card-foot" }, p.cta || "View service", h(Icon, { name: "arrow" })) : null);
  }

  function CourseCard(p) {
    var Tag = p.href ? "a" : "div";
    var meta = [["Audience", p.audience], ["Duration", p.duration], ["Format", p.format]].filter(function (m) { return m[1]; });
    return h(Tag, { className: "uvg-card", href: p.href },
      h("div", { className: "uvg-card-head" },
        h("h3", { className: "uvg-card-title" }, p.title),
        p.body ? h("span", { className: "uvg-course-body" }, p.body) : null),
      p.summary ? h("p", { className: "uvg-card-text" }, p.summary) : null,
      meta.length ? h("dl", { className: "uvg-course-meta" }, meta.map(function (m) { return [h("dt", { key: m[0] + "t" }, m[0]), h("dd", { key: m[0] + "d" }, m[1])]; })) : null,
      p.href ? h("span", { className: "uvg-card-foot" }, p.cta || "Course details", h(Icon, { name: "arrow" })) : null);
  }

  function DivisionPanel(p) {
    return h("div", { className: "uvg-divisions" }, (p.divisions || []).map(function (d, i) {
      return h("section", { key: i, className: "uvg-division uvg-deep" },
        d.eyebrow ? h(Eyebrow, null, d.eyebrow) : null,
        h("h2", { className: "uvg-division-title" }, d.title),
        d.text ? h("p", { className: "uvg-division-text" }, d.text) : null,
        d.links ? h("ul", { className: "uvg-division-links" }, d.links.map(function (l, j) { return h("li", { key: j }, h("a", { href: l.href || "#" }, l.label)); })) : null,
        d.cta ? h(Button, { variant: "on-deep", href: d.cta.href || "#", arrow: true }, d.cta.label) : null);
    }));
  }

  var fid = 0;
  function Field(p) {
    var idRef = React.useRef(p.id || "uvg-f-" + (++fid)); var id = idRef.current;
    var as = p.as || "input";
    var props = { id: id, className: cx("uvg-input", p.mono && "uvg-mono"), placeholder: p.placeholder, required: p.required, defaultValue: p.defaultValue, name: p.name, "aria-invalid": p.error ? "true" : undefined, "aria-describedby": (p.hint || p.error) ? id + "-d" : undefined };
    var control;
    if (as === "select") control = h("select", props, (p.options || []).map(function (o) { return h("option", { key: o, value: o }, o); }));
    else if (as === "textarea") control = h("textarea", props);
    else control = h("input", Object.assign({ type: p.type || "text" }, props));
    return h("div", { className: cx("uvg-field", p.error && "uvg-field-invalid", p.className) },
      h("label", { className: "uvg-label", htmlFor: id }, p.label, p.required ? h("span", { className: "uvg-req", "aria-hidden": "true" }, "*") : null),
      control,
      p.error ? h("span", { className: "uvg-error-text", id: id + "-d" }, h(Icon, { name: "alert", strokeWidth: 2.5 }), p.error)
        : p.hint ? h("span", { className: "uvg-hint", id: id + "-d" }, p.hint) : null);
  }

  var STATUS = {
    "valid": { icon: "check", title: "Valid certificate", msg: "This certificate was issued by United Vetting Gulf Co. Ltd. and is current." },
    "expired": { icon: "clock", title: "Certificate expired", msg: "This certificate was issued by UV Gulf but is past its expiry date. Contact us to arrange renewal." },
    "not-found": { icon: "x", title: "No certificate found", msg: "We could not find a certificate with this number. Check the number on the card and try again." },
    "unavailable": { icon: "alert", title: "Verification unavailable", msg: "The verification service is not responding. Try again in a few minutes or email sales@uvgulf.com." }
  };
  function VerifyResult(p) {
    var s = STATUS[p.status] || STATUS["not-found"], r = p.record;
    return h("div", { className: cx("uvg-result", "uvg-result-" + p.status), role: "status" },
      h("div", { className: "uvg-result-head" }, h("span", { className: "uvg-result-icon" }, h(Icon, { name: s.icon, strokeWidth: 2.5 })), s.title),
      h("p", { className: "uvg-result-msg" }, p.message || s.msg),
      r ? h("dl", { className: "uvg-result-data" },
        [["Certificate no.", r.number, true], ["Holder", r.holder], ["Course / scope", r.course], ["Issued", r.issued], ["Expires", r.expires]]
          .filter(function (x) { return x[1]; })
          .map(function (x) { return h("div", { key: x[0] }, h("dt", null, x[0]), h("dd", { className: x[2] ? "uvg-mono" : undefined }, x[1])); })) : null);
  }

  function CertificateVerify(p) {
    return h("div", { className: "uvg-verify" },
      h("form", { className: "uvg-verify-form", onSubmit: function (e) { e.preventDefault(); if (p.onVerify) p.onVerify(new FormData(e.target).get("certificate")); } },
        h(Field, { label: "Certificate number", name: "certificate", mono: true, placeholder: "UVG-TR-2026-000000", defaultValue: p.defaultValue, hint: "Printed under the QR code on the certificate or ID card.", required: true }),
        h(Button, { type: "submit", size: "lg" }, h(Icon, { name: "search" }), "Verify")),
      p.status ? h(VerifyResult, { status: p.status, record: p.record }) : null);
  }

  function SiteHeader(p) {
    var items = p.items || [
      { label: "Inspection", href: "/inspection" }, { label: "Training", href: "/training" }, { label: "Industries", href: "/industries" },
      { label: "About", href: "/about" }, { label: "Insights", href: "/insights" }, { label: "Contact", href: "/contact" }];
    return h("header", { className: cx("uvg-header", p.onDeep && "uvg-deep") },
      h("a", { className: "uvg-header-logo", href: "/", "aria-label": "UV Gulf home" },
        p.logoSrc ? h("img", { className: "uvg-logo-full", src: p.logoSrc, alt: "UV Gulf Inspection & Training" }) : null,
        p.logoReversedSrc ? h("img", { className: "uvg-logo-rev", src: p.logoReversedSrc, alt: "UV Gulf Inspection & Training" }) : null),
      h("nav", { className: "uvg-nav", "aria-label": "Main" }, items.map(function (it) {
        return h("a", { key: it.label, href: it.href, "aria-current": it.label === p.current ? "page" : undefined }, it.label);
      })),
      h("div", { className: "uvg-header-actions" },
        h("a", { className: "uvg-header-verify", href: "/verify" }, h(Icon, { name: "shield" }), "Verify certificate"),
        h(Button, { variant: p.onDeep ? "on-deep" : "primary", href: "/contact", size: "sm" }, "Send an enquiry")));
  }

  function LocationList(p) {
    var cities = p.cities || ["Riyadh", "Dammam", "Jubail", "Jeddah", "Yanbu", "Tabuk", "Taif", "Medina", "Mecca"];
    return h("div", { className: "uvg-locations" },
      h("div", { className: "uvg-hq" }, h("span", { className: "uvg-hq-city" }, p.hq || "Khobar"), h("span", { className: "uvg-hq-label" }, p.hqLabel || "Head office · Kingdom of Saudi Arabia")),
      h("ul", { className: "uvg-cities", "aria-label": "Service locations" }, cities.map(function (c) { return h("li", { key: c }, c); })));
  }

  window.UVGulf = Object.assign(window.UVGulf || {}, {
    Button: Button, Eyebrow: Eyebrow, MethodTag: MethodTag, CredentialSeal: CredentialSeal, ServiceCard: ServiceCard,
    CourseCard: CourseCard, DivisionPanel: DivisionPanel, Field: Field, VerifyResult: VerifyResult,
    CertificateVerify: CertificateVerify, SiteHeader: SiteHeader, LocationList: LocationList, Icon: Icon
  });
})();
