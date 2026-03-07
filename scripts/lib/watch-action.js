/**
 * 共享：监控 GitHub Actions workflow 直到完成
 */
const https = require("https");

const REPO = "jjplorer-alt/shenxianzhongzi";
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

async function runWatch({ workflow, label, successUrl, onFail, startMsg, failHint, failUrl }) {
  if (startMsg) console.log(startMsg);
  const url = `https://api.github.com/repos/${REPO}/actions/workflows/${workflow}/runs?per_page=1`;
  const start = Date.now();

  while (Date.now() - start < MAX_WAIT) {
    const data = await fetch(url);
    const run = data.workflow_runs?.[0];
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
        console.log(`✅ ${label} 部署成功`);
        console.log("=".repeat(50));
        console.log(`\n🌐 站点: ${successUrl}`);
        process.exit(0);
      } else {
        console.log("❌ 部署失败");
        console.log("=".repeat(50));
        console.log("\n📋 查看日志:", html_url);
        if (failHint) console.log("\n💡 " + failHint.replace(/\n/g, "\n   "));
        if (failUrl) {
          const { exec } = require("child_process");
          const cmd = process.platform === "win32" ? "start" : process.platform === "darwin" ? "open" : "xdg-open";
          exec(`${cmd} "${failUrl}"`, () => {});
        }
        if (onFail) onFail();
        process.exit(1);
      }
    }

    await new Promise((r) => setTimeout(r, POLL_INTERVAL));
  }

  console.log("\n⏱️ 超时，请手动查看: https://github.com/" + REPO + "/actions");
  process.exit(1);
}

module.exports = { runWatch };
