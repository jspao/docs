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

1. 查看 git commit 日志 找到想要回滚的记录

```sh
git log
```

2. 回滚分支指定的 commitID 为当前提交的标识（SHA-1）

```sh
git reset --hard commitID
```

3. 创建一个新的分支，branchName 为新分支名称

```sh
git branch branchName
```

4. 切换到新的分支

```sh
git checkout branchName
```

5. 提交回退好的代码到远程分支，branchName 为本地分支名称

```sh
git push <远程主机名> <branchName>:<远程分支名称>
```

**示例** git push origin branchname:branchname 将本地 branchname 分支提交到远程 origin 主机上的 branchname 分支，远程分支会自动创建的

## 强制覆盖远程仓库

```sh
git push -f --set-upstream origin master:master
```

## 回退最后一次合并

如果合并已经完成并提交，你可以：这会回退到合并前的最后一个提交，丢弃合并提交。

```sh
git reset --hard HEAD~1
```

如果合并尚未提交：如果合并操作已经执行但尚未提交（即处于合并冲突解决状态），这会中止合并过程，并将你的工作区恢复到合并前的状态。

```sh
git merge --abort
```

## 使用 rebase（变基）推送存在修改的远程分支

比如我现在的代码关联的 2 个远程分支如下

```sh
lvp     ssh://git@1.1.1.1:50022/ysp/yzp-lvp.git (fetch)
lvp     ssh://git@1.1.1.1:50022/ysp/yzp-lvp.git (push)
origin  ssh://git@1.1.1.1:50022/ysp/yzp-base.git (fetch)
origin  ssh://git@1.1.1.1:50022/ysp/yzp-base.git (push)
```

lvp 是业务分支，origin 是 base 分支，我现在是要将 origin 的 develop 分支的新的代码，推送到 lvp 的 develop 上

实现步骤

1. 确保本地有最新的 origin/develop 和 lvp/develop：

```sh
git fetch origin  # 拉取基础代码最新内容
git fetch lvp     # 拉取业务代码最新内容
```

2. 创建一个临时分支（基于 origin/develop）：

```sh
git checkout -b temp-rebase origin/develop
```

3. 将 lvp/develop 的变更变基（rebase）到 temp-rebase：

```sh
git rebase lvp/develop
```

如果遇到冲突

- 手动解决冲突。
- git add <冲突文件>。
- 继续变基：`git rebase --continue`

4. 检查代码是否正常（运行测试，确保业务逻辑不受影响）
5. 推送更新到 lvp/develop
- 如果 lvp/develop 允许强制推送（个人分支） `git push lvp temp-rebase:develop --force`
- 如果 lvp/develop 是受保护分支（如团队协作）
```sh
git checkout -b new-base-update  # 新建分支
git push lvp new-base-update    # 推送新分支
```
- 然后 提 PR/MR 让团队审核合并。
