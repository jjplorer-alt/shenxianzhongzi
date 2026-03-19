#!/usr/bin/env node
/**
 * 为 PWA 图标添加圆角（符合现代应用图标规范）
 *
 * 规范说明：
 * - purpose: "any" 的图标（favicon、标签页、书签）：在图片上直接应用圆角
 * - purpose: "maskable" 的图标：由平台应用遮罩，保持方形并确保安全区（中心 80%）
 *
 * 圆角比例：约 20%（与 iOS/Android 圆角矩形风格一致）
 *
 * 用法: cd app && node scripts/round-icon-corners.mjs
 */
import sharp from "sharp";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, "..");
const publicDir = path.join(appDir, "public");
const appSrcDir = path.join(appDir, "src/app");

/** 圆角半径占边长的比例（约 20%，符合常见规范） */
const CORNER_RATIO = 0.2;

/**
 * 创建圆角矩形遮罩（SVG）
 * @param {number} size 边长
 * @returns {Buffer} SVG buffer
 */
function createRoundedRectMask(size) {
  const radius = Math.round(size * CORNER_RATIO);
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
</svg>`;
  return Buffer.from(svg);
}

/**
 * 为图片应用圆角
 * @param {string} inputPath 输入路径
 */
async function applyRoundedCorners(inputPath) {
  const img = sharp(await readFile(inputPath));
  const meta = await img.metadata();
  const size = meta.width || meta.height;
  if (!size) throw new Error(`无法获取尺寸: ${inputPath}`);

  const maskSvg = createRoundedRectMask(size);
  const maskBuffer = await sharp(maskSvg).png().toBuffer();

  await img
    .ensureAlpha()
    .composite([{ input: maskBuffer, blend: "dest-in" }])
    .png()
    .toFile(inputPath);

  console.log(`  ✓ ${path.basename(inputPath)}`);
}

async function main() {
  console.log("[round-icon-corners] 为 any 用途图标添加圆角...\n");

  const anyIcons = [
    path.join(appSrcDir, "icon.png"), // Next.js favicon
    path.join(publicDir, "icon-192.png"),
    path.join(publicDir, "icon-512.png"),
  ];

  for (const p of anyIcons) {
    try {
      await applyRoundedCorners(p);
    } catch (err) {
      console.error(`  ✗ ${path.basename(p)}:`, err.message);
    }
  }

  console.log("\n[maskable] icon-512-maskable.png 由平台应用遮罩，无需修改");
  console.log("[round-icon-corners] 完成");
}

main().catch((err) => {
  console.error("[round-icon-corners] 失败:", err);
  process.exit(1);
});
