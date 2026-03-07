"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getDaoCalendar, type DaoCalendarInfo } from "@/lib/calendar";
import { ABOUT_ORIGIN, ABOUT_THANKS, ABOUT_DISCLAIMER } from "@/lib/data";
import { BookOpen, FileText, FolderOpen, ArrowUpRight } from "lucide-react";

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
    setCal(getDaoCalendar());
  }, []);

  return (
    <div className="min-h-screen">

      {/* ─── Hero ─── */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.75_0.14_75/5%)_0%,transparent_65%)]" />

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="relative font-serif text-3xl font-bold leading-[2.2] tracking-[0.18em] text-gradient-gold sm:text-4xl md:text-5xl"
        >
          诵上圣之金书玉诰
          <br />
          明自己之本性真心
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-5 h-px w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        />
      </section>

      {/* ─── Calendar ─── */}
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
              <div className="text-[11px] tracking-[0.2em] text-muted-foreground">
                道历
              </div>
              <div className="mt-0.5 font-serif text-xl font-bold tracking-wider text-gold md:text-2xl">
                {cal.daoYear} 年
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/[0.03] md:grid-cols-4">
              {[
                { label: "干支年", value: `${cal.yearGanZhi}${cal.zodiac}年` },
                { label: "农历", value: cal.lunarDate },
                { label: "月日", value: `${cal.monthGanZhi}月 ${cal.dayGanZhi}日` },
                { label: "时辰", value: cal.timeZhi },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-background px-3 py-2.5 text-center"
                >
                  <div className="text-[10px] text-muted-foreground/90">
                    {item.label}
                  </div>
                  <div className="mt-px text-[13px] font-medium">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.04] px-5 py-2.5 text-center text-[13px] text-muted-foreground">
              今日道教大事记：
              <span className="text-foreground/95">{cal.todayNote}</span>
            </div>
          </motion.div>
        </section>
      )}

      {/* ─── Navigation Cards ─── */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-6 flex flex-col items-center gap-3"
        >
          <h2 className="font-serif text-xl font-bold tracking-wider text-gold md:text-2xl">
            功能导航
          </h2>
          <div className="flex items-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/35" />
            <span className="text-[10px] text-gold/60">✦</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/35" />
          </div>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "北斗原文",
              desc: "斗经简介、简体拼音版浏览",
              icon: BookOpen,
              href: "/scripture",
            },
            {
              title: "北斗经注",
              desc: "学经当解经意，三家注解汇总",
              icon: FileText,
              href: "/commentary",
            },
            {
              title: "资源集合",
              desc: "诵经修持、基础常识等综合资料",
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
                <p className="mt-1 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
                <ArrowUpRight className="mt-3 h-3 w-3 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── About ─── */}
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
            关于本站
          </h2>
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
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={0}
            className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span className="text-[13px] text-gold/50">⊙</span>
              <h3 className="font-serif text-[12px] font-medium tracking-[0.2em] text-foreground/75">
                缘起
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
            </div>
            <div className="whitespace-pre-line text-[13px] leading-[1.95] text-muted-foreground">
              {ABOUT_ORIGIN}
            </div>
          </motion.div>

          {/* 致谢 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={0.06}
            className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span className="text-[13px] text-gold/50">♡</span>
              <h3 className="font-serif text-[12px] font-medium tracking-[0.2em] text-foreground/75">
                致谢
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
            </div>
            <div className="space-y-2">
              {ABOUT_THANKS.split("\n").filter(Boolean).map((line, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[13px] leading-[1.8] text-muted-foreground">
                  <span className="mt-[0.45em] inline-block h-[3px] w-[3px] shrink-0 rounded-full bg-gold/30" />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 声明 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={0.12}
            className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span className="text-[13px] text-gold/50">◎</span>
              <h3 className="font-serif text-[12px] font-medium tracking-[0.2em] text-foreground/75">
                声明
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
            </div>
            <div className="text-[13px] leading-[1.9] text-muted-foreground">
              {ABOUT_DISCLAIMER}
            </div>
          </motion.div>

          {/* 联系与寄语 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={0.18}
            className="glass rounded-xl border border-gold/[0.12] bg-gradient-to-b from-gold/[0.04] to-gold/[0.01] px-6 py-7 transition-all duration-300 hover:border-gold/20 hover:shadow-[0_8px_30px_-6px_rgba(232,198,120,0.15)]"
          >
            <div className="mb-5 flex items-center gap-2.5">
              <span className="text-[13px] text-gold/50">✦</span>
              <h3 className="font-serif text-[12px] font-medium tracking-[0.2em] text-foreground/75">
                联系
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-gold/[0.15] to-transparent" />
            </div>
            <div className="mb-4 text-center text-[13px] leading-[1.9] text-muted-foreground">
              如有需求和疑问，欢迎联系微信
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

      {/* ─── Footer ─── */}
      <footer className="glass-subtle border-t border-white/[0.04] py-6 text-center text-[11px] text-muted-foreground/85">
        © 2026 神仙种子
      </footer>
    </div>
  );
}
