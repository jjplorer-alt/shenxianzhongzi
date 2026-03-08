#!/usr/bin/env node
/**
 * 构建时注入 Service Worker 缓存版本号
 * 使用 Git 短哈希或时间戳，每次部署自动使旧缓存失效
 *
 * 用法:
 *   node inject-sw-version.mjs        - 注入版本（prebuild）
 *   node inject-sw-version.mjs --restore - 恢复占位符（postbuild，保持源码干净）
 */
import { readFile, writeFile } from "fs/promises";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const swPath = path.join(__dirname, "../app/public/sw.js");
const PLACEHOLDER = "__CACHE_VERSION__";

function getVersion() {
  try {
    return execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  } catch {
    return String(Date.now());
  }
}

async function inject() {
  const version = getVersion();
  console.log("[inject-sw-version] 缓存版本:", version);

  let content = await readFile(swPath, "utf8");
  if (!content.includes(PLACEHOLDER)) {
    console.warn("[inject-sw-version] 未找到占位符，跳过");
    return;
  }
  content = content.replaceAll(PLACEHOLDER, version);
  await writeFile(swPath, content);
}

async function restore() {
  let content = await readFile(swPath, "utf8");
  const match = content.match(/const CACHE_VERSION = '([^']+)';/);
  if (!match) return;
  content = content.replace(match[0], `const CACHE_VERSION = '${PLACEHOLDER}';`);
  await writeFile(swPath, content);
  console.log("[inject-sw-version] 已恢复占位符");
}

async function main() {
  const restoreMode = process.argv.includes("--restore");
  if (restoreMode) {
    await restore();
  } else {
    await inject();
  }
}

main().catch((err) => {
  console.error("[inject-sw-version] 失败:", err);
  process.exit(1);
});
