# VSCode 编辑器

Visual Studio Code 是目前最流行的代码编辑器，轻量、开源、插件丰富。

::: tip 国内下载加速
官方下载慢？使用国内 CDN：
`https://vscode.cdn.azure.cn/stable/xxxxxxx.exe`
:::

## 推荐扩展

### 开发效率

| 扩展 | 功能 | 推荐度 |
|------|------|--------|
| ESLint | 代码规范检查 | ⭐⭐⭐⭐⭐ |
| Prettier | 代码格式化 | ⭐⭐⭐⭐⭐ |
| GitLens | Git 增强 | ⭐⭐⭐⭐⭐ |
| Auto Rename Tag | 自动重命名标签 | ⭐⭐⭐⭐ |
| Path Intellisense | 路径智能提示 | ⭐⭐⭐⭐ |

### 前端开发

| 扩展 | 功能 | 推荐度 |
|------|------|--------|
| Vue - Official | Vue 官方插件 | ⭐⭐⭐⭐⭐ |
| TypeScript Vue Plugin | TS 支持 | ⭐⭐⭐⭐⭐ |
| Tailwind CSS IntelliSense | Tailwind 提示 | ⭐⭐⭐⭐ |
| i18n Ally | 国际化辅助 | ⭐⭐⭐⭐ |

### 主题美化

| 扩展 | 风格 |
|------|------|
| One Dark Pro | 深色经典 |
| Dracula Official | 暗黑炫酷 |
| Material Icon Theme | 文件图标 |

## 常用快捷键

### 编辑操作

| 快捷键 | 功能 |
|--------|------|
| `Option + ↑/↓` | 向上/下移动行 |
| `Option + Shift + ↑/↓` | 向上/下复制行 |
| `Command + Shift + Enter` | 上方插入新行 |
| `Command + Shift + K` | 删除当前行 |
| `Ctrl + K` | 删除到行尾 |
| `Command + D` | 选中下一个相同词 |
| `Command + Shift + L` | 选中所有相同词 |

### 导航操作

| 快捷键 | 功能 |
|--------|------|
| `Command + P` | 快速打开文件 |
| `Command + Shift + P` | 命令面板 |
| `Command + Shift + O` | 跳转到符号 |
| `Command + Shift + \` | 跳转到匹配括号 |
| `Ctrl + -` | 返回上一位置 |
| `Ctrl + Shift + -` | 前进到下一位置 |
| `Command + ↑/↓` | 跳转到文件开头/结尾 |

### 搜索替换

| 快捷键 | 功能 |
|--------|------|
| `Command + F` | 当前文件搜索 |
| `Command + Shift + F` | 全局搜索 |
| `Command + H` | 当前文件替换 |
| `Command + Shift + H` | 全局替换 |

### 窗口管理

| 快捷键 | 功能 |
|--------|------|
| `Command + N` | 新建文件 |
| `Command + O` | 打开文件 |
| `Command + W` | 关闭当前文件 |
| `Command + Shift + N` | 新建窗口 |
| `` Ctrl + ` `` | 显示/隐藏终端 |

### 代码折叠

| 快捷键 | 功能 |
|--------|------|
| `Command + K, Command + J` | 展开全部 |
| `Command + K, Command + 0` | 折叠全部 |
| `Command + Option + [` | 折叠当前区域 |
| `Command + Option + ]` | 展开当前区域 |

## 实用技巧

### 多光标编辑

- `Option + 点击` - 在多处放置光标
- `Command + Option + ↑/↓` - 向上/下添加光标
- `Command + D` - 逐个选中相同单词

### 快速重构

- `F2` - 重命名符号
- `Command + .` - 快速修复
- `Command + Shift + R` - 重构菜单

### Emmet 缩写

```html
<!-- 输入 div.container>ul>li*3 按 Tab -->
<div class="container">
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
```