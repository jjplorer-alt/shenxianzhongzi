#!/usr/bin/env node
/**
 * 获取 Vercel 部署所需的 ID，用于配置 GitHub Secrets
 *
 * 运行: cd app && npx vercel link
 * 然后查看 .vercel/project.json 获取 projectId 和 orgId
 *
 * 或运行此脚本（需先 vercel login）:
 * node scripts/get-vercel-ids.js
 */
const fs = require("fs");
const path = require("path");

const projectPath = path.join(__dirname, "..", "app", ".vercel", "project.json");
if (!fs.existsSync(projectPath)) {
  console.log(`
请在 app 目录下运行 'npx vercel link' 连接项目，然后重试。
或手动从以下位置读取:
  ${projectPath}
`);
  process.exit(1);
}

const project = JSON.parse(fs.readFileSync(projectPath, "utf8"));
console.log(`
将以下值添加到 GitHub 仓库的 Settings → Secrets and variables → Actions:

  VERCEL_TOKEN      = (在 vercel.com/account/tokens 创建)
  VERCEL_ORG_ID     = ${project.orgId}
  VERCEL_PROJECT_ID = ${project.projectId}
`);
