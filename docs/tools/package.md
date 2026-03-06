# 包管理器

Node.js 生态有三种主流包管理器：npm、yarn 和 pnpm。

## 对比与选择

| 特性 | npm | yarn | pnpm |
|------|-----|------|------|
| 安装速度 | 一般 | 快 | 极快 |
| 磁盘占用 | 大 | 大 | 小 |
| 依赖管理 | 扁平化 | 扁平化 | 内容寻址 |
| 离线模式 | 不支持 | 支持 | 支持 |
| 推荐度 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## pnpm <Badge type="tip" text="推荐" />

[pnpm](https://www.pnpm.cn/) 是目前最推荐的包管理器：

- **速度快** - 并行下载，充分利用网络
- **省空间** - 全局存储，硬链接共享
- **更严格** - 避免幽灵依赖问题

```bash
# 安装 pnpm
npm install -g pnpm

# 常用命令（与 npm 类似）
pnpm install          # 安装依赖
pnpm add <package>    # 添加依赖
pnpm remove <package> # 移除依赖
pnpm update           # 更新依赖
pnpm run <script>     # 运行脚本
```

## Yarn

[Yarn](https://www.yarnpkg.cn/) 由 Facebook 开发，特点是：

- 离线安装支持
- 确定性安装（yarn.lock）
- 工作区支持（Monorepo）

```bash
# Yarn 经典版
yarn install
yarn add <package>
yarn remove <package>

# Yarn Berry (v2+)
yarn set version stable
```

## npm

[npm](https://www.npmjs.com/) 是 Node.js 自带的包管理器：

```bash
npm install           # 安装依赖
npm install <package> # 添加依赖
npm uninstall <package>
npm update
npm run <script>
```

::: tip 版本选择
- 新项目：优先使用 **pnpm**
- 老项目：保持原有管理器
- Monorepo：考虑 **pnpm workspace** 或 **Yarn workspace**
:::

## 解决老项目依赖版本对齐问题

原因：npm 升级到 7.x以上后，会出现上游依赖冲突；`–legacy-peer-deps`：安装时忽略所有 `peerDependencie`，默认使用npm 4-6版本的安装模式，安装过程中是会跳过对等依赖项。

``` sh
npm i --legacy-peer-deps
```

## 解决npm install -g yarn后无法识别问题

首次安装yarn时可能会提示 yarn 无法加载文件，这个可能是系统禁止脚本

1. 可以搜索Windows -> PowerShell并且以管理员身份打开
2. 输入命令行 `set-ExecutionPolicy RemoteSigned` 选择Y

## 解决 sharp: Command failed 问题

- 报错原因：node 无法下载相应的 module，比如 electron 或者 sharp
- 解决方案：在项目目录下配置`.yarnrc`（或者`.npmrc` 文件）稳定靠谱

```
registry "https://registry.npmmirror.com/"
sass_binary_site "https://registry.npmmirror.com/mirrors/node-sass/"
phantomjs_cdnurl "http://cnpmjs.org/downloads"
electron_mirror "https://registry.npmmirror.com/mirrors/electron/"
sqlite3_binary_host_mirror "https://foxgis.oss-cn-shanghai.aliyuncs.com/"
profiler_binary_host_mirror "https://registry.npmmirror.com/mirrors/node-inspector/"
chromedriver_cdnurl "https://cdn.registry.npmmirror.com/dist/chromedriver"
sharp_binary_host "https://registry.npmmirror.com/mirrors/sharp"
sharp_libvips_binary_host "https://registry.npmmirror.com/mirrors/sharp-libvips"
```

## 关于 package.json

在每个前端项目中，都有 `package.json` 文件，它是项目的配置文件，常见的配置有配置项目启动、打包命令，声明依赖包等。
`package.json` 文件是一个 `JSON` 对象，该对象的每一个成员就是当前项目的一项设置。
依赖包的版本号前面的符号表示版本号的范围。

**常见的符号和意义如下：**

- `^`：锁定主版本号（major），例如：`^3.2.1` 表示使用 `3.x` 版本，`4.x` 版本需要手动升级。
- `~`：锁定次版本号（minor），例如：`~3.2.1` 表示使用 `3.2.x` 版本，`3.3.x` 版本可以自动安装，但 `4.x` 版本需要手动升级。
- `*`：表示任何版本。
- `<`、`<=`、`>`、`>=`：表示版本号的范围，例如：`<=3.2.1` 表示使用小于等于 `3.2.1` 的版本。

这些符号可以用于确保项目所使用的依赖包版本是符合要求的。

但需要注意的是，过于严格的版本锁定可能导致安装或升级依赖包时的问题，因此需要根据实际情况进行选择。
