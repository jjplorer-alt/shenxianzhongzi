"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { SCRIPTURE_INTRO } from "@/lib/data";
import { Button } from "@/components/ui/button";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const NUM_PAGES = 16;

export default function ScripturePage() {
  const pdfUrl = `${basePath}/beidou-pinyin.pdf`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      className="mx-auto max-w-4xl px-4 py-10"
    >
      <h1 className="font-serif text-2xl font-bold tracking-wider">
        北斗原文
      </h1>

      <div className="mt-3 whitespace-pre-line text-[13px] leading-[1.9] text-muted-foreground">
        {SCRIPTURE_INTRO}
      </div>

      {/* ─── 下载 PDF ─── */}
      <div className="mt-8 flex justify-end">
        <a href={pdfUrl} download>
          <Button
            size="sm"
            className="h-7 gap-1.5 rounded-lg bg-gold px-3 text-[12px] text-background hover:bg-gold-light"
          >
            <Download className="h-3.5 w-3.5" />
            下载 PDF
          </Button>
        </a>
      </div>

      {/* ─── 图片展示（快速加载） ─── */}
      <div className="glass mt-3 overflow-hidden rounded-xl" style={{ minHeight: "80vh" }}>
        <div className="max-h-[80vh] overflow-auto p-4">
          {Array.from({ length: NUM_PAGES }, (_, i) => (
            <div key={i} className="mb-4 last:mb-0">
              <img
                src={`${basePath}/beidou-pages/page-${i + 1}.png`}
                alt={`《北斗经》第 ${i + 1} 页`}
                className="w-full max-w-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-2 text-center text-[11px] text-muted-foreground/85">
        《北斗经》简体拼音基础版(打印本) — 图片展示，加载更快
      </p>
    </motion.div>
  );
}
