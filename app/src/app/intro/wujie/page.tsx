"use client";

import { motion } from "framer-motion";
import { LAOJUN_WUJIE_CONTENT } from "@/lib/data";

export default function WujiePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      className="pt-6"
    >
      <h1 className="font-serif text-2xl font-bold tracking-wider text-gold">
        老君五戒
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
        太上老君传授的基本戒律，杀、盗、淫、妄、酒五戒，为出家在家共守。
      </p>

      <div className="prose-beidou mt-8 whitespace-pre-line text-muted-foreground">
        {LAOJUN_WUJIE_CONTENT}
      </div>
    </motion.div>
  );
}
