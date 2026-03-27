"use client";

import { Solar } from "lunar-javascript";

const CN = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

export interface DaoCalendarInfo {
  daoYear: string;
  /** 农历年月日合并：甲辰龙年正月十五 */
  lunarYearMonthDay: string;
  /** 干支月日时合并：丙寅月 甲子日 子时 */
  ganZhiMonthDayTime: string;
  todayNote: string;
}

function numToCN(n: number): string {
  return String(n)
    .split("")
    .map((d) => CN[+d])
    .join("");
}

/** 道教八节：立春、春分、立夏、夏至、立秋、秋分、立冬、冬至 */
const BA_JIE = new Set(["立春", "春分", "立夏", "夏至", "立秋", "秋分", "立冬", "冬至"]);

function getBaJieNote(solar: InstanceType<typeof Solar>, lunar: { getPrevJieQi: () => { getName: () => string; getSolar: () => InstanceType<typeof Solar> }; getNextJieQi: () => { getName: () => string; getSolar: () => InstanceType<typeof Solar> } }): string | null {
  const todayY = solar.getYear();
  const todayM = solar.getMonth();
  const todayD = solar.getDay();
  const prev = lunar.getPrevJieQi();
  const next = lunar.getNextJieQi();
  const prevSolar = prev.getSolar();
  const nextSolar = next.getSolar();
  if (
    prevSolar.getYear() === todayY &&
    prevSolar.getMonth() === todayM &&
    prevSolar.getDay() === todayD &&
    BA_JIE.has(prev.getName())
  ) {
    return prev.getName() + "（八节）";
  }
  if (
    nextSolar.getYear() === todayY &&
    nextSolar.getMonth() === todayM &&
    nextSolar.getDay() === todayD &&
    BA_JIE.has(next.getName())
  ) {
    return next.getName() + "（八节）";
  }
  return null;
}

export function getDaoCalendar(date: Date = new Date()): DaoCalendarInfo {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();
  const daoYear = date.getFullYear() + 2697;

  return {
    daoYear: numToCN(daoYear),
    lunarYearMonthDay: `${lunar.getYearInGanZhi()}${lunar.getYearShengXiao()}年 ${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`,
    ganZhiMonthDayTime: `${lunar.getMonthInGanZhiExact()}月 ${lunar.getDayInGanZhi()}日 ${lunar.getTimeZhi()}时`,
    todayNote: getDaoistNote(lunar.getMonth(), lunar.getDay(), solar, lunar),
  };
}

const DAOIST_DATES: Record<string, string> = {
  "1-1": "元始天尊圣诞、天腊日",
  "1-3": "孙真人圣诞",
  "1-9": "玉皇大帝圣诞",
  "1-13": "关圣帝君飞升",
  "1-15": "上元节（三元）、上元天官圣诞",
  "1-19": "长春祖师圣诞",
  "1-28": "净明普化天尊圣诞",
  "2-1": "勾陈天皇大帝圣诞",
  "2-2": "土地正神诞",
  "2-3": "文昌帝君圣诞",
  "2-6": "东华帝君圣诞",
  "2-15": "太上老君圣诞",
  "2-19": "慈航真人圣诞",
  "3-1": "谭祖长真真人圣诞",
  "3-3": "真武大帝圣诞",
  "3-15": "财神赵公元帅圣诞",
  "3-16": "三茅真君得道日",
  "3-18": "后土娘娘圣诞",
  "3-23": "天后妈祖圣诞",
  "3-28": "东岳大帝圣诞",
  "4-14": "吕祖纯阳祖师圣诞",
  "4-18": "华佗神医先师诞",
  "4-26": "丘祖长春真人圣诞",
  "4-28": "药王圣诞",
  "5-1": "南极长生大帝圣诞",
  "5-5": "地腊日",
  "5-18": "张天师圣诞",
  "5-20": "马祖丹阳真人圣诞",
  "6-1": "南斗星君下降",
  "6-15": "灵官马元帅圣诞",
  "6-19": "慈航真人成道日",
  "6-23": "火神圣诞",
  "6-24": "关圣帝君圣诞",
  "7-7": "道德腊、七夕",
  "7-12": "刘祖长生真人圣诞",
  "7-15": "中元节（三元）、中元地官圣诞",
  "7-18": "王母圣诞",
  "7-26": "张三丰真人圣诞",
  "8-1": "许真君飞升日",
  "8-3": "北斗星君圣诞、司命灶君诞",
  "8-10": "北岳大帝圣诞",
  "8-15": "太阴星君圣诞",
  "9-1": "南斗下降",
  "9-9": "重阳节、斗姥元君圣诞",
  "9-19": "慈航真人出家日",
  "9-22": "广成子诞",
  "10-1": "东皇大帝圣诞、民岁腊",
  "10-3": "三茅应化真君圣诞",
  "10-6": "天曹诸司五岳五帝圣诞",
  "10-15": "下元节（三元）、下元水官圣诞",
  "10-18": "地母娘娘圣诞",
  "10-19": "长春邱祖成道日",
  "11-6": "西岳大帝圣诞",
  "11-11": "太乙救苦天尊圣诞",
  "12-8": "王侯腊",
  "12-16": "南岳大帝圣诞、福德正神圣诞",
  "12-21": "天猷上帝圣诞",
  "12-22": "重阳祖师圣诞",
  "12-23": "祭灶",
  "12-25": "天神下降",
  "12-29": "南北斗星君下降",
};

export interface DaoistNoteStep {
  rule: string;
  matched: boolean;
  line: string | null;
}

type LunarForNote = {
  getPrevJieQi: () => { getName: () => string; getSolar: () => InstanceType<typeof Solar> };
  getNextJieQi: () => { getName: () => string; getSolar: () => InstanceType<typeof Solar> };
  getDayInGanZhi: () => string;
};

const LUNAR_DAY_CN = [
  "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
  "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十",
];

function lunarMonthDayLabel(month: number, day: number): string {
  const m =
    month <= 10
      ? ["", "正", "二", "三", "四", "五", "六", "七", "八", "九", "十"][month]
      : month === 11
        ? "十一"
        : "十二";
  return `${m}月${LUNAR_DAY_CN[day - 1] ?? `${day}日`}`;
}

/** 农历月日固定节日全书（与今日合成顺序一致的数据源） */
export function getAllDaoistFixedDates(): { lunarLabel: string; desc: string }[] {
  return Object.entries(DAOIST_DATES)
    .map(([key, desc]) => {
      const [m, d] = key.split("-").map(Number);
      return { sortKey: m * 32 + d, lunarLabel: lunarMonthDayLabel(m, d), desc };
    })
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ lunarLabel, desc }) => ({ lunarLabel, desc }));
}

/** 首页「今日道门大事记」合成说明（与 getDaoistNote 顺序一致） */
export const DAOIST_NOTE_MERGE_INTRO =
  "按顺序判断是否写入，命中项以全角分号「；」连接：①初一或十五持斋 ②日天干为辛（三辛雷斋）③初六雷斋 ④农历月日固定节日 ⑤当日为道教八节（立春、春分、立夏、夏至、立秋、秋分、立冬、冬至）。均未命中则显示「今日无特殊记事」。";

function buildDaoistNoteSteps(
  month: number,
  day: number,
  solar: InstanceType<typeof Solar>,
  lunar: LunarForNote
): DaoistNoteStep[] {
  const fastingHint =
    day === 1 ? "初一宜持斋诵经" : day === 15 ? "十五宜持斋诵经" : null;
  const dayGan = lunar.getDayInGanZhi().charAt(0);
  const sanXinNote = dayGan === "辛" ? "三辛日（辛日可修雷斋）" : null;
  const chuLiuNote = day === 6 ? "初六可修雷斋" : null;
  const eventNote = DAOIST_DATES[`${month}-${day}`];
  const baJieNote = getBaJieNote(solar, lunar);

  return [
    {
      rule: "初一、十五：持斋诵经提示",
      matched: !!fastingHint,
      line: fastingHint,
    },
    {
      rule: "日天干为「辛」：三辛日（可修雷斋）",
      matched: !!sanXinNote,
      line: sanXinNote,
    },
    {
      rule: "初六：雷斋",
      matched: !!chuLiuNote,
      line: chuLiuNote,
    },
    {
      rule: `农历固定节日（今日 ${lunarMonthDayLabel(month, day)}）`,
      matched: !!eventNote,
      line: eventNote,
    },
    {
      rule: "节气八节（立春、春分、立夏、夏至、立秋、秋分、立冬、冬至落在公历当日）",
      matched: !!baJieNote,
      line: baJieNote,
    },
  ];
}

function getDaoistNote(
  month: number,
  day: number,
  solar: InstanceType<typeof Solar>,
  lunar: LunarForNote
): string {
  const steps = buildDaoistNoteSteps(month, day, solar, lunar);
  const parts = steps.filter((s) => s.matched && s.line).map((s) => s.line!);
  if (parts.length > 0) return parts.join("；");
  return "今日无特殊记事";
}

/** 供弹窗展示：今日各条规则是否命中 */
export function getDaoistNoteStepsForNow(date: Date = new Date()): DaoistNoteStep[] {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();
  return buildDaoistNoteSteps(lunar.getMonth(), lunar.getDay(), solar, lunar);
}
