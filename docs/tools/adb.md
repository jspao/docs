# adb

ADB 全称是 Android Debug Bridge（安卓调试桥），是 Android SDK（软件开发工具包）中的一个命令行工具，主要用于与 Android 设备进行通信和控制。它是开发人员和高级用户调试、测试、控制设备的重要工具。

非安卓开发临时测试工具推荐 [AYA](https://github.com/liriliri/aya/releases/tag/v1.10.0)，[文档地址](https://aya.liriliri.io/zh/guide/quickstart.html)

## adb 可以做什么

ADB 让你可以通过电脑远程对 Android 手机或模拟器执行各种操作

1. 安装或卸载应用程序
2. 查看日志（logcat）
3. 复制文件到设备或从设备复制文件
4. 在设备上执行 shell 命令
5. 重启设备或进入特定模式（如 recovery、bootloader）
5. 进行屏幕录制或截图
6. 模拟输入（如发送文本或点击）


## ADB 的工作原理

1. ADB 客户端（Client）：你在电脑上运行的命令。
2. ADB 守护进程（Daemon）：运行在设备上的后台进程，接收命令。
3. ADB 服务器（Server）：管理客户端和设备之间的通信。

## 示例命令

``` bash
adb devices          # 查看已连接的设备
adb install app.apk  # 安装 APK 应用
adb shell            # 进入设备的命令行模式
adb push a.txt /sdcard/  # 上传文件
adb pull /sdcard/a.txt   # 下载文件
```

## 下载方式 

ADB 是 Android SDK 的一部分。可以通过安装 Android Studio 或 命令行工具（Command line tools） 来获取。或者直接从 [Google 官方 SDK 平台工具](https://developer.android.com/tools/releases/platform-tools) 页面 下载。

## 工作备注

``` bash
# abd 连接
adb connect 192.168.11.2:60001
# 启动
adb shell am start -n 应用包名 --es actionUrl " http://baidu.com/"
# 在webview中打开链接
adb shell am start -n 应用包名 --es actionUrl "webViewUrl=http://baidu.com/"
# 抓取日志
adb logcat -v time > E:\xxx.log
# 中心开启日志debug功能
adb shell touch /sdcard/Android/data/应用包名/files/DebugLog
```