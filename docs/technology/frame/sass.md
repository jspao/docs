# Sass

[中文文档入口](https://sass.bootcss.com/documentation.html)

Sass 是一种 CSS 的预编译语言。它提供了 变量（variables）、嵌套（nested rules）、 混合（mixins）、 函数（functions）等功能，并且完全兼容 CSS 语法。Sass 能够帮助复杂的样式表更有条理， 并且易于在项目内部或跨项目共享设计。

## Live Sass 编译器

Visual Studio Code插件Live Sass Compiler可将Sass或Scss实时编译为CSS

[Live Sass Compiler](https://www.sass.hk/skill/sass154.html?tdsourcetag=s_pcqq_aiomsg#google_vignette)

### 用法/快捷方式
  1. Watch Sass从状态栏单击以打开实时编译，然后Stop Watching Sass从状态栏单击以打开实时编译。 
  2. 按F1或ctrl+shift+P键入Live Sass: Watch Sass以开始实时编译，或者按键入Live Sass: Stop Watching Sass以停止实时编译。
  3. 按F1或ctrl+shift+P键入一次Live Sass: Compile Sass - Without Watch Mode 以编译Sass或Scss。
### 特征
  1. 实时SASS和SCSS编译。
  2. 导出CSS的可自定义文件位置。
  3. 可定制的导出CSS样式（expanded，compact，compressed，nested）。
  4. 可自定义的扩展名（.css或.min.css）。
  5. 快速状态栏控件。
  6. 通过设置排除特定文件夹。
  7. 实时重新加载（取决于Live Server扩展名）。
  8. 支持自动前缀
  9. 更多参数设置 [传送门](https://github.com/ritwickdey/vscode-live-sass-compiler/blob/master/docs/settings.md)
### 参数配置

```json
 "liveSassCompile.settings.formats":[
  // 扩展
  {
      "format": "compact", //可定制的出口CSS样式（expanded，compact，compressed，nested）
      "extensionName": ".min.css", //编译后缀名
      "savePath": "~/./css" //编译保存的路径
  } 
],
"liveSassCompile.settings.excludeList": [
  "**/node_modules/**",
  ".vscode/**"
],
```

## 编写一个 BEM Mixin

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
