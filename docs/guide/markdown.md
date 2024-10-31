# 优雅的使用 Markdown

`Markdown` 是一种轻量级标记语言

想要优雅的编写 `Markdown` 文档，首先你需要有编写该文档的基础知识！[传送门](https://www.markdownguide.org/cheat-sheet/)

在 VitePress 中优雅的写作，可以查看[VitePress 官方文档](https://vitepress.dev/zh/guide/markdown)中的写作篇，以下简单罗列 Wiki 文档中会**常用写法**！

## 徽标

**输入**

```html
<Badge type="info" text="default" />
<Badge type="tip" text="^1.9.0" />
<Badge type="warning" text="beta" />
<Badge type="danger" text="caution" />
```

**输出**

<Badge type="info" text="default" />
<Badge type="tip" text="^1.9.0" />
<Badge type="warning" text="beta" />
<Badge type="danger" text="caution" />

## Emoji

**输入**

```
:tada: :100:
```

**输出**

:tada: :100:

[Emoji 列表](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs)

## Tips

**输入**

```sh
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**输出**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## 标题

Wiki 中右侧目录是从二级标题开始计算的

```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

## 链接

**输入**

```
[Baidu](https://baidu.com)
```

**输出**

[Baidu](https://baidu.com)

## 图片

**输入**

```
![在这里插入图片描述](https://jspao.com/home-logo.webp)
```

**输出**

![在这里插入图片描述](https://jspao.com/home-logo.webp)

## 文字风格

**输入**

```
_斜体文本_
**粗体文本**
**_粗斜体文本_**
```

**输出**

_斜体文本_

**粗体文本**

**_粗斜体文本_**

## 文字高亮

**输入**

```
`前端真好学`
```

**输出**

`前端真好学`

## 表格

**输入**

```
|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |
```

**输出**

| 表头   | 表头   |
| ------ | ------ |
| 单元格 | 单元格 |
| 单元格 | 单元格 |

## 无序列表

**输入**

```
- 第一项
- 第二项
    - 嵌套第二项
```

**输出**

- 第一项
- 第二项
  - 嵌套第二项

## 有序列表

**输入**

```
1. 第一项
   - 嵌套第二项
2. 第二项
```

**输出**

1. 第一项
   - 嵌套第二项
2. 第二项
