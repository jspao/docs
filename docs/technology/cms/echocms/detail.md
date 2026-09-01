# 内容详情

## `{echo:field/}`

当前详情或单页文档字段。

```html
<h1>{echo:field name="title"/}</h1>
<p>{echo:field name="published_at"/}</p>
<div>{echo:field name="content" html="1"/}</div>
<p>{echo:field name="price"/}</p>
```

| 属性 | 说明 |
|------|------|
| `name` | 主字段或扩展字段名 |
| `html` | `1` 输出 HTML 原文 |

常用：`title`、`summary`、`thumb`、`content`、`author`、`published_at`、`seo_*`。

---

## `{echo:pics}` / `{echo:images}`

| 标签 | 用途 |
|------|------|
| `pics` | 内容主表多图 `pics` |
| `images` | 扩展字段多图，需 `name="gallery"` |

```html
{echo:pics}<img src="[field:url/]">{/echo:pics}

{echo:images name="gallery"}
<img src="[field:url/]">
{/echo:images}
```

按素材库文件夹出图（荣誉墙、不绑某一篇内容）见 [素材库](./material) `{echo:material}`。

---

## `{echo:prev}` / `{echo:next}` / `{echo:like}`

详情页上下篇与相关。无数据输出空。

```html
{echo:prev}<a href="[field:url/]">← [field:title/]</a>{/echo:prev}
{echo:next}<a href="[field:url/]">[field:title/] →</a>{/echo:next}

{echo:like num="5"}
<li><a href="[field:url/]">[field:title/]</a></li>
{/echo:like}
```

`like` 属性 `num` 默认 `5`。`[field:url/]` 规则同列表：外链优先，其次 URL 别名 `/{scode}/{filename}`，否则数字 ID。

---

## `{echo:tags}` / `{echo:checkbox}`

文章标签与多选扩展字段见 [内容标签](./tags) 与下方 checkbox。

```html
{echo:tags}
  <a href="[tags:link/]">[tags:text/]</a>
{/echo:tags}

{echo:checkbox name="features"}
  <span class="badge">[field:text/]</span>
{/echo:checkbox}
```

---

## `{echo:texts}` / `{/echo:texts}`

遍历内容模型「动态文本」字段（字符串数组）。旧数据若是换行整段，按行拆，不按逗号拆。无条目或未写 `name` 时整块为空。

```html
{echo:if condition="[field:specs]"}
<h2 class="h5">技术参数</h2>
<ul class="spec-list list-unstyled border rounded overflow-hidden mb-0">
{echo:texts name="specs"}
  <li class="px-3 py-2 small border-bottom mb-0">[field:text/]</li>
{/echo:texts}
</ul>
{/echo:if}
```

摘自 `templets/default/article_product.htm`。块内：`[field:text/]` / `[field:value/]`、`[field:i/]`（从 1）、`[field:n/]`（从 0）。

---
