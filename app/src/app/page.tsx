"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  getDaoCalendar,
  getDaoistNoteStepsForNow,
  getAllDaoistFixedDates,
  DAOIST_NOTE_MERGE_INTRO,
  type DaoCalendarInfo,
  type DaoistNoteStep,
} from "@/lib/calendar";
import { getChapterOfDay, formatScriptureBySentences } from "@/lib/daodejing";
import { NAV_CARDS } from "@/lib/data";
import { SiteFooter } from "@/components/site-footer";
import { PWAInstallButton } from "@/components/pwa-install-button";
import { FolderOpen, ArrowUpRight, Info, BookMarked, X } from "lucide-react";

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
  const [noteSteps, setNoteSteps] = useState<DaoistNoteStep[]>([]);
  const [showNoteBreakdown, setShowNoteBreakdown] = useState(false);
  const [chapterOfDay, setChapterOfDay] = useState<ReturnType<typeof getChapterOfDay> | null>(null);
  const allFixedDates = useMemo(() => getAllDaoistFixedDates(), []);

  useEffect(() => {
    queueMicrotask(() => {
      const d = new Date();
      setCal(getDaoCalendar(d));
      setNoteSteps(getDaoistNoteStepsForNow(d));
    });
  }, []);

  useEffect(() => {
    if (!showNoteBreakdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowNoteBreakdown(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showNoteBreakdown]);

  useEffect(() => {
    queueMicrotask(() => setChapterOfDay(getChapterOfDay()));
  }, []);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative flex min-h-[45vh] flex-col items-center justify-center px-4 text-center sm:min-h-[60vh]">
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
        <section className="mx-auto max-w-xl px-4 pb-12 sm:pb-20">
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

            <div className="px-4 py-3 text-center">
              <div className="text-[13px] font-medium">
                {cal.lunarYearMonthDay} · {cal.ganZhiMonthDayTime}
              </div>
            </div>

            <div className="border-t border-white/[0.04] px-5 py-2.5 text-center text-[13px] text-muted-foreground">
              {"\u4eca\u65e5\u9053\u95e8\u5927\u4e8b\u8bb0"}
              <br />
              <span className="text-foreground/95">{cal.todayNote}</span>
              <div className="mt-2.5">
                <button
                  type="button"
                  onClick={() => setShowNoteBreakdown(true)}
                  className="rounded-md border border-gold/25 bg-gold/[0.06] px-3 py-1.5 text-[12px] font-medium text-gold/90 transition-colors hover:border-gold/40 hover:bg-gold/10"
                >
                  查看显示列表
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center border-t border-white/[0.04] px-5 py-3 text-center">
              {chapterOfDay ? (
                <>
                  <div className="mb-1.5 text-[13px] font-medium text-foreground/95">
                    随缘读经 · 《道德经》
                    {chapterOfDay.title.replace(/^.+?(第.+)$/, "$1章")}
                  </div>
                  <p className="max-w-[18rem] whitespace-pre-line text-[12px] leading-[1.9] text-muted-foreground">
                    {formatScriptureBySentences(chapterOfDay.content)}
                  </p>
                </>
              ) : (
                <div className="mb-1.5 text-[13px] text-muted-foreground">随缘读经 · 加载中…</div>
              )}
            </div>
          </motion.div>
        </section>
      )}

      {showNoteBreakdown && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="presentation"
        >
          <button
            type="button"
            aria-label="关闭"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={() => setShowNoteBreakdown(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="note-breakdown-title"
            className="glass relative z-10 flex max-h-[min(88vh,640px)] w-full max-w-lg flex-col rounded-t-2xl border border-white/[0.08] shadow-2xl sm:rounded-2xl"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-4 py-3">
              <h2 id="note-breakdown-title" className="font-serif text-base font-bold text-gold">
                今日道门大事记 · 输出说明
              </h2>
              <button
                type="button"
                aria-label="关闭"
                onClick={() => setShowNoteBreakdown(false)}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 text-left text-[13px] leading-relaxed text-muted-foreground">
              <p className="mb-4 text-foreground/90">{DAOIST_NOTE_MERGE_INTRO}</p>
              <p className="mb-2 font-medium text-foreground/95">今日各条规则</p>
              <ul className="mb-5 space-y-2 border-l-2 border-gold/20 pl-3">
                {noteSteps.map((s) => (
                  <li key={s.rule}>
                    <span className={s.matched ? "text-emerald-600/90 dark:text-emerald-400/90" : ""}>
                      {s.matched ? "已命中" : "未命中"}
                    </span>
                    <span className="text-foreground/80"> · {s.rule}</span>
                    {s.line ? (
                      <div className="mt-0.5 text-foreground/95">→ {s.line}</div>
                    ) : null}
                  </li>
                ))}
              </ul>
              <p className="mb-1 font-medium text-foreground/95">当前合成文案</p>
              <p className="mb-5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-foreground/95">
                {cal?.todayNote ?? "—"}
              </p>
              <p className="mb-2 font-medium text-foreground/95">农历月日固定节日全书</p>
              <ul className="space-y-1.5 pb-2 text-[12px]">
                {allFixedDates.map((row) => (
                  <li key={`${row.lunarLabel}-${row.desc}`} className="flex gap-2">
                    <span className="w-16 shrink-0 text-gold/80">{row.lunarLabel}</span>
                    <span>{row.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Cards */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:pb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-4 flex flex-col items-center gap-2 sm:mb-6 sm:gap-3"
        >
          <h2 className="font-serif text-xl font-bold tracking-wider text-gold md:text-2xl">
            {"\u529f\u80fd\u5bfc\u89c8"}
          </h2>
          <div className="flex items-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/35" />
            <span className="text-[10px] text-gold/60">✦</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/35" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
          {NAV_CARDS.map((item, i) => {
            const Icon = { intro: BookMarked, resources: FolderOpen, about: Info }[item.iconKey];
            return (
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
                className="glass-card group relative flex flex-col rounded-xl px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/15 hover:shadow-[0_8px_30px_-6px_rgba(232,198,120,0.12)] sm:p-5 sm:py-4"
              >
                <ArrowUpRight className="absolute right-3 top-3 h-3.5 w-3.5 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold sm:right-4 sm:top-4" />
                <div className="flex items-center gap-2.5 pr-8">
                  <Icon className="h-5 w-5 shrink-0 text-gold/80 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="font-serif text-[15px] font-bold">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-1 text-[13px] leading-[1.6] text-muted-foreground sm:leading-[1.85]">
                  {item.desc}
                </p>
              </Link>
            </motion.div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
          <div className="hidden sm:block" aria-hidden />
          <PWAInstallButton />
          <div className="hidden sm:block" aria-hidden />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
