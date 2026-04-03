#!/usr/bin/env node
const { runWatch } = require("./lib/watch-action");

runWatch({
  workflow: "deploy-cloudflare-pages.yml",
  label: "Deploy Cloudflare + GitHub Pages",
  successUrl: "https://sxzz.pages.dev",
  startMsg: "⏳ 监控部署工作流（Cloudflare + GitHub Pages）...\n",
  failHint: "若未配置 Secrets，请添加 CLOUDFLARE_API_TOKEN 和 CLOUDFLARE_ACCOUNT_ID\n   或使用 Dashboard 连接: https://dash.cloudflare.com → Workers & Pages → Connect to Git",
  failUrl: "https://dash.cloudflare.com",
});
