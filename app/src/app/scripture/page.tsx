"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";
import { SCRIPTURE_INTRO } from "@/lib/data";
import { Button } from "@/components/ui/button";

const PdfViewer = dynamic(() => import("@/components/pdf-viewer").then((m) => ({ default: m.PdfViewer })), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">加载中…</div>
  ),
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function ScripturePage() {
  const [zoom, setZoom] = useState(100);
  const [fitWidth, setFitWidth] = useState(false);
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFitWidth((f) => !f)}
            className={`h-7 gap-1 px-2 text-[12px] hover:text-foreground ${fitWidth ? "text-gold" : "text-muted-foreground"}`}
            title="自适应页面宽度"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            自适应
          </Button>
        </div>

        <a href={pdfUrl} download className="ml-auto">
          <Button
            size="sm"
            className="h-7 gap-1.5 rounded-lg bg-gold px-3 text-[12px] text-background hover:bg-gold-light"
          >
            <Download className="h-3.5 w-3.5" />
            下载 PDF
          </Button>
        </a>
      </div>

      {/* ─── PDF Viewer (PDF.js 渲染，支持移动端阅读) ─── */}
      <div className="glass mt-3 overflow-hidden rounded-xl" style={{ minHeight: "80vh" }}>
        <PdfViewer src={pdfUrl} scale={zoom / 100} fitWidth={fitWidth} className="max-h-[80vh]" />
      </div>

      <p className="mt-2 text-center text-[11px] text-muted-foreground/85">
        《北斗经》简体拼音基础版(打印本).pdf — 支持手机端在线阅读
      </p>
    </motion.div>
  );
}
