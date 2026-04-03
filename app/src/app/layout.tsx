import type { Metadata, Viewport } from "next";
import { Noto_Serif_SC } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { PWARegister } from "@/components/pwa-register";
import { MouseCursorGlow } from "@/components/mouse-cursor-glow";
import { SITE_CONFIG } from "@/lib/data";
import "./globals.css";

const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "600", "700"],
  variable: "--font-serif-sc",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#7c6af7",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://sxzz.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE_CONFIG.fullName,
  description: SITE_CONFIG.description,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_CONFIG.name,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#7c6af7",
  },
};

/* ── Deterministic starfield (server-safe, no Math.random) ── */
function frand(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

const STARFIELD = Array.from({ length: 120 }, (_, i) => {
  const inHero = i < 30;
  return {
    x:    inHero ? 20 + frand(i * 3)     * 60 : frand(i * 3)     * 100,
    y:    inHero ? 8  + frand(i * 3 + 1) * 45 : frand(i * 3 + 1) * 100,
    size: i < 70 ? 1 : i < 100 ? 1.5 + frand(i * 5) * 0.6 : 2.4 + frand(i * 5) * 0.7,
    dur:  2.4 + frand(i * 7  + 2) * 2.8,
    del:  frand(i * 11 + 3) * 5.5,
  };
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSerifSC.variable} antialiased`}>

        {/* ── Global star field — fixed, every page ── */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {STARFIELD.map((s, i) => (
            <span
              key={i}
              className="star-dot absolute"
              style={{
                left:              `${s.x}%`,
                top:               `${s.y}%`,
                width:             s.size,
                height:            s.size,
                animationDuration: `${s.dur}s`,
                animationDelay:    `${s.del}s`,
              }}
            />
          ))}
        </div>

        <MouseCursorGlow />
        <SiteHeader />
        <main className="relative z-10">{children}</main>
        <PWARegister />
      </body>
    </html>
  );
}
