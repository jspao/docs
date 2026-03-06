# 快速开始

::: tip 导语
欢迎来到 JSPAO 技术博客！这里记录了前端开发中的经验、技巧和代码片段，希望能帮助你在技术之路上走得更远。

**掌握技术，掌控自由。**
:::

## 环境要求

本项目使用以下技术栈：

| 工具 | 版本 | 说明 |
|------|------|------|
| Node.js | v16.16.0+ | JavaScript 运行环境 |
| pnpm | v7.5.2+ | 包管理工具（推荐） |

![node](https://img.shields.io/badge/node-v16.16.0-green.svg)
![pnpm](https://img.shields.io/badge/pnpm-v7.5.2-svg?color=%23f69220)

## 常用命令

```sh
# 启动本地开发服务器
pnpm docs:dev

# 构建生产环境
pnpm docs:build

# 本地预览构建结果
pnpm docs:preview
```

## 部署指南

### 手动部署

1. 执行构建命令：
   ```sh
   pnpm docs:build
   ```

2. 构建完成后，`docs/.vitepress/dist` 文件夹即为静态站点文件

3. 将 `dist` 文件夹内的内容上传到你的 Web 服务器即可

### 自动化部署

本项目配置了 GitHub Actions 自动部署，推送代码到 `main` 分支后会自动构建并部署到 GitHub Pages。详细配置请参考 [VitePress 部署文档](./vitepress.md)。
