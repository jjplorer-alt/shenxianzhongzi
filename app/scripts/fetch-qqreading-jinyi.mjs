/**
 * 从 QQ 阅读抓取《老子今注今译》各章【今译】正文，写入 src/lib/data/qqreading-jinyi-by-chapter.json
 * 用法：node scripts/fetch-qqreading-jinyi.mjs
 *
 * 说明：实测未登录 Web 端仅第1–20 章正文含【今译】；第 21 章起为付费预览页，需在 QQ 阅读
 * 登录订购后自行抓取或换用已购电子书导出。本脚本仍遍历1–87 页以便日后页面策略变更时重试。
 */
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BOOK_ID = "34127267";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const CN_NUM = {
  零: 0,
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
  十: 10,
  百: 100,
};

/** 「八十一章」-> 81 */
function chineseChapterToInt(s) {
  const t = s.replace(/第/g, "").replace(/章/g, "").trim();
  if (!t) return null;
  if (t === "十") return 10;
  if (t.startsWith("十") && t.length === 2) return 10 + (CN_NUM[t[1]] ?? 0);
  if (t.endsWith("十") && t.length === 2) return (CN_NUM[t[0]] ?? 0) * 10;
  if (t.length === 2 && t[1] === "十" && CN_NUM[t[0]] != null) {
    const a = CN_NUM[t[0]];
    return a * 10;
  }
  if (t.length === 3 && t[1] === "十") {
    const a = CN_NUM[t[0]] ?? 0;
    const b = CN_NUM[t[2]] ?? 0;
    return a * 10 + b;
  }
  if (/^[一二三四五六七八九]$/.test(t)) return CN_NUM[t] ?? null;
  if (/^([一二三四五六七八九])十([一二三四五六七八九])$/.test(t)) {
    const m = t.match(/^([一二三四五六七八九])十([一二三四五六七八九])$/);
    return (CN_NUM[m[1]] ?? 0) * 10 + (CN_NUM[m[2]] ?? 0);
  }
  if (/^十([一二三四五六七八九])$/.test(t)) {
    const m = t.match(/^十([一二三四五六七八九])$/);
    return 10 + (CN_NUM[m[1]] ?? 0);
  }
  if (/^([一二三四五六七八九])十$/.test(t)) {
    const m = t.match(/^([一二三四五六七八九])十$/);
    return (CN_NUM[m[1]] ?? 0) * 10;
  }
  if (t === "二十") return 20;
  if (t === "三十") return 30;
  if (t === "四十") return 40;
  if (t === "五十") return 50;
  if (t === "六十") return 60;
  if (t === "七十") return 70;
  if (t === "八十") return 80;
  if (t === "八十一") return 81;
  const m = t.match(/^([一二三四五六七八九])十([一二三四五六七八九])$/);
  if (m) return (CN_NUM[m[1]] ?? 0) * 10 + (CN_NUM[m[2]] ?? 0);
  return null;
}

function parseChapterNumFromHtml(html) {
  const titleM = html.match(/<title>老子今注今译_([^_<]+)/);
  if (titleM) {
    const n = chineseChapterToInt(titleM[1]);
    if (n != null) return n;
  }
  const h1 = html.match(/chapter-title[^>]*>([^<]+)</);
  if (h1) {
    const n = chineseChapterToInt(h1[1]);
    if (n != null) return n;
  }
  const kw = html.match(/keywords" content="[^"]*,([^"]+)"/);
  if (kw) {
    const n = chineseChapterToInt(kw[1]);
    if (n != null) return n;
  }
  return null;
}

function isPaywalled(html) {
  return (
    html.includes("上QQ阅读APP看后续") ||
    html.includes("登录订阅本章") ||
    (html.includes("【今译】") === false && html.includes("chapter-content") && html.length < 15000)
  );
}

function extractJinyi(html) {
  if (isPaywalled(html)) return null;
  const jin = html.indexOf("【今译】");
  const yin = html.indexOf("【引述】", jin + 1);
  if (jin === -1 || yin === -1) return null;
  const chunk = html.slice(jin, yin);
  const parts = [];
  const re = /<p class="(?:noindent-)?bodyContent-\d+">([^<]*)<\/p>/g;
  let m;
  while ((m = re.exec(chunk)) !== null) {
    const line = m[1].trim().replace(/&nbsp;/g, " ").replace(/&ldquo;/g, "\u201c").replace(/&rdquo;/g, "\u201d");
    if (!line || line === "【今译】" || line.startsWith("【")) continue;
    parts.push(line);
  }
  const text = parts.join("");
  return text.length >= 8 ? text : null;
}

async function fetchPage(pageId) {
  const url = `https://book.qq.com/book-read/${BOOK_ID}/${pageId}`;
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" } });
  if (!res.ok) throw new Error(`${pageId} ${res.status}`);
  return res.text();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const MIN_PAGE = 1;
const MAX_PAGE = 87;
const byChapter = {};
const pageToChapter = {};

async function main() {
  for (let pageId = MIN_PAGE; pageId <= MAX_PAGE; pageId++) {
    let html;
    try {
      html = await fetchPage(pageId);
    } catch (e) {
      console.error("fetch fail", pageId, e.message);
      continue;
    }
    const ch = parseChapterNumFromHtml(html);
    const jinyi = extractJinyi(html);
    if (ch != null) pageToChapter[String(pageId)] = ch;
    if (ch != null && jinyi) {
      if (byChapter[String(ch)]) {
        console.warn("duplicate chapter", ch, "page", pageId);
      }
      byChapter[String(ch)] = jinyi;
      console.log("ok", "page", pageId, "->", "第" + ch + "章", jinyi.slice(0, 36) + "…");
    } else if (ch != null) {
      console.log("skip (no 今译)", "page", pageId, "chapter", ch);
    } else {
      console.log("skip (no chapter)", "page", pageId);
    }
    await sleep(350);
  }

  const out = {
    source: `https://book.qq.com/book-read/${BOOK_ID}/`,
    fetchedAt: new Date().toISOString(),
    pageToChapter,
    translations: byChapter,
  };
  const outPath = join(ROOT, "src/lib/data/qqreading-jinyi-by-chapter.json");
  writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
  console.log("wrote", outPath, "chapters", Object.keys(byChapter).length);
}

main();
