---
title: " 第四章 博客服务"
date: 2025-05-04 11:56:41
tags:
  - 云服务
  - 博客
categories:
  - 计算机
  - 软件服务
cover: cover.jpg
---
## 4.1 常见的博客服务

### 4.1.1 开启你的数字写作之旅

在数字化时代，博客（Blog）已成为个人表达、知识分享、建立社区乃至推广品牌的重要平台。无论是记录生活点滴，分享专业见解，还是展示创意作品，博客都提供了一个直接且灵活的方式与世界沟通。为了帮助人们建立和管理自己的博客，市面上有多种多样的博客服务可供选择，大致可以分为托管服务和自建服务两大类。

#### 什么是博客

博客，全称 Weblog，意为“网络日志”，是一种通常按照时间顺序排列、持续更新的在线日记或文章集合。现代博客的内容形式多样，可以包含文字、图片、音频、视频等多媒体元素。博客的核心在于其开放性和互动性，读者通常可以在文章下方发表评论。

### 4.1.2 为什么需要博客服务

建立博客需要一个平台来发布和管理内容。博客服务就是提供这些功能的工具或平台，它们负责处理内容的存储、发布、页面的展示、读者互动等一系列技术细节，让作者可以专注于内容创作本身。

#### 常见的博客服务类型

**1. 托管博客服务 (Hosted Blog Platforms)**

这类服务提供一站式的解决方案，用户无需关心服务器、域名配置等复杂的技术问题。通常注册一个账号即可快速开始写作和发布。

- **特点：**
    - **易于上手：** 对技术要求极低，适合新手或不想折腾技术的人；
    - **维护简单：** 平台负责服务器维护、安全更新等，用户省心；
    - **社区支持：** 一些平台拥有庞大的用户群体，便于交流和推广；
- **缺点：**
    - **定制性有限：** 在界面设计、功能扩展方面可能受到平台限制；
    - **控制权较低：** 内容和数据存储在第三方平台，可能受平台政策影响；
    - **盈利限制：** 部分平台对商业化或广告有限制；
    - **品牌独立性：** 域名通常包含平台名称（如 `yourname.wordpress.com`）；
    - **地域限制：** 不少美国的博客托管服务站点在国内无法访问；
- **常见示例：**
    - **WordPress.com:** 全球最流行的博客平台之一，提供免费和付费方案，功能强大且灵活；
    - **Blogger (Google):** 简单易用，与 Google 服务集成紧密，适合个人用户；
    - **Medium:** 专注于内容本身，界面简洁，有利于高质量内容的传播和发现；
    - **Substack:** 流行于邮件订阅，适合时事评论员、作家和独立记者等；

**2. 自建博客服务 (Self-Hosted Blog Platforms)**

这类服务提供博客系统的软件，用户需要自己准备服务器（虚拟主机、VPS 或独立服务器）和域名，并自行安装、配置和维护博客系统。

- **特点：**
    - **完全控制：** 对博客拥有完全的控制权，包括代码、数据和服务器；
    - **高度定制：** 可以自由修改界面、安装插件，实现各种个性化功能；
    - **数据所有权：** 数据存储在自己的服务器上，更加安全可控；
    - **盈利自由：** 不受平台限制，可以自由添加广告、推广等；
- **缺点：**
    - **技术要求高：** 需要一定的服务器管理、系统安装和维护知识；
    - **维护成本：** 需要自行负责系统更新、安全防护、备份等；
    - **搭建过程相对复杂：** 相较于托管服务，初期设置更繁琐；
- **常见示例：**
    - **WordPress.org:** WordPress 软件的官方版本，需要在自己的服务器上搭建，功能极其强大，生态系统完善；
    - **Ghost:** 专注于写作体验，界面简洁，性能优秀，适合专注于内容创作的博主；

**3. 静态网站生成器 (Static Site Generators - SSG)**

这是一类特殊的自建博客方式，它们不依赖数据库和服务器端动态处理。作者使用文本文件（如 Markdown）写作，然后通过生成器工具将其转换成纯静态的 HTML、CSS 和 JavaScript 文件。生成的静态文件可以直接部署在任何支持静态网页托管的环境中。Hexo 就属于此类。

- **Hexo 的特点：**
    - **基于 Node.js:** 使用 JavaScript 编写，安装和运行需要 Node.js 环境；
    - **命令行操作:** 主要通过命令行进行文章创建、生成、部署等操作；
    - **丰富的插件和主题:** 拥有活跃的社区，提供了大量的主题和插件，可以实现多种功能和美化效果；
    - **快速生成:** 生成静态页面的速度很快；
    - **易于部署:** 生成的静态文件可以轻松部署到 GitHub Pages, Gitee Pages, Netlify 等免费或付费的静态网站托管服务上；
    - **版本控制友好:** 源文件通常是 Markdown 文本，非常适合使用 Git 进行版本控制；
- **SSG 的整体特点：**
    - **性能优异:** 纯静态文件加载速度快，对服务器压力小；
    - **安全性高:** 没有数据库和服务器端动态代码，攻击面大大减少；
    - **成本低廉:** 静态网站托管通常非常便宜，甚至有免费选项；
    - **版本控制和协作:** 文本文件便于版本控制，适合多人协作；
- **SSG 的缺点：**
    - **技术门槛:** 需要熟悉命令行、Markdown 语法和相关的构建工具；
    - **缺乏动态功能:** 原生不支持用户注册、评论（通常需要集成第三方服务如 Disqus 或 Valine）、在线编辑器等动态功能；
    - **内容更新流程:** 更新内容需要本地生成后重新部署，不如在线编辑器即时；
- **常见示例：**
    - **Hexo:** 专注于博客，快速、简洁；
    - **Jekyll:** Ruby 编写，GitHub Pages 原生支持；
    - **Hugo:** Go 语言编写，速度极快；
    - **Gatsby:** 基于 React，功能强大，可构建复杂的网站；

## 4.2 Hexo 服务

**Hexo 是一个快速、简洁且高效的开源博客框架，** 它是一个基于 Node.js 的静态网站生成器，完全免费使用。由于生成的是纯静态文件，网站访问速度快，安全性高，服务器资源占用少。他的主要特点和优势包括如下：

- **极快的生成速度：** Hexo 以其出色的生成速度而闻名，即使有大量的文章，也能在短时间内完成生成；
- **支持 Markdown：** 使用 Markdown 语言写文章，语法简单，易于上手；
- **丰富的插件系统：** Hexo 拥有强大的插件 API，可以通过安装各种插件来扩展功能，如生成 RSS Feed、网站地图、本地搜索、加密文章等；
- **多样化的主题：** 社区提供了大量精美的主题供选择，你可以轻松切换主题来改变博客的外观，也可以自己开发主题；
- **易于部署：** 内置了多种部署工具，通过简单的命令就可以将网站部署到各种平台；

Hexo 的核心理念和工作流程如下：
- **静态网站生成器：** Hexo 不像 WordPress 或其他动态博客系统那样需要数据库和服务器端脚本（如 PHP）。它做的事情是把你用 Markdown（或其他标记语言）写好的文章，配合你选择的主题，通过特定的渲染引擎处理后，生成一套纯静态的 HTML, CSS, JavaScript 文件；
- **生成与部署：** 生成的这套静态文件可以非常方便地部署到各种支持静态页面的托管服务上，比如 GitHub Pages, GitLab Pages, Netlify, Vercel 等，这些服务的特点是快速、稳定且通常对静态网站提供免费或低成本的托管;
- **典型的工作流程：** 
    - 安装 Node.js, Hexo；
    - 创建一个新的博客项目 （`hexo init`）；
    - 在 `source/_posts` 文件夹下用 Markdown 写文章；
    - 选择并配置一个主题；
    - 运行`hexo generate`命令生成静态文件；
    - 运行`hexo server`在本地预览；
    - 运行`hexo deploy`将生成的静态文件部署到你的网站空间；

### 4.2.1 安装 Hexo 服务

``` bash
# 1. 安装node.js
scoop install nodejs-lts   # WIndows
brew install nodejs        # MacOS

# 安装后验证
node -v                    # 可以看到安装后node.js的版本号
```

``` bash
npm install -g hexo-cli
```

- `npm install`：这是 npm 的安装命令；
- `-g`：这个标志表示全局安装，使得`hexo`命令可以在系统的任何位置被调用；
- `hexo-cli`：这是 Hexo 的命令行接口包的名称；

**验证安装：**

安装完成后，你可以运行以下命令来验证 Hexo 是否成功安装并查看其版本号：

``` bash
hexo version
# 或者
hexo -v
```

如果命令成功执行并显示 Hexo 的版本信息，说明你已经成功安装了 Hexo CLI。接下来，你就可以使用`hexo init`命令来初始化你的博客项目了。

### 4.2.2 如何初始化一个Hexo项目

在系统中安装完Hexo之后，我们可以开始初始化一个Hexo的博客项目，初始化 Hexo 项目的命令是 `hexo init`，比如我们计划初始化的博客项目叫做MyFirstBlog。

1. **选择一个位置：** 打开你的终端或命令行工具，导航到你想要创建Hexo博客项目的文件夹的**父目录**。例如，如果你想在`~/Documents/MyBlog`这个文件夹里创建博客，那么你应该先`cd`到`~/Documents`目录；
2. **运行初始化命令：** 在你希望创建博客的父目录中，运行以下命令：

``` bash
hexo init <folder>
```

- `<folder>`：这是你想要创建的博客项目文件夹的名称。将`<folder>`替换为你想要的名称，例 `MyFirstBlog`；

	如果你想在**当前目录**直接初始化项目（不创建新的子文件夹），可以省略`<folder>`：

``` bash
hexo init
```

执行 `hexo init` 命令后，Hexo 会在指定的`<folder>`目录下（或当前目录）创建一个新的博客所需的全部文件和文件夹结构，包括：

- `_config.yml`（站点配置文件）
- `package.json`（npm 包管理配置文件）
- `scaffolds`（文章模板文件夹）
- `source`（存放文章、页面等源文件）
    - `_posts`（存放博客文章）
- `themes`（存放主题文件，默认会下载一个主题）
- `.gitignore`（Git忽略文件）

#### 其他注意事项

如果网站启用`post-asset-folder: true`，需要注意的是，默认 Hexo 提供的渲染引擎`hexo-renderer-marked`可能导致渲染后，图片的路径有问题。如果有这种情况，需要卸载默认的渲染引擎，使用`hexo-renderer-markdown-it`来代替。

``` bash
npm uninstall hexo-renderer-marked
npm install hexo-renderer-markdown-it --save
```

### 4.2.3 运行博客网站

**进入项目文件夹：** 初始化完成后，你需要进入刚刚创建的博客项目文件夹，比如：`~/Documents/MyBlog`文件夹中，运行：

``` bash
hexo clean; hexo g; hexo s
......
INFO
  ===================================================================
      #####  #    # ##### ##### ###### #####  ###### #      #   #
      #    # #    #   #     #   #      #    # #      #       # #
      #####  #    #   #     #   #####  #    # #####  #        #
      #    # #    #   #     #   #      #####  #      #        #
      #    # #    #   #     #   #      #   #  #      #        #
      #####   ####    #     #   ###### #    # #      ######   #
                            5.3.5
  ===================================================================
INFO  Start processing
INFO  Hexo is running at http://localhost:4000/ . Press Ctrl+C to stop.
```

### 4.2.4 常见 Hexo 命令

#### 建立一篇新的文章

```bash
hexo new -
```
### 4.2.5 安装Hexo主题

Hexo提供了几百个不同的Hexo主题，我们这里介绍安装butterfly这个主题。后面的个性化配置我们也是按照这个主题来进行配置。请确保你当前处于你的Hexo博客项目的根目录下（也就是包含`_config.yml`、`source`、`themes` 等文件夹的目录）。

1. **克隆Butterfly主题到`themes`文件夹：** 打开终端或命令行工具，运行以下Git命令将Butterfly主题仓库克隆到你Hexo项目的`themes`文件夹内；

``` bash
> git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/Butterfly
```

- `-b master`: 指定克隆master分支；
- `https://github.com/jerryc127/hexo-theme-butterfly.git`: Butterfly主题的Git仓库地址；
- `themes/Butterfly`: 指定克隆到Hexo项目根目录下的`themes`文件夹内，并将文件夹命名为 `Butterfly`；

2. **安装主题所需的依赖：** Butterfly主题通常需要`hexo-renderer-pug`和`hexo-renderer-stylus`这两个渲染器来解析主题文件。在你的Hexo项目根目录下运行以下命令安装它们：

``` bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

3. **修改Hexo配置文件，启用Butterfly主题：** 打开你Hexo项目根目录下的主配置文件`_config.yml`(注意不是`themes/Butterfly`里面的配置文件)。找到`theme:`这一行，将其值修改为 `Butterfly` (注意大小写，必须和你克隆到 `themes` 文件夹里的文件夹名称一致)；

``` YAML
# Site
title: Your Site Title
# ...其他配置...
theme: Butterfly # 将这里修改为 Butterfly
```

4. **清理、生成并运行Hexo：** 保存`_config.yml`文件后，运行以下命令来清理缓存、生成静态文件并在本地启动服务器进行预览：

``` bash
hexo clean; hexo g; hexo s
```

运行`hexo s`后，访问`http://localhost:4000`（默认地址）应该就能看到应用了Butterfly主题的博客了。

5.  **使用theme_config配置主题**：使用`theme_config`在主`_config.yml`中指定主题配置文件是一种非常推荐的做法，尤其对于像Butterfly这样配置项很多的主题。这样做的好处是，当你更新主题时，可以直接替换或更新`themes/Butterfly`文件夹下的文件，而不会丢失你的个性化配置，因为你的配置保存在主目录下的另一个文件中。

	- **找到主题的默认配置文件：** 进入你的Hexo项目目录下的`themes/Butterfly/`文件夹。你会在这里找到Butterfly主题的默认配置文件，它的名字通常是`_config.yml`；
	- **复制主题配置文件到Hexo项目根目录：** 将`themes/Butterfly/_config.yml`这个文件复制到你Hexo博客项目的**根目录**下（也就是和主 `_config.yml`、`source`、`themes` 等文件夹同级的地方）；
	- **重命名复制的文件（推荐）：** 为了清晰地知道这个文件是哪个主题的配置，建议将刚刚复制到根目录下的文件重命名，一个常见的命名约定是加上主题的名字，比如命名为`_config.butterfly.yml`；
	- **修改主`_config.yml`文件：** 打开你Hexo项目根目录下的主配置文件`_config.yml`。在文件的任意位置（通常习惯放在最后面，或者主题配置附近）添加或修改`theme_config`这个配置项，并将其值设置为你刚刚重命名后的文件路径；

	``` YAML
	# Main Hexo config file (_config.yml)
	
	# Site
	# ... other main site configurations...
	
	# Theme
	theme: Butterfly # 确保这里是 Butterfly
	
	# Theme Configuration
	# 指向你的 Butterfly 主题配置文件
	theme_config: _config.butterfly.yml # 目前需要起这个名字
	```

	请确保`theme_config`后面的文件路径是相对于你 Hexo项目根目录的。如果你将文件命名为`_config.butterfly.yml`并且放在了根目录下，那么值就是`_config.butterfly.yml`。
	
	**完成以上步骤后：**
	
	- Hexo 在生成网站时，会先加载 `themes/Butterfly/_config.yml` 中的默认配置。
	- 然后，它会加载你在 `theme_config` 中指定的 `_config.butterfly.yml` 文件中的配置。
	- `_config.butterfly.yml` 中的配置项会覆盖掉 `themes/Butterfly/_config.yml` 中同名的配置项。
	- 最终生效的主题配置是两者合并后的结果，以 `_config.butterfly.yml` 中的为准。
	
	**以后，所有你想对 Butterfly 主题进行的配置修改，都应该在根目录下的 `_config.butterfly.yml` 文件中进行，而不要去修改 `themes/Butterfly/_config.yml` 文件。**
	
	这样做的好处是，即使你以后通过`git pull`或其他方式更新 `themes/Butterfly` 文件夹下的主题代码，你的自定义配置 (`_config.butterfly.yml`) 也不会受到影响，保持了配置的独立性和可维护性。

### 4.2.6 配置 front-matter

#### 常用的 front-matter 配置

#### 隐藏某篇文章

在某些情况之下，可能我们需要暂时隐藏某些文章，比如尚未完成的文章。假设我们使用的是 Butterfly 主题，并且希望通过修改文章的 front-matter 来实现暂时隐藏（不让它显示在博客列表、首页等地方），最常见和推荐的方法是结合使用一个 Hexo 插件来读取 front-matter 的特定参数。

通常，这个功能不是 Hexo 核心内置的通过 front-matter 实现的，而是通过主题或插件来实现对文章列表的过滤。对于 Hexo，常用的插件是 `hexo-hide-posts`。Butterfly 主题也常与这个插件搭配使用来实现此功能。

- **安装 `hexo-hide-posts` 插件：** 如果之前没有安装过，请在你的 Hexo 项目根目录下运行以下命令：
	``` bash
npm install hexo-hide-posts --save
	```

- **配置插件 (通常默认配置即可)：** 插件默认会查找 front-matter 中的 `hidden: true` 参数来隐藏文章；
	``` Markdown
	---
	title: 这是一篇需要暂时隐藏的文章
	date: 2023-10-27 10:00:00
	tags:
	******* 隐藏文章 *******
	hidden: true # 如果插件配置 filter 为 hidden
	---
	
	文章内容...
	```

#### 支持数学公式

### 4.2.7 发布与保存

#### 配置

1. 创建 GitHub 仓库
	- 仓库名：与项目名称一致，比如`ai-classroom`；
	- 建议设置为 public
2. 安装 Hexo 部署插件
``` bash
	npm install hexo-deployer-git --save
	```
3. 配置`_config.yml` 中的 deploy 字段：
``` yaml
# 确保发布的静态网页被部署到 GitHub 指定仓库中的 gh-pages 分支
deploy:
  type: git
  repo: https://github.com/你的用户名/ai-classroom.git
  branch: gh-pages
```

#### 操作

**1. 初始化 Git，并提交源代码到 GitHub**

``` bash
git init
# 下述语句添加远程仓库
git remote add origin https://github.com/你的用户名/ai-classroom.git

# 添加并提交项目的源码
git add .
git commit -m "Init Hexo blog for ai-classroom"

# 推送到 main 分支（保存源码）
git branch -M main
git push -u origin main
```
这样你的 **所有 Markdown 源文件 + 图片 + 配置** 都在 `main` 分支。


**2. 部署静态网站到 `gh-pages` 分支**

``` bash
hexo clean
hexo g
hexo d
```
这会自动生成 `_deploy` 文件夹，并推送 `public/` 下的静态文件到 `gh-pages` 分支。

**3.设置 GitHub Pages**

- 打开 GitHub 项目 → Settings → Pages
- Source 选择：`gh-pages` 分支
- 保存后你将得到一个访问地址：`https://你的用户名.github.io/ai-classroom/`

**4. 如何持续写作并同步**

每次写完新文章后：

``` bash
# 提交源文件到 main 分支
git add .
git commit -m "Add new post"
git push origin main

# 多台电脑书写 Hexo，在另外一台电脑上获得 git 上的最新版本
git fetch
git pull origin main

# 发布网站
hexo clean
hexo g
hexo d

```

#### `GitHub`仓库结构

| 分支         | 用途                                       |
| ---------- | ---------------------------------------- |
| `main`     | 保存所有 Markdown 源文件、资源、配置                  |
| `gh-pages` | 由 Hexo 自动生成的`/public`目录下的静态网页（Hexo 自动推送） |

#### 其他

**1. 失去CSS**

部分情况下，如果`_config.yml`没有设置好，会导致推送到 GitHub 的页面失去了样式（CSS）。需要对Hexo 项目的 `_config.yml`（主配置，不是 theme 配置）中添加：
``` yaml
# 注意：不要以 / 结尾！
url: https://仓库名.github.io
root: /ai-classroom/
```

如果已经有这两个配置，需要确认它们是完全正确的：

| 字段   | 说明                    | 示例值                            |
| ---- | --------------------- | ------------------------------ |
| url  | GitHub Pages 的完整 URL  | `https://alifespace.github.io` |
| root | 项目在 GitHub Pages 的子路径 | `/ai-classroom/` （注意结尾有 `/`）   |

**2. 强制浏览器刷新**

部署在GitHub Pages 上时，Hexo + Butterfly 的静态文件会被 GitHub 的 CDN 缓存（Cloudflare/fastly），所以浏览器经常不会马上刷新你更新后的样式或脚本。我们可以通过使用版本参数控制浏览器的刷新动作。该参数在`_config.butterfly.yml`中设置。

``` yaml
# 每次部署到 GitHub Pages 后，手动修改 `version` 的值（例如换一个日期）
version: 20250506
```

浏览器和 CDN 都会认为这是新文件，从而重新下载，而不是从缓存中加载。

### 4.2.8 配置 butterfly 主题页面

#### categories 的树状结构

在 Hexo 中使用 **树状结构的 categories 是推荐做法**，尤其是当使用的是像 Butterfly 这样的主题时，它原生就支持树状分类的展示。只要你在文章的 front-matter 中**正确书写多级分类数组**，就能自动在分类页展示为树状结构。使用 categories 的“树状结构”方式，能清晰表达文章主题的层级关系，提升导航与阅读体验，是 Hexo + Butterfly 推荐的最佳实践。可以在每一篇 markdown 文件中如下书写：

``` Markdown
---
title: 什么是操作系统
date: 2025-05-05
# 特别需要注意要用两个空格表示缩进，不可以使用tab
categories:
  - 计算机
  - 软件
  - 操作系统
---
```

以上设置后，在分类页面展示为：
``` bash
计算机
└── 软件
    └── 操作系统
```

#### 生效 categories

请执行以下命令来创建`categories`页面：

``` bash
> hexo new page categories
```

接着打开生成的 `source/categories/index.md` 文件，将其前言区（front-matter）修改为：

``` yaml
---
title: 分类
date: 2025-05-18 12:00:00
type: categories
layout: categories
---
```

最后重新生成并预览

``` bash
> hexo clean; hexo g; hexo s
```

#### 生效 tags

请执行以下命令来创建`tags`页面：

``` bash
> hexo new page tags
```

接着打开生成的 `source/tags/index.md` 文件，将其前言区（front-matter）修改为：

``` yaml
---
title: 标签
date: 2025-05-18 12:00:00
type: tags
layout: tags
---
```

最后重新生成并预览

``` bash
> hexo clean; hexo g; hexo s
```

#### 增加图片的放大功能

1. 将 `_config.buttrfly.yml` 中的 **lightbox 设置**改为：

``` yml
lightbox: fancybox
```

#### 增加文章首页卡片展示图

整个网站已经开启了 post_asset_folder: true，那么可以使用最推荐的方式：把图片放进文章自己的资源文件夹中，并通过 Front-matter 引用该图片作为封面图。

```bash
# 上传的图片改名为 `cover.png`，放在如下目录（文件名可以任意）
source/_posts/blog-doc1/cover.png

# 在Markdown的 Front-matter 中添加封面字段
cover: cover.png  # 注意这里直接写文件名，不加路径
```

### 4.2.9 配置 Icarus 主题（未完成）

#### 安装主题

``` bash
cd your-hexo-site
git clone https://github.com/ppoffice/hexo-theme-icarus.git themes/icarus

## 安装依赖
npm install -S semver hexo-renderer-inferno bulma-stylus@0.8.0 hexo-component-inferno
```

#### 启用主题

在 Hexo 项目的 `_config.yml` 中设置：
```yaml
theme: icarus
```

第一次使用`hexo clean; hexo g; hexo s`会自动在项目的根目录中建立一个针对该主题配置的 yaml 文件`_config.icarus.yaml`。

### 4.2.10 其他重要功能

以下一些功能是基于`butterfly`主题，经过测试可以使用，如果使用其他的主题，可能需要做出相应的调整。我的版本分别是：`hexo 7.3.0`和`bufferfly 5.4.0`

#### 在页面嵌入 Bilibili 视频

**1. Hexo 插件注册位置**

Hexo 的自定义标签需要在 Hexo 根目录下的`scripts/`文件夹中注册，正确的文件结构如下：
```Text
ai-classroom/
├── _config.yml
├── themes/
│   └── butterfly/
│       └── _config.yml
├── scripts/
│   └── bilibili.js
└── source/
    └── _posts/
        └── example.md
```

**2. 创建 scripts/bilibili.js

在`scripts`下创建一个`js`文件，比如`bilibili.js`。内容如下：
```JavaScript
hexo.extend.tag.register('bilibili', function(args) {
  const bvid = args[0];
  const width = args[1] || '800';
  const height = args[2] || '450';
  return `<iframe src="//player.bilibili.com/player.html?bvid=${bvid}" width="${width}" height="${height}" frameborder="0" allowfullscreen></iframe>`;
});
```

**3. 在 Markdown 增加一个 Bilibili 视频**

在 Markdown 文件中，可以这样使用：
```Markdown
{% bilibili BV1Nd5GzeEps %}
```

或者带宽高参数：
```Markdown
{% bilibili BV1Nd5GzeEps 960 540 %}
```

**4. 清除缓存并重新生成页面**
```PowerShell
hexo clean
hexo g
hexo s
```

#### 在页面嵌入 youtube 视频

 **1. 创建自定义标签**

在 Hexo 根目录下创建 `scripts/youtube.js`：
```Text
hexo-project/
├── scripts/
│   └── youtube.js
```

`scripts/youtube.js` 内容：
```JavaScript
hexo.extend.tag.register('youtube', function(args) {
  const videoId = args[0];
  const width = args[1] || '800';
  const height = args[2] || '450';
  return `<iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
});
```

**2. 使用自定义标签**

在 Markdown 文件中使用：
```Markdown
{% youtube zuL_hZqadLk %}
```

或者自定义宽高：
```Markdown
{% youtube zuL_hZqadLk 960 540 %}
```

