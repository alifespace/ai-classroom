
## 远程密钥系统

在现代操作系统中，我们一般使用`ssh`实现对远程系统的方法。这个包括对远程系统的登录，也包括对`github`这样服务的登录。

同时我们在本机也有可能会有多台，比如一台`Windows`系统，一台`MacOS`系统。

`ssh`使用非对称密钥对通信服务进行加密。所谓的非对称密钥就是一对公、私钥系统，在本机使用私钥、在远端服务器安装公钥。在以上系统配置中，正确的做法是：

1. 不同的本机配置不同的公/私钥，就是`Windows`系统和`MacOS`系统使用不同的公/私钥；
2. 每台远端服务器的`authorized_keys`里同时放这两台机器对应的**公钥**；
3. `GitHub`里也分别添加两台机器的**公钥**；

```text
Windows: 私钥A1 / 公钥A1，私钥A2 / 公钥A2
macOS:   私钥B1 / 公钥B1，私钥B2 / 公钥B2

远端服务器 authorized_keys:
  公钥A1
  公钥B1

GitHub SSH keys:
  公钥A2
  公钥B2
```

### 我的密钥版本

| 设备                       | 私钥                  | 用途             |
| ------------------------ | ------------------- | -------------- |
| 公司电脑                     | id_common01_github  | 登录/git         |
| 公司电脑                     | id_common01_cell101 | 登录/cell101     |
| 公司电脑                     | id_common01_cell102 | 登录/cell102     |
| CELL003（Macbook Neo A18） | id_cell003_github   | 登录/git         |
| CELL003（Macbook Neo A18） | id_cell003_test01   | 登录测试机器/cell101 |
| CELL003（Macbook Neo A18） | id_cell003_prod01   | 登录生产机器/cell102 |
| CELL016（MSI Windows11）   | id_cell016_github   | 登录/git         |
| CELL016（MSI Windows11）   | id_cell016_test01   | 登录测试机器/cell101 |
| CELL016（MSI Windows11）   | id_cell016_prod01   | 登录生产机器/cell102 |

## 软件版本

| 软件名称/版本          | 发布日期      | 结束支持日期    | 使用设备             | 服务提供商            |
| ---------------- | --------- | --------- | ---------------- | ---------------- |
| Ubuntu 24.04 LTS | Apr, 2024 | May, 2029 | cell101, cell102 | Amazon Lightsail |
| Python 3.13      | Oct, 2024 | Oct, 2029 |                  |                  |
| nodejs 24.14.1   | May, 2025 | Apr, 2028 |                  |                  |

## 安装云端服务器

### 软件版本


### 操作系统

```bash
# 产生一对公/私密钥
ssh-keygen -t ed25519 -C "common01-cell102"
```

1. 上载公钥到云服务上

```bash
# ubuntu 24.04
sudo adduser jamesl
sudo usermod -aG sudo jamesl
su - jamesl

# setup ssh
mkdir .ssh
chmod 700 .ssh
cd .ssh
touch authorized_keys
chmod 600 authorized_keys
## 添加公钥到authorized_keys
ssh jamesl@host -i <私钥>

## 在本地 ~/.ssh/config 增加主机
Host <host>
  HostName <host>
  User jamesl
  IdentityFile ~/.ssh/<私钥>
  IdentitiesOnly yes
  
# 在云主机上更改主机名
sudo hostnamectl set-hostname <主机名>

# 更新系统
sudo apt update
sudo apt upgrade

# 增加 4G 的 swap 空间
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
free -h

# 开机自动挂载
sudo nano /etc/fstab
/swapfile none swap sw 0 0
```

2. 设置`git`
```bash
git config --global user.name "<用户名>"
git config --global user.email "<email地址>"
git config --global core.sshCommand "C:/Windows/System32/OpenSSH/ssh.exe"

git init
git add .
git commit -m "init"

git remote add origin git@github.com:用户名/仓库.git
git branch -M main
git push -u origin main
```

3. 设置`python`
```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh
conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/main
conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/r

conda create -n py313 python=3.13 -y
conda info -e

conda config --set auto_activate_base false

conda activate py313
python -m venv .venv
conda deactivate
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install ipykernel notebook pandas numpy
python -m ipykernel install --user --name pesg-learning --display-name "PESG (learning-**python)"

```

4. `ssh`设置
```bash
# 在主机上增加转发功能
Host <名字>
  HostName <名字>
  User jamesl
  IdentityFile ~/.ssh/<id>
  IdentitiesOnly yes
  ForwardAgent yes

ssh -A jamesl@<host>

# 在远端机器进行设置
# >>> SSH Agent Auto Start >>>
AGENT_FILE="$HOME/.ssh/agent_env"

# # 如果当前 shell 已经有 agent（比如 SSH agent forwarding），就什么都不做
if [ -n "$SSH_AUTH_SOCK" ] && [ -S "$SSH_AUTH_SOCK" ]; then
  :
else
  # 否则尝试恢复本地保存的 agent 环境
  if [ -f "$AGENT_FILE" ]; then
    source "$AGENT_FILE" >/dev/null 2>&1
  fi

  # 如果还是没有可用 agent，再启动新的
  if [ -z "$SSH_AUTH_SOCK" ] || [ ! -S "$SSH_AUTH_SOCK" ] || ! kill -0 "${SSH_AGENT_PID:-0}" 2>/dev/null; then
    ssh-agent -s > "$AGENT_FILE"
    source "$AGENT_FILE" >/dev/null 2>&1
  fi
fi
# <<< SSH Agent Auto Start <<<

```

5. nvm
```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
source .bashrc

测试

```