# Cloudflare Pages 部署

推送 `main` 分支后，GitHub Actions 自动构建并部署到 Cloudflare Pages。

## 必需的 GitHub Secrets

在 GitHub 仓库 **Settings → Secrets and variables → Actions** 中添加：

| Secret 名称 | 说明 | 获取方式 |
|-------------|------|----------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API 令牌 | [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) → Create Token → 选 "Edit Cloudflare Workers" 或自定义包含 Pages 权限 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID | [Cloudflare Dashboard](https://dash.cloudflare.com) 右侧边栏底部 "Account ID" |

保存后，下次 push 到 main 即可自动部署。站点地址：https://shenxianzhongzi.pages.dev
