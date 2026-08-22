# 当前栏目

## `{echo:channel/}`

**当前页**或**指定**栏目信息（列表 / 详情 / 单页上下文）。

```html
<h1>{echo:channel name="name"/}</h1>
<p>{echo:channel name="subtitle"/}</p>
<img src="{echo:channel name="banner"/}" alt="">
<!-- 任意栏目（对标 Pboot sort scode） -->
<img src="{echo:channel scode="about" name="banner" width="800" height="300"/}" alt="">
```

| 属性 | 说明 |
|------|------|
| `name` | 字段名（必填） |
| `scode` | 栏目标识；省略则用当前页栏目 |

| name | 说明 |
|------|------|
| `name` / `code` | 名称 / 标识 |
| `subtitle` | 副标题 |
| `thumb` / `banner` | 缩略图 / Banner |
| `seo_title` / `seo_keywords` / `seo_description` | 栏目 SEO |
| `ext1` … `ext5` | 预留字段 |

支持 [字段修饰](./common#_6-字段修饰)（`len`、`width` 等）。

---

## `{echo:position/}`

面包屑。默认 Bootstrap 5；加 `separator` 为自定义分隔符模式。

```html
{echo:position/}
{echo:position separator=" &gt; " indextext="首页"/}
```

| 属性 | 说明 |
|------|------|
| `separator` | 分隔符；有则不用 Bootstrap 结构 |
| `indextext` | 首页文案 |

规则：首页 + 栏目；**文章详情**再追加标题；**单页栏目**不重复标题。
