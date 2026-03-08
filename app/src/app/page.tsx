"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getDaoCalendar, type DaoCalendarInfo } from "@/lib/calendar";
import { ABOUT_ORIGIN, ABOUT_THANKS, ABOUT_DISCLAIMER } from "@/lib/data";
import { BookOpen, FileText, FolderOpen, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Home() {
  const [cal, setCal] = useState<DaoCalendarInfo | null>(null);

  useEffect(() => {
    queueMicrotask(() => setCal(getDaoCalendar()));
  }, []);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.75_0.14_75/5%)_0%,transparent_65%)]" />

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="relative font-serif text-3xl font-bold leading-[2.2] tracking-[0.18em] text-gradient-gold sm:text-4xl md:text-5xl"
        >
          {"\u8bf5\u4e0a\u5723\u4e4b\u91d1\u4e66\u7389\u8bf0"}
          <br />
          {"\u660e\u81ea\u5df1\u4e4b\u672c\u6027\u771f\u5fc3"}
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-5 h-px w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        />
      </section>

      {/* Calendar */}
      {cal && (
        <section className="mx-auto max-w-xl px-4 pb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="glass overflow-hidden rounded-xl transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]"
          >
            <div className="border-b border-white/[0.04] px-5 py-4 text-center">
              <div className="font-serif text-xl font-bold tracking-wider text-gold md:text-2xl">
                {"\u9053\u5386"} {cal.daoYear} {"\u5e74"}
              </div>
            </div>

            <div className="grid grid-cols-2">
              {[
                cal.lunarYearMonthDay,
                cal.ganZhiMonthDayTime,
              ].map((value, i) => (
                <div
                  key={i}
                  className={cn(
                    "px-3 py-2.5 text-center",
                    i === 0 && "border-r border-white/[0.04]"
                  )}
                >
                  <div className="text-[13px] font-medium">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.04] px-5 py-2.5 text-center text-[13px] text-muted-foreground">
              {"\u4eca\u65e5\u9053\u6559\u5927\u4e8b\u8bb0\uff1a"}
              <span className="text-foreground/95">{cal.todayNote}</span>
            </div>
          </motion.div>
        </section>
      )}

      {/* Navigation Cards */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-6 flex flex-col items-center gap-3"
        >
          <h2 className="font-serif text-xl font-bold tracking-wider text-gold md:text-2xl">
            {"\u529f\u80fd\u5bfc\u89c8"}
          </h2>
          <div className="flex items-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/35" />
            <span className="text-[10px] text-gold/60">{"\u25c6"}</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/35" />
          </div>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "\u5317\u6597\u539f\u6587",
              desc: "\u5317\u6597\u7ecf\u7b80\u4ecb\u3001\u7b80\u4f53\u62a2\u97f3\u7248\u6d4f\u89c8",
              icon: BookOpen,
              href: "/scripture",
            },
            {
              title: "\u5317\u6597\u7ecf\u6ce8",
              desc: "\u5b66\u7ecf\u5f53\u89e3\u7ecf\u610f\uff0c\u4e09\u5bb6\u6ce8\u89e3\u6c47\u603b",
              icon: FileText,
              href: "/commentary",
            },
            {
              title: "\u8d44\u6e90\u7d22\u5f15",
              desc: "\u8bf5\u7ecf\u4fee\u6301\u3001\u57fa\u7840\u5e38\u8bc6\u7b49\u7efc\u5408\u8d44\u6599",
              icon: FolderOpen,
              href: "/resources",
            },
          ].map((item, i) => (
            <motion.div
              key={item.href}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i * 0.06}
            >
              <Link
                href={item.href}
                className="glass-card group flex h-full flex-col rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/15 hover:shadow-[0_8px_30px_-6px_rgba(232,198,120,0.12)]"
              >
                <item.icon className="mb-2.5 h-5 w-5 text-gold/80 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-serif text-[15px] font-bold">
                  {item.title}
                </h3>
                <p className="mt-1 flex-1 text-[13px] leading-[1.85] text-muted-foreground">
                  {item.desc}
                </p>
                <ArrowUpRight className="mt-3 h-3 w-3 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-2xl px-4 pb-24">

        {/* Section heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10 flex flex-col items-center gap-3"
        >
          <h2 className="font-serif text-xl font-bold tracking-wider text-gold md:text-2xl">
            {"\u5173\u4e8e\u672c\u7ad9"}
          </h2>
          <div className="flex items-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/35" />
            <span className="text-[10px] text-gold/60">{"\u25c6"}</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/35" />
          </div>
        </motion.div>

        <div className="space-y-3">

          {/* ?? */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={0}
            className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span className="text-[13px] text-gold/50">{"\u2726"}</span>
              <h3 className="font-serif text-[12px] font-medium tracking-[0.2em] text-foreground/75">
                {"\u7f18\u8d77"}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
            </div>
            <div className="whitespace-pre-line text-[13px] leading-[1.85] text-muted-foreground">
              {ABOUT_ORIGIN}
            </div>
          </motion.div>

          {/* ?? */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={0.06}
            className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span className="text-[13px] text-gold/50">{"\u2726"}</span>
              <h3 className="font-serif text-[12px] font-medium tracking-[0.2em] text-foreground/75">
                {"\u81f4\u8c22"}
              </h3>
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

          {/* ?? */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={0.12}
            className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span className="text-[13px] text-gold/50">{"\u2726"}</span>
              <h3 className="font-serif text-[12px] font-medium tracking-[0.2em] text-foreground/75">
                {"\u58f0\u660e"}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
            </div>
            <div className="text-[13px] leading-[1.85] text-muted-foreground">
              {ABOUT_DISCLAIMER}
            </div>
          </motion.div>

          {/* ?? */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={0.18}
            className="glass rounded-xl border border-gold/[0.12] bg-gradient-to-b from-gold/[0.04] to-gold/[0.01] px-6 py-7 transition-all duration-300 hover:border-gold/20 hover:shadow-[0_8px_30px_-6px_rgba(232,198,120,0.15)]"
          >
            <div className="mb-5 flex items-center gap-2.5">
              <span className="text-[13px] text-gold/50">{"\u2726"}</span>
              <h3 className="font-serif text-[12px] font-medium tracking-[0.2em] text-foreground/75">
                {"\u8054\u7cfb"}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-gold/[0.15] to-transparent" />
            </div>
            <div className="mb-4 text-center text-[13px] leading-[1.85] text-muted-foreground">
              {"\u5982\u6709\u9700\u6c42\u548c\u7591\u95ee\uff0c\u6b22\u8fce\u8054\u7cfb\u5fae\u4fe1"}
              <span className="mx-1.5 inline-block rounded-md border border-gold/[0.2] bg-gold/[0.06] px-2 py-0.5 font-mono text-[12px] tracking-wide text-gold/70">
                rushui13579
              </span>
            </div>
            <div className="border-t border-gold/[0.08] pt-4 text-center font-serif text-[12px] italic tracking-widest text-muted-foreground/85">
              {"\u613f\u6b64\u4e00\u7ad9\uff0c\u4fbf\u5229\u6709\u7f18"}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <footer className="glass-subtle border-t border-white/[0.04] py-6 text-center text-[11px] text-muted-foreground/85">
        {"\u00a9 2026 \u795e\u4ed9\u79cd\u5b50"}
      </footer>
    </div>
  );
}
