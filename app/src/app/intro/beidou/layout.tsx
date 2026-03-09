"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, BookOpen, FileText, Music } from "lucide-react";
import { cn } from "@/lib/utils";

const SUB_NAV = [
  { label: "经文原文", href: "/intro/beidou/scripture", icon: BookOpen },
  { label: "经文注解", href: "/intro/beidou/commentary", icon: FileText },
  { label: "诵经音频", href: "/intro/beidou/audio", icon: Music },
];

export default function BeidouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isIndex = pathname?.replace(/\/$/, "") === "/intro/beidou";

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 pt-6 pb-2">
        {/* 面包屑 */}
        <nav className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <Link href="/intro" className="transition-colors hover:text-gold">
            道经入门
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
          {isIndex ? (
            <span className="text-foreground/90">北斗经</span>
          ) : (
            <Link href="/intro/beidou" className="transition-colors hover:text-gold">
              北斗经
            </Link>
          )}
        </nav>

        {/* 子栏目导航 — 仅子页面显示 */}
        {!isIndex && (
          <div className="mt-4 flex gap-2">
            {SUB_NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[14px] font-medium transition-all duration-200",
                    active
                      ? "bg-gold/15 text-gold border border-gold/25"
                      : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground border border-transparent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* 主内容 — 阅读优化的最大宽度 */}
      <article className="mx-auto max-w-3xl px-4 pb-16">
        {children}
      </article>
    </div>
  );
}
