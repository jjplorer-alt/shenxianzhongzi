"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CHAOZHEN_SCRIPTURE_LINKS } from "@/lib/data";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ChaozhenScripturePage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="pt-4">
      <h1 className="font-serif text-2xl font-bold tracking-wider text-gold">
        朝真发愿忏悔文 · 原文链接
      </h1>
      <p className="prose-beidou mt-4 text-[15px] leading-[1.9] text-muted-foreground">
        以下为外部网站在线阅读链接，点击进入查阅全文。
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {CHAOZHEN_SCRIPTURE_LINKS.map((link) => (
          <motion.a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            className="glass-subtle group inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/20 hover:shadow-[0_2px_12px_-2px_rgba(232,198,120,0.08)] hover:text-foreground"
          >
            {link.label}
            <ArrowUpRight className="h-3 w-3 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
