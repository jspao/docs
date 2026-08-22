# 公共标签

## 1. 模板嵌套 `{echo:include/}`

引入同主题下片段，最多嵌套 5 层，禁止 `..`。

```html
{echo:include file="head.htm"/}
{echo:include file="article_nav.htm"/}
{echo:include file="foot.htm"/}
```

| 属性 | 说明 |
|------|------|
| `file` | 相对路径，如 `head.htm` |

---

## 2. 路径与资源

### `{echo:sitetplpath/}`

主题静态资源前缀，值 `/theme/{theme}`。

```html
<link href="{echo:sitetplpath/}/css/site.css" rel="stylesheet">
```

### `{echo:sitepath/}`

站点根路径（根域名部署时为空）。

```html
<link rel="icon" href="{echo:sitepath/}/favicon.ico">
```

### `{echo:url/}`

站内链接；本地 `?site=en` 预览时自动带站点参数。

```html
<a href="{echo:url path="/"/}">首页</a>
<form method="get" action="{echo:url path="/search"/}">
  <input name="q">
</form>
```

| 属性 | 默认 | 说明 |
|------|------|------|
| `path` | `/` | 站内路径 |

::: warning
`action="{echo:url path="/search"}"` 若漏写 `/}`，双引号会截断属性导致 404。
:::

---

## 3. 页面 TDK

对标 Pboot `{pboot:pagetitle}` / `{pagekeywords}` / `{pagedescription}`。

```html
<title>{echo:pagetitle/}</title>
<meta name="keywords" content="{echo:pagekeywords/}">
<meta name="description" content="{echo:pagedescription/}">
```

无属性。引擎按页面类型（首页 / 列表 / 详情 / 单页 / 其它）自动组合站点、栏目、文档 SEO。导航品牌仍用 `{echo:global name="site_title"/}`。

---

## 4. 定制标签 `{echo:label/}`

后台「定制标签」按 `name` 读取。

```html
{echo:label name="hotline"/}
```

---

## 5. 条件 `{echo:if}`

简单真值或比较，可用 `{echo:else}`。

```html
{echo:if condition="[field:is_top]"}置顶{echo:else}普通{/echo:if}
{echo:if condition="[field:views] >= 10"}热门{/echo:if}
```

非完整表达式引擎；块内按当前行 `[field:xxx]` 取值。
