"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, StickyNote, ArrowUpRight } from "lucide-react";
import { NANHUA_DAO_REN_JIA_SCRIPTURE_URL } from "@/lib/data";

const cardClass =
  "glass-card group flex h-full flex-col rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/15 hover:shadow-[0_8px_30px_-6px_rgba(232,198,120,0.12)]";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function IntroNanhuaPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      className="pt-6"
    >
      <h1 className="font-serif text-2xl font-bold tracking-wider text-gold">
        道经入门 · 南华真经（庄子）
      </h1>
      <p className="prose-beidou mt-3 text-[15px] leading-relaxed text-muted-foreground">
        原名《庄子》，战国庄周学派著作集；唐代尊为道教四子真经之一，敕封庄周为南华真人，故称《南华真经》。郭象注本三十三篇，分内篇、外篇、杂篇。本站正文链接采用道人家「中华道藏」已校对文本。
      </p>

      <div className="mt-12">
        <h2 className="font-serif text-lg font-semibold tracking-wide text-gold/90">
          子栏目
        </h2>
        <div className="mt-3 flex gap-2">
          <div className="h-px flex-1 self-center bg-gradient-to-r from-gold/25 to-transparent" />
          <span className="text-[10px] text-gold/50">{"\u2726"}</span>
          <div className="h-px flex-1 self-center bg-gradient-to-l from-gold/25 to-transparent" />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <a
              href={NANHUA_DAO_REN_JIA_SCRIPTURE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClass}
            >
              <div className="mb-2.5 flex items-center gap-2.5">
                <BookOpen className="h-5 w-5 shrink-0 text-gold/80 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-serif text-[15px] font-bold">经文原文</h3>
              </div>
              <p className="mt-1 flex-1 text-[14px] leading-[1.8] text-muted-foreground">
                《南华真经》全文目录与在线阅读（道人家 · 中华道藏）
              </p>
              <ArrowUpRight className="mt-3 h-3 w-3 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.08}
          >
            <Link href="/intro/nanhua/notes" className={cardClass}>
              <div className="mb-2.5 flex items-center gap-2.5">
                <StickyNote className="h-5 w-5 shrink-0 text-gold/80 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-serif text-[15px] font-bold">读书笔记</h3>
              </div>
              <p className="mt-1 flex-1 text-[14px] leading-[1.8] text-muted-foreground">
                本站粉丝精心整理的庄子读书笔记（微信公众号文章）
              </p>
              <ArrowUpRight className="mt-3 h-3 w-3 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
