"use client";

import { motion } from "framer-motion";
import { SANGUAN_COMMENTARY } from "@/lib/data";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function SanguanCommentaryPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="pt-4">
      <h1 className="font-serif text-2xl font-bold tracking-wider text-gold">
        三官经 · 经文注解
      </h1>
      <p className="prose-beidou mt-4 text-[15px] leading-[1.9] text-muted-foreground">
        以下为注解与导读资源，可在外部网站查阅。
      </p>

      <div className="mt-8">
        {SANGUAN_COMMENTARY.length > 0 ? (
          <div className="space-y-4">
            {SANGUAN_COMMENTARY.map((c) => (
              <motion.div
                key={c.name}
                variants={fadeUp}
                className="glass rounded-xl px-5 py-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-[16px] font-bold">{c.name}</h2>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-subtle group inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/20 hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p variants={fadeUp} className="text-[14px] text-muted-foreground">
            暂无经注资源，后续补充。
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
