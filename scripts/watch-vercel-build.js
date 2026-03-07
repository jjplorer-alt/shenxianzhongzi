#!/usr/bin/env node
const { runWatch } = require("./lib/watch-action");

runWatch({
  workflow: "deploy-vercel.yml",
  label: "Vercel",
  successUrl: "https://shenxianzhongzi.vercel.app",
  startMsg: "⏳ 监控 Vercel 构建...\n",
  failHint: "请添加 GitHub Secrets: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID\n   或使用: npm run deploy:vercel:setup 通过 Vercel 导入（无需 Secrets）",
  failUrl: "https://vercel.com/new/import?repository-url=https%3A%2F%2Fgithub.com%2Fjjplorer-alt%2Fshenxianzhongzi",
});
