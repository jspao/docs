# Markdown 使用指南

Markdown 是一种轻量级标记语言，让你用简单的符号就能写出格式优美的文档。

::: tip 学习资源
- [Markdown 快速参考](https://www.markdownguide.org/cheat-sheet/) - 官方速查表
- [VitePress Markdown 扩展](https://vitepress.dev/zh/guide/markdown) - VitePress 支持的额外语法
:::

本文档介绍在 VitePress 中常用的 Markdown 写法，帮助你快速上手文档编写。

## 徽标 (Badge)

用于显示版本号、状态标记等小标签。

### 语法

```html
<Badge type="info" text="默认" />
<Badge type="tip" text="^1.9.0" />
<Badge type="warning" text="测试版" />
<Badge type="danger" text="注意" />
```

### 效果展示

| 类型 | 效果 | 用途 |
|------|------|------|
| `info` | <Badge type="info" text="默认" /> | 普通信息 |
| `tip` | <Badge type="tip" text="^1.9.0" /> | 版本提示 |
| `warning` | <Badge type="warning" text="测试版" /> | 警告提示 |
| `danger` | <Badge type="danger" text="注意" /> | 重要提醒 |

## Emoji 表情

在文档中添加有趣的表情符号。

### 语法

```markdown
:tada: :100: :fire: :rocket:
```

### 效果

:tada: :100: :fire: :rocket:

::: info Emoji 大全
完整列表请参考 [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs)
:::

## 提示框 (Alerts)

用于突出显示重要信息，有五种类型可选。

### 语法

```markdown
::: info
这是信息提示框。
:::

::: tip
这是建议提示框。
:::

::: warning
这是警告提示框。
:::

::: danger
这是危险警告框。
:::

::: details
这是可折叠的详情块。
:::
```

### 效果展示

::: info
**信息** - 用于显示一般性的说明信息。
:::

::: tip
**提示** - 用于给出有用的建议或技巧。
:::

::: warning
**警告** - 用于提醒用户注意潜在的问题。
:::

::: danger
**危险** - 用于警示可能导致严重后果的操作。
:::

::: details
**详情** - 点击展开/收起更多内容。
:::

## 标题层级

文档标题分为六个层级，右侧目录从二级标题开始显示。

```markdown
# 一级标题（文档标题）
## 二级标题（主要章节）
### 三级标题（小节）
#### 四级标题（细分内容）
##### 五级标题
###### 六级标题
```

::: tip 建议
- 一个文档只使用一个一级标题
- 二级标题用于划分主要章节
- 三级及以下用于细分内容
:::

## 链接

### 语法

```markdown
[链接文字](https://example.com)
[链接文字](https://example.com "鼠标悬停显示的标题")
```

### 示例

| 写法 | 效果 |
|------|------|
| `[百度](https://baidu.com)` | [百度](https://baidu.com) |
| `[GitHub](https://github.com "代码托管平台")` | [GitHub](https://github.com "代码托管平台") |

## 图片

### 语法

```markdown
![图片描述](图片地址)
![图片描述](图片地址 "鼠标悬停显示的标题")
```

### 示例

```markdown
![JSPAO Logo](https://jspao.com/home-logo.webp)
```

![JSPAO Logo](https://jspao.com/home-logo.webp)

::: tip 图片存放建议
- 本地图片放在 `docs/public` 目录下
- 引用时使用绝对路径 `/images/xxx.png`
:::

## 文字样式

### 语法

```markdown
*斜体文本*
**粗体文本**
***粗斜体文本***
~~删除线文本~~
```

### 效果

| 样式 | 写法 | 效果 |
|------|------|------|
| 斜体 | `*斜体*` | *斜体文本* |
| 粗体 | `**粗体**` | **粗体文本** |
| 粗斜体 | `***粗斜体***` | ***粗斜体文本*** |
| 删除线 | `~~删除线~~` | ~~删除线文本~~ |

## 行内代码

用于在段落中标记代码、命令或特殊名词。

### 语法

```markdown
使用 `pnpm install` 安装依赖
```

### 效果

使用 `pnpm install` 安装依赖

::: tip 使用场景
- 标记代码变量名、函数名
- 显示命令行指令
- 强调技术术语
:::

## 表格

### 语法

```markdown
| 表头1 | 表头2 | 表头3 |
|-------|-------|-------|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |
```

### 效果

| 姓名 | 年龄 | 城市 |
|------|------|------|
| 张三 | 25 | 北京 |
| 李四 | 30 | 上海 |

::: tip 表格技巧
- 使用 `:` 控制对齐方式：`:---` 左对齐，`---:` 右对齐，`:-:` 居中
- 表格支持嵌套其他 Markdown 语法
:::

## 无序列表

### 语法

```markdown
- 项目1
- 项目2
  - 子项目2.1
  - 子项目2.2
- 项目3
```

### 效果

- 项目1
- 项目2
  - 子项目2.1
  - 子项目2.2
- 项目3

::: tip 符号选择
可以使用 `-`、`+` 或 `*` 作为列表标记，效果相同。
:::

## 有序列表

### 语法

```markdown
1. 第一步
2. 第二步
   - 子步骤2.1
   - 子步骤2.2
3. 第三步
```

### 效果

1. 第一步
2. 第二步
   - 子步骤2.1
   - 子步骤2.2
3. 第三步

::: tip 注意事项
- 数字后的点必须是英文句号 `.`
- 数字不必按顺序，渲染时会自动编号
- 可以嵌套无序列表
:::
