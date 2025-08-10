---
title: 开发前的准备
date: 2025-08-01 07:25:23
tags:
---
`Google Cloud` 有两种服务类型：
- `Google Cloud Platform`：这个是`Google Cloud` 云服务的底层平台，提供几乎大部分常用的服务；
- `Firebase`：提供更加整合的常用服务，但是部分服务功能只有比较弱的功能；


## 6.1 开发机设置

### 6.1.1 需要设置的软件

1. Visual Studio Code

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

`Node.js`中，有三种安装模式，它们各自有不同的用途、安装指令和安装位置。

- **全局依赖**：可以在命令行中全局运行的工具（CLI），不属于任何特定项目。系统全局目录，与`Node.js`版本关联；
- **本地依赖**：应用运行时必需的库，需要记录在项目/子项目的`package.json`的`dependencies`中；
- **开发依赖**：应用运行时必需的库，需要记录在项目/子项目的`package.json` 的 `dependencies` 中；

```PowerShell
# npm全局安装
npm install -g <package-name>

# 查看全局模块的安装位置
npm root -g

# npm项目安装，模块安装位置：当前项目的 node_modules 目录下
npm install -D <package-name>
npm install -S <package-name>
```

### 6.1.4`tailwindcss`设置







## 6.2 `GCP`设置

### 6.2.1`GCP`操作

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