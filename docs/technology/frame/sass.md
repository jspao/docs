# Sass 样式预处理指南

Sass 是一款强大的 CSS 预处理器，通过变量、嵌套、混合、函数等特性，让 CSS 开发更加高效、可维护。

> **官方文档**：[Sass 中文文档](https://sass.bootcss.com/documentation.html)

## 核心特性

| 特性 | 说明 | 示例 |
|------|------|------|
| **变量** | 存储可复用的值 | `$primary: #007bff;` |
| **嵌套** | 层级化的选择器结构 | `.nav { .item { ... } }` |
| **混合** | 可复用的样式块 | `@mixin flex { ... }` |
| **函数** | 计算和转换 | `darken($color, 10%)` |
| **继承** | 选择器复用 | `@extend .btn;` |

## VS Code 插件：Live Sass Compiler

实时编译 Sass/SCSS 为 CSS 的 VS Code 插件。

Visual Studio Code插件Live Sass Compiler可将Sass或Scss实时编译为CSS

[Live Sass Compiler](https://www.sass.hk/skill/sass154.html?tdsourcetag=s_pcqq_aiomsg#google_vignette)

### 快速开始

| 操作 | 方式 |
|------|------|
| **启动实时编译** | 点击状态栏 "Watch Sass" 或按 `F1` 输入 `Live Sass: Watch Sass` |
| **停止实时编译** | 点击状态栏 "Stop Watching Sass" 或按 `F1` 输入 `Live Sass: Stop Watching Sass` |
| **单次编译** | 按 `F1` 输入 `Live Sass: Compile Sass - Without Watch Mode` |

### 插件特性

- **实时编译**：保存文件时自动编译
- **自定义输出路径**：灵活配置 CSS 输出位置
- **多种输出格式**：expanded、compact、compressed、nested
- **自动前缀**：自动添加浏览器前缀
- **实时重载**：配合 Live Server 实现自动刷新
- **排除文件夹**：可设置忽略特定目录

> 更多设置请参考 [官方文档](https://github.com/ritwickdey/vscode-live-sass-compiler/blob/master/docs/settings.md)
### 配置示例

在项目根目录创建 `.vscode/settings.json`：

```json
{
  "liveSassCompile.settings.formats": [
    {
      "format": "compact",
      "extensionName": ".min.css",
      "savePath": "/dist/css"
    }
  ],
  "liveSassCompile.settings.excludeList": [
    "**/node_modules/**",
    ".vscode/**"
  ],
  "liveSassCompile.settings.autoprefix": [
    "> 1%",
    "last 2 versions"
  ]
}
```

| 配置项 | 说明 |
|--------|------|
| `format` | 输出格式：expanded、compact、compressed、nested |
| `extensionName` | 输出文件后缀：`.css` 或 `.min.css` |
| `savePath` | CSS 输出路径 |
| `excludeList` | 排除的目录 |
| `autoprefix` | 自动前缀的浏览器支持范围 |

## BEM 命名规范与 Mixin

BEM（Block Element Modifier）是一种 CSS 命名方法论，通过块、元素、修饰符的结构化命名，提高代码的可维护性。

### 命名规则

| 类型 | 符号 | 示例 |
|------|------|------|
| **Block**（块） | 无前缀 | `.button` |
| **Element**（元素） | `__` | `.button__icon` |
| **Modifier**（修饰符） | `--` | `.button--primary` |

### 编写 BEM Mixin

::: code-group

```scss [_mixin.scss]
$block-sel: "-" !default;
$element-sel: "__" !default;
$modifier-sel: "--" !default;
$namespace: "jspao" !default;

// block
@mixin b($block) {
  $B: $namespace + $block-sel + $block;
  .#{$B} {
    @content;
  }
}

// element
@mixin e($element) {
  $selector: &;
  @at-root {
    #{$selector + $element-sel + $element} {
      @content;
    }
  }
}

// modifier
@mixin m($modifier) {
  $selector: &;
  @at-root {
    #{$selector + $modifier-sel + $modifier} {
      @content;
    }
  }
}
```

```scss [custom.scss]
@include b("wrap") {
  position: relative;
  overflow: hidden;
  height: 100%;
  background-color: white;
  @include e("body") {
    display: flex;
    flex-flow: row;
    width: 100%;
    height: calc(100% - 56px);
  }
  @include e("side") {
    position: relative;
  }
  @include e("menu") {
    position: relative;
    width: 200px;
    height: calc(100% - 50px);
  }
  @include e("content") {
    flex: auto;
    background-color: #f6f7f9;
  }
  @include m("shadow") {
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  }
}
```

```html [demo.html]
<div class="yzp-wrap">
  <div class="yzp-wrap--shadow">AppHead</div>
  <div class="yzp-wrap__body">
    <div class="yzp-wrap__side">
      <div class="yzp-wrap__menu">SideMenu</div>
    </div>
    <div class="yzp-wrap__content">
      <div class="p-24">AppMain</div>
    </div>
  </div>
</div>
```

:::
