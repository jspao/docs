# nvm

`nvm`**(Node Version Manager)** 是一款用于管理 `Node.js` 版本的工具，可以轻松地在一个系统中切换和安装多个 `Node.js` 版本。使用 nvm 可以让你轻松地升级或降级 `Node.js` 版本，也可以在同一台机器上同时使用多个版本的 `Node.js`。

## Windows 版本

Windows 版本下载地址：【[传送门](https://github.com/coreybutler/nvm-windows/releases)】

### 常用指令

```sh
# 安装指定版本的 node.js
nvm install <version>
# 切换到指定版本的 node.js
nvm use <version>
# 列出已安装的所有 node.js 版本
nvm ls
# 给指定版本创建别名
nvm alias <name> <version>
# 在指定版本下运行脚本
nvm run <version> <script>
# 显示当前正在使用的 node.js 版本
nvm current
# 卸载指定版本的 node.js
nvm uninstall <version>
# 查看nvm帮助
nvm help
```

## MacOS 版本

### 常用指令

```sh
# 查看当前node.js版本列表
n ls
# 移除指定node.js版本
n rm <version ...>
# 删除安装过的node.js版本
n uninstall
# 安装指定版本node.js
n install <version>
# 安装指定版本
n <version>
# 查看帮助
n -h
```
