const DIGITS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"] as const;

function under100(n: number): string {
  if (n < 10) return DIGITS[n];
  if (n < 20) return n === 10 ? "十" : `十${DIGITS[n % 10]}`;
  const t = Math.floor(n / 10);
  const o = n % 10;
  return `${DIGITS[t]}十${o ? DIGITS[o] : ""}`;
}

/** 非负整数转中文数字（用于「距今」日数，支持0–9999） */
export function toChineseNumeral(n: number): string {
  if (!Number.isFinite(n) || n < 0) return DIGITS[0];
  if (n === 0) return DIGITS[0];
  if (n < 100) return under100(n);
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const r = n % 100;
    const s = `${DIGITS[h]}百`;
    if (r === 0) return s;
    if (r < 10) return `${s}零${DIGITS[r]}`;
    return s + under100(r);
  }
  const th = Math.floor(n / 1000);
  const r = n % 1000;
  const s = `${DIGITS[th]}千`;
  if (r === 0) return s;
  if (r < 10) return `${s}零${DIGITS[r]}`;
  if (r < 100) return `${s}零${under100(r)}`;
  return s + under100(r);
}
