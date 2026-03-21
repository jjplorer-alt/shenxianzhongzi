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

export function getDaoCalendar(): DaoCalendarInfo {
  const now = new Date();
  const solar = Solar.fromDate(now);
  const lunar = solar.getLunar();
  const daoYear = now.getFullYear() + 2697;

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

function getDaoistNote(
  month: number,
  day: number,
  solar: InstanceType<typeof Solar>,
  lunar: {
    getPrevJieQi: () => { getName: () => string; getSolar: () => InstanceType<typeof Solar> };
    getNextJieQi: () => { getName: () => string; getSolar: () => InstanceType<typeof Solar> };
    getDayInGanZhi: () => string;
  }
): string {
  const fastingHint =
    day === 1 ? "初一宜持斋诵经" : day === 15 ? "十五宜持斋诵经" : null;
  const dayGan = lunar.getDayInGanZhi().charAt(0);
  const sanXinNote = dayGan === "辛" ? "三辛日（辛日可修雷斋）" : null;
  const chuLiuNote = day === 6 ? "初六可修雷斋" : null;
  const eventNote = DAOIST_DATES[`${month}-${day}`];
  const baJieNote = getBaJieNote(solar, lunar);

  const parts: string[] = [];
  if (fastingHint) parts.push(fastingHint);
  if (sanXinNote) parts.push(sanXinNote);
  if (chuLiuNote) parts.push(chuLiuNote);
  if (eventNote) parts.push(eventNote);
  if (baJieNote) parts.push(baJieNote);

  if (parts.length > 0) return parts.join("；");
  return "今日无特殊记事";
}
