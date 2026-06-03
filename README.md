## 我的考虑

现在是2026年5月30日，这一周`Meta`这家美国公司刚刚裁员`8000`人，因为`Meta`认为，未来的时代是人是训练者和监督师，而`AI`是执行者。其实现在就在一个变革的年代，`AI`的发展始终会触及一个核心话题，就是沿着`AI`发展的路径，未来需要什么样的人，他们如何组织学习，要关注什么。我现在`50`多岁了，似乎我也不太需要一份稳定的工作，来维持我的一日三餐。我只是以身为饵，看看要理解和适应未来，人应该具备什么样的基本技能。

既然这是一份我希望发布的学习实验，我可能需要先定义一下我自己。我不是一个一点技术都不懂的人，但是也不是一个懂很多技术的人。这么说吧，以`Python`为例，我知道什么是函数，也知道返回值，但是闭包和装饰器我不太懂。我会每天用`ChatGPT`，但是`Codex`还没有用过，大概也就是每天和`ChatGPT`聊天吧。另外，我的好奇心和关联能力太强了。我的思维模式是看到一个东西，很快会联想到很多其他的东西，非常容易偏离主线，我需要一个机制阻止自己不断的切换上下文。主要方法是定义每日的目标，然后联想不超过3层。联想的内容，记载在`Parking Lot`中。

我未来的学习和生活主线是`AI`，这个项目的目的是记录一个好奇心过剩的人，在AI时代寻找主线的历程。我的假设是我是一个基本的小白，我该如何在`AI`时代里面成长，可能他不是为了找一份职业，而是在这个时代中，如何理解和适配变化的过程。如果未来`AI`真的改变了世界，我希望这份记录能够让我的孩子一直有信心适应这个世界的变化（毕竟我都这么老了），或者帮助另外一个智力/逻辑/理解水平和我一样的普通人，少走一些弯路和迷茫。

`AI`我不认为是一个简单的话题，因为有几个特点：
1. 这个时代只要你愿意学习，你能学到所有的东西；
2. 至少我处的这个时代，技术一直都在快速变化；
3. 无论是劳动力还是智力方面，越来越多的人从基础岗位被动下来，`Meta`在裁员，驾驶在往无人驾驶上发展；
4. 想要懂`AI`，我的理解可能不是只会打字或者会编程就可以了。好像要懂得比以前更多；
5. 只要你愿意和有足够的经济实力，你可以发现能力越来越强的`Agent`，但是怎么监督和驾驭好像一直在发展，而且对个人也有不小能力方面的要求；

所以我一直迷茫的地方，在于`AI`时代，我如果要有尊严的生活，除了经济上的能力，我的智力水平要如何适配。这个项目就是一个记录我智力能力学习的项目。不知道会走向哪里，就是一个记录而已。他不是一个专业的高水平的智力培训平台，而就是一个普通人的学习历程，因为我一直认为大部分人就是你我这样的普通人。我并不担心AI比我聪明，我担心的是，如果我停止成长，我就会失去理解这个世界的能力。我大致认为，未来真正有价值的东西，最重要的是自己的理解问题、分解问题的能力、提问的能力和自己的判断能力。我越来越觉得，判断能力并不是天生的。一个人的判断能力，来自长期积累的知识、实践经验以及对系统运行方式的理解。因此，我希望在这个项目中持续建设自己的知识库，训练工程能力，并培养系统思维的习惯。

我现在大概使用的几个工具如下：
1. `ChatGPT, Gemini, Claude`这些基础性的对话工具；
2. `NotebookLM`作为一个`Google`开发的学习工具，目的是接触重要的学习内容；
3. `Obsidian`是一个记录我知识成长的工具；
4. `Visual Studio Code`我的代码编辑器；

| 需求           | 主工具            | 辅助工具            |
| ------------ | -------------- | --------------- |
| 日常问题、思考、规划   | ChatGPT        | Claude          |
| 学习（数学、物理、AI） | NotebookLM     | Gemini, ChatGPT |
| 知识库管理        | NotebookLM     | Obsidian        |
| 编码           | Codex          | ChatGPT         |
| 自动化Agent     | Hermes         | 自己写Agent        |
| 长期记忆         | Obsidian / Git | NotebookLM      |
1. `ChatGPT, NotebookLM`类似与老师；
2. `Hermes`类似于员工，他不是用来学习微积分和写论文的，他可以每天帮你检查邮件、看股票行情这些；
3. `Codex`和`ChatGPT, Gemini`比起来，`Codex`可以直接改你的代码，进行测试这些工作；

未来最大的收益来自于以下的知识：
1. `Python`;
2. 数据结构;
3. 数据库;
4. `Linux`;
5. 网络；
6. `AI`基础；


### Obsidian

1. `notes`目录下是随手记；
	- `daily`下是我的日记，每天只有三栏。今天的目标，我的联想，今日成果；
2. `source`目录下是博客；

## 系统设置

### 创建 swap

```bash
# 1. 创建 4GB swap 文件
sudo fallocate -l 4G /swapfile

# 2. 设置正确权限
sudo chmod 600 /swapfile

# 3. 格式化为 swap
sudo mkswap /swapfile

# 4. 启用 swap
sudo swapon /swapfile

# 5. 查看确认
free -h
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
cat /proc/sys/vm/swappiness
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```


### 增加用户

```bash
sudo adduser alice
sudo usermod -aG sudo alice

# ssh设置
su - alice
mkdir -p ~/.ssh
chmod 700 ~/.ssh

sudo cp /home/unbuntu/.ssh/authorized_keys ~/.ssh
sudo chown -R james:james /home/alice/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### 连接功能

#### 加入私钥到`MacOS`中 

1. 产生私钥
```bash
ssh-keygen -t ed25519 -f id_cell003_github -C "注释内容"
```

2. 将私钥加入`ssh-agent`中

```bash
# 先确认 agent 已启动
eval "$(ssh-agent -s)"

# 加入私钥到系统的 keychain 中
ssh-add --apple-use-keychain ~/.ssh/id_cell003_github
```

3. 配置`~/.ssh/config`

```txt
	Host github.com HostName github.com 
		User git 
		AddKeysToAgent yes 
		UseKeychain yes 
		IdentityFile ~/.ssh/id_cell003_github
```

### Github 使用

####  日常常用指令

```bash
# 查看状态
git status

# 全部加入修改
git add .
git status

# 提交修改
git commit -m "Notes update 2026-05-30-0800"

# 上传
git push
```

### 必要的软件安装

1. 安装`nodejs`

```bash
# 安装 nvm 管理工具
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
source ~/.zshrc

# 使用 nvm 安装最新版本的 nodejs
nvm install --lts
nvm use --lts
```

2. 安装 AI codex
```bash
# 安装 gemini
npm install -g @google/gemini-cli

# Gemini 有三种接入的方式，我使用的是前两种
# 1. Sign in with Google
# 2. Use Gemini API Key
# 根据文档解释，Use Gemini API Key 方式接入一般会立即开始计费模式
# Sign in with Google 应该有一定的免费额度

# Use Gemini API Key
# 1. 需要在 Google AI Studio 中申请一个 API Key
# 2. 在 ~/.zshrc 中加入 export GEMINI_API_KEY="你的APIKEY"
# 3. source ~/.zshrc
```

### 开通机场

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y shadowsocks-libev

# 配置 Shdowsocks
sudo nano /etc/shadowsocks-libev/config.json
```

推荐配置内容（推荐使用 `aes-256-gcm` 或 `chacha20-ietf-poly1305`）：

```json
{
    "server": "0.0.0.0",
    "server_port": 8388,
    "password": "你的强密码",
    "timeout": 300,
    "method": "aes-256-gcm",
    "mode": "tcp_and_udp",
    "fast_open": false
}
```
