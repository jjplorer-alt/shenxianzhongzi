"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { COMMENTATORS } from "@/lib/data";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function CommentaryPage() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-3xl px-4 py-10"
    >
      <motion.div variants={fadeUp}>
        <h1 className="font-serif text-2xl font-bold tracking-wider text-gold">
          北斗经注
        </h1>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          学经当解经意。以下汇总历代三位注家对《太上玄灵北斗本命延生真经》的注解，可在外部网站查阅全文。
        </p>
      </motion.div>

      <div className="mt-8 space-y-3">
        {COMMENTATORS.map((c) => (
          <motion.div
            key={c.name}
            variants={fadeUp}
            className="glass rounded-xl px-5 py-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-[15px] font-bold">{c.name}</h2>
              <span className="rounded-full bg-white/[0.06] px-1.5 py-px text-[11px] text-muted-foreground">
                {c.links.length} 处
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {c.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle group inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[13px] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/20 hover:shadow-[0_2px_12px_-2px_rgba(232,198,120,0.08)] hover:text-foreground"
                >
                  {link.label}
                  <ArrowUpRight className="h-2.5 w-2.5 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
