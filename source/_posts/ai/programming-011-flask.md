---
title: programming-011-flask
date: 2025-07-31 09:54:53
tags:
---
## 开发选择

我们在进行一个基于`Web`的应用开发时，考虑部署最后有以下几种选择：
1. 部署一个`VM`，这种方式好处是所有资源都是可控的。也可以在一个`VM`上安装包括数据库在内的多种服务，但是总的问题是投入比较大，而且需要同时掌握的内容较多；
2. 考虑`Serverless`服务的伸缩性，我们也可以把服务部署在容器化的`serverless`中；

我现在的选择是在`Google GCP`上使用`cloud run`服务建立一个serverless的容器化部署。所有相关的主页逻辑、restful API调用在这个平台上运行。我使用这种方式部署应用的主要原因是业务的形态非常像拥有独立的主机，但是实际上是可以完全根据业务量控制成本。而且`GCP cloud run`目前拥有很好的免费额度，而且是按照100ms进行计费的。
- 如果将并发设置指定为一次处理多个请求，则这些请求可以共用一个实例的分配 CPU 和内存；
- 可以设置成1~2个vCPU，同时连接数>50，指定可以启动的容器数量。这样让整个业务根据需求动态扩容；
- `cloud run`提供免费的额度，这样也方便在低业务量时无需考虑这部分的费用。现在支持每月前18万 vCPU秒免费、前360,000 GiB秒免费、每月免费处理200万次请求；
- 考虑实际`RAM`的免费额度为360,000 GiB秒，实际对应vCPU为18万 vCPU。其实每vCPU可以使用2G RAM；

计算栈：
1. 后端`restful API、页面`使用`python+flask`技术，`python`版本使用`3.12`。运行环境为`GCP Cloud Run`。基本免费；
2. 后端数据库使用`Supabase`，提供的数据库环境是`PostgreSQL 17.x`。另外用户管理、`S3`存储也放在`Supabase`。免费的额度有每个月`500MB`的数据库，`50,000`活跃用户，`1GB`存储，`5GB`带宽。升级到`$25/month`之后，每个月`8GB`的数据库，`100,000`活跃用户，`100GB`存储，`250GB`带宽。如果再多，最好的选择是开一个新的`pro`账号。相关的账号管理，使用`Supabase`的`API`功能和调用；
3. `Email`服务在`Dev`阶段使用`Gmail-998181@gmail.com`即可；
4. 前台使用`Tailwind CSS`；


## 常用的`HTTP`状态码

| 状态码     | 名称                    | 使用场景说明                     |
| ------- | --------------------- | -------------------------- |
| **200** | OK                    | ✅ 请求成功并返回内容（GET、PUT、PATCH） |
| **201** | Created               | ✅ 成功创建资源（POST）             |
| **204** | No Content            | ✅ 请求成功但无返回体（DELETE、PUT）    |
| **400** | Bad Request           | ❌ 请求参数错误 / 缺字段             |
| **401** | Unauthorized          | ❌ 未登录 / Token 无效（认证失败）     |
| **403** | Forbidden             | ❌ 登录了，但没有权限访问该资源           |
| **404** | Not Found             | ❌ 请求的资源不存在（找不到 ID）         |
| **409** | Conflict              | ❌ 冲突（如重复的 email、用户名）       |
| **422** | Unprocessable Entity  | ❌ 参数合法性不满足（字段格式错误、数据校验失败）  |
| **429** | Too Many Requests     | ❌ 访问频率太高（限流）               |
| **500** | Internal Server Error | ❌ 服务内部代码错误（程序异常）           |
| **503** | Service Unavailable   | ❌ 系统临时无法服务（维护、过载）          |

### 成功类（2xx）：

|状态码|说明|
|---|---|
|`200`|成功并返回数据（最常用）|
|`201`|成功创建资源|
|`204`|成功但无返回体（如删除）|

### 客户端错误（4xx）：

|状态码|原因|
|---|---|
|`400`|参数不合规范、缺字段|
|`401`|没登录 / token 失效|
|`403`|无权限访问|
|`404`|资源不存在|
|`409`|数据冲突（如主键重复）|
|`422`|参数校验通过语法但不合理（如年龄是负数）|
|`429`|限流保护（访问太频繁）|

### 服务端错误（5xx）：

|状态码|含义|
|---|---|
|`500`|通用服务器错误（代码崩了）|
|`503`|系统临时不可用（维护、限流、超载）|

### 组合记忆

| 类型        | 状态码组             | 记法            |
| --------- | ---------------- | ------------- |
| GET 成功    | `200 OK`         | 请求成功有内容       |
| POST 成功   | `201 Created`    | 创建资源          |
| DELETE 成功 | `204 No Content` | 成功但没数据        |
| 找不到资源     | `404`            | 最常见的客户端错误     |
| 没权限       | `401/403`        | 先是没登录，再是没权限   |
| 参数错       | `400/422`        | 语法错 vs 合法但不合理 |

## OAuth 2.0

**OAuth 2.0**（`Open Authorization 2.0`）是一个**授权框架（`Authorization Framework`）**，它允许第三方应用程序（客户端/服务程序）在用户（资源所有者）的同意下，有限地访问用户在另一个服务提供商（资源服务器）上的受保护资源，而无需共享用户的凭据（如用户名和密码）。

### 例子

#### `Supabase`的密码重置与`OAuth 2.0`角色的匹配

虽然`Supabase`的密码重置流程并非严格意义上的标准`OAuth 2.0`授权码模式，但它完美体现了`OAuth 2.0`的核心设计理念和安全原则。

- **资源的所有者**：就是需要重置密码的用户；
- **客户端/服务器**：就是`Flask`应用程序。它是一个第三方应用程序，旨在帮助用户管理其在`Supabase`上的账户；
- **授权服务器**：她负责验证用户身份（通过发送邮件到用户的注册邮箱）并颁发用于密码重置的临时授权；
- **资源服务器**：也是`Supabase Auth`服务本身，它托管并部管理者用户的密码这个受保护资源；

在整个密码重置的过程中，无需共享用户的凭据体现在：

- `Flask`应用（客户端/服务器）从头到尾都不知道客户的旧密码；
- 用户也不需要将旧密码提供给`Flask`应用；
- `Supabase`通过发送一个唯一的，有时效性的重置链接（其中包含`access_token`)到用户的注册邮箱，来验证用户的身份。这个`access_token`就是一个临时的授权凭证；

有限访问体现在：

- 用户点击邮件中的链接后，浏览器会重定向到`Flask`应用的`/users/reset-password`页面。URL 片段中的`access_token`赋予了应用（通过客户端 JavaScript 读取并传递给后端）一个**非常有限的权限**：即**仅允许更改该用户自己的密码**；
- 这个`access_token`不能用于登录用户、访问用户的其他数据或执行其他任何操作。它是一个**特定于任务的、短期的授权**；

同意体现在：

- 主动在应用中请求“忘记重设密码”；
- 接收到`Supabase`发送的邮件，并点击了其中的重置链接；


`Supabase`的密码重置流程与`OAuth 2.0`的核心思想高度一致。它提供了一种安全、去中心化的方式来授权应用（客户端/服务器）代表用户执行一个敏感操作（更改密码），而无需应用直接处理或存储用户的敏感凭据。通过`access_token`这种临时授权令牌，实现了对用户资源的“有限访问”，并且整个过程都建立在用户明确的“同意”之上。这正是`OAuth 2.0`框架所倡导的授权模式。

### 角色

`OAuth 2.0`定义了以下四个主要角色：

1. **资源所有者 (Resource Owner)**：
	- 通常是**用户本人**；
	- 拥有受保护资源（例如，Google Photos 上的照片，Supabase 数据库中的数据）；
	- 能够授予第三方应用访问其资源的权限；

2.  **客户端 (Client)**：
    - 请求访问资源所有者受保护资源的**应用程序**；
    - 例如，我的`Flask`应用（需要访问用户的`Supabase`数据）、一个照片打印服务、一个社交媒体管理工具；
    - 客户端必须在授权服务器注册，并获得一个唯一的客户端`ID (Client ID)`和客户端密钥`(Client Secret)`；

3. **授权服务器 (Authorization Server)**：
	- 负责验证资源所有者的身份，并在资源所有者同意后，向客户端颁发**访问令牌`(Access Token)**`；
	- 例如，`Supabase Auth`服务、`Google`的`OAuth 2.0`服务、`GitHub`的`OAuth`服务；
	- 它通常与资源服务器紧密集成，或者就是资源服务器的一部分；

4. **资源服务器 (Resource Server)**：
	- 托管受保护资源的服务器；
	- 能够接受并验证访问令牌，并根据令牌的权限允许或拒绝客户端访问资源；
	- 例如，`Supabase`的数据库服务、`Google Photos API`、`GitHub API`；

### 流程（以授权码模式为例）

1. **客户端请求授权**：
    - 用户在客户端应用（您的`Flask`应用）中点击“使用`Google`登录”或“忘记密码”等按钮；
    - 客户端将用户重定向到授权服务器`（Supabase Auth）`的授权端点，并附带客户端`ID`、请求的权限范围`(scope)`、重定向`URI (Redirect URI)`等参数；

2. **资源所有者授权**：
	- 授权服务器验证用户身份（如果未登录，会提示登录）；
	- 授权服务器向用户显示客户端请求的权限，并询问用户是否同意授权；
	- 用户同意授权；
        
3. **授权服务器颁发授权码**：
    - 授权服务器将用户重定向回客户端预先注册的 **重定向 URI**，并在 URL 中附带一个**授权码 (Authorization Code)**；
    - **例如**：`https://your-app.com/callback?code=AUTH_CODE`；
        
4. **客户端交换令牌**：
    - 客户端收到授权码后，立即使用这个授权码、自己的**客户端 ID** 和 **客户端密钥**，向授权服务器的令牌端点发起一个**后端请求**（这个请求是服务器到服务器的，不会暴露给用户浏览器）；
    - **重要**：这个步骤确保了只有合法的、拥有客户端密钥的客户端才能获取访问令牌；
        
5. **授权服务器颁发访问令牌和刷新令牌**：
    - 授权服务器验证授权码和客户端凭据；
    - 验证成功后，授权服务器向客户端颁发：
        - **访问令牌 (Access Token)**：一个短期的凭据，用于访问资源服务器上的受保护资源；
        - **刷新令牌 (Refresh Token)**（可选）：一个长期凭据，用于在访问令牌过期后，无需用户重新授权即可获取新的访问令牌；
            
6. **客户端访问资源**：
    - 客户端使用获得的**访问令牌**，向资源服务器发起请求，访问用户的受保护资源；
    - 资源服务器验证访问令牌的有效性和权限，然后响应客户端的请求；
        
7. **刷新令牌（当访问令牌过期时）**：
    - 当访问令牌过期时，客户端可以使用**刷新令牌**向授权服务器请求新的访问令牌，而无需用户再次进行交互；

https://cloud.tencent.com/developer/article/1475799

## 配置

### 配置本机开发环境

为了避免出现在`vscode`调试时出现的红线提示错误。虽然我们运行是在`docker`容器中运行的，但是还是要在开发环境中安装相关的库。

```bash
# 考虑兼容性的问题，不要使用 uv 进行包管理
python -m venv .venv

# 激活环境
.\.venv\Scripts\activate 
```

### requirements.txt

```text
flask==3.1.1
gunicorn==23.0.0
```

之后在本机安装环境。
```bash
pip install -r requirements.txt
```

### .dockerignore
```text
.env
.gitignore
.git/
.venv/

  

.vscode/
.idea/

**/__pycache__/
```

## 本地`Docker`容器镜像部署到GCP
### 流程

1. 设置`GCP`项目和`Cloud SDK`；
2. 将镜像推送到`Google Artifact Registry`；
3. 使用`gcloud run deploy`部署服务，设置资源为合适的值；

### 本地准备

1. 拥有`GCP`账号与项目；
2. 安装了`gcloud cli`；
3. 已经登陆并设置了项目；

### 启用`GCP`服务（只需一次）

```bash
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

### 建立并推送`Docker`镜像到`Artifact Registry`

以下假设要把相关的镜像和服务部署在`GCP的us-west1（俄勒冈）`处；

#### 创建`Artifact Registry`（仅首次）

```bash
gcloud artifacts repositories create flask-repo \
	--repository-format=docker \
	--location=us-west1 \
	--description="Flask container repo"
```

#### 配置认证（只需一次）

```bash
# Adding credentials for: us-west1-docker.pkg.dev
# After update, the following will be written to your Docker config file located at [C:\Users\<username>\.docker\config.json]
gcloud auth configure-docker us-west1-docker.pkg.dev
```

#### 构建镜像并打上标签

```bash
docker build -t us-west1-docker.pkg.dev/<your-project-id>/flask-repo/flask-minimal .
```

#### 推送镜像到`Artifact Registry`

```bash
docker push us-west1-docker.pkg.dev/<your-project-id>/flask-repo/flask-minimal
```

### 部署到`Cloud Run`

```bash
gcloud run deploy flask-minimal \
  --image=us-west1-docker.pkg.dev/<your-project-id>/flask-repo/flask-minimal \
  --platform=managed \
  --region=us-west1 \
  --memory=128Mi \
  --cpu=0.1 \
  --min-instances=0 \
  --max-instances=1 \
  --concurrency=10 \
  --allow-unauthenticated
```

部署成功后你会看到输出：
```bash
Service [flask-minimal] revision [...] has been deployed and is serving 100 percent of traffic at:
https://flask-minimal-<random>.a.run.app
```

### 总结步骤表

| 步骤     | 命令                                                                                               |
| ------ | ------------------------------------------------------------------------------------------------ |
| 登录 GCP | `gcloud auth login`                                                                              |
| 设置项目   | `gcloud config set project <your-project-id>`                                                    |
| 启用服务   | `gcloud services enable run.googleapis.com artifactregistry.googleapis.com`                      |
| 创建仓库   | `gcloud artifacts repositories create flask-repo --repository-format=docker --location=us-west1` |
| 配置认证   | `gcloud auth configure-docker us-west1-docker.pkg.dev`                                           |
| 构建镜像   | `docker build -t us-west1-docker.pkg.dev/<project-id>/flask-repo/flask-minimal .`                |
| 推送镜像   | `docker push us-westl1-docker.pkg.dev/<project-id>/flask-repo/flask-minimal`                     |
| 部署服务   | `gcloud run deploy flask-minimal --image=... --cpu=0.1 --memory=128Mi --allow-unauthenticated`   |

## 运行维护

### 查看服务当前配置

```bash
gcloud run services describe <服务名>
```

### 修改服务参数

```bash
# 不改变镜像、不中断服务，只更新运行时配置
gcloud run services update <服务名> \
	--region=<region> \
	--max-instances=1 \
	--concurrency=30
```

## 前端

我采用的是`tailwindcss`框架。
```bash
# 在项目的根目录下安装tailwindcss，由于已知的原因，只能安装tailwindcss 3.x版本，安装最新的4.x版本，最后的初始化指令执行不了
npm init -y
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# 在项目的根目录下，建立tailwind/目录
mkdir tailwind     # Windows
```

然后在 `tailwind/input.css` 中写入：
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

然后执行构建命令，生成最终 CSS 文件供 Flask 使用。

```json
npx tailwindcss -i ./tailwind/input.css -o ./static/css/tailwind.css --minify
```

可以把这条命令写进 `package.json` 的 `scripts` 里，比如：

```json
"scripts": {
  "build:css": "tailwindcss -i ./tailwind/input.css -o ./static/css/tailwind.css --minify"
}
```

之后就可以：

```
npm run build:css
```

可以在`package.json`加入监听模式，开发时使用，修改`input.css`时自动编译

```json
  "scripts": {

    "test": "echo \"Error: no test specified\" && exit 1",

    "build:css": "tailwindcss -i ./tailwind/input.css -o ./static/css/tailwind.css --minify",

    "watch:css": "tailwindcss -i ./tailwind/input.css -o ./static/css/tailwind.css --watch"

  },
```

启动监听构建（用于在开发阶段自动更新CSS）
```bash
npm run watch.jss
```

示例`tailwind.config.js`（确保 `Flask`模板被扫描）
```js
module.exports = {
  content: [
    "./templates/**/*.html",
    "./tailwind/**/*.css"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 项目开发流程

### 系统架构

我的应用准备前台

### 准备工作

- 注册并配置好`Supabase`项目
- 安装 Node.js / Firebase CLI / Python 环境
- 初始化 Firebase 项目（前端托管）
- 可选：开启 Google Cloud Function 权限，使用 Python 环境部署 Function

```bash
# 安装 Firebase CLI
npm install -g firebase-tools

# 在前端代码的根目录下初始化 Firebase
cd /path/to/your/project/frontend

# 初始化 Firebase
# 1. 选择：App Hosting: Enable web app deployments with App Hosting
# 2. 选择：Add Firebase to an existing Google Cloud Platform project，因为我已经有存在的GCP项目
firebase init

# 出现错误，重新运行 firebase init

√ Please select an option: Use an existing project
√ What do you want to use as your public directory? public
√ Configure as a single-page app (rewrite all urls to /index.html)? No
√ Set up automatic builds and deploys with GitHub? No

```

### 前端开发

- 修改 `supabaseClient.js` 加入你的项目 `URL` 和 `anon key`
- 开发简单的页面，如：
    - `/signup` 注册页
    - `/login` 登录页
    - `/reset-password` 密码重设页
    - `/dashboard` 登录后的用户页

你可以用 HTML + Supabase JS SDK + TailwindCSS 快速完成这些页面。

## `NUXT`

```bash
npx nuxi@latest init <project-name>
```