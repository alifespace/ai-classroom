
## 系统设置

### 连接功能

#### 加入私钥到`MacOS`中 

1. 将私钥加入`ssh-agent`中

```bash
# 先确认 agent 已启动
eval "$(ssh-agent -s)"

# 加入私钥到系统的 keychain 中
ssh-add --apple-use-keychain ~/.ssh/id_cell003_github
```

2. 配置`~/.ssh/config`

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
```