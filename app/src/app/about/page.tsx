"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import { ABOUT_ORIGIN, ABOUT_THANKS, ABOUT_DISCLAIMER, ABOUT_COLLABORATORS } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function AboutPage() {
  const [originExpanded, setOriginExpanded] = useState(true);

  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-2xl px-4 py-10 pb-24">
        {/* Section heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-10 flex flex-col items-center gap-3"
        >
          <h1 className="font-serif text-2xl font-bold tracking-wider text-gold md:text-3xl">
            关于本站
          </h1>
          <div className="flex items-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/35" />
            <span className="text-[10px] text-gold/60">✦</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/35" />
          </div>
        </motion.div>

        <div className="space-y-3">
          {/* 缘起 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.05}
            className="glass rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]"
          >
            <button
              type="button"
              onClick={() => setOriginExpanded((v) => !v)}
              aria-expanded={originExpanded}
              aria-controls="origin-content"
              id="origin-toggle"
              className="flex w-full items-center gap-2.5 p-6 pb-4 text-left transition-colors hover:bg-white/[0.02]"
            >
              <span className="text-[13px] text-gold/50">{"\u2726"}</span>
              <h2 className="font-serif text-[12px] font-medium tracking-[0.2em] text-foreground/75">
                缘起
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 shrink-0 text-muted-foreground/70 transition-transform duration-200",
                  originExpanded && "rotate-180"
                )}
                aria-hidden
              />
            </button>
            <AnimatePresence initial={false}>
              {originExpanded && (
                <motion.div
                  id="origin-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0 whitespace-pre-line text-[13px] leading-[1.85] text-muted-foreground">
                    {ABOUT_ORIGIN}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 致谢 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span className="text-[13px] text-gold/50">{"\u2726"}</span>
              <h2 className="font-serif text-[12px] font-medium tracking-[0.2em] text-foreground/75">
                致谢
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
            </div>
            <div className="space-y-2">
              {ABOUT_THANKS.split("\n").filter(Boolean).map((line, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[13px] leading-[1.85] text-muted-foreground">
                  <span className="inline-block h-[3px] w-[3px] shrink-0 rounded-full bg-gold/30" />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 声明 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span className="text-[13px] text-gold/50">{"\u2726"}</span>
              <h2 className="font-serif text-[12px] font-medium tracking-[0.2em] text-foreground/75">
                声明
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
            </div>
            <p className="text-[13px] leading-[1.85] text-muted-foreground">
              {ABOUT_DISCLAIMER}
            </p>
          </motion.div>

          {/* 共创共建名单 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span className="text-[13px] text-gold/50">{"\u2726"}</span>
              <h2 className="font-serif text-[12px] font-medium tracking-[0.2em] text-foreground/75">
                共创共建名单
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
            </div>
            {ABOUT_COLLABORATORS.length > 0 ? (
              <div className="space-y-2">
                {ABOUT_COLLABORATORS.map((c, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap items-baseline gap-2 text-[13px] leading-[1.85] text-muted-foreground"
                  >
                    <span className="inline-block h-[3px] w-[3px] shrink-0 rounded-full bg-gold/30" />
                    <span className="font-medium text-foreground/85">{c.name}</span>
                    {c.role && (
                      <span className="text-[12px] text-muted-foreground/80">· {c.role}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] leading-[1.85] text-muted-foreground/70">
                星星之火可以燎原，期待更多有缘人加入，共同完善本站内容。
                若本站引用了您的内容，或您为本站提供素材、纠正BUG、提供建议和帮助，在此郑重邀请您将名字收录于此，以表感谢和纪念。您也可以加一些简短的身份介绍，宣传您的道文化内容账号、组织机构，促进大家的联络互通。若您想保持神秘，亦可留一简短化名。
              </p>
            )}
          </motion.div>

          {/* 联系 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.25}
            className="glass rounded-xl border border-gold/[0.12] bg-gradient-to-b from-gold/[0.04] to-gold/[0.01] px-6 py-7 transition-all duration-300 hover:border-gold/20 hover:shadow-[0_8px_30px_-6px_rgba(232,198,120,0.15)]"
          >
            <div className="mb-5 flex items-center gap-2.5">
              <span className="text-[13px] text-gold/50">{"\u2726"}</span>
              <h2 className="font-serif text-[12px] font-medium tracking-[0.2em] text-foreground/75">
                联系
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-gold/[0.15] to-transparent" />
            </div>
            <div className="mb-4 text-center text-[13px] leading-[1.85] text-muted-foreground">
              如有需求、疑问、建议，如愿提供素材、共创内容，欢迎联系微信
              <span className="mx-1.5 inline-block rounded-md border border-gold/[0.2] bg-gold/[0.06] px-2 py-0.5 font-mono text-[12px] tracking-wide text-gold/70">
                rushui13579
              </span>
            </div>
            <div className="border-t border-gold/[0.08] pt-4 text-center font-serif text-[12px] italic tracking-widest text-muted-foreground/85">
              愿此一站，便利有缘
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
