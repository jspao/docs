# Git 使用指南

Git 是一款开源的分布式版本控制系统，能够高效地管理项目的代码变更历史。无论是个人项目还是团队协作，Git 都是现代开发不可或缺的工具。

> **官方文档**：[Pro Git 中文文档](https://git-scm.com/book/zh/v2)  
> **图形化工具推荐**：[Sourcetree](https://www.sourcetreeapp.com/)

## 基础配置

### 用户名及邮箱配置

配置提交代码时使用的身份信息，这些信息会出现在每次提交记录中。

```sh
# 配置名称(全局)
git config --global user.name "Author Name"
# 配置邮箱(全局)
git config --global user.email "Author Email"

# 配置名称(针对单个项目)
git config user.name "Author Name"
# 配置邮箱(针对单个项目)
git config user.email "Author Email"
```

## SSH 密钥配置

SSH 密钥用于安全地连接远程 Git 仓库（如 GitHub、GitLab），无需每次输入密码。

### 密钥类型

| 文件 | 说明 | 用途 |
|------|------|------|
| `id_rsa.pub` | 公钥 | 添加到 GitHub/GitLab 等平台 |
| `id_rsa` | 私钥 | 保存在本地，切勿泄露 |

### 操作步骤

```sh
# 1. 检查是否已有 SSH 密钥
ls ~/.ssh

# 2. 生成新的 SSH 密钥（使用你的邮箱）
ssh-keygen -t rsa -C "your.email@example.com"

# 3. 查看并复制公钥内容
cat ~/.ssh/id_rsa.pub

# 4. 将公钥添加到 GitHub/GitLab 的 SSH 设置中
```

::: tip 提示
生成密钥时按回车使用默认路径，设置密码短语（passphrase）可增加安全性。
:::

## 远程仓库管理

远程仓库是托管在网络上的项目版本库。通过管理远程仓库，可以与他人协作开发，推送或拉取代码变更。

> **参考文档**：[Git 远程仓库使用指南](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8)

### 场景一：本地已有项目

将本地现有项目推送到远程仓库：

```sh
# 进入项目目录
cd existing_folder

# 初始化 Git 仓库
git init

# 添加远程仓库地址
git remote add origin http://xxx/xxx/xxx-payment-h5.git

# 添加所有文件到暂存区
git add .

# 提交初始版本
git commit -m "Initial commit"

# 推送到远程仓库的 master 分支
git push -u origin master
```

### 场景二：已有 Git 仓库迁移

将现有的 Git 仓库推送到新的远程地址：

```sh
# 进入仓库目录
cd existing_repo

# 添加新的远程仓库
git remote add origin http://xxx/xxx/xxx-payment-h5.git

# 推送所有本地分支
git push -u origin --all

# 推送所有本地标签
git push -u origin --tags
```

### 强制推送（谨慎使用）

当本地分支与远程分支历史不一致时，可以使用强制推送覆盖远程分支。

::: danger 警告
强制推送会覆盖远程分支的历史记录，可能导致团队成员的代码丢失。请确保团队知晓此操作！
:::

```sh
# 强制推送到远程仓库默认分支
git push gs --force

# 强制推送指定分支
git push gs --force <本地分支>:<远程分支>

# 使用 + 号语法（等效于 --force）
git push gs +<本地分支>:<远程分支>
```

**语法说明**：`+<source>:<destination>` 中的 `+` 表示强制推送，忽略远程仓库的限制。

::: warning 注意事项
- 确保目标分支**不是受保护分支**
- 操作前与团队成员确认
- 建议使用 `--force-with-lease` 替代 `--force`，可在远程有更新时阻止推送
:::

## 常见问题处理

### CRLF 换行符警告

Windows 和 macOS/Linux 使用不同的换行符（CRLF vs LF），Git 可能会发出警告。

```sh
# 关闭自动换行符转换
git config --global core.autocrlf false

# 或者设置为 input（推荐 macOS/Linux）
git config --global core.autocrlf input

# 或者设置为 true（推荐 Windows）
git config --global core.autocrlf true
```

## Fork 工作流

Fork 工作流是开源项目常用的协作方式，适合为外部项目贡献代码。

### 工作流程

```
┌─────────┐    Fork    ┌─────────┐    Clone    ┌─────────┐
│  上游仓库  │ ────────> │ 个人仓库  │ ────────> │ 本地仓库  │
│ (repoA)  │           │ (repoB)  │           │         │
└─────────┘           └─────────┘           └─────────┘
     ↑                                          │
     └──────────── Pull Request ────────────────┘
```

### 操作步骤

1. **Fork 仓库**：在 GitHub/GitLab 上访问目标仓库，点击 Fork 按钮创建个人副本
2. **克隆到本地**：`git clone https://github.com/YOUR_NAME/repoB.git`
3. **开发提交**：在本地进行修改并提交到个人仓库
4. **发起 PR/MR**：从个人仓库向上游仓库提交 Pull/Merge Request
5. **Code Review**：等待维护者审核并合并代码

### 查看远程仓库

```sh
# 查看已配置的远程仓库
git remote -v

# 输出示例：
# origin  https://github.com/YOUR_NAME/repo.git (fetch)
# origin  https://github.com/YOUR_NAME/repo.git (push)
# upstream  https://github.com/ORIGINAL_OWNER/repo.git (fetch)
# upstream  https://github.com/ORIGINAL_OWNER/repo.git (push)
```

### 添加上游仓库

为了同步原仓库的更新，需要添加上游仓库（通常命名为 `upstream`）。

```sh
# 添加上游仓库
git remote add upstream https://github.com/ORIGINAL_OWNER/REPOSITORY.git

# 验证添加成功
git remote -v
```

| 远程仓库 | 用途 |
|----------|------|
| `origin` | 你的 Fork 仓库，用于推送个人修改 |
| `upstream` | 原仓库，用于同步最新代码 |

### 推送代码

```sh
# 推送到指定远程仓库的指定分支
git push <remote_name> <branch_name>

# 示例：推送到 origin 的 main 分支
git push origin main

# 首次推送并建立追踪关系
git push -u origin main
```

### 拉取上游更新

```sh
# 从上游仓库获取最新代码（不合并）
git fetch upstream

# 查看上游分支
git branch -r

# 切换到本地主分支
git checkout main

# 合并上游更新到本地分支
git merge upstream/main
```

### 变基同步代码

使用变基（rebase）将上游更新应用到本地分支，保持提交历史整洁。

```sh
# 将上游 main 分支的更新变基到本地 main 分支
git rebase upstream/main

# 如果出现冲突，解决后执行
git add .
git rebase --continue

# 如果需要取消变基
git rebase --abort
```

::: tip rebase vs merge
- **rebase**：重写提交历史，形成线性历史，适合个人分支
- **merge**：保留完整历史，创建合并提交，适合团队协作
:::

## 代码回滚与分支管理

### 场景：回滚到历史版本并创建新分支

当需要基于历史版本进行开发时，可以回滚到指定提交并创建新分支。

```sh
# 1. 查看提交历史，找到目标提交的 commit ID
git log --oneline -10

# 2. 回滚到指定提交（--hard 会丢弃工作区修改，请谨慎使用）
git reset --hard <commit-id>

# 3. 基于当前状态创建新分支
git checkout -b <new-branch-name>

# 4. 推送到远程仓库
git push -u origin <new-branch-name>
```

### reset 模式对比

| 模式 | 工作区 | 暂存区 | 说明 |
|------|--------|--------|------|
| `--soft` | 保留 | 保留 | 仅移动 HEAD，适合重新提交 |
| `--mixed` | 保留 | 清空 | 默认模式，保留修改但取消暂存 |
| `--hard` | 清空 | 清空 | 彻底丢弃修改，谨慎使用 |

## 远程仓库完全重置

::: danger 危险操作
此操作会强制用本地代码覆盖远程仓库，可能导致数据丢失！
:::

```sh
# 强制推送并设置上游分支
git push -f --set-upstream origin main:main

# 等效于
git push -f -u origin main
```

## 撤销合并操作

### 场景一：合并已提交

如果合并已经完成并提交，回退到合并前的状态：

```sh
# 回退到上一个提交（丢弃合并提交）
git reset --hard HEAD~1

# 或者回退到指定提交
git reset --hard <合并前的commit-id>
```

### 场景二：合并冲突中

如果合并过程中出现冲突，想要中止合并：

```sh
# 中止合并，恢复到合并前状态
git merge --abort
```

### 场景三：保留修改但取消合并

```sh
# 保留工作区修改，取消合并提交
git reset --merge HEAD~1
```

## 跨仓库代码同步（变基）

### 场景说明

当需要将基础仓库（origin）的更新同步到业务仓库（lvp）时，可以使用变基方式保持提交历史整洁。

```
origin (基础仓库) ──> develop 分支
         │
         │ fetch
         ▼
本地临时分支 ── rebase ──> lvp (业务仓库) ──> develop 分支
```

### 操作步骤

::: danger 前置检查
执行前请确保当前分支代码已提交，避免代码丢失！
:::

```sh
# 1. 获取两个仓库的最新代码
git fetch origin  # 基础仓库
git fetch lvp     # 业务仓库

# 2. 创建临时分支（基于基础仓库最新代码）
git checkout -b temp-rebase origin/develop

# 3. 将业务仓库的变更变基到临时分支
git rebase lvp/develop

# 4. 处理冲突（如有）
git add <冲突文件>
git rebase --continue

# 5. 推送更新
# 方式一：强制推送（个人分支）
git push lvp temp-rebase:develop --force

# 方式二：新建分支提交 PR/MR（团队协作）
git checkout -b sync/base-update
git push lvp sync/base-update
# 然后在 GitHub/GitLab 上发起合并请求

# 6. 清理临时分支
git checkout develop
git branch -D temp-rebase
```

## 完全重置本地代码

当本地代码混乱或需要完全同步远程状态时，可以执行以下操作。

::: danger 警告
以下操作会永久删除本地修改，执行前请确认无需保留！
:::

```sh
# 1. 获取远程最新状态
git fetch origin

# 2. 丢弃所有本地修改（已暂存和未暂存）
git reset --hard HEAD

# 3. 删除未跟踪的文件和目录
git clean -fd

# 4. 切换到目标分支
git checkout main

# 5. 完全同步远程分支
git reset --hard origin/main
```

### 命令说明

| 命令 | 作用 |
|------|------|
| `git reset --hard HEAD` | 丢弃所有本地修改 |
| `git clean -fd` | 删除未跟踪的文件（`-f` 强制，`-d` 包含目录） |
| `git reset --hard origin/main` | 将本地分支重置为远程状态 |

::: tip 安全建议
如需保留某些修改，可先执行 `git stash` 暂存，重置后再 `git stash pop` 恢复。
:::

## 文件名大小写问题修复

在 Windows 上，Git 默认不区分文件名大小写，可能导致文件重命名后无法正确识别。

### 解决方案

```sh
# 1. 清除 Git 缓存（保留本地文件）
git rm -r --cached .

# 2. 重新添加所有文件（Git 会重新识别文件名大小写）
git add .

# 3. 提交修复
git commit -m "fix: 修正文件名大小写"

# 4. 推送
git push
```

### 预防措施

```sh
# 配置 Git 区分文件名大小写
git config core.ignorecase false
```

::: warning 注意
设置 `ignorecase false` 后，请确保团队所有成员都了解文件名大小写规范，避免冲突。
:::

## 快速参考：新建项目并推送

```sh
# 1. 进入项目目录
cd /path/to/your/project

# 2. 初始化 Git 仓库
git init

# 3. 添加远程仓库
git remote add origin http://your-git-server.com/repo.git

# 4. 创建并切换到新分支
git checkout -b new-feature

# 5. 添加文件
git add .

# 6. 提交
git commit -m "Initial commit"

# 7. 推送到远程（-u 建立追踪关系）
git push -u origin new-feature
```

## 常用命令速查表

| 命令 | 作用 |
|------|------|
| `git status` | 查看工作区状态 |
| `git add .` | 添加所有修改到暂存区 |
| `git commit -m "msg"` | 提交暂存区的修改 |
| `git push` | 推送到远程仓库 |
| `git pull` | 拉取远程更新 |
| `git log --oneline` | 简洁查看提交历史 |
| `git branch` | 查看本地分支 |
| `git checkout -b name` | 创建并切换分支 |
| `git merge branch` | 合并指定分支到当前分支 |
| `git stash` | 暂存当前修改 |
| `git stash pop` | 恢复暂存的修改 |
| `git config --global fetch.prune true `| git fetch 就会自动删除这些旧的远程分支 |
| ` git fetch origin main && git merge origin/main` | 比如本地分支是 feature/xx，那么这条命令就是拉取main分支合并到你本地当前分支|
