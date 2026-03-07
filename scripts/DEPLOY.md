# 自动化部署配置指南

> **不想备案？** 使用 **Cloudflare Pages**、**Vercel** 或 **GitHub Pages**（见下文）——均为境外托管，无需 ICP 备案。国内访问速度尚可，绑定自定义域名可提升稳定性。

---

## 一、Cloudflare Pages 部署（推荐，免备案）

推送到 `main` 分支后自动构建并部署到 Cloudflare Pages，全球 CDN 加速。

### 方式 A：Dashboard 绑定 Git（推荐，无需 Token）

在 Cloudflare 控制台连接 GitHub，每次 push 自动部署，无需配置 API Token。

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. 授权 [Cloudflare Workers & Pages](https://github.com/apps/cloudflare-workers-and-pages) 访问你的 GitHub，选择本仓库
3. 配置构建：
   - **Production branch**：`main`
   - **Build command**：`npm ci && node scripts/pdf-to-images.mjs && cd app && npm ci && npm run build`
   - **Build output directory**：`app/out`
   - **Root directory**：留空（仓库根目录）
   - **Environment variables**（Settings → Environment variables）：
     - `NEXT_PUBLIC_BASE_PATH` = ``（空）
     - `NEXT_PUBLIC_SITE_URL` = `https://<项目名>.pages.dev`（如 `https://shenxianzhongzi.pages.dev`）

4. 保存后，首次部署会自动开始。之后每次 push 到 `main` 都会自动部署。

### 方式 B：GitHub Actions 部署（需 API Token）

使用仓库内的 `.github/workflows/deploy-cloudflare-pages.yml`，在 GitHub Actions 中构建并上传到 Cloudflare。

1. **创建空 Pages 项目**
   - Dashboard → **Workers & Pages** → **Create** → **Pages** → **Direct Upload**
   - 项目名与仓库名一致（如 `shenxianzhongzi`）

2. **获取 API 凭证**
   - **Account ID**：Dashboard 右侧边栏
   - **API Token**：[API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token** → 使用 **Edit Cloudflare Workers** 模板，勾选 **Account - Cloudflare Pages - Edit**

3. **添加 GitHub Secrets**
   - 仓库 **Settings** → **Secrets and variables** → **Actions**
   - 添加 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`

4. 推送到 `main` 或手动运行 **Actions** → **Deploy to Cloudflare Pages** → **Run workflow**

站点地址：`https://<项目名>.pages.dev`（如 `https://shenxianzhongzi.pages.dev`）

---

## 一、Netlify 部署（免备案）

项目根目录已有 `netlify.toml`，导入 GitHub 后通常可自动识别。若出现 **Page not found** 404，请检查：

1. **Site settings → Build & deploy → Build settings**
   - **Base directory**：**留空**（必须从仓库根目录构建）
   - **Build command**：`npm ci && node scripts/pdf-to-images.mjs && cd app && npm ci && npm run build`
   - **Publish directory**：`app/out`

2. **Environment variables**（Settings → Environment variables）
   - `NEXT_PUBLIC_BASE_PATH` = ``（空）
   - `NEXT_PUBLIC_SITE_URL` = `https://<你的站点>.netlify.app`

3. 若仍 404：查看 **Deploys** 中最新部署的 **Build log**，确认构建成功且 `app/out` 中有 `index.html`。

---

## 二、免备案部署（不备案首选）

**Cloudflare Pages、Vercel、GitHub Pages** 均为境外托管，**无需 ICP 备案**。

| 平台           | 免备案 | 国内速度 | 免费额度   |
|----------------|--------|----------|------------|
| **Cloudflare Pages** | ✅     | ⭐⭐⭐    | 无限带宽   |
| **Vercel**     | ✅     | ⭐⭐     | 100GB/月   |
| **GitHub Pages** | ✅   | ⭐⭐     | 无限制     |

**国内访问建议**：绑定自定义域名（如 `shenxianzhongzi.me`），避免使用 `.vercel.app` / `.pages.dev` 等易被干扰的默认域名；可将域名 DNS 解析到 Cloudflare，利用其全球 CDN 提升稳定性。

---

## 三、中国访问最快部署（需备案）

> ⚠️ 腾讯云、Gitee 等国内平台使用自定义域名通常需 **ICP 备案**。若不想备案，请用上方的 Cloudflare / Vercel / GitHub Pages。

### 方案 A：腾讯云 CloudBase

- **200+ 国内 CDN 节点**，首包 <50ms
- **免费额度**：1GB 存储 + 5GB 流量/月
- 自定义域名需备案

### 方案 B：Gitee Pages

- 国内服务器，需实名认证
- 部署后需**手动点击更新**

---

## 三、GitHub Pages 部署

推送到 `main` 分支后自动构建并部署到 GitHub Pages。

### 首次启用

1. 添加远程：`git remote add origin https://github.com/用户名/仓库名.git`
2. 推送：`git push -u origin main`
3. 仓库 **Settings → Pages** → **Source** 选 **GitHub Actions**

### 日常部署（一键）

```bash
npm run deploy
```

会自动提交更改、推送到 main，触发 GitHub Actions 部署。

站点地址：`https://<用户名>.github.io/<仓库名>/`

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

## 四、手动部署

```bash
cd app
npx vercel deploy --prod
```
