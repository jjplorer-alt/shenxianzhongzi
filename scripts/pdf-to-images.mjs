#!/usr/bin/env node
/**
 * 将 beidou-pinyin.pdf 转为 WebP 图片，用于快速加载（体积约减小 30%）
 */
import { pdf } from "pdf-to-img";
import sharp from "sharp";
import { writeFile, mkdir, readdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pdfPath = path.join(__dirname, "../app/public/beidou-pinyin.pdf");
const outDir = path.join(__dirname, "../app/public/beidou-pages");

async function main() {
  if (!existsSync(pdfPath)) {
    console.error("PDF 不存在:", pdfPath);
    process.exit(1);
  }
  await mkdir(outDir, { recursive: true });

  // 清理旧 PNG 文件
  if (existsSync(outDir)) {
    const files = await readdir(outDir);
    for (const f of files) {
      if (f.endsWith(".png")) await unlink(path.join(outDir, f));
    }
  }

  console.log("正在转换 PDF 为 WebP 图片...");
  const document = await pdf(pdfPath, { scale: 2 });
  let i = 1;
  for await (const image of document) {
    const webp = await sharp(image)
      .webp({ quality: 85 })
      .toBuffer();
    const outPath = path.join(outDir, `page-${i}.webp`);
    await writeFile(outPath, webp);
    console.log(`  页 ${i} 已保存`);
    i++;
  }
  console.log(`\n✅ 完成，共 ${i - 1} 页`);
  console.log("   输出目录:", outDir);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
