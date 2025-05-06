---
title: 第三章 计算机常用云服务及使用
date: 2025-04-03 13:00:59
updated: 2025-05-15 14:00:59
tags: 
categories:
  - 计算机
  - 软件服务
---
# 第三章 计算机常用云服务及使用

## 3.1 Gmail 服务（未完成）

## 3.2 Google Colab 服务（未完成）

## 3.3 GitHub 服务（未完成）

## 3.4 OneDrive 服务（未完成）

## 3.5 Hexo 服务

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

### 3.5.1 安装 Hexo 服务

``` bash
# 1. 安装node.js
> scoop install nodejs-lts   # WIndows
> brew install nodejs        # MacOS

# 安装后验证
> node -v                    # 可以看到安装后node.js的版本号
```

``` bash
> npm install -g hexo-cli
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

### 3.5.2 如何初始化一个Hexo项目

在系统中安装完Hexo之后，我们可以开始初始化一个Hexo的博客项目，初始化 Hexo 项目的命令是 `hexo init`，比如我们计划初始化的博客项目叫做MyFirstBlog。

1. **选择一个位置：** 打开你的终端或命令行工具，导航到你想要创建Hexo博客项目的文件夹的**父目录**。例如，如果你想在`~/Documents/MyBlog`这个文件夹里创建博客，那么你应该先`cd`到`~/Documents`目录；
2. **运行初始化命令：** 在你希望创建博客的父目录中，运行以下命令：

``` bash
> hexo init <folder>
```

- `<folder>`：这是你想要创建的博客项目文件夹的名称。将`<folder>`替换为你想要的名称，例 `MyFirstBlog`；

	如果你想在**当前目录**直接初始化项目（不创建新的子文件夹），可以省略`<folder>`：

``` bash
> hexo init
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

### 3.5.3 运行博客网站

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

### 3.5.4 安装Hexo主题

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
> hexo clean; hexo g; hexo s
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

### 3.5.5 配置 front-matter

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

### 3.5.6 配置 butterfly 主题页面
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

1. 请将 `themes/butterfly/_config.yml` 中的 **lightbox 设置**改为：

``` yml
lightbox: fancybox
```

2. 正确设置 Fancybox 的 CDN：

```yml
CDN:
  internal_provider: local
  third_party_provider: jsdelivr
  option:
    fancybox:
      enable: true
```

### 3.5.7 发布与保存

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