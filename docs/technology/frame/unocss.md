# UnoCSS 原子化 CSS

UnoCSS 是一个即时原子化 CSS 引擎，按需生成所需的 CSS，无需预编译。

[官方文档](https://unocss.dev/) | [交互式文档](https://unocss.dev/interactive/)

## 核心特点

- ⚡ **即时生成** - 按需生成，无需预编译
- 🔧 **高度可定制** - 完全可控的预设系统
- 🪶 **轻量** - 仅生成使用到的 CSS
- 🎯 **IDE 支持** - 完整的自动补全

## 快速开始

```bash
# 安装
npm install -D unocss

# Vite 配置
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [UnoCSS()]
})
```

## 常用语法

### 基础样式

```html
<!-- 文字和背景 -->
<div text-red bg-blue-500>红色文字，蓝色背景</div>

<!-- 尺寸 -->
<div w-100 h-50>宽 100px，高 50px</div>
<div w-full h-screen>全屏宽高</div>

<!-- 间距 -->
<div p-4 m-2>内边距 1rem，外边距 0.5rem</div>
<div px-4 py-2>水平内边距 1rem，垂直 0.5rem</div>
```

### 状态变体

```html
<!-- Hover 状态 -->
<button bg-blue hover:bg-blue-700>
  悬停变深色
</button>

<!-- Focus 状态 -->
<input border-gray focus:border-blue>

<!-- 禁用状态 -->
<button opacity-50 cursor-not-allowed disabled>
  禁用按钮
</button>
```

### 响应式设计

```html
<!-- 断点：xs sm md lg xl 2xl -->
<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  移动端1列，平板2列，桌面4列
</div>

<!-- 隐藏/显示 -->
<div hidden md:block>
  平板及以上显示
</div>
```

## 常用类名速查

### 布局

| 类名 | 效果 |
|------|------|
| `flex` | display: flex |
| `grid` | display: grid |
| `block` / `hidden` | 显示/隐藏 |
| `absolute` / `relative` / `fixed` | 定位 |

### 尺寸

| 类名 | 效果 |
|------|------|
| `w-full` | width: 100% |
| `h-screen` | height: 100vh |
| `max-w-md` | max-width: 448px |

### 间距

| 类名 | 效果 |
|------|------|
| `p-4` | padding: 1rem |
| `m-auto` | margin: auto |
| `gap-4` | gap: 1rem |

### 颜色

| 类名 | 效果 |
|------|------|
| `text-red-500` | 文字红色 |
| `bg-blue` | 背景蓝色 |
| `border-gray` | 边框灰色 |

