#!/usr/bin/env node
/**
 * 一键打开 Vercel 导入页面，通过 Git 连接部署（无需 GitHub Secrets）
 */
const { exec } = require("child_process");
const url =
  "https://vercel.com/new/import?repository-url=https%3A%2F%2Fgithub.com%2Fjjplorer-alt%2Fshenxianzhongzi&project-name=shenxianzhongzi&root-directory=app";

console.log("🚀 打开 Vercel 导入页面...\n");
console.log("请按以下步骤操作：");
console.log("1. 选择 Root Directory 为 app");
console.log("2. 选择 Framework Preset 为 Next.js");
console.log("3. 点击 Deploy\n");

const cmd = process.platform === "win32" ? "start" : process.platform === "darwin" ? "open" : "xdg-open";
exec(`${cmd} "${url}"`, () => {});
