---
title: 开发前的准备
date: 2025-08-01 07:25:23
tags:
---
`Google Cloud` 有两种服务类型：
- `Google Cloud Platform`：这个是`Google Cloud` 云服务的底层平台，提供几乎大部分常用的服务；
- `Firebase`：提供更加整合的常用服务，但是部分服务功能只有比较弱的功能；


## 6.1 开发过程和开发机设置

### 6.1.1 开发及部署环境

#### 前端开发工具和语言
- 前端开发工具：_vscode_；
- 前端开发语言：_Javascript_；
- 后端开发语言：初期 _NodeJS_，未来高负载的情况下使用 _python_；
- 后端数据库：初期 _SQLite_，未来高负载的情况下使用 _PostgreSQL_；

#### _npm_ 使用

```bash
# 全局安装包
npm install -g vercel@latest
```

#### _pnpm_ 使用

```bash
# 在 learning-basic 子项目下，安装 nodejs 包到生产依赖中
pnpm add jose --filter=learning-basic --save-prod

# 安装到子项目的开发依赖中
pnpm add <包名> -D --filter=<子项目名>
pnpm add <包名> --save-dev --filter=<子项目名>


# 在 learnin-basic 子项目下，查看开发依赖和生产依赖安装的 nodejs 包
pnpm list --prod --filter=learning-basic
pnpm list --dev --filter=learning-basic
```

#### 后台服务
- 初期：_Cloudflare_ 全家桶，主要处理 _web pages_，_edge functions_，_D1_ 数据库；
- 中期：如果需要 _NodeJS_ 的能力，后台使用 _Vercel_；
- 中后期：_Google GCP_；
- 后期：如果量比较大，并且较多的基于 _python_ 能力则使用 _AWS spotlight_ 和 _GCP_ 租用主机服务；
- 数据库：_SQLite_ 使用 _Cloudflare D1_，_PostgreSQL_ 使用 _supabase_；
- 用户管理：_supabase_ 的 _Auth_ 服务；

#### _Cloudflare_ 免费额度
- _Workers & Web Pages Functions: Up to 10ms CPU time per request, Up to 100,000 per day (UTC+0)_；
- _R2: Storage 10 GB-month / month, Class A Operations 1 million requests / month, Class B Operations 10 million requests / month, Egress (data transfer to Internet) Free_；
- _D1: Serverless SQL database, Up to 5 million rows read per day, Up to 100,000 rows written per day, 5GB of included storage_；
- _KV: Global low-latency key-value edge storage, Up to 100,000 read operations per day, Up to 1,000 write, delete, list operations per day_；
- _Durable Objects: Serverless compute and SQL database, Up to 100,000 requests per day, Up to 13,000 GB-sec of duration per day, Up to 5 million rows read per day, Up to 100,000 rows written per day, 5GB of included storage_；

####  _Vercel_ 免费额度
- _Edge Requests: 1M /month included_；
- _Data Transfer: 100GB/month included_；
- _Functions: Active CPU 4 hours / month included, Provisioned Memory 360 GB-hours included / month_；

### 6.1.2 目录结构设置和开发流程

####  项目设置过程

- _npm_: 管理全局 _NodeJS_ 包，比如：_vercel cli, wrangler cli_；
- _pnpm_: 管理项目的 _NodeJS_ 包；

主要步骤是：
- 完成 _NodeJS_ 全局包的安装；
```bash
# 安装全局包
npm install -g corepack hexo-cli npm pnpm vercel wrangler npm-check-updates

# 查看已经按照的全局包
npm list -g depth=0

# 检查可升级的全局包
ncu -g

# 升级指定的全局包
npm install -g <包名>@latest
```
- **项目初始化 → 包建立 → 依赖安装 → 后台服务项目绑定 → 部署配置 → 开发 & 部署循环**；

####  _NodeJS_ 项目

**建立子目录 → 初始化 _package.json_ → 利用 _pnpm_ 安装依赖 → 配置 `tsconfig.json` → 配置 _vscode_**

**1. 新建子项目的目录（假设子项目都在 _apps_ 目录下）**
```bash
mkdir apps/nodejs
cd apps/nodejs
```

**2. 用 _pnpm_ 初始化 `package.json`**
```bash
# 只有初始化后，才能使用 pnpm add <包> --filter=nodejs
pnpm init
```
一般得到如下的`package.json`文件
```json
{
  "name": "learning-nodejs",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node index.js"
  }
}
```

**3. 安装依赖到项目**
```bash
pnpm add -D typescript ts-node @types/node --filter=nodejs
```

**4. 添加代码文件**
在`apps/nodejs/`里加一个`index.ts`：
```ts
console.log("Hello from learning-nodejs!");
```
加一个`tsconfig.json`：
```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["**/*.ts"]
}
```

**5. _vscode_ 配置**
在 _monorepo_ 根的 `.vscode/launch.json` 里，加一个：
```json
{
  "type": "node",
  "request": "launch",
  "name": "Run current TS file (learning-nodejs)",
  "runtimeExecutable": "pnpm",
  "args": [
    "--filter",
    "learning-nodejs",
    "exec",
    "ts-node",
    "${file}"
  ],
  "cwd": "${workspaceFolder}/apps/learning-nodejs",
  "console": "integratedTerminal",
  "skipFiles": ["<node_internals>/**"]
}
```

#### _monorepo_ 单一代码库

**Monorepo**（Mono-repository 的缩写，意为“单一代码库”）是一种版本控制策略，它将**多个独立的项目**（通常是相关的）存放在**同一个代码库中**。这与传统的 **Polyrepo**（_Poly-repository_，意为“多代码库”）结构形成对比。在 _Polyrepo_ 中，每个独立的项目都有自己的 Git 仓库。

**举例说明**

假设你正在开发一个 _Web_ 应用，包含：
1. 一个 _Flask_ 后端 _API_；
2. 一个 _React_ 前端应用；
3. 一个共享的 _Python_ 工具库；

- **_Polyrepo_ 结构：**
    - `my-api` _Git_ 仓库；
    - `my-frontend` _Git_ 仓库；
    - `my-shared-lib` _Git_ 仓库；
        
- **_Monorepo_ 结构：**
    - 一个 _Git_ 仓库 `my-project`；
    - 目录结构如下：
        ```
        /my-project
        ├── packages/
        │   ├── my-api/          # Flask 后端
        │   ├── my-frontend/     # React 前端
        │   └── my-shared-lib/   # 共享库
        ├── tools/
        └── package.json
        ```

#### 目录结构

```bash
repo/
├─ apps/
│  ├─ frontend/               # Cloudflare Pages 项目（站点）
│  │  ├─ src/                 # 前端源码
│  │  ├─ dist/                # 构建产物（不进 Git）
│  │  ├─ functions/           # Pages Functions 源码（API/边缘函数）
│  │  ├─ package.json
│  │  └─ .dev.vars
│  ├─ backend/                # 独立 Worker（如果有）
│  │  ├─ src/                 # Worker 源码
│  │  ├─ package.json
│  │  └─ wrangler.toml
│  └─ learning-basic/         # 你现在这个 app
│     ├─ src/                 # 源码
│     ├─ dist/                # 构建产物（不进 Git）
│     ├─ functions/           # 若此 app 是一个 Pages 项目并使用 Functions
│     └─ package.json
├─ packages/
│  └─ logger/
│     ├─ src/                 # 共享库源码（JS/TS）
│     ├─ package.json
│     └─ (可选) tsup/rollup 配置
├─ pnpm-workspace.yaml
├─ package.json               # 根 scripts（dev、build、deploy 等）
└─ .gitignore
```

现代前端**通常把源码（_src_ 等）和产物目录（_public / dist / build_）分开**。这样的好处是，_CI/CD_ 更清晰：`build → public/dist → deploy`。

- **开发源码（主要是静态的网页）放在 `src/`**（_HTML、CSS、JS_、图片等）；
- **`npm run build`** 生成产物到 `public/`（或 `dist/`、`build/`）；
- 部署平台只上传产物目录，不包含源码；

在以上的目录结构中，_monorepo_ 中共有三个项目，_frontend, backend, learning-basic_，部署的平台是 _Cloudflare_，使用的服务包括 _pages & functions, workers, D1, KV_ 等。而且还包括对 _supabase_ 功能的调用，其中：
- 采用的包管理工具是 _pnpm_；
- _learning-basic_ 主要是我学习的内容，开发语言初期主要是 _javascript_，后期会加入 _typescript_。其中网站所有的源码在`src/`中，`functions/`中包括部分 _edge function_ 的功能；
- **packages 放在仓库根的 `packages/` 目录**（和 `apps/` 并列），永远放“**源代码**”，不要放到任何 app 的 `src/` 或 `dist/` 下面；
- **Git 只提交源码与配置**：`src/`、`functions/`、`wrangler.toml`、`package.json`、`pnpm-workspace.yaml`、构建脚本等；
- **`dist/` 一般不进 _Git_**（加到 `.gitignore`）。它是构建产物，交给 _CI/Pages/Workers_ 构建或在发布到 _pnpm_ 时由 `pnpm publish` 带上，而不是提交到仓库；
- **_packages_ 需要 _Git_ 同步** ，（它们是共享库源码，工作区的其他 _app_ 要依赖它）；

```bash

pnpm add -D cpy-cli tailwindcss @tailwindcss/cli chokidar-cli rimraf concurrently
```

#### 设置子过程

主要步骤是：
1. 设置 _monorepo_ 项目结构和配置包目录（仅需执行一次，之后就是修改和调整）；
2. 建立子项目目录；
3. 配置 _pnpm_；
4. 安装必要的 _NodeJS_ 依赖；
5. 配置后台服务比如 _Vercel, Cloudflare_；
6. 配置子项目中的开发和部署配置；
7. 修改 _monorepo_ 中的`package.json`，可以在项目的根目录中进行子项目的测试和部署；

**1. 初始化项目结构**
- 创建 _monorepo_ 根目录；
- 执行 _pnpm_ 初始化；
```bash
pnpm init
```
- 配置 `pnpm-workspace.yaml`
```yaml
packages:
  - "apps/*"
  - "packages/*"
```
- 初始化根 `package.json`，锁定 _Node & pnpm_ 版本；
```json
"private": true,
"packageManager": "pnpm@10.14.0",
```
**2. 创建包（比如 _apps/backend_）**
- 在 _monorepo_ 下建立 `/apps/backend/` 目录；
- 执行该包中的初始化；
```bash
pnpm init
```
- 修改 `backend/package.json`（定义依赖、脚本）；
```json
"private": true,
"packageManager": "pnpm@10.14.0",
```
- 组织 _serverless/edge function_ 目录结构（`api/` 或 `functions/`）；
**3. 安装依赖的 _NodeJS_ 库**
- 在根目录执行一次 `pnpm install`；
- 确保 _lockfile_ 在根目录（`pnpm-lock.yaml`）；
- 按 _workspace_ 方式处理共享依赖；
**4. Vercel 项目初始化**
- 用 CLI 登录 (`vercel login`)
- 在 `backend/` 目录运行 `vercel` → 创建/绑定 Vercel 项目
- 生成 `.vercel/` 配置文件（包含 projectId 等）
**5. 配置部署命令**
- 设置 `installCommand`（pnpm filter）
- 设置 `buildCommand`（例如 `pnpm -F backend build`）
- 指定 Output Directory（如果需要）
- 根据需要写 `vercel.json`
 **6. 开发 & 部署**
- 本地：`vercel dev` → 模拟 Vercel 环境
- 部署预览：`vercel`
- 部署生产：`vercel --prod`
- 如需环境变量：`vercel env add` / `vercel pull`

#### _Vue_ 项目

**1. 在目标目录初始化项目**
```bash
cd essg-starter/apps
pnpm create vite@latest vue3
```
它会问你一些问题：
- **Project name**: （默认就是 `vue3`，回车即可）
- **Framework**: 选 `Vue`
- **Variant**: 选 `TypeScript`（推荐，如果你要写 TS）

**2. 安装依赖**
```bash
cd vue3
pnpm install
```

**3. 启动开发服务器**
```bash
pnpm run dev
```

**4. 创建 _Cloudflare Pages_ 项目
```bash
npx wrangler pages project create <项目名称>
```

**5. 部署**
```bash
pnpm run build
wrangler pages deploy dist
```

#### _Nuxt_ 项目

**1. 设置 _monorepo_**
```bash
# .gitignore
node_modules
**/.nuxt
**/.output
.env

# .npmrc
shamefully-hoist=false
strict-peer-dependencies=false
```

**2. 创建 _Nuxt_ 应用并安装依赖
```bash
# 在仓库根执行
pnpm dlx nuxi@latest init apps/nuxt
pnpm -C apps/nuxt install   # 如果 nuxt 直接完成初始化并自动安装，可以不用手动安装

# （可选）Tailwind
pnpm --filter=nuxt add -D tailwindcss @tailwindcss/cli

# 在 nuxt/app 下建立目录 assets/css，创建文件 input.css
# 加入：@import "tailwindcss";
# 在一个终端里常驻
pnpm exec tailwindcss -i ./app/assets/css/input.css -o ./app/assets/css/main-01.css --watch
```

**3. 让 _Nuxt_ 引入编译后的 _CSS_**
`apps/nuxt/nuxt.config.ts`
```ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main-01.css'], // ← 注意是 build 后的文件
  compatibilityDate: '2025-07-15'
})
```

**4. 建立首页，修改默认，启动 _Nuxt_**
```bash
# 在子项目的 app 下建立 pages 目录，并且 建立一个 index.vue
<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold">Hello Nuxt!</h1>
    <p class="mt-4 text-gray-600">这是我的首页内容。</p>
  </div>
</template>

# 修改默认的app.vue
<template>
  <div>
    <NuxtRouteAnnouncer />
    <!-- <NuxtWelcome /> -->
    <NuxtPage />
  </div>
</template>

pnpm -C apps/nuxt dev
```

**5. 产生可以发布的静态文件**
```bash
# 进入 nuxt 项目目录
cd apps/nuxt

# 生成静态发布文件
npx nuxi generate
```

**6. _SSR/Edge_ 部署（Cloudflare Functions）**
建立 _functions_ 目录，`nuxt/server`，目录内容如下：
```
apps/
 └─ nuxt/
     ├─ app/
     │   ├─ assets/
     │   ├─ pages/
     │   └─ app.vue
     ├─ server/             👈 注意，这里要和 app 平级
     │   └─ api/
     │       └─ hello.get.ts
     ├─ nuxt.config.ts
     └─ package.json
```
建立一个测试的`hello.get.ts`文件：
```ts
export default defineEventHandler(() => {
  return { msg: 'Hello from Nuxt server API', ts: Date.now() }
})
```
访问：`http://localhost:3000/api/hello`是否成功。

建立一个测试的`test01.vue`，测试 _tailwindcss_ 是否有效。
```vue
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-xl p-8 max-w-sm text-center">
      <h1 class="text-3xl font-bold text-indigo-600 mb-4">Tailwind 测试</h1>
      <p class="text-gray-600 mb-6">如果样式正确，你会看到一个卡片和按钮。</p>

      <!-- 按钮在卡片内部 -->
      <button
        class="px-6 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
      >
        测试按钮
      </button>
    </div>
  </div>
</template>
```

发布：
```bash
cd apps/nuxt

# 构建 SSR + Functions
pnpm exec nuxi build --preset cloudflare-pages
```
生成结果：
```
dist/
  _worker.js     # Pages 的单文件 Worker（高级模式）
  assets/        # 静态资源
  index.html…    # 其它静态文件
  _routes.json   # 路由提示
  _headers/_redirects（如需要）
```
本地预览（Cloudflare Pages 模拟）：
```bash
wrangler pages dev apps/nuxt/dist
```
部署命令：
```bash
wrangler pages deploy apps/nuxt/dist --project-name=<你的项目名>
```

### 6.1.2 设置 _vercel_
### 6.1.2 `VS Code`设置

#### 用户设置和工作区设置

用户的全局设置（User Settings）和工作区设置（Workspace Settings）分别存储在不同的文件中。

- **用户的全局设置（User Settings）**：
	- 该设置应用于你打开的所有 VS Code 实例，是全局性的；
	- 这个文件存储在操作系统的特定位置，它的路径因操作系统而异，通常是：
		- **Windows**：`%APPDATA%\Code\User\settings.json`
		- **macOS**：`~/Library/Application Support/Code/User/settings.json`
		- **Linux**：`~/.config/Code/User/settings.json`
- **工作区设置（Workspace Settings）**：
	- 该设置仅应用于你当前打开的 VS Code 项目。这些设置会覆盖用户的全局设置；
	- 这个文件存储在你的项目文件夹下的一个`.vscode`子目录中，文件名为`settings.json`；

#### 设置

1. `Live Server`和`Live Preview`的设置：
	- `Live Preview`是由`VSCode`提供的。它提供了一个无缝的、在编辑器内部的预览面板。它启用的端口是`3000`；
	- `Live Server`是一个`Plugins`，需要安装，并且使用外部浏览器打开，它启用的端口是`5500`；
	- 有的项目有的时候需要设置的根目录不是项目的根目录而是项目下的某个子目录作为项目的根目录，为了保证`html、css`等页面绝对路径引用的正确性，需要调整如下
```bash
# 假设需要调整的根目录为/frontend/learning-basic
"liveServer.settings.root": "/frontend/learning-basic",
"livePreview.serverRoot": "frontend/learning-basic"
```
1. 

### 6.1.3 `Node.js`设置

```PowerShell
# Windows
scoop install nvm

# 列出可安装的nodejs版本
nvm list available

# 列出当前安装的node版本
nvm list

# 选择一个版本的nodejs
nvm use <版本号>

#安装指定版本的Nodejs
nvm install <版本号>

# 列出当前版本的nodejs目录
nvm root


```

#### 安装指定模块

_Node.js_ 中，有三种安装模式，它们各自有不同的用途、安装指令和安装位置。

- **全局依赖**：可以在命令行中全局运行的工具（_CLI_），不属于任何特定项目。系统全局目录，与 _Node.js_ 版本关联；
- **本地依赖**：应用运行时必需的库，需要记录在项目/子项目的`package.json`的 _dependencies_ 中；
- **开发依赖**：应用开发时必需的库，需要记录在项目/子项目的`package.json` 的  _dependencies_ 中；

_npm_ 的**本地化**管理理念：所有的命令和依赖都是以 _package.json_ 文件为中心来运行的。如果开发者希望某个目录成为一个独立的项目，开发者需要在这个目录下运行 `npm init -y`。

```PowerShell
# 初始化当前目录为独立项目
npm init -y

# npm全局安装
npm install -g <package-name>

# 查看全局模块的安装位置
npm root -g
# 查看本地依赖的安装位置
npm root

# npm项目安装，模块安装位置：当前项目的 node_modules 目录下
npm install -D <package-name>
npm install -S <package-name>

# 列出当前 nodejs 的全局安装路径
npm list -g
```

### 6.1.4 _tailwind css_ 设置

_tailwind CSS_ 是一个高度可定制的、实用类优先的 _CSS_ 框架，用于快速构建现代用户界面。它旨在通过提供一组实用类，让开发者可以直接在 _HTML_ 标记中应用样式，从而轻松地为 _Web_ 应用程序设置样式。开发者可以通过**组合**这些实用类来设计样式，而不是编写自定义 _CSS_，这使得编写过程更快速，维护更容易。

#### 安装 _tailwind css_

最新的 _tailwind css_ 是由 _Adam Wathan_ 和 _Jonathan Reinink_ 于 _2017_ 年创立的。它起初是作为一个实验性项目开始的，目的是探讨一种新的、实用类优先的 _CSS_ 方法。这种方法强调使用预先定义的实用类直接在 _HTML_ 中设置样式，而不是编写传统的 _CSS_ 代码。随着时间的推移，这个项目逐渐发展壮大，形成了现在的 _Tailwind CSS_ 框架。_tailwind CSS_ 目前最新的版本为 _4.x_，官网地址：_[tailwindcss.com/](https://link.juejin.cn/?target=https%3A%2F%2Ftailwindcss.com%2F "https://tailwindcss.com/")_

```bash
# 通过 npm 安装 Tailwind CSS
npm install tailwindcss @tailwindcss/cli
```

## 6.2 _cloudflare_ 设置

### 6.2.1 安装管理工具和设置

```PowerShell
npm install -g wrangler

# 登录
wrangler login

# 建立项目
 wrangler pages project create <项目名称>
```

### 6.2.2 _wrangler_ 的目录结构

#### **场景1：**Pages + Functions（静态站 + `functions/` 写 API）**

适合开发者想让 Pages 负责静态，API 用 Functions 扩展。

``` bash
project/
├─ src/                         # 源码（多级子目录随意）
│  ├─ pages/
│  ├─ assets/
│  └─ styles/
├─ public/                      # 构建产物（仅此目录发布）
│  ├─ index.html
│  ├─ css/
│  ├─ images/
│  └─ ...
├─ functions/                   # Pages Functions（= Workers Runtime）
│  └─ hello.js                  # 对应路由 /hello
├─ package.json
└─ （可选）wrangler.toml        # 仅当需要 KV/D1/R2 等绑定时才需要
```

关键点：**`functions/` 在项目根目录**中；_Pages_ 会自动把 `functions/` 与 `public/` 一起打包发布。不要把函数放在 `src/` 再 _copy_，也不要放进 `public/`。

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    
    "clean": "rimraf public",
    "build:css": "npx @tailwindcss/cli -i ./src/styles/tw_input.css -o ./public/css/main.css",
    "build:copy:pages": "cpy \"src/pages/**/*\" public",
    "build:copy:assets": "cpy \"src/assets/**/*\" public",
    "build": "npm run clean && npm run build:css && npm run build:copy:pages && npm run build:copy:assets",

    "watch:css": "npx @tailwindcss/cli -i ./src/styles/tw_input.css -o ./public/css/main.css --watch",
    "watch:pages": "chokidar \"src/pages/**/*\" -c \"npm run build:copy:pages\" --initial --debounce 200",
    "watch:assets": "chokidar \"src/assets/**/*\" -c \"npm run build:copy:assets\" --initial -t 200",

    "cf-dev": "concurrently -k \"npm:watch:*\" \"wrangler pages dev public\"",
    "cf-deploy:prod": "npm run build && wrangler pages deploy public",
    "cf-deploy:preview": "npm run build && wrangler pages deploy public --branch preview"
  },
```

### 6.2.3 本地与上线

#### **本地预览**

```bash
npm run cf-dev
```

#### **预览部署**

```bash
npm run cf-deploy:preview
```

**正式部署**

```bash
npm run cf-deploy:prod
```

## 6.3 _vercel_ 设置

### 6.2.1 概念

`vercel`和`vercel dev`是 _Vercel CLI_ 中两个最核心、但用途完全不同的命令。

#### `vercel dev`的功能（本地开发）

- **功能:** 启动一个**本地开发服务器**；
- **作用:** `vercel dev`会在开发者的本地机器上创建一个环境，完美地模拟 _Vercel_ 的生产环境。它会同时运行开发者的前端代码（如 _HTML、CSS_）和开发者的后端 _Serverless Functions_（位于`api/`目录中）；
- **目的:** 让开发者能够在部署到云端之前，在本地完全测试开发者的应用，包括前端 _UI_、后端 _API_ 调用和数据流；
- **特点:** 它通常在`localhost:3000`或其他可用端口上运行，并支持热重载；

#### `vercel` 的功能（部署）

- **功能:** 将开发者的项目**部署**到 _Vercel_ 平台；
- **作用:** 这个命令会将开发者项目中的所有代码和文件上传到 _Vercel_ 的云端；
- **两种模式:**
    - **`vercel`** (不带任何标志): 这会创建一个**预览部署（_Preview Deployment_）**。_Vercel_ 会生成一个独特的、可分享的 _URL_（例如 `your-project-xxxx.vercel.app`），让开发者可以与他人分享或进行测试。这个部署不会影响开发者的生产环境；
    - **`vercel --prod`**: 这会将开发者的项目部署到**生产环境（_Production Deployment_）**。开发者的主域名（例如 `my.domain.com`）会指向这个新的部署。_Vercel_ 的零停机部署特性会确保流量无缝切换到新版本；

### 6.1.5 _vercel_ 设置

#### 配置使用 _vercel cli_

```PowerShell
# windows 下
npm install -g vercel

# 登陆 vercel
vercel login

# 链接开发目录到指定的 Vercel Project上
vercel pull --environment=development

# 完成本地开发和测试后，可以使用以下命令将项目发布到 Vercel
vercel             # 部署到预览环境
vercel --prod      # 部署到生产环境
```


## 6.3 `GCP`设置

### 6.3.1 _GCP_ 操作

#### 升级

```powershell
# windows
gcloud components update
```

#### 查看当前版本

```PowerShell
gcloud --version
```

### 6.1.4 重新设置GCP

```bash
gcloud auth revoke --all
gcloud auth login
gcloud config set project <PROJECT-ID>
gcloud config set compute/region us-west1
```

## 域名服务

`Google`提供的域名服务有两个常用，第一个是`Domains`服务，第二个是`DNS`服务：
- `Domains`服务可以帮助用户申请、管理如：`mydomain.com`这样的域名；
- `Cloud DNS`服务可以帮助用户管子域名以及设置完后申请证书的工作；

一般设置域名服务分为两个步骤：
- 将一个用户的`Google`服务映射到一个域名上；
- 将该域名注册到域名服务器上；
### 网域映射

我们以`Cloud Run`来举例。选择网域映射 -> 添加映射，有如下窗口：

![添加映射](20250805195210.png)

填入想要映射的服务，以及对应的主域名，并且填写子域名。选择完成后，会出现`DNS`记录。关注数据字段。
![DNS记录](20250805195704.png)

### `DNS`服务

在新建`DNS`服务下的记录集时，一般要填多个资料。先选择区域（主域名），然后选择添加标准。其中规范名称填写之前记录下来的数据部分。

![添加标准](20250805200011.png)

然后`Google`会自动申请`SSL`证书（`Let's Encrypt`）。一般要等待`30`分钟到`24`小时。如果出现问题可以重新申请一次。

## `Google Cloud Storage`

### 使用步骤

1. 建立存储桶；
2. 在存储桶下可以建立子目录。这个子目录不是真正的子目录，而是一个符号，但是使用的时候可以把它看成子目录；
3. `Cloud Functions`在访问`GCS`时默认会使用一个与项目关联的账号。需要对这个账号赋予`Storage Object Admin`的角色，以便可以执行上传、下载和删除的操作；

## `Cloud Function`服务

`Cloud Function`是一种无状态的计算服务。

### 触发器

`Google Cloud Functions`支持多种触发器类型，允许你的函数响应各种事件，而不仅仅是`HTTP`请求。这些触发器可以分为以下主要类别：

#### 1. `HTTP`触发器

- **说明**: 这是最直接的触发器类型。函数通过标准的 HTTP(S) 请求（如 GET、POST、PUT）被调用；
- **用途**: 构建 RESTful API、Webhooks、后端服务或处理来自客户端（浏览器、移动应用等）的请求；
- **Python 装饰器**: `@functions_framework.http`；

#### 2. `CloudEvent`触发器

`CloudEvent`是一个描述事件数据的规范，许多`GCP`服务都可以发出`CloudEven`，从而触发你的函数。这是一种**事件驱动**的编程模型。

- **`Python` 装饰器**: `@functions_framework.cloud_event`

### 本地`Cloud Function`测试

```bash
pip install functions-framework

# 在本地运行函数
# --target: 指定要运行的函数名
# 成功运行后，可以使用 Hoppscotch 向本地服务器发送请求来测试函数
functions-framework --target=<函数名> --source=main.py --port=8080
```

### 发布`Cloud Function"函数

```bash
gcloud functions deploy test-logging --entry-point=test_logging \
--runtime=python=312 --trigger-http --allow-unauthenticated \
--region=us-west1
```

## `Cloud Logging`服务

### `Logging`级别

- `Cloud Logging`共有8个级别：调试、信息、通知、警告、错误、严重、提醒、紧急；
### 调用方式

```python
def rtest_logging(request):

    """

    功能：测试 Cloud Functions 写logging 日志

    """
    import logging
    import google.cloud.logging

    client = google.cloud.logging.Client()
    client.setup_logging()
  
    logging.info("服务启动正常")
```

### 查看位置

1. 对于`Cloud Functions`服务可以在相关该函数的日志中查询到；
2. 由于现在`Cloud Functions`都是按照`Gen2`进行部署，在查看日志的时候就不能按照`Cloud Functions`进行查看，否则看不到相关的`logging.info()`等信息。需要选择`Cloud Run`下的同名函数。

![搜索日志](20250806114633.png)