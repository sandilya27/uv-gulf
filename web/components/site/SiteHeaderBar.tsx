"use client";

// Sticky SiteHeader. Uses the on-deep variant while the page's navy hero is under it,
// and gains shadow-sm once scrolled past it. Below 1000px the nav collapses into a menu.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Icon } from "@/components/ds";
import { NAV_ITEMS } from "@/lib/content";

const CURRENT: Record<string, string> = { "/inspection": "Inspection", "/training": "Training", "/contact": "Contact" };

export function SiteHeaderBar() {
  const pathname = usePathname();
  const [overHero, setOverHero] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      setOverHero(hero ? y < hero.offsetHeight - 40 : false);
      setScrolled(y > 8);
    };
    onScroll();
    setMenuOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [pathname]);

  const current = CURRENT[pathname];
  const deep = overHero && !menuOpen;
  const close = () => setMenuOpen(false);

  return (
    <div className="site-header" style={{ boxShadow: scrolled && !overHero ? "var(--shadow-sm)" : "none" }}>
      <header className={"uvg-header" + (deep ? " uvg-deep" : "")}>
        <Link className="uvg-header-logo" href="/" aria-label="UV Gulf home" onClick={close}>
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
          <button type="button" className="site-menu-btn" aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((o) => !o)}>
            <Icon name={menuOpen ? "x" : "menu"} size={24} />
          </button>
        </div>
      </header>
      {menuOpen ? (
        <nav id="site-menu" className="site-menu" aria-label="Main">
          {NAV_ITEMS.map((it) => (
            <Link key={it.label} href={it.href} onClick={close} aria-current={it.label === current ? "page" : undefined}>{it.label}</Link>
          ))}
          <Link href="/verify" onClick={close} className="site-menu-verify"><Icon name="shield" size={18} />Verify certificate</Link>
        </nav>
      ) : null}
    </div>
  );
}
