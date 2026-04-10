"use client";

import { useEffect, useMemo, useState } from "react";
import siteVersion from "@/lib/site-version.json";
import { toChineseNumeral } from "@/lib/chinese-numeral";

function calendarDaysSinceOrigin(originYmd: string, now: Date) {
  const today = now.toLocaleDateString("sv-SE", { timeZone: "Asia/Shanghai" });
  const t0 = Date.parse(`${originYmd}T00:00:00+08:00`);
  const t1 = Date.parse(`${today}T00:00:00+08:00`);
  if (Number.isNaN(t0) || Number.isNaN(t1)) return 0;
  return Math.max(0, Math.floor((t1 - t0) / 86_400_000));
}

/** 关于页「版本」卡片正文（标题与外壳由页面提供） */
export function AboutVersionBlock() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((x) => x + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const days = useMemo(() => {
    void tick;
    return calendarDaysSinceOrigin(siteVersion.originDate, new Date());
  }, [tick]);

  const daysHan = toChineseNumeral(days);

  return (
    <div className="space-y-2 text-[13px] leading-[1.85] text-muted-foreground">
      <p className="text-center text-[13px] leading-[1.85]">
        当前 {siteVersion.semver}
        {siteVersion.buildId ? (
          <>
            {" · "}
            {siteVersion.buildId}
          </>
        ) : null}
      </p>
      <p className="text-center text-[13px] leading-[1.85]">
        本网站始于{siteVersion.originLabel} · 距今{" "}
        <span className="text-gold">{daysHan}</span> 日
      </p>
    </div>
  );
}
