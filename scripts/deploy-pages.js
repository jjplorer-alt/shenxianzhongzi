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

try {
  run(`git push -u ${REMOTE} ${BRANCH}`);
  console.log("\n✅ 推送成功，GitHub Actions 正在构建部署");
  console.log("   查看进度: 仓库 → Actions");
  console.log("   Settings → Pages → Source 选 GitHub Actions");
  console.log("   访问: https://<用户名>.github.io/shenxianzhongzi/");
} catch (e) {
  if (e.stderr && (e.stderr.includes("could not read") || e.stderr.includes("failed to push"))) {
    console.log("\n推送失败，可能是远程仓库不存在或未登录。请：");
    console.log("1. 在 GitHub 创建仓库 shenxianzhongzi");
    console.log("2. 确保已登录: git config --global credential.helper");
  }
  process.exit(1);
}
