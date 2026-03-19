"use client";

import { motion } from "framer-motion";

export default function WantanScripturePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="pt-4"
    >
      <h1 className="font-serif text-2xl font-bold tracking-wider text-gold">
        晚坛功课经 · 经文原文
      </h1>
      <p className="prose-beidou mt-4 text-[15px] leading-[1.9] text-muted-foreground">
        资料搜集中、暂不提供
      </p>
    </motion.div>
  );
}
