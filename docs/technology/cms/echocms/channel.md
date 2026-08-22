# 当前栏目

## `{echo:channel/}`

**当前页**栏目信息（列表 / 详情 / 单页上下文）。

```html
<h1>{echo:channel name="name"/}</h1>
<p>{echo:channel name="subtitle"/}</p>
<img src="{echo:channel name="banner"/}" alt="">
```

| name | 说明 |
|------|------|
| `name` / `code` | 名称 / 标识 |
| `subtitle` | 副标题 |
| `thumb` / `banner` | 缩略图 / Banner |
| `seo_title` / `seo_keywords` / `seo_description` | 栏目 SEO |
| `ext1` … `ext5` | 预留字段 |

::: info 指定栏目
Echo 暂无 Pboot `{pboot:sort scode=}` 式「任意栏目」标签，见 [与 Pboot 对比](./compare)。
:::

---

## `{echo:position/}`

面包屑（Bootstrap 5）。无属性。

```html
{echo:position/}
```

规则：首页 + 栏目；**文章详情**再追加标题；**单页栏目**不重复标题。
