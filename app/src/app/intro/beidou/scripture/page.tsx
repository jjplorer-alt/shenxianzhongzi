"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/lazy-image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const NUM_PAGES = 16;

export default function IntroBeidouScripturePage() {
  const [page, setPage] = useState(0);
  const pdfUrl = `${basePath}/beidou-pinyin.pdf`;

  const goPrev = useCallback(() => {
    setPage((p) => (p > 0 ? p - 1 : p));
  }, []);
  const goNext = useCallback(() => {
    setPage((p) => (p < NUM_PAGES - 1 ? p + 1 : p));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="pt-4"
    >
      <h1 className="font-serif text-2xl font-bold tracking-wider text-gold">
        经文原文
      </h1>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <a href={pdfUrl} download>
          <Button
            size="sm"
            className="h-8 gap-1.5 rounded-lg bg-gold px-4 text-[13px] text-background hover:bg-gold-light"
          >
            <Download className="h-4 w-4" />
            下载 PDF
          </Button>
        </a>
      </div>

      {/* 分页阅读器 */}
      <div className="mt-8 overflow-hidden rounded-xl glass">
        <div className="relative aspect-[595/842] w-full bg-muted/20">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <LazyImage
                src={`${basePath}/beidou-pages/page-${page + 1}.webp`}
                alt={`《北斗经》第 ${page + 1} 页`}
                priority
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 页码导航 */}
        <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-3">
          <button
            onClick={goPrev}
            disabled={page === 0}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-[14px] text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            上一页
          </button>
          <span className="font-serif text-[14px] text-muted-foreground">
            第 {page + 1} / {NUM_PAGES} 页
          </span>
          <button
            onClick={goNext}
            disabled={page === NUM_PAGES - 1}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-[14px] text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
          >
            下一页
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-3 text-center text-[12px] text-muted-foreground/80">
        《北斗经》简体拼音版 · 支持键盘 ← → 翻页
      </p>
    </motion.div>
  );
}
