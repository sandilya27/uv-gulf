"use client";

// Sticky SiteHeader. Uses the on-deep variant while the page's navy hero is under it,
// and gains shadow-sm once scrolled past it. Below 1000px the nav collapses into a menu.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Icon } from "@/components/ds";
import { createTimeline, stagger, utils } from "animejs";
import { NAV_ITEMS } from "@/lib/content";

const CURRENT: Record<string, string> = { "/inspection": "Inspection", "/training": "Training", "/industries": "Industries", "/about": "About", "/news-insights": "Insights", "/contact": "Contact" };

export function SiteHeaderBar() {
  const pathname = usePathname();
  const [overHero, setOverHero] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [menuMounted, setMenuMounted] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const prepared = useRef(false);

  // Ordinary disclosure: no focus trap, inert background or scroll lock.
  const close = (restoreFocus = false) => {
    if (restoreFocus || panelRef.current?.contains(document.activeElement)) {
      toggleRef.current?.focus();
    }
    setMenuOpen(false);
  };

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!menuMounted || !panel) { prepared.current = false; return; }
    const links = panel.querySelectorAll("a");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeline: ReturnType<typeof createTimeline> | undefined;
    const settle = () => {
      timeline?.cancel();
      utils.set([panel, ...links], { opacity: 1, y: 0 });
      if (!menuOpen) setMenuMounted(false);
    };
    const onPreferenceChange = () => { if (preference.matches) settle(); };
    preference.addEventListener("change", onPreferenceChange);
    if (preference.matches) {
      settle();
    } else {
      if (!prepared.current && menuOpen) {
        utils.set(panel, { opacity: 0, y: -8 });
        utils.set(links, { opacity: 0, y: -6 });
      }
      prepared.current = true;
      timeline = createTimeline({ onComplete: () => {
        if (!menuOpen) setMenuMounted(false);
      } });
      timeline.add(panel, {
        opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -8,
        duration: menuOpen ? 360 : 220, ease: menuOpen ? "outCubic" : "inQuad",
      }, 0).add(links, {
        opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -6,
        duration: menuOpen ? 160 : 120,
        delay: menuOpen ? stagger(40) : 0, ease: "outCubic",
      }, 0);
    }
    // Cancel preserves current values so rapid toggles continue without jumping.
    return () => {
      timeline?.cancel();
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [menuOpen, menuMounted]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1001px)");
    const onBreakpoint = () => {
      if (desktop.matches) {
        const active = document.activeElement;
        if (active instanceof HTMLAnchorElement && panelRef.current?.contains(active)) {
          const destination = Array.from(headerRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])
            .find((link) => link.getAttribute("href") === active.getAttribute("href"));
          destination?.focus();
        }
        setMenuOpen(false);
        setMenuMounted(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        event.preventDefault();
        close(true);
      }
    };
    const header = headerRef.current;
    const observer = new ResizeObserver(() => {
      if (header) header.parentElement?.style.setProperty("--menu-header-height", `${header.offsetHeight}px`);
    });
    if (header) observer.observe(header);
    desktop.addEventListener("change", onBreakpoint);
    document.addEventListener("keydown", onKeyDown);
    onBreakpoint();
    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", onBreakpoint);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      setOverHero(hero ? y < hero.offsetHeight - 40 : false);
      setScrolled(y > 8);
    };
    onScroll();
    setMenuOpen(false);
    setMenuMounted(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [pathname]);

  const current = CURRENT[pathname];
  const deep = overHero && !menuMounted;

  return (
    <div className="site-header" style={{ boxShadow: scrolled && !overHero ? "var(--shadow-sm)" : "none" }}>
      <noscript><style>{`@media (max-width: 1000px) {
        .uvg-header { flex-wrap: wrap; }
        .uvg-header .uvg-nav { display: flex; flex-wrap: wrap; order: 3; width: 100%; }
        .uvg-header .uvg-header-verify { display: inline-flex; }
        .site-menu-btn { display: none; }
      }`}</style></noscript>
      <header ref={headerRef} className={"uvg-header" + (deep ? " uvg-deep" : "")}>
        <Link className="uvg-header-logo" href="/" aria-label="UV Gulf home" onClick={() => close()}>
          <img className="uvg-logo-full" src="/assets/uvgulf-logo.png" alt="UV Gulf Inspection & Training" />
          <img className="uvg-logo-rev" src="/assets/uvgulf-logo-reversed.png" alt="UV Gulf Inspection & Training" />
        </Link>
        <nav className="uvg-nav" aria-label="Main">
          {NAV_ITEMS.map((it) => (
            <Link key={it.label} href={it.href} aria-current={it.label === current ? "page" : undefined}>{it.label}</Link>
          ))}
        </nav>
        <div className="uvg-header-actions">
          <Link className="uvg-header-verify" href="/verify"><Icon name="shield" />Verify certificate</Link>
          <Button variant={deep ? "on-deep" : "primary"} href="/contact" size="sm">Send an enquiry</Button>
          <button ref={toggleRef} type="button" className="site-menu-btn" aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => { setMenuMounted(true); setMenuOpen((o) => !o); }}>
            <Icon name={menuOpen ? "x" : "menu"} size={24} />
          </button>
        </div>
      </header>
      {menuMounted ? (
        <nav ref={panelRef} id="site-menu" className="site-menu" data-lenis-prevent aria-label="Main" inert={!menuOpen} aria-hidden={!menuOpen}>
          {NAV_ITEMS.map((it) => (
            <Link key={it.label} href={it.href} onClick={() => close()} aria-current={it.label === current ? "page" : undefined}>{it.label}</Link>
          ))}
          <Link href="/verify" onClick={() => close()} className="site-menu-verify"><Icon name="shield" size={18} />Verify certificate</Link>
        </nav>
      ) : null}
    </div>
  );
}
