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

- 文章：`content/posts/*.md`
  - Frontmatter: `title`, `date`, `category` in [tech|devlog|life|emotion], `pinned`, `description`
- 相册：`content/gallery/*.json`
  - 字段：`slug`, `date`, `location`, `caption?`, `image`
- 图片放置：`public/photos/*`

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
