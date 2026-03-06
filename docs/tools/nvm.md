# Node 版本管理器

nvm (Node Version Manager) 让你在同一台机器上安装和切换多个 Node.js 版本，方便不同项目的需求。

## Windows 版本

下载地址：[nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

### 常用命令

```bash
# 安装指定版本
nvm install 18.20.0
nvm install lts          # 安装最新 LTS 版本

# 切换版本
nvm use 18.20.0
nvm use lts

# 查看已安装版本
nvm list

# 查看当前使用版本
nvm current

# 设置默认版本
nvm alias default 18.20.0

# 卸载版本
nvm uninstall 16.20.0

# 查看帮助
nvm help
```

## macOS / Linux 版本

macOS 推荐使用 `n` 作为版本管理器：

```bash
# 安装 n
npm install -g n

# 安装指定版本
n 18.20.0

# 安装最新 LTS 版本
n lts

# 安装最新版本
n latest

# 切换版本（交互式选择）
n

# 删除指定版本
n rm 16.20.0

# 查看帮助
n --help
```

## 版本选择建议

| 场景 | 推荐版本 | 说明 |
|------|---------|------|
| 生产环境 | LTS | 长期支持，稳定可靠 |
| 学习测试 | Latest | 体验最新特性 |
| 老项目维护 | 项目指定版本 | 保持兼容性 |

## 常见问题

### 切换版本后命令不生效

```bash
# Windows：以管理员身份运行终端
# macOS/Linux：检查权限
sudo n 18.20.0
```

### 查看可用版本列表

```bash
# Windows
nvm list available

# macOS/Linux
n ls-remote
```
