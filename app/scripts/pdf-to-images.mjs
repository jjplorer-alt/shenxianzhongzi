#!/usr/bin/env node
/**
 * 将 beidou-pinyin.pdf 转为图片（Vercel 构建用，路径相对于 app/）
 */
import { pdf } from "pdf-to-img";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pdfPath = path.join(__dirname, "../public/beidou-pinyin.pdf");
const outDir = path.join(__dirname, "../public/beidou-pages");

async function main() {
  if (!existsSync(pdfPath)) {
    console.error("PDF 不存在:", pdfPath);
    process.exit(1);
  }
  await mkdir(outDir, { recursive: true });

  console.log("正在转换 PDF 为图片...");
  const document = await pdf(pdfPath, { scale: 2 });
  let i = 1;
  for await (const image of document) {
    const outPath = path.join(outDir, `page-${i}.png`);
    await writeFile(outPath, image);
    console.log(`  页 ${i} 已保存`);
    i++;
  }
  console.log(`\n✅ 完成，共 ${i - 1} 页`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
