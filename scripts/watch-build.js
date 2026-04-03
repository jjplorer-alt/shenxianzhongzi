#!/usr/bin/env node
const { runWatch } = require("./lib/watch-action");

runWatch({
  workflow: "deploy-cloudflare-pages.yml",
  label: "Deploy Cloudflare + GitHub Pages",
  successUrl: "https://jjplorer-alt.github.io/shenxianzhongzi/",
  startMsg: "⏳ 监控 GitHub Actions 构建...\n",
});
