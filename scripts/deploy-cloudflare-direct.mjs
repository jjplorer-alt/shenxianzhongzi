#!/usr/bin/env node
/**
 * 本地直传到 Cloudflare Pages（不依赖 GitHub Actions）
 * 需先运行 npx wrangler login 登录
 */
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const env = {
  ...process.env,
  NEXT_PUBLIC_BASE_PATH: "",
  NEXT_PUBLIC_SITE_URL: "https://shenxianzhongzi.pages.dev",
};

console.log("📦 Cloudflare Pages 本地直传\n");

console.log("🔨 构建...");
execSync("npm run build", { cwd: root, env, stdio: "inherit" });

console.log("\n📤 上传到 Cloudflare Pages...");
execSync("npx wrangler pages deploy app/out --project-name=shenxianzhongzi", {
  cwd: root,
  stdio: "inherit",
});

console.log("\n✅ 部署完成！");
console.log("   站点: https://shenxianzhongzi.pages.dev");
