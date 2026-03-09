"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function WujieLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 pt-6 pb-2">
        <nav className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <Link href="/intro" className="transition-colors hover:text-gold">
            道经入门
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
          <span className="text-foreground/90">老君五戒</span>
        </nav>
      </div>

      <article className="mx-auto max-w-3xl px-4 pb-16">{children}</article>
    </div>
  );
}
