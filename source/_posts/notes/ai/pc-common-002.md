---
title: 第二章 计算机常用软件及配置
date: 2025-05-02 10:00:55
tags: 
categories:
  - 计算机
  - 软件服务
cover: cover.png
---
## 2.1 Windows 包管理器 - scoop

Scoop 是一款 Windows 平台的命令行包管理器，它能帮助用户轻松地安装、更新和卸载各种软件。与传统的安装方式不同，Scoop 通常会将软件安装在用户目录下，无需管理员权限，并且避免了对系统环境变量的污染。

### 2.1.1 安装 Scoop

首先，需要通过 PowerShell 安装 Scoop。请按照以下步骤操作：

- 打开 PowerShell。你可以通过在开始菜单搜索 "PowerShell" 并运行它；
- 确保你的 PowerShell 执行策略允许运行本地脚本。你可以运行以下命令来设置：
``` PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

如果提示你确认，输入 `A` 并按回车。

运行以下命令来下载并执行 Scoop 的安装脚本：
```PowerShell
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

这个命令会从 Scoop 的官方网站下载安装脚本并执行。安装完成后，Scoop 默认会安装在用户目录下的 `scoop` 文件夹中 (`C:\Users\<YourUsername>\scoop`)。

### 2.1.2 基本 Scoop 命令

安装完成后，用户就可以使用 `scoop` 命令来管理软件了。以下是一些常用的基本命令：

- **搜索软件:** 使用 `scoop search <软件名称>` 来查找想要安装的软件。例如，要搜索 `git`，可以运行：
```PowerShell
	scoop search git
```
Scoop 会列出所有名称或描述中包含 "git" 的软件包。

- **安装软件:** 使用 `scoop install <软件包名称>` 来安装搜索到的软件。例如，要安装 `git`，可以运行：
```PowerShell
	scoop install git
	```
Scoop 会自动下载并安装 `git` 及其依赖项。

- **列出已安装的软件:** 使用 `scoop list` 来查看通过 Scoop 安装的所有软件；

-  **更新软件:**
	- 使用 `scoop update <软件包名称>` 来更新指定的软件到最新版本。例如，更新 `git`：
	```PowerShell
		scoop update git
	```
	-  使用 `scoop update *` 来更新所有通过 Scoop 安装的软件；
	- 使用 `scoop update` 来更新 Scoop 本身以及已添加的软件仓库（buckets）的列表。比如：这些仓库中软件包的定义（也就是那些描述软件如何安装、更新、卸载的 `.json` 文件）是否发生了变化。**`scoop update`命令本身并不会自动更新你已经安装的软件包。** 它只是更新了 Scoop 所维护的软件仓库的元数据；

- **卸载软件:** 使用 `scoop uninstall <软件包名称>` 来卸载不再需要的软件。例如，卸载 `git`：
```PowerShell
scoop uninstall git
```

- **查看软件信息:** 使用 `scoop info <软件包名称>` 来查看指定软件包的详细信息，例如版本、描述、主页等；

### 2.1.3 软件仓库

Scoop 从称为 "buckets" 的软件仓库中获取软件包信息。默认情况下，Scoop 会使用名为 `main` 的官方仓库。用户可以添加其他的仓库来获取更多软件。以下是一些常见且流行的 Scoop 软件仓库（Buckets）。

#### 核心官方仓库

- **`main` (默认添加):** 这是 Scoop 的主要仓库，包含大量常用且稳定的应用程序。当用户直接使用 `scoop install <软件名>` 时，Scoop 默认会在此仓库中查找；
- **`extras`:** 这个仓库包含了一些不符合 `main` 仓库标准的应用程序，例如一些开发中的软件、不太稳定的版本或者具有特定依赖的软件。要使用 `extras` 仓库中的软件，用户需要先添加它：
	```PowerShell
	scoop bucket add extras
	```
- **`versions`:** 这个仓库提供了同一软件的不同版本。如果需要安装或切换到某个软件的旧版本，可以尝试在这个仓库中查找。同样需要先添加：
	```PowerShell
	scoop bucket add versions
	```
- **`games`:** 顾名思义，这个仓库收录了一些开源和免费的游戏以及游戏相关的工具。添加方式如下：
	```PowerShell
	scoop bucket add games
	```
- **`java`:** 如果需要安装不同版本的 JDK (Java Development Kit)，例如 Oracle JDK, OpenJDK 等，可以添加这个仓库：
	```PowerShell
	scoop bucket add java
	```
- **`nerd-fonts`:** 这个仓库专门用于安装各种 Nerd Fonts，这些字体通常包含了额外的图标和符号，非常适合在终端环境中使用。添加方式：
	```PowerShell
	scoop bucket add nerd-fonts
	```
- **`nirsoft`:** 收录了 NirSoft 公司出品的各种实用小工具。添加方式：
	```PowerShell
	scoop bucket add nirsoft
	```

#### 社区维护的流行仓库

- **`dorado` (by chawyehsu):** 这是一个非常受欢迎的第三方仓库，包含许多在官方仓库中找不到的应用程序，涵盖了开发工具、实用程序等。添加方式：
	```PowerShell
	scoop bucket add dorado
	```

#### 如何查找更多仓库

可以通过以下方式查找更多 Scoop 仓库：

- 使用 `scoop bucket known` 命令可以列出一些 Scoop 已知的常用仓库；
- 访问 Scoop 的官方 Wiki 页面，其中列出了一些已知的 buckets：[https://github.com/ScoopInstaller/Scoop/wiki/Buckets](https://github.com/ScoopInstaller/Scoop/wiki/Buckets)
- 在 GitHub 上搜索 "scoop bucket" 关键字，你会发现许多个人或社区维护的仓库；

## 2.3 浏览器及其插件（plugins）

### 2.3.1 常见的浏览器

#### Google Chrome

在 Windows, macOS, iOS, Android 上都有，Google Chrome 于 2008 年 9 月 2 日首次发布，最初仅限于 Microsoft Windows 操作系统。其发布时的主要目标是：提升速度、稳定性，增强安全性，提供更简洁的用户界面。

Google Chrome 与开源社区有着非常深厚的关系，这主要体现在 **Chromium** 项目上。

#### Microsoft Edge

以