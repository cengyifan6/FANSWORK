# Industrial Design Portfolio · Astro

An editorial-style, bilingual (Simplified Chinese / English) industrial design portfolio built with Astro, plain CSS, and a small amount of JavaScript. The site is static by default and configured for Netlify.

> **Important:** this is a customizable starter template. The name, email, education / experience fields, sample project descriptions, dates, and project visuals are placeholders. Replace them with your real details before publishing. Do not present sample concept cases as commercial projects or validated results.

## Requirements

- Node.js 22 LTS (see `.nvmrc`)
- npm 10 or a compatible npm version

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Astro, usually `http://localhost:4321`. The root route redirects to `/zh/`; English is available at `/en/`.

## Build and preview

```bash
npm run check
npm run build
npm run preview
```

The generated static site is written to `dist/`.

## Content editing guide

### 1. Personal profile and links

Edit `src/data/site.js`:

- `name`: display name
- `role.zh` / `role.en`: job title
- `intro.zh` / `intro.en`: home-page introduction
- `location`: location / availability
- `email`: replace `hello@example.com` with a working email address
- `social`: add only real social profile URLs, for example `{ label: 'LinkedIn', url: 'https://...' }`
- `resumePath`: leave as an empty string until a real résumé file exists; then add the file to `public/files/` and set a path such as `/files/resume.pdf`
- `siteUrl`: optional. In production, you can also set `PUBLIC_SITE_URL` in Netlify (for example, your real deployed domain) to enable canonical metadata.

Education and experience display copy lives in the `copy` object in this same file (`educationValue`, `educationNote`, `experienceValue`, `experienceNote` for each language).

### 2. Industrial design case studies

Edit `src/data/projects.js`. Each project has a `slug`, `title`, `subtitle`, `summary`, `cover`, `alt`, `tags`, `role`, `overview`, `challenge`, `approach`, `process`, `outcome`, and `gallery` fields. The `projects` array controls project cards and automatically generates one detail page per language for each slug.

To add a project:

1. Duplicate one object in `projects`.
2. Give it a unique URL-safe `slug` (English letters and hyphens recommended).
3. Add Chinese and English text for all localized fields.
4. Place image files in `public/images/` and refer to them with absolute public paths such as `/images/my-project-cover.webp`.
5. Use verified details; change `year`, `role`, outcome claims, and status as appropriate.

Keep `gallery` paths valid. Project data is content, not component markup, so the same structure is reused by the home page and case-study template.

### 3. Replace the included visuals

The SVG files in `public/images/` are original, schematic placeholder illustrations intended to make the project preview work without external image dependencies. Replace them with your own renderings, sketches, CMF boards, prototype photos, or technical diagrams.

Suggested exports:

- Project covers: WebP / AVIF, roughly 1600–2200 px wide, with a consistent aspect ratio.
- Case-study visuals: 1400 px or wider where detailed annotations matter.
- Keep image file sizes reasonable; use `loading="lazy"` for below-the-fold images and descriptive `alt` text.

If you replace an SVG reference with a raster file, update both the `cover` and `gallery` values in `src/data/projects.js`.

### 4. Digital projects

Edit `digitalProjects` in `src/data/projects.js`. Set `href` only when a real destination exists; empty values intentionally display a “link to be added” note instead of producing a broken link.

### 5. Fonts and visual system

Global styles and CSS variables are in `src/styles/global.css`. The current theme uses warm white, charcoal, gray rules, and a restrained vermilion accent. The Google Fonts link in `src/layouts/BaseLayout.astro` loads DM Sans, DM Mono, and Instrument Serif. If you need a fully self-hosted/offline site, remove that link and specify installed system font fallbacks in the CSS.

## Routes

- `/` → redirects to `/zh/`
- `/zh/` → Chinese homepage
- `/en/` → English homepage
- `/{lang}/projects/{slug}/` → localized case-study page

The language toggle on case-study pages preserves the current project's slug across locales.

## Deploy to Netlify

This project uses static output and does not need a server adapter. Netlify configuration is included in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 22

Recommended Git-based deployment:

1. Create a Git repository and push this folder to GitHub, GitLab, or Bitbucket.
2. In Netlify, choose **Add new site → Import an existing project**.
3. Connect the repository. Confirm build command `npm run build` and publish directory `dist`.
4. Optionally define `PUBLIC_SITE_URL` in the site's environment variables using the real public domain, then redeploy.
5. After publishing, test `/`, `/zh/`, `/en/`, every case-study route, mobile navigation, images, contact links, and résumé download (if enabled).

You can also test the final build locally with `npm run build` and `npm run preview` before connecting Netlify.

## Accessibility and quality notes

- Semantic landmarks and heading structure
- Skip-to-content link
- Visible keyboard focus states
- Mobile navigation exposes `aria-expanded`
- Reduced-motion preference is respected
- Descriptive image `alt` text, explicit dimensions, lazy loading for non-critical images
- Basic description / Open Graph metadata; canonical URL is emitted when `PUBLIC_SITE_URL` or `siteUrl` is configured

## File structure

```text
src/
  components/       Header, Footer, ProjectCard, SectionHeading
  data/             site profile, bilingual UI copy, project data
  layouts/          BaseLayout and shared document metadata
  pages/
    index.astro     default redirect to Chinese
    [lang]/index    Chinese / English home pages
    [lang]/projects/[slug]  project detail template
  styles/           global CSS design system
public/
  images/           original schematic placeholder visuals
  files/            place a real résumé PDF here if needed
  favicon.svg
netlify.toml
astro.config.mjs
```

## 交互增强版说明

本版本在原有结构上增加了更完整的浏览体验，灵感来自 Apple 官网常见的克制型产品叙事与连续动效模式；不复制其品牌素材或具体实现。

### 新增交互

- **页面转场**：使用 Astro `ClientRouter` / View Transitions，在首页与案例页之间进行轻量转场，并对作品封面和标题设置共享转场名称。
- **滚动进度**：顶部细线进度条随阅读位置变化；导航栏滚动后收紧并增强半透明背景；返回顶部按钮按滚动距离出现。
- **渐进式内容显现**：章节标题、作品卡片、案例内容在进入视口时淡入上移；尊重 `prefers-reduced-motion` 设置。
- **作品分类筛选**：首页可按工业装备、交通工具、产品设计筛选，并更新无障碍状态和结果数量。
- **作品图片沉浸查看**：案例页画廊以原生 `<dialog>` 打开大图，支持上一张 / 下一张、左右方向键与 Escape 关闭。
- **导航状态联动**：首页导航根据阅读位置更新当前章节；案例详情页目录会标记当前阅读章节。
- **移动端导航优化**：全屏式移动菜单、汉堡图标转场、Escape 关闭与滚动锁定。
- **微交互**：作品封面缩放、箭头反馈、筛选和按钮状态均使用短促且可控的动效。

### 主要代码位置

- `src/scripts/interactions.js`：滚动进度、菜单、视口显现、分类筛选、目录追踪和图片灯箱。
- `src/styles/global.css`：转场动效、响应式布局、悬停状态、无障碍动效回退。
- `src/layouts/BaseLayout.astro`：站点级客户端转场、阅读进度、全局交互入口。
- `src/components/ProjectCard.astro`：作品封面和标题的共享元素转场。
- `src/pages/[lang]/projects/[slug].astro`：案例页图片灯箱与目录。

### 本地运行与验证

```bash
npm install
npm run dev
```

构建并预览：

```bash
npm run build
npm run preview
```

部署到 Netlify：Build command 为 `npm run build`，Publish directory 为 `dist`。如果浏览器支持 View Transitions，将使用浏览器原生转场；其他环境会退回普通页面替换。减少动态效果设置开启时，内容显现与转场动画会尽量被弱化或关闭。
