import type { Metadata } from "next";
import { Barlow, IBM_Plex_Mono, Saira } from "next/font/google";
import { ChatWidget } from "@/components/site/ChatWidget";
import { SiteFooter } from "@/components/site/Chrome";
import { Motion } from "@/components/site/Motion";
import { SiteHeaderBar } from "@/components/site/SiteHeaderBar";
import { SITE_CONFIG } from "@/lib/content";
import "./globals.css";
import "lenis/dist/lenis.css";

const saira = Saira({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-saira" });
const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-barlow" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  title: { default: "UV Gulf — Inspection & Training", template: "%s · UV Gulf" },
  description: "Third-party inspection, testing, calibration and technical advisory across the Kingdom of Saudi Arabia, and industrial training from Khobar.",
  icons: { icon: "/assets/uvgulf-mark.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={SITE_CONFIG.theme} className={[saira.variable, barlow.variable, plexMono.variable].join(" ")} suppressHydrationWarning>
      <head>
        {/* Hide reveal targets before first paint only when JS will animate them in. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeaderBar />
        <main id="main">{children}</main>
        <SiteFooter />
        {SITE_CONFIG.chatbot ? <ChatWidget /> : null}
        <Motion />
      </body>
    </html>
  );
}
