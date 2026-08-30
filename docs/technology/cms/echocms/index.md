# Echo CMS 快速入门

皮肤目录 `templets/{theme}/`，用 `{echo:…}` 标签拼 HTML。前缀 `echo:`（对标 Pboot `pboot:`）。

::: tip 权威来源
引擎：`TemplateEngine.php` · 仓库清单：echo-cms `docs/templets-tags.md`
:::

## 语法

| 形式 | 写法 |
|------|------|
| 自闭合 | `{echo:tag attr="value"/}` — **必须有 `/}`** |
| 成对块 | `{echo:list}…{/echo:list}` |
| 块内字段 | `[field:title/]` |
| 富文本 | `{echo:field name="content" html="1"/}` |

属性用双引号。默认转义；统计、页脚、正文需 `html="1"`。

## 模板文件

```
templets/{theme}/
├── index.htm              首页
├── head.htm / foot.htm    公共头尾
├── list_{model}.htm       栏目列表
├── article_{model}.htm    详情 / 单页
├── guestbook.htm          留言
├── search.htm             搜索
├── sitemap.htm            地图页（/sitemap）
└── static/                CSS/JS → {echo:sitetplpath/}
```

## 手册导航

左侧按标签分类，与 [PbootCMS 开发手册](https://www.pbootcms.com/docs/296.html) 同样「一页一题」。

| 主题 | 说明 |
|------|------|
| [公共标签](./common) | include、路径、TDK、定制标签、条件 |
| [站点信息](./site) | global |
| [公司信息](./company) | company |
| [导航菜单](./nav) | nav、son |
| [当前栏目](./channel) | channel、面包屑 |
| [内容列表](./list) | list |
| [分页条](./pagination) | page |
| [内容详情](./detail) | field、多图、上下篇 |
| [指定内容](./content) | content（单页栏目） |
| [幻灯片](./banner) | banner |
| [素材库](./material) | material（按文件夹出图） |
| [友情链接](./link) | link |
| [留言板](./guestbook) | 留言表单与列表 |
| [自定义表单](./form) | form |
| [多语言](./lang) | lang |
| [搜索](./search) | searchlist |
| [站点地图](./sitemap) | sitemap 块 + sitemap.xml |
| [与 Pboot 对比](./compare) | 能力对照与缺口 |

## 最小页面骨架

```html
{echo:include file="head.htm"/}
<!-- 正文 -->
{echo:include file="foot.htm"/}
```
