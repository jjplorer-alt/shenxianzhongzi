declare module "lunar-javascript" {
  export class Solar {
    static fromDate(date: Date): Solar;
    getLunar(): Lunar;
  }

  export class Lunar {
    getYearInChinese(): string;
    getMonthInChinese(): string;
    getDayInChinese(): string;
    getYearInGanZhi(): string;
    getMonthInGanZhi(): string;
    getMonthInGanZhiExact(): string;
    getDayInGanZhi(): string;
    getTimeInGanZhi(): string;
    getTimeZhi(): string;
    getYearShengXiao(): string;
    getMonth(): number;
    getDay(): number;
    getFestivals(): string[];
    getPrevJieQi(): JieQi;
    getNextJieQi(): JieQi;
  }

  export class JieQi {
    getName(): string;
  }
}
