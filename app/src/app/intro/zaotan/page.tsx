"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, FileText, Music, ArrowUpRight } from "lucide-react";
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const SUB_PAGES = [
  { title: "经文原文", desc: "在线阅读链接汇总", href: "/intro/zaotan/scripture", icon: BookOpen },
  { title: "经文注解", desc: "注解与导读", href: "/intro/zaotan/commentary", icon: FileText },
  { title: "诵经音频", desc: "跟随道长诵念", href: "/intro/zaotan/audio", icon: Music },
];

export default function ZaotanPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      className="pt-6"
    >
      <h1 className="font-serif text-2xl font-bold tracking-wider text-gold">
        道经入门 · 早坛功课经
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
      全称《太上玄门日诵早坛功课经》，于卯时（5-7点）讽诵，重在启迪道心、亲近仙真。
      </p>

      <div className="mt-12">
        <h2 className="font-serif text-lg font-semibold tracking-wide text-gold/90">
          子栏目
        </h2>
        <div className="mt-3 flex gap-2">
          <div className="h-px flex-1 self-center bg-gradient-to-r from-gold/25 to-transparent" />
          <span className="text-[10px] text-gold/50">◆</span>
          <div className="h-px flex-1 self-center bg-gradient-to-l from-gold/25 to-transparent" />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {SUB_PAGES.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.href}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i * 0.08}
              >
                <Link
                  href={item.href}
                  className="glass-card group flex h-full flex-col rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/15 hover:shadow-[0_8px_30px_-6px_rgba(232,198,120,0.12)]"
                >
                  <div className="mb-2.5 flex items-center gap-2.5">
                    <Icon className="h-5 w-5 shrink-0 text-gold/80 transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="font-serif text-[15px] font-bold">{item.title}</h3>
                  </div>
                  <p className="mt-1 flex-1 text-[14px] leading-[1.8] text-muted-foreground">
                    {item.desc}
                  </p>
                  <ArrowUpRight className="mt-3 h-3 w-3 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
