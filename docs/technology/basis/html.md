# HTML 基础

HTML（HyperText Markup Language，超文本标记语言）是构建网页的标准语言，使用标签来描述网页的结构和内容。

## 核心概念

### HTML 是什么？

- **标记语言**：不是编程语言，而是用于描述内容的标签系统
- **标签成对**：大多数标签有开始 `<tag>` 和结束 `</tag>`
- **浏览器解析**：浏览器读取 HTML 并渲染成可视化的网页

### 基本文档结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题</title>
</head>
<body>
  <!-- 页面可见内容 -->
  <h1>主标题</h1>
  <p>段落内容</p>
</body>
</html>
```

## 元素类型

### 块级元素 (Block-level)

块级元素独占一行，可设置宽高。

| 标签 | 用途 |
|------|------|
| `<div>` | 通用容器 |
| `<p>` | 段落 |
| `<h1>` ~ `<h6>` | 标题 |
| `<ul>` / `<ol>` | 列表 |
| `<table>` | 表格 |
| `<form>` | 表单 |
| `<header>` / `<footer>` / `<section>` | 语义化标签 |

```html
<div style="width: 200px; height: 100px; background: #f0f0f0;">
  块级元素独占一行
</div>
<p>另一个块级元素</p>
```

### 行内元素 (Inline)

行内元素不独占一行，宽高由内容决定。

| 标签 | 用途 |
|------|------|
| `<span>` | 通用行内容器 |
| `<a>` | 链接 |
| `<strong>` / `<em>` | 强调 |
| `<img>` | 图片 |
| `<input>` | 输入框 |
| `<label>` | 标签 |

```html
<p>
  这是一段文字，<span style="color: red;">红色部分</span>是行内元素，
  <a href="#">链接</a>也是行内元素。
</p>
```

### 行内块元素 (Inline-block)

兼具行内和块级特性：可同行显示，又可设置宽高。

```css
.inline-block {
  display: inline-block;
  width: 100px;
  height: 50px;
}
```

## 常用标签速查

### 文本标签

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<p>段落文字</p>
<span>行内文字</span>
<strong>加粗</strong>
<em>斜体</em>
<br> <!-- 换行 -->
<hr> <!-- 水平线 -->
```

### 链接与图片

```html
<!-- 外部链接 -->
<a href="https://example.com">点击访问</a>

<!-- 新窗口打开 -->
<a href="https://example.com" target="_blank">新窗口打开</a>

<!-- 锚点链接 -->
<a href="#section1">跳转到第一章</a>

<!-- 图片 -->
<img src="photo.jpg" alt="图片描述" width="300">
```

### 列表

```html
<!-- 无序列表 -->
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>橙子</li>
</ul>

<!-- 有序列表 -->
<ol>
  <li>第一步</li>
  <li>第二步</li>
  <li>第三步</li>
</ol>

<!-- 定义列表 -->
<dl>
  <dt>HTML</dt>
  <dd>超文本标记语言</dd>
  <dt>CSS</dt>
  <dd>层叠样式表</dd>
</dl>
```

### 表格

```html
<table>
  <thead>
    <tr>
      <th>姓名</th>
      <th>年龄</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>张三</td>
      <td>25</td>
    </tr>
    <tr>
      <td>李四</td>
      <td>30</td>
    </tr>
  </tbody>
</table>
```

### 表单

```html
<form action="/submit" method="POST">
  <label for="username">用户名：</label>
  <input type="text" id="username" name="username" placeholder="请输入用户名">
  
  <label for="email">邮箱：</label>
  <input type="email" id="email" name="email">
  
  <label for="gender">性别：</label>
  <input type="radio" name="gender" value="male"> 男
  <input type="radio" name="gender" value="female"> 女
  
  <label for="hobbies">爱好：</label>
  <input type="checkbox" name="hobbies" value="reading"> 阅读
  <input type="checkbox" name="hobbies" value="sports"> 运动
  
  <select name="city">
    <option value="">请选择城市</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
  </select>
  
  <textarea name="message" rows="4" placeholder="请输入留言"></textarea>
  
  <button type="submit">提交</button>
</form>
```

## HTML5 语义化标签

使用语义化标签让结构更清晰，利于 SEO 和可访问性。

```html
<body>
  <header>
    <nav>导航链接</nav>
  </header>
  
  <main>
    <article>
      <h1>文章标题</h1>
      <section>章节内容</section>
    </article>
    
    <aside>侧边栏内容</aside>
  </main>
  
  <footer>页脚信息</footer>
</body>
```

| 标签 | 用途 |
|------|------|
| `<header>` | 页头 |
| `<nav>` | 导航 |
| `<main>` | 主要内容 |
| `<article>` | 独立文章 |
| `<section>` | 章节 |
| `<aside>` | 侧边栏 |
| `<footer>` | 页脚 |
| `<figure>` / `<figcaption>` | 图文组合 |
