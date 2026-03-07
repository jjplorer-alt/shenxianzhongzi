# 自动化部署配置指南

## 一、GitHub Pages 部署

推送到 `main` 分支后自动构建并部署到 GitHub Pages。

### 启用步骤

1. 将代码推送到 GitHub 仓库
2. 在仓库 **Settings → Pages**
3. **Source** 选择 **GitHub Actions**
4. 推送后访问：`https://<你的用户名>.github.io/<仓库名>/`

若只需 GitHub Pages，可删除 `.github/workflows/deploy.yml`（Vercel 工作流）。

---

## 二、GitHub Actions → Vercel 自动部署

推送到 `main` 分支时自动部署到 Vercel。

### 1. 配置 GitHub Secrets

在 GitHub 仓库 **Settings → Secrets and variables → Actions** 中添加：

| Secret 名称 | 获取方式 |
|------------|---------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) 创建 |
| `VERCEL_ORG_ID` | 运行 `node scripts/get-vercel-ids.js` |
| `VERCEL_PROJECT_ID` | 同上 |

### 2. 获取 Org/Project ID

```bash
cd app
npx vercel link   # 若未链接，按提示连接现有项目
cd ..
node scripts/get-vercel-ids.js
```

---

## 二、Namecheap DNS 自动化

将 `shenxianzhongzi.me` 指向 Vercel。

### 1. 启用 Namecheap API

1. 登录 [Namecheap](https://www.namecheap.com)
2. **Profile → Tools → API Access** 启用
3. 将你的公网 IP 加入白名单（点 "Get your IP" 获取）

### 2. 设置环境变量并运行

```bash
# 方式 A：直接设置环境变量
export NC_API_USER=你的用户名
export NC_API_KEY=你的ApiKey
export NC_USERNAME=你的Namecheap登录名
export NC_CLIENT_IP=你的公网IP
node scripts/setup-namecheap-dns.js

# 方式 B：使用 .env.deploy
cp .env.deploy.example .env.deploy
# 编辑 .env.deploy 填入实际值
npx dotenv -e .env.deploy -- node scripts/setup-namecheap-dns.js
```

### 3. Vercel 中添加域名

在 [Vercel Dashboard](https://vercel.com) → 项目 **shenxianzhongzi** → **Settings → Domains** 添加 `shenxianzhongzi.me` 和 `www.shenxianzhongzi.me`。

若域名已被其他项目占用，先在对应项目中移除，再添加到本项目。

---

## 三、手动部署

```bash
cd app
npx vercel deploy --prod
```
