#!/usr/bin/env node
const { runWatch } = require("./lib/watch-action");

runWatch({
  workflow: "deploy-pages.yml",
  label: "GitHub Pages",
  successUrl: "https://jjplorer-alt.github.io/shenxianzhongzi/",
  startMsg: "⏳ 监控 GitHub Actions 构建...\n",
});
