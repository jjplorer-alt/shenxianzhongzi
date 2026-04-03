#!/usr/bin/env node
/**
 * Cloudflare Pages 项目 sxzz：仅通过 Wrangler 直传（上传 app/out）
 * 需先：npx wrangler login
 * 与 wrangler.toml 中 name = "sxzz" 对应
 */
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const appDir = join(root, "app");

const env = {
  ...process.env,
  NEXT_PUBLIC_BASE_PATH: "",
  NEXT_PUBLIC_SITE_URL: "https://sxzz.pages.dev",
};

console.log("📦 Wrangler 直传 → Cloudflare Pages（sxzz）\n");

console.log("🔍 ESLint（app）...");
try {
  execSync("npm run lint", { cwd: appDir, env, stdio: "inherit" });
} catch {
  console.error("\n❌ Lint 未通过，已中止");
  process.exit(1);
}

console.log("\n🔨 构建（根路径，供 sxzz 使用）...");
execSync("npm run build", { cwd: root, env, stdio: "inherit" });

console.log("\n📤 wrangler pages deploy ...");
execSync(
  "npx wrangler pages deploy app/out --project-name=sxzz --branch=main",
  { cwd: root, stdio: "inherit" },
);

console.log("\n✅ Wrangler 直传完成：https://sxzz.pages.dev");
