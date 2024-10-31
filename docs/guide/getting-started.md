# 快速开始

::: tip 导语
怎么会有人完全理解你的苦，然后因此懂你的难呢？

不会有的，但凡有一点点惺惺相惜，让你在茫茫人海中相遇，已是非常难得；

没有感同身受！！！感同身受意味着：穿你的鞋，走你的路，吃你的苦，熬你的夜，读你的书，受你的难！

怎么可能会有，不可能的！
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
