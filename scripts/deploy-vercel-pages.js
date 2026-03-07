#!/usr/bin/env node
/**
 * 一键部署到 Vercel
 * 推送代码到 main 分支，触发 GitHub Actions 自动构建部署
 */
const { execSync } = require("child_process");
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

console.log("📦 Vercel 一键部署\n");

console.log("🔍 部署前检查...\n");
const appDir = path.join(__dirname, "..", "app");
try {
  run("npm run lint", { cwd: appDir });
  console.log("✅ Lint 通过\n");
} catch {
  console.warn("⚠️ Lint 有告警，建议修复后再部署\n");
}

const repo = getRepoInfo();
const siteUrl = `https://shenxianzhongzi.vercel.app`;

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
  run('git commit -m "deploy: update Vercel"');
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
console.log("📤 推送成功，Vercel 部署已触发");
console.log("=".repeat(50));

console.log("\n⏳ 监控构建直到完成...\n");
try {
  run("node scripts/watch-vercel-build.js", { cwd: path.join(__dirname, "..") });
} catch (e) {
  process.exit(1);
}
