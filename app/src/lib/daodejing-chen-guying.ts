/**
 * 《道德经》81 章白话译文：陈鼓应精炼版（站内定稿，见 data/daodejing-chen-refined.json）。
 * 生成 JSON：node scripts/build-chen-refined-json.mjs
 */

import refined from "@/lib/data/daodejing-chen-refined.json";

const chapters: readonly string[] = refined.chapters;

const CHEN_SOURCE_NOTE = refined.title as string;

export function getChenGuyingTranslation(chapterOneBased: number): string {
  if (chapterOneBased < 1 || chapterOneBased > 81) return "";
  return chapters[chapterOneBased - 1] ?? "";
}

export function getChenGuyingAttribution(): string {
  return CHEN_SOURCE_NOTE;
}

/** 白话今译按句换行，便于阅读 */
export function formatChenTranslationLines(text: string): string {
  return text
    .split("。")
    .filter(Boolean)
    .map((s) => s + "。")
    .join("\n");
}
