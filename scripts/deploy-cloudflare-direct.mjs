#!/usr/bin/env node
/**
 * 先执行 Wrangler 直传 sxzz（见 deploy-cloudflare-wrangler-only.mjs），再可选推送 GitHub 同步代码。
 * 需先运行 npx wrangler login
 */
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

console.log("📦 部署：Wrangler 直传 sxzz + 推送 GitHub（同步仓库）\n");

execSync("node scripts/deploy-cloudflare-wrangler-only.mjs", {
  cwd: root,
  stdio: "inherit",
});

function gitPushMain() {
  try {
    execSync("git rev-parse --is-inside-work-tree", {
      cwd: root,
      stdio: "pipe",
    });
  } catch {
    console.log("\n⚠️ 非 Git 仓库，跳过推送");
    return;
  }
  try {
    execSync("git remote get-url origin", { cwd: root, stdio: "pipe" });
  } catch {
    console.log("\n⚠️ 未配置 git remote origin，跳过推送");
    return;
  }

  const branch = execSync("git rev-parse --abbrev-ref HEAD", {
    cwd: root,
    encoding: "utf8",
  }).trim();

  console.log("\n📤 推送到 GitHub（同步代码）...");
  execSync("git add -A", { cwd: root, stdio: "inherit" });
  const status =
    execSync("git status --porcelain", { cwd: root, encoding: "utf8" }) || "";
  if (status.trim()) {
    execSync('git commit -m "deploy: sxzz + sync GitHub"', {
      cwd: root,
      stdio: "inherit",
    });
  } else {
    console.log("   （工作区无新更改，直接推送当前提交）");
  }

  execSync(`git push -u origin ${branch}`, { cwd: root, stdio: "inherit" });

  if (branch !== "main") {
    console.log(`\n⚠️ 当前分支为「${branch}」，远程默认跟踪 origin/${branch}。`);
  }
}

gitPushMain();

console.log("\n✅ 部署流程结束（上线以 Wrangler 直传为准：https://sxzz.pages.dev）\n");
