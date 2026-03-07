"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { SCRIPTURE_INTRO } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function ScripturePage() {
  const [zoom, setZoom] = useState(100);

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

      {/* ─── Toolbar ─── */}
      <div className="mt-8 flex flex-wrap items-center gap-1.5">
        <div className="glass-subtle flex items-center gap-1 rounded-lg p-0.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom((z) => Math.max(50, z - 25))}
            className="h-7 gap-1 px-2 text-[12px] text-muted-foreground hover:text-foreground"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(100)}
            className="h-7 gap-1 px-2.5 text-[12px] tabular-nums text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" />
            {zoom}%
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom((z) => Math.min(300, z + 25))}
            className="h-7 gap-1 px-2 text-[12px] text-muted-foreground hover:text-foreground"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
        </div>

        <a href="/beidou-pinyin.pdf" download className="ml-auto">
          <Button
            size="sm"
            className="h-7 gap-1.5 rounded-lg bg-gold px-3 text-[12px] text-background hover:bg-gold-light"
          >
            <Download className="h-3.5 w-3.5" />
            下载 PDF
          </Button>
        </a>
      </div>

      {/* ─── PDF Viewer ─── */}
      <div className="glass mt-3 overflow-hidden rounded-xl">
        <iframe
          key={zoom}
          src={`/beidou-pinyin.pdf#zoom=${zoom}`}
          className="w-full border-0"
          style={{ height: "80vh" }}
          title="《北斗经》简体拼音基础版"
        />
      </div>

      <p className="mt-2 text-center text-[11px] text-muted-foreground/85">
        《北斗经》简体拼音基础版(打印本).pdf — 如无法预览请直接下载
      </p>
    </motion.div>
  );
}
