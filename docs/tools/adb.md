# ADB 调试工具

Android Debug Bridge（ADB）是 Android SDK 中的命令行工具，用于与 Android 设备进行通信和控制。它是开发人员进行设备调试、测试和控制的必备工具。

::: tip 可视化工具推荐
如果你不熟悉命令行，可以使用 [AYA](https://github.com/liriliri/aya/releases) 这款图形化工具，[使用文档](https://aya.liriliri.io/zh/guide/quickstart.html)。
:::

## ADB 能做什么？

通过 ADB，你可以在电脑上远程控制 Android 设备：

| 功能 | 说明 |
|------|------|
| 应用管理 | 安装、卸载、调试应用程序 |
| 日志查看 | 实时查看设备运行日志（logcat） |
| 文件传输 | 在电脑和设备间复制文件 |
| 命令执行 | 在设备上执行 Shell 命令 |
| 设备控制 | 重启、截图、录屏、模拟点击 |
| 模式切换 | 进入 Recovery、Bootloader 等模式 |

## 工作原理

ADB 采用客户端-服务器架构：

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   客户端     │ ───→ │   服务器     │ ───→ │  守护进程    │
│  (Client)   │      │  (Server)   │      │  (Daemon)   │
│   你的电脑   │      │  后台服务    │      │   设备端     │
└─────────────┘      └─────────────┘      └─────────────┘
```

- **客户端**：你在电脑上运行的 ADB 命令
- **服务器**：管理客户端和设备间的通信
- **守护进程**：在设备后台运行，接收并执行命令

## 常用命令

### 设备管理

```bash
# 查看已连接的设备
adb devices

# 连接网络设备（无线调试）
adb connect 192.168.1.100:5555

# 断开设备连接
adb disconnect
```

### 应用管理

```bash
# 安装 APK
adb install app.apk

# 覆盖安装（保留数据）
adb install -r app.apk

# 卸载应用
adb uninstall com.example.app
```

### 文件传输

```bash
# 推送文件到设备
adb push local.txt /sdcard/

# 从设备拉取文件
adb pull /sdcard/file.txt ./
```

### 日志查看

```bash
# 查看实时日志
adb logcat

# 带时间戳的日志
adb logcat -v time

# 保存日志到文件
adb logcat -v time > app.log

# 过滤特定标签
adb logcat -s TAG_NAME:D
```

### Shell 操作

```bash
# 进入设备 Shell
adb shell

# 执行单条命令
adb shell ls /sdcard
adb shell pm list packages  # 列出所有应用包名
```

## 安装方式

### 方式一：Android Studio（推荐）

安装 [Android Studio](https://developer.android.com/studio) 会自动包含 ADB 工具。

### 方式二：独立 SDK 工具

从 [Google 官方](https://developer.android.com/tools/releases/platform-tools) 下载平台工具包，解压后配置环境变量。

### 方式三：包管理器

```bash
# macOS (Homebrew)
brew install android-platform-tools

# Windows (Scoop)
scoop install adb

# Linux (apt)
sudo apt install android-tools-adb
```

## 实战示例

### 无线调试配置

```bash
# 1. 先用 USB 连接设备，设置端口
adb tcpip 5555

# 2. 断开 USB，连接 WiFi
adb connect 192.168.1.100:5555

# 3. 验证连接
adb devices
```

### 启动应用并传参

```bash
# 启动应用
adb shell am start -n com.example.app/.MainActivity

# 启动并传递 URL
adb shell am start -n com.example.app/.MainActivity \
  --es actionUrl "https://baidu.com"

# 在 WebView 中打开
adb shell am start -n com.example.app/.MainActivity \
  --es actionUrl "webViewUrl=https://baidu.com"
```

### 开启应用调试日志

```bash
# 创建调试标记文件
adb shell touch /sdcard/Android/data/应用包名/files/DebugLog

# 查看应用特定日志
adb logcat | grep 应用包名
```