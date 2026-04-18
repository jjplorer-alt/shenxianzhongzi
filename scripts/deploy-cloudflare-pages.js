#!/usr/bin/env node
/**
 * 校验构建后推送 GitHub（同步仓库）。站点上线请用本机 Wrangler：npm run deploy
 */
const { execSync, spawn } = require("child_process");
const path = require("path");

const REMOTE = "origin";
const BRANCH = "main";

function run(cmd, opts = {}) {
  const inherit = opts.inherit !== false;
  try {
    return execSync(cmd, {
      encoding: "utf8",
      stdio: inherit ? "inherit" : "pipe",
      ...opts,
    });
  } catch (e) {
    throw e;
  }
}

function hasRemote() {
  try {
    execSync(`git remote get-url ${REMOTE}`, { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

function getRepoInfo() {
  try {
    const url = execSync(`git remote get-url ${REMOTE}`, { encoding: "utf8" }).trim();
    const m = url.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
    return m ? { owner: m[1], repo: m[2].replace(/\.git$/, "") } : null;
  } catch {
    return null;
  }
}

console.log("📦 校验构建并推送 GitHub（同步仓库）\n");

console.log("🔍 部署前检查...\n");
const appDir = path.join(__dirname, "..", "app");
try {
  run("npm run lint", { cwd: appDir });
  console.log("✅ Lint 通过\n");
} catch {
  console.warn("⚠️ Lint 有告警，建议修复后再部署\n");
}

const CLOUDFLARE_PAGES_PROJECT = "sxzz";
const siteUrl = `https://${CLOUDFLARE_PAGES_PROJECT}.pages.dev`;

try {
  run("npm run build", {
    cwd: appDir,
    env: {
      ...process.env,
      NEXT_PUBLIC_BASE_PATH: "",
      NEXT_PUBLIC_SITE_URL: siteUrl,
    },
  });
} catch (e) {
  console.error("\n❌ 构建失败，请修复后再部署");
  process.exit(1);
}
console.log("✅ 构建通过，继续推送\n");

if (!hasRemote()) {
  console.error("❌ 未配置远程仓库，请先运行: git remote add origin <仓库URL>");
  process.exit(1);
}

console.log("📤 提交并推送...");
run("git add -A");
const status = run("git status --porcelain", { inherit: false }) || "";
if (status.trim()) {
  run('git commit -m "chore: sync GitHub"');
} else {
  console.log("无新更改，直接推送");
}

try {
  run(`git push -u ${REMOTE} ${BRANCH}`);
} catch (e) {
  console.error("\n❌ 推送失败");
  process.exit(1);
}

console.log("\n" + "=".repeat(50));
console.log("📤 推送成功（上线请执行: npm run deploy）");
console.log("=".repeat(50));
