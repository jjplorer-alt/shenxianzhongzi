#!/usr/bin/env node
/**
 * 监控 GitHub Actions 构建直到完成
 * 使用 GitHub API 轮询（无需 gh CLI）
 */
const https = require("https");

const REPO = "jjplorer-alt/shenxianzhongzi";
const POLL_INTERVAL = 8000; // 8 秒
const MAX_WAIT = 300000; // 最多等 5 分钟

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "shenxianzhongzi-watch" } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error(data));
        }
      });
    }).on("error", reject);
  });
}

async function getLatestRun() {
  // 仅监控 GitHub Pages 部署，不因 Cloudflare 等其它 workflow 失败而误报
  const url = `https://api.github.com/repos/${REPO}/actions/workflows/deploy-pages.yml/runs?per_page=1`;
  const data = await fetch(url);
  return data.workflow_runs?.[0] || null;
}

async function main() {
  console.log("⏳ 监控 GitHub Actions 构建...\n");
  const start = Date.now();

  while (Date.now() - start < MAX_WAIT) {
    const run = await getLatestRun();
    if (!run) {
      console.log("   未找到运行记录，稍后重试...");
      await new Promise((r) => setTimeout(r, POLL_INTERVAL));
      continue;
    }

    const { status, conclusion, html_url, display_title, created_at } = run;
    const elapsed = Math.round((Date.now() - new Date(created_at).getTime()) / 1000);

    if (status === "queued") {
      console.log(`   [${elapsed}s] 排队中...`);
    } else if (status === "in_progress") {
      console.log(`   [${elapsed}s] 构建中...`);
    } else if (status === "completed") {
      console.log("\n" + "=".repeat(50));
      if (conclusion === "success") {
        console.log("✅ 部署成功");
        console.log("=".repeat(50));
        console.log("\n🌐 站点: https://jjplorer-alt.github.io/shenxianzhongzi/");
        process.exit(0);
      } else {
        console.log("❌ 部署失败");
        console.log("=".repeat(50));
        console.log("\n📋 查看日志:", html_url);
        process.exit(1);
      }
    }

    await new Promise((r) => setTimeout(r, POLL_INTERVAL));
  }

  console.log("\n⏱️ 超时，请手动查看: https://github.com/" + REPO + "/actions");
  process.exit(1);
}

main().catch((e) => {
  console.error("监控出错:", e.message);
  process.exit(1);
});
