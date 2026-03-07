#!/usr/bin/env node
/**
 * 监控 Cloudflare Pages 构建直到完成
 */
const https = require("https");

const REPO = "jjplorer-alt/shenxianzhongzi";
const WORKFLOW = "deploy-cloudflare-pages.yml";
const POLL_INTERVAL = 8000;
const MAX_WAIT = 300000;

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
  const url = `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}/runs?per_page=1`;
  const data = await fetch(url);
  return data.workflow_runs?.[0] || null;
}

async function main() {
  console.log("⏳ 监控 Cloudflare Pages 构建...\n");
  const start = Date.now();

  while (Date.now() - start < MAX_WAIT) {
    const run = await getLatestRun();
    if (!run) {
      console.log("   未找到运行记录，稍后重试...");
      await new Promise((r) => setTimeout(r, POLL_INTERVAL));
      continue;
    }

    const { status, conclusion, html_url, created_at } = run;
    const elapsed = Math.round((Date.now() - new Date(created_at).getTime()) / 1000);

    if (status === "queued") {
      console.log(`   [${elapsed}s] 排队中...`);
    } else if (status === "in_progress") {
      console.log(`   [${elapsed}s] 构建中...`);
    } else if (status === "completed") {
      console.log("\n" + "=".repeat(50));
      if (conclusion === "success") {
        console.log("✅ Cloudflare Pages 部署成功");
        console.log("=".repeat(50));
        console.log("\n🌐 站点: https://shenxianzhongzi.pages.dev");
        process.exit(0);
      } else {
        console.log("❌ 部署失败");
        console.log("=".repeat(50));
        console.log("\n📋 查看日志:", html_url);
        console.log("\n💡 若未配置 Secrets，请添加 CLOUDFLARE_API_TOKEN 和 CLOUDFLARE_ACCOUNT_ID");
        console.log("   或使用 Dashboard 连接: https://dash.cloudflare.com → Workers & Pages → Connect to Git");
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
