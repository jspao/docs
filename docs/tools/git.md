# Git

开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。【[传送门](https://git-scm.com/book/zh/v2)】

工具推荐: 【[Sourcetree](https://www.sourcetreeapp.com/)】

## 用户名及邮箱配置

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

## 创建 SSH

- `id_rsa.pub` 公钥 正常情况下私有化部署的 `gitlab` 与 `github` 使用这个即可
- `id_rsa` 私钥

```sh
# 检查本机是否有.ssh文件
cd ~/.ssh
# 创建ssh key
ssh-keygen -t rsa -C "Author Email"

# 读取ssh
cat id_rsa.pub
# 删除ssh
rm id_rsa.pub
```

## 添加一个远程仓库

远程仓库是指托管在因特网或其他网络中的你的项目的版本库。 你可以有好几个远程仓库，通常有些仓库对你只读，有些则可以读写。 与他人协作涉及管理远程仓库以及根据需要推送或拉取数据。 管理远程仓库包括了解如何添加远程仓库、移除无效的远程仓库、管理不同的远程分支并定义它们是否被跟踪等等。【[传送门](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8)】

### 本地已有文件夹

```sh
# 进入文件夹
cd existing_folder
# 初始化
git init
# 添加一个新的远程 Git 仓库
git remote add origin http://xxx/xxx/xxx-payment-h5.git
# 添加所有文件
git add .
# 提交备注
git commit -m "Initial commit"
# 提交
git push -u origin master
```

### 现有 Git 存储库

```sh
# 进入文件夹
cd existing_repo
# 添加一个新的远程 Git 仓库
git remote add origin http://xxx/xxx/xxx-payment-h5.git
# 将本地的所有分支都推送到远程主机
git push -u origin --all
# 推送全部未推送过的本地标签
git push -u origin --tags
```

### 强制覆盖远程分支

比如现在有 `origin` 及 `gs` 2 个远程仓库，他们的差异性很大，我现在想将 `origin` 仓库代码直接强制覆盖掉 `gs` 仓库内的代码，采用如下操作

```sh
# 将本地仓库a的代码推送到远程仓库gs默认的分支。在这里，你需要强制推送 (--force)，以覆盖远程仓库的内容
git push gs --force
# 指定分支强制推送
git push gs --force <local_branch_name>:<remote_branch_name>
# 如果你的Git版本不支持--force，你可以使用以下命令
git push gs +<branch_name>:<remote_branch_name>
```

在 Git 中，使用+号表示强制推送（force push）。具体来说，在 Git 中，语法为`+source:destination`，而+表示强制推送，忽略远程仓库中的任何限制。

注意：前提是被覆盖掉的分支不是**受保护分支**，同时，这个操作会强制推送本地仓库 `origin` 的所有更改到远程仓库 `gs` 上，而不会考虑它们之间的差异

## CRLF 警告处理

```sh
# warning: LF will be replaced by CRLF in xxx
git config --global core.autocrlf false
```

## 如何采用 Fork 的方式工作

1. 个人账号登录内网 Gitlab 或者 Github，访问目标库 repoA
2. 对目标库进行 Fork，形成个人库 repoB
3. clone repoB 后，本地任何修改或 commit 都进入 repoB
4. repoB 合并至 repoA 进行 Review code 后入库

### 远程状态查看

查看当前本地项目远程库状态

```sh
git remote -v
# origin  https://xxx.com/USERNAME/FORK.git (fetch)
# origin  https://xxx.com/USERNAME/FORK.git (push)
```

### 为本地 repo 添加远端 repo

upstream（remote_repo_name）是远端仓库的别名，别名随意命名

```sh
git remote add <remote_repo_name> <remote_repo_github_address>
# 查看是否增加远端仓库成功
git remote -v
# origin    https://xxx.com/USERNAME/FORK.git (fetch)
# origin    https://xxx.com/USERNAME/FORK.git (push)
# upstream  https://xxx.com/OWNER/REPOSITORY.git (fetch)
# upstream  https://xxx.com/OWNER/REPOSITORY.git (push)
```

### push 本地代码到远端 repo

```sh
git push <remote_repo_name> <branch_name>
```

### pull 远端仓库至本地

```sh
git fetch upstream
```

### 远端代码合并

将`upstream/master`新的部分合并到`origin/master`的代码仓库中, 使 A 的代码仓库变成最新的代码.

```sh
git rebase upstream/master origin/master
```

## 代码回滚并以新的分支进行提交

1. 查看git commit日志 找到想要回滚的记录

```sh
git log
```

2. 回滚分支指定的 commitID 为当前提交的标识（SHA-1）

``` sh
git reset --hard commitID
```

3. 创建一个新的分支，branchName 为新分支名称

``` sh
git branch branchName
```

4. 切换到新的分支

``` sh
git checkout branchName
```

5. 提交回退好的代码到远程分支，branchName 为本地分支名称

``` sh
git push <远程主机名> <branchName>:<远程分支名称>
```

**示例** git push origin branchname:branchname 将本地 branchname 分支提交到远程 origin 主机上的 branchname 分支，远程分支会自动创建的

## 强制覆盖远程仓库

```sh
git push -f --set-upstream origin master:master
```
