"use client";

import { motion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import { BEIDOU_AUDIO_MENG } from "@/lib/data";

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

export default function IntroBeidouAudioPage() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="pt-4"
    >
      <h1 className="font-serif text-2xl font-bold tracking-wider text-gold">
        诵经音频
      </h1>
      <p className="prose-beidou mt-4 text-[15px] leading-[1.9] text-muted-foreground">
        跟随道长诵念，有助于熟悉腔调与节奏。以下为孟圆辉道长诵念《太上玄灵北斗本命延生真经》的音视频链接。
      </p>

      <div className="mt-8 space-y-3">
        <h2 className="font-serif text-[16px] font-semibold text-gold/90">
          孟圆辉道长《北斗经》
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {BEIDOU_AUDIO_MENG.map((item) => (
            <motion.a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              className="glass-card group flex items-center gap-3 rounded-xl px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/15 hover:shadow-[0_6px_24px_-6px_rgba(232,198,120,0.1)]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 transition-transform duration-300 group-hover:scale-110">
                <Play className="h-5 w-5 text-gold" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-medium">{item.title}</div>
                <div className="text-[12px] text-muted-foreground">
                  {item.platform}
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
