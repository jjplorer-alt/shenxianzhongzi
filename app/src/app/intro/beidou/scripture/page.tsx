"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function IntroBeidouScripturePage() {
  const pdfUrl = `${basePath}/beidou-pinyin.pdf`;

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

      <div className="mt-6 flex flex-col gap-6">
        <a href={pdfUrl} download>
          <Button
            size="sm"
            className="h-10 gap-2 rounded-lg bg-gold px-5 text-sm text-background hover:bg-gold-light"
          >
            <Download className="h-5 w-5" />
            下载 PDF
          </Button>
        </a>
        <p className="text-[14px] text-muted-foreground">
          《北斗经》简体拼音版，请下载后在本地阅读。
        </p>
      </div>
    </motion.div>
  );
}
