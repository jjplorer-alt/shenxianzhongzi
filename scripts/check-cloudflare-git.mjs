#!/usr/bin/env node
/**
 * Cloudflare Pages + GitHub 集成诊断脚本
 * 自动检查仓库状态，帮助排查 "Cloning git repository" 失败
 */

const REPO = "jjplorer-alt/shenxianzhongzi";

async function check() {
  console.log("\n🔍 Cloudflare Pages 构建诊断\n");
  console.log("=".repeat(50));

  // 1. 检查 GitHub 仓库
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`);
    const data = await res.json();

    if (res.status !== 200) {
      console.log("\n❌ 仓库检查失败:", data.message || res.statusText);
      return;
    }

    console.log("\n✅ 仓库可访问");
    console.log("   - 名称:", data.full_name);
    console.log("   - 可见性:", data.private ? "私有" : "公开");
    console.log("   - 默认分支:", data.default_branch);
    console.log("   - 所有者类型:", data.owner.type === "User" ? "个人账户" : "组织");

    const isOrg = data.owner.type === "Organization";
    const ghAppUrl = isOrg
      ? `https://github.com/organizations/${data.owner.login}/settings/installations`
      : "https://github.com/settings/installations";

    console.log("\n" + "=".repeat(50));
    console.log("📋 排查步骤（Cloning git repository 失败）\n");
    console.log("1. 检查 Cloudflare GitHub App 是否已安装并授权本仓库：");
    console.log("   👉", ghAppUrl);
    console.log("\n2. 在页面中找到「Cloudflare Workers and Pages」→ 点击 Configure");
    console.log("\n3. 在 Repository access 下确认：");
    console.log("   - 若为「Only select repositories」，确保", REPO, "在列表中");
    console.log("   - 或改为「All repositories」临时测试");
    console.log("\n4. 若 App 被暂停，点击底部的 Unsuspend");
    console.log("\n5. 若仍失败，尝试重新安装：");
    console.log("   - Uninstall Cloudflare Workers and Pages");
    console.log("   - Cloudflare Dashboard → Pages 项目 → Settings → Builds → Manage");
    console.log("   - 重新连接 GitHub，选择本仓库");
    console.log("\n" + "=".repeat(50));
    console.log("\n🔗 快捷链接：");
    console.log("   GitHub App 设置:", ghAppUrl);
    console.log("   仓库地址: https://github.com/" + REPO);
    console.log("   Cloudflare Dashboard: https://dash.cloudflare.com");
    console.log("");
  } catch (err) {
    console.error("\n❌ 检查失败:", err.message);
  }
}

check();
