"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { COMMENTATORS } from "@/lib/data";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function IntroBeidouCommentaryPage() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="pt-4"
    >
      <h1 className="font-serif text-2xl font-bold tracking-wider text-gold">
        经文注解
      </h1>
      <p className="prose-beidou mt-4 text-[15px] leading-[1.9] text-muted-foreground">
        学经当解经意。以下汇总历代三位注家对《太上玄灵北斗本命延生真经》的注解，可在外部网站查阅全文。
      </p>

      <div className="mt-8 space-y-4">
        {COMMENTATORS.map((c) => (
          <motion.div
            key={c.name}
            variants={fadeUp}
            className="glass rounded-xl px-5 py-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-[16px] font-bold">{c.name}</h2>
              <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[12px] text-muted-foreground">
                {c.links.length} 处
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle group inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/20 hover:shadow-[0_2px_12px_-2px_rgba(232,198,120,0.08)] hover:text-foreground"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
