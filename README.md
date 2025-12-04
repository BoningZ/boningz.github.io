# Nuxt Minimal Starter
## 本地开发

```bash
npm run dev
```

## 构建与预览

```bash
npm run build
npm run preview
```

## 生成静态站点

```bash
npm run generate
```

产物目录：`.output/public`

## 内容组织

### 文章（Posts）
路径：`content/posts/*.md`

Frontmatter 字段：
- `title` (必需)：文章标题
- `date` (必需)：发布日期（YYYY-MM-DD 格式）
- `category` (必需)：分类，可选值 `tech` | `devlog` | `life` | `emotion` | `algorithm`
- `pinned` (可选)：是否置顶，布尔值
- `description` (可选)：文章摘要
- `cover` (可选)：封面图片文件名（放在 `public/covers/` 中）
- `coverAlt` (可选)：封面图片的 alt 文本

**在文章中插入图片：**

1. 将图片文件放在 `public/photos/` 目录中
2. 在 Markdown 中使用标准语法：

**方案 1：简单图片（默认全宽）**
```markdown
![图片描述](/photos/image-name.jpg)
```

**方案 2：带图题的图片（默认全宽，推荐）**
```html
<figure>
  <img src="/photos/image-name.jpg" alt="图片描述" />
  <figcaption>这是图片的标题或说明文字</figcaption>
</figure>
```

**方案 3：控制宽度的图片（竖幅/竖图推荐）**
适合竖幅照片，限制宽度避免过大：
```html
<figure style="max-width: 50%;">
  <img src="/photos/portrait.jpg" alt="竖幅照片" />
  <figcaption>竖幅照片的说明文字</figcaption>
</figure>
```

常用宽度设置：
- `max-width: 50%;` - 占屏幕宽度 50%（竖幅照片推荐）
- `max-width: 70%;` - 占屏幕宽度 70%
- `max-width: 100%;` - 占屏幕宽度 100%（默认，适合横幅）

**方案 4：自定义宽度和对齐**
```html
<figure style="max-width: 45%; margin: 16px auto;">
  <img src="/photos/portrait.jpg" alt="竖幅照片" />
  <figcaption>这是一张竖幅照片</figcaption>
</figure>
```

**完整示例：**
```markdown
---
title: 我的旅行记
date: 2025-12-05
category: life
cover: travel.jpg
---

这是一些旅行照片。

竖幅照片（宽度受限）：
<figure style="max-width: 50%;">
  <img src="/photos/selfie.jpg" alt="自拍照" />
  <figcaption>在伦敦拍的自拍照</figcaption>
</figure>

横幅照片（全宽显示）：
<figure>
  <img src="/photos/landscape.jpg" alt="伦敦全景" />
  <figcaption>从泰晤士河拍摄的伦敦全景</figcaption>
</figure>

简单图片：
![另一张照片](/photos/simple.jpg)
```

**图片样式说明：**
- 竖幅图片：使用 `max-width: 50%` 或 `45%` 效果最佳
- 横幅图片：保持默认 `max-width: 100%`
- 图片自动居中、添加圆角、边框和阴影效果
- 响应式设计：移动设备自动调整为全宽
- 图题采用灰色斜体，位于图片下方

### 相册（Gallery）
路径：`content/gallery/*.json`

JSON 字段说明：
- `slug` (必需)：唯一标识符
- `date` (必需)：拍摄日期
- `location` (必需)：地点
- `caption` (可选)：图片描述
- `image` (必需)：图片路径（通常为 `/photos/xxx.jpg`）
- `md` (可选)：关联的 Markdown 文件路径

图片放置：`public/photos/*`

### 相册 Markdown 详情（Gallery MD）
路径：`content/gallery-md/*.md`

可选字段：
- `slug` (可选)：与对应 JSON 中的 slug 保持一致

## GitHub Pages 部署

已内置 GitHub Actions（`.github/workflows/deploy.yml`）在 `main` 分支 push 时自动构建并发布到 Pages。
在仓库 Settings → Pages 选择 `GitHub Actions` 作为 Source 即可。
Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
