# Electron 桌面应用开发

Electron 是一个使用 Web 技术（HTML、CSS、JavaScript）构建跨平台桌面应用的框架。

[官方文档](https://www.electronjs.org/)

## 核心特点

- 🖥️ **跨平台** - 一套代码，打包 Windows、macOS、Linux 应用
- 🌐 **Web 技术** - 使用熟悉的前端技术栈
- 🔧 **原生能力** - 访问系统 API、文件系统、通知等
- 📦 **自动更新** - 内置自动更新机制

## 优秀开源项目

| 项目 | 特点 | 地址 |
|------|------|------|
| Electron-Egg | 企业级框架，内置常用功能 | [GitHub](https://github.com/dromara/electron-egg) |
| Electron-Vite | Vite + Electron 快速开发 | [官网](https://cn.electron-vite.org/) |

## 快速开始

```bash
# 使用 Electron-Vite 脚手架
npm create electron-vite@latest

# 或使用 Electron Forge
npm init electron-app@latest my-app
```

## 常用 API

```javascript
// 主进程 (main.js)
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  win.loadURL('http://localhost:5173') // 开发环境
  // win.loadFile('dist/index.html') // 生产环境
}

app.whenReady().then(createWindow)
```