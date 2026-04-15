"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, BookOpen, StickyNote } from "lucide-react";
import { NANHUA_DAO_REN_JIA_SCRIPTURE_URL } from "@/lib/data";
import { cn } from "@/lib/utils";

const subNavClass = (active: boolean) =>
  cn(
    "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-[14px] font-medium transition-all duration-200",
    active
      ? "border-gold/25 bg-gold/15 text-gold"
      : "border-transparent text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
  );

export default function NanhuaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isIndex = pathname?.replace(/\/$/, "") === "/intro/nanhua";
  const notesActive = pathname?.startsWith("/intro/nanhua/notes") ?? false;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 pt-6 pb-2">
        <nav className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <Link href="/intro" className="transition-colors hover:text-gold">
            道经入门
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
          {isIndex ? (
            <span className="text-foreground/90">南华真经</span>
          ) : (
            <Link href="/intro/nanhua" className="transition-colors hover:text-gold">
              南华真经
            </Link>
          )}
        </nav>

        {!isIndex && (
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={NANHUA_DAO_REN_JIA_SCRIPTURE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={subNavClass(false)}
            >
              <BookOpen className="h-4 w-4" />
              经文原文
            </a>
            <Link
              href="/intro/nanhua/notes"
              className={subNavClass(notesActive)}
            >
              <StickyNote className="h-4 w-4" />
              读书笔记
            </Link>
          </div>
        )}
      </div>

      <article className="mx-auto max-w-3xl px-4 pb-16">{children}</article>
    </div>
  );
}
