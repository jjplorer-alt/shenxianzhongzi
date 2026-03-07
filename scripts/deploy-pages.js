#!/usr/bin/env node
/**
 * 一键部署到 GitHub Pages
 * 推送代码到 main 分支，触发 GitHub Actions 自动构建部署
 */
const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const REMOTE = "origin";
const BRANCH = "main";
const REPO_NAME = "shenxianzhongzi";

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

function getGitHubUser() {
  const configPath = path.join(__dirname, "..", ".github-repo");
  if (fs.existsSync(configPath)) {
    const content = fs.readFileSync(configPath, "utf8");
    const m = content.match(/YOUR_GITHUB_USERNAME\s*=\s*(\S+)/);
    if (m && m[1]) return m[1].trim();
  }
  return process.env.GITHUB_USERNAME || "";
}

function openUrl(url) {
  const start = process.platform === "win32" ? "start" : process.platform === "darwin" ? "open" : "xdg-open";
  spawn(start, [url], { stdio: "ignore", detached: true });
}

console.log("📦 GitHub Pages 部署\n");

// 部署前自动审查：build 必须通过，lint 仅提示
console.log("🔍 部署前检查...\n");
const appDir = path.join(__dirname, "..", "app");
try {
  run("npm run lint", { cwd: appDir });
  console.log("✅ Lint 通过\n");
} catch {
  console.warn("⚠️ Lint 有告警，建议修复后再部署\n");
}
try {
  run("npm run build", {
    cwd: appDir,
    env: { ...process.env, NEXT_PUBLIC_BASE_PATH: "/shenxianzhongzi" },
  });
} catch (e) {
  console.error("\n❌ 构建失败，请修复后再部署");
  process.exit(1);
}
console.log("✅ 构建通过，继续推送\n");

if (!hasRemote()) {
  const user = getGitHubUser();
  if (user) {
    const url = `https://github.com/${user}/${REPO_NAME}.git`;
    console.log(`添加远程仓库: ${url}`);
    run(`git remote add origin ${url}`);
  } else {
    const newRepoUrl = `https://github.com/new?name=${REPO_NAME}`;
    console.log("未配置远程仓库。请按以下步骤操作：\n");
    console.log("1. 在 .github-repo 中填入你的 GitHub 用户名（首行 YOUR_GITHUB_USERNAME=你的用户名）");
    console.log("2. 或访问创建仓库:", newRepoUrl);
    console.log("3. 创建后运行: git remote add origin https://github.com/你的用户名/shenxianzhongzi.git");
    openUrl(newRepoUrl);
    process.exit(1);
  }
}

console.log("📤 提交并推送...");
run("git add -A");
const status = run("git status --porcelain", { inherit: false }) || "";
if (status.trim()) {
  run('git commit -m "deploy: update"');
} else {
  console.log("无新更改，直接推送");
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

function checkGhInstalled() {
  try {
    execSync("gh --version", { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

try {
  run(`git push -u ${REMOTE} ${BRANCH}`);
} catch (e) {
  if (e.stderr && (e.stderr.includes("could not read") || e.stderr.includes("failed to push"))) {
    console.log("\n❌ 推送失败，可能是远程仓库不存在或未登录。请：");
    console.log("1. 在 GitHub 创建仓库 shenxianzhongzi");
    console.log("2. 确保已登录: git config --global credential.helper");
  }
  process.exit(1);
}

// 部署结果反馈
const repo = getRepoInfo();
const siteUrl = repo ? `https://${repo.owner}.github.io/${repo.repo}/` : null;
const actionsUrl = repo ? `https://github.com/${repo.owner}/${repo.repo}/actions` : null;

console.log("\n" + "=".repeat(50));
console.log("📤 推送成功，GitHub Actions 已触发");
console.log("=".repeat(50));

// 每次推送后监控直到 Actions 完成
console.log("\n⏳ 监控构建直到完成...\n");
try {
  run("node scripts/watch-build.js", { cwd: path.join(__dirname, "..") });
} catch (e) {
  process.exit(1);
}
