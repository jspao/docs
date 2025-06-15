# CSS <Badge type="info" text="层叠样式表" />

层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现 HTML（标准通用标记语言的一个应用）或 XML（标准通用标记语言的一个子集）等文件样式的计算机语言。CSS 不仅可以静态地修饰网页，还可以配合各种脚本语言动态地对网页各元素进行格式化。

CSS 能够对网页中元素位置的排版进行像素级精确控制，支持几乎所有的字体字号样式，拥有对网页对象和模型样式编辑的能力。

## CSS Tools: Reset CSS

【[传送门](https://meyerweb.com/eric/tools/css/reset/)】

`reset.css` 重置样式表的目的是减少浏览器在默认行高、边距和标题字体大小等方面的不一致

## 文字渐变色

```css
.clip-text {
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(123deg, #5e4eff 13.15%, #f14eff 79.65%);
  color: transparent;
  display: inline-block;
}
```

## 文本溢出省略号

`-webkit-line-clamp` 可设置行数

```CSS
display: -webkit-box;
overflow: hidden;
text-overflow: ellipsis;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
```

## 阴影 box-shadow

`box-shadow` 属性用于在元素的框架上添加阴影效果。你可以在同一个元素上设置多个阴影效果，并用逗号将他们分隔开。该属性可设置的值包括阴影的 `X 轴偏移量`、`Y 轴偏移量`、`模糊半径`、`扩散半径和颜色`。【[MDN 传送门](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow#%E8%AF%AD%E6%B3%95)】

```CSS
/* x 偏移量 | y 偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* 插页 (阴影向内) | x 偏移量 | y 偏移量 | 阴影颜色 */
box-shadow: inset 5em 1em gold;

/* 任意数量的阴影，以逗号分隔 */
box-shadow: 3px 3px red, -1em 0 0.4em olive;

/* 全局关键字 */
box-shadow: inherit;
box-shadow: initial;
box-shadow: unset;
```

## 文本抗锯齿

- `Webkit` 实现了名为 `-webkit-font-smoothing` 的相似属性。该属性仅适用于 `macOS`

  - `auto` 由浏览器决定（如果可用，则使用亚像素抗锯齿；这是默认值）。
  - `none` 关闭字体平滑；显示带有锯齿边缘的文本。
  - `antialiased` 在像素（而不是亚像素）级别平滑字体。对于深色背景上的浅色文本，从亚像素渲染切换为抗锯齿渲染可以使其看起来更清晰。
  - `subpixel-antialiased` 在大多数非视网膜显示器上，这将会提供最清晰的文本。

- `Firefox` 实现了名为 `-moz-osx-font-smoothing` 的相似属性。该属性仅适用于 `macOS`。
  - `auto` 允许浏览器选择字体平滑的优化方式，通常为 `grayscale`。
  - `grayscale` 用灰度抗锯齿（而不是亚像素）渲染文本。对于深色背景上的浅色文本，从亚像素渲染切换为抗锯齿渲染可以使其看起来更清晰。

```CSS
/* CSS3属性-webkit-font-smoothing字体抗锯齿渲染 */
-webkit-font-smoothing: antialiased;
/* none(低像素文本友好) | subpixel-antialiased(默认) | antialiased */
-moz-osx-font-smoothing: grayscale; /*inherit | grayscale*/
```

## BFC 解决方案

块格式化上下文(Block Formatting Context) 是 Web 页面的可视化 CSS 渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域

```CSS
/* 方案一 */
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *+height: 1%;
}
/* 方案二-bootstarp */
.clearfix:before,
.clearfix:after {
  display: table;
  content: " ";
}
.clearfix:after {
  clear: both;
}
/* 方案三（源于国外） */
.clearfix {
  overflow: auto;
  _height: 1%;
}
/* 方案四（源于端友） */
.clearfix {
  overflow: hidden;
  _zoom: 1;
}
/* 使用双伪元素清除浮动 */
.clearfix:before,
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.clearfix {
  zoom: 1;
}
/* 比较严谨的一种做法 */
.clearfix:after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}
.clearfix {
  zoom: 1;
}
```

## 移动端 input 样式

```CSS
/*输入框在手机端有阴影*/
input[type="text"] {
  -webkit-appearance: none;
}
textarea {
  -webkit-appearance: none;
}
/*selection用户选择样式*/
::selection {
  color: #fff;
  background: #b6c2cc;
}
::-moz-selection {
  color: #fff;
  background: #b6c2cc;
}
```

## Scrollbar 样式自定义

```CSS
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #f5f5f5;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
```

## Chrome Transition 闪烁问题

```CSS
/*示例1*/
.demo {
  transform: transformY(0);
  transition: transform 0.5s;
}
.demo:hover {
  transform: transformY(-20px);
}
/*示例2*/
.demo {
  background: #000;
  position: relative;
  top: 0;
  width: 200px;
  height: 100px;
  transition: top 0.2s;
}
.demo:hover {
  top: -10px;
  -webkit-backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
}
```

## table 1 像素边框

```CSS
table {
  border: 1px solid #666666;
  border-spacing: 0;
  border-collapse: collapse;
}
table th,
table td {
  border: 1px solid #666666;
}
```

## px/rem 运算对照

帮助理解基于 html 预设不同的 fontSize 完成 px 转 rem 的运算实例

| HTML fontSize (px) | 16px            | 10px           |
| ------------------ | --------------- | -------------- |
| 12                 | 12/16 = .75rem  | 12/10 = 1.2rem |
| 14                 | 14/16 = .875rem | 14/10 = 1.4rem |
| 16                 | 16/16 = 1rem    | 16/10 = 1.6rem |

推荐使用 `10px` 或 `62.5%`

## Flex 布局规则

Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能【[MDN 传送门](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)】
【[阮一峰 Flex 布局](https://www.ruanyifeng.com/blog/2015/07/flex-examples.html)】

## BEM（Block, Element, Modifier）

### BEM 的简介

- `B` 代表：Block（块），独立实体，独立的意义，每个页面都可以看做是多个 Block 组成
- `E` 代表：Element（元素），block 的一部分，没有独立意义，是组件下的一个元素，多个元素形成一个组件
- `M` 代表：Modifier （修饰符），block 或 element 上的标记，是描述 Block 或 Element 的属性或状态，同一 Block 或 Element 可以有多个 Modifier。

`BEM` 全称 `BlockElementModifier` 是由 Yandex（俄罗斯最著名的互联网企业）的开发团队提出的前端开发理论。通过 `Block`、`Element`、`Modifier` 来描述页面，通过 `__` 与 `--` 或 `_` 或 `-`连接 ，关键就是为了解决多人协作的命名问题。

### BEM 的基础使用

BEM 的命名规矩很容易记：`block-name__element-name--modifier-name`，也就是模块名 + 元素名 + 修饰器名。

#### 模块 Block

没有前缀，多个单词用 `-` 连接，是对一个组件名抽象。

```html
<!-- 一个普通列表的a标签 -->
<li><a class="li-a">...</a></li>
<!-- 一个在导航栏的a标签 -->
<li><a class="nav-li-a"></a></li>
<!-- 一个被选中的在导航栏的a标签 -->
<li><a class="nav-li-a is-active"></a></li>
<!-- 一个在头部的图片 -->
<header>
  <img class="header-img" src="#" alt="#" />
</header>
```

#### 元素 Element

元素在模块之后，可以有多个层级，以 `__` 连接。element 也不是死板的，是根据具体的需求演变的，中间也可以使用 `-` 来演变。

```html
<li class="nav--main__item  jspao-nav--main__item"><a>...</a></li>
<li class="nav--main__item  jspao-nav--main__item"><a>...</a></li>
```

```html
<!-- 几个普通列表的a标签 -->
<li>
  <a class="li-a__item">...</a>
  <a class="li-a__item">...</a>
</li>
<!-- 几个在导航栏的a标签 -->
<li>
  <a class="nav-li-a__item"></a>
  <a class="nav-li-a__item"></a>
</li>
```

#### 修饰 Modifier

某元素、或者某模块特别的状态，必须有一个状态名和状态值，使用 `--` 或 `-` 链接

主要针对的是 Block 本身，是对于 Block 做修饰。例如有：颜色、大小、用途

```css
.block-name_element-name--modifierName {
  /* ... */
}
.blockName__elementName-modifierName {
  /* ... */
}
```
