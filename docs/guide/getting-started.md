# 快速开始

::: tip 导语
加油吧！没有什么好说的。

任何事情都比不过把金钱、时间、自由掌握在自己手上来的快乐！
:::


## 运行说明

推荐使用 `pnpm` 进行包管理

![node](https://img.shields.io/badge/node-v16.16.0-green.svg)

![pnpm](https://img.shields.io/badge/pnpm-v7.5.2-svg?color=%23f69220)

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
