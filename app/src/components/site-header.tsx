"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "首页", href: "/" },
  { label: "道经入门", href: "/intro" },
  { label: "资源索引", href: "/resources" },
  { label: "关于本站", href: "/about" },
];

function isActive(href: string, pathname: string) {
  const p = pathname.replace(/\/$/, "") || "/";
  const h = href.replace(/\/$/, "") || "/";
  if (h === "/intro") return p === h || p.startsWith("/intro/");
  return p === h;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="glass-header sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02]">
          <span className="text-gold/90 text-lg leading-none">✦</span>
          <span className="font-serif text-base font-semibold tracking-tight md:text-[17px]">
            神仙种子
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-serif rounded-md px-2.5 py-1 text-[15px] tracking-tight transition-all duration-200",
                isActive(item.href, pathname)
                  ? "border border-gold/20 bg-gold/15 font-medium text-gold"
                  : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground/80"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-all duration-200 hover:scale-105 hover:bg-white/[0.04] hover:text-foreground md:hidden"
          aria-label="菜单"
        >
          {menuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="glass-dark border-t md:hidden">
          <nav className="flex flex-col gap-0.5 p-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "font-serif rounded-md px-3 py-2.5 text-[15px] tracking-tight transition-all duration-200",
                  isActive(item.href, pathname)
                    ? "border border-gold/20 bg-gold/15 font-medium text-gold"
                    : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
