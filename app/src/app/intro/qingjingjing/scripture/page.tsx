"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { QINGJING_SCRIPTURE_LINKS } from "@/lib/data";

export default function QingjingjingScripturePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-4"
    >
      <h1 className="font-serif text-2xl font-bold tracking-wider text-gold">
        经文原文
      </h1>
      <p className="prose-beidou mt-4 text-[15px] leading-[1.9] text-muted-foreground">
        《太上老君说常清静经》全文约四百字，可在以下平台在线阅读。
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {QINGJING_SCRIPTURE_LINKS.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-subtle group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[14px] font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/20 hover:shadow-[0_2px_12px_-2px_rgba(232,198,120,0.08)] hover:text-foreground"
          >
            {link.label}
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
          </a>
        ))}
      </div>
    </motion.div>
  );
}
