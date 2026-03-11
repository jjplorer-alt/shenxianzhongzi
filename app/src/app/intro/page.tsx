"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookMarked, ArrowUpRight, HelpCircle, ChevronDown } from "lucide-react";
import { DAOJING_INTRO_GROUPS, DAOJING_QA, type IntroGroup } from "@/lib/data";
import { cn } from "@/lib/utils";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function IntroPage() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-3xl px-4 py-10"
    >
      <motion.div variants={fadeUp}>
        <h1 className="font-serif text-2xl font-bold tracking-wider text-gold">
          道经入门
        </h1>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
         道教经典浩如烟海，本页展示的均为当下广为流传的典籍，人人皆可阅读。部分经文提供注解和唱诵音频。
        </p>
      </motion.div>

      <motion.section variants={fadeUp} className="mt-10 space-y-8">
        <IntroQASection />
        {DAOJING_INTRO_GROUPS.map((group) => (
          <IntroGroupCard key={group.groupTitle} group={group} />
        ))}
      </motion.section>
    </motion.div>
  );
}

function IntroGroupCard({ group }: { group: IntroGroup }) {
  return (
    <div className="glass overflow-hidden rounded-xl border border-gold/10">
      <div className="border-b border-white/[0.04] px-4 py-3">
        <div className="flex items-center gap-2">
          <BookMarked className="h-4 w-4 shrink-0 text-gold/80" />
          <h2 className="font-serif text-[15px] font-semibold tracking-wide">
            {group.groupTitle}
          </h2>
        </div>
        {group.groupDesc && (
          <p className="mt-1.5 pl-6 text-[12px] leading-relaxed text-muted-foreground/80">
            {group.groupDesc}
          </p>
        )}
      </div>
      <div className="grid gap-1 p-2 sm:grid-cols-2">
        {group.items.map((item) => {
          const isInternal = item.url.startsWith("/");
          const className = "group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-white/[0.04] hover:pl-4";
          const content = (
            <>
              <div className="min-w-0 flex-1">
                <span className="text-[13px] text-muted-foreground transition-colors group-hover:text-foreground">
                  {item.title}
                </span>
                {item.desc && (
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground/70">
                    {item.desc}
                  </p>
                )}
              </div>
              <ArrowUpRight className="h-3 w-3 shrink-0 text-muted-foreground/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
            </>
          );
          return isInternal ? (
            <Link key={item.title} href={item.url} className={className}>
              {content}
            </Link>
          ) : (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {content}
            </a>
          );
        }        )}
      </div>
    </div>
  );
}

function IntroQASection() {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="glass overflow-hidden rounded-xl border border-gold/10">
      <button
        type="button"
        onClick={() => setIsSectionOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-3 border-b border-white/[0.04] px-4 py-3 text-left transition-colors hover:bg-white/[0.03]"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 shrink-0 text-gold/80" />
            <h2 className="font-serif text-[15px] font-semibold tracking-wide">
              常见问题
            </h2>
          </div>
          <p className="mt-1.5 pl-6 text-[12px] leading-relaxed text-muted-foreground/80">
            初学道经时常遇的疑问，点击可展开和折叠。
          </p>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform duration-200",
            isSectionOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isSectionOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="divide-y divide-white/[0.04]">
              {DAOJING_QA.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="group">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.03]"
                    >
                      <span className="text-[13px] text-muted-foreground transition-colors group-hover:text-foreground">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/[0.04] bg-white/[0.02] px-4 pb-4 pt-2 pl-6">
                            <p className="text-[13px] leading-[1.85] text-muted-foreground">
                              {item.a.map((part, j) =>
                                "t" in part ? (
                                  <span key={j}>{part.t}</span>
                                ) : part.href.startsWith("/") ? (
                                  <Link
                                    key={j}
                                    href={part.href}
                                    className="text-gold/90 underline decoration-gold/30 underline-offset-2 transition-colors hover:text-gold"
                                  >
                                    {part.l}
                                  </Link>
                                ) : (
                                  <a
                                    key={j}
                                    href={part.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gold/90 underline decoration-gold/30 underline-offset-2 transition-colors hover:text-gold"
                                  >
                                    {part.l}
                                  </a>
                                )
                              )}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
