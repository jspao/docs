# JSPAO 技术博客

前端工作手册，分享、记录开发经验及常用代码片段。

## 运行说明

推荐使用 `pnpm` 进行包管理

![node](https://img.shields.io/badge/node-v18.20.0-green.svg)

![pnpm](https://img.shields.io/badge/pnpm-v8.15.6-svg?color=%23f69220)


```sh
# 本地运行
pnpm docs:dev
# 打包
pnpm docs:build
# 本地预览
pnpm docs:preview
```

## 部署说明

1. `pnpm docs:build` 指令执行后会生成 `dist` 文件夹
2. 将路径 `docs/.vitepress/` 内 `dist` 文件上传至服务器即可
