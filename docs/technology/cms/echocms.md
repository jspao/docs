# Echo CMS 模板标签

皮肤在 `templets/{theme}/`，用 `{echo:…}` 拼页面。前缀是 `echo:`（对标织梦 `dede:`、Pboot `pboot:`）。

::: tip 权威来源
引擎：`TemplateEngine.php` · 仓库清单：echo-cms `docs/templets-tags.md`
:::

## 写之前记住

| 规则 | 说明 |
|------|------|
| 自闭合 | 必须 `{echo:tag/}`，**斜杠在 `}` 前** |
| 块标签 | `{echo:list}…{/echo:list}`，块内用 `[field:xxx/]` |
| 转义 | 默认转义；正文、统计、页脚加 `html="1"` |
| 属性 | 双引号：`num="10"` |

漏写 `/` 且写在 `action="{echo:url path="/search"}"` 里会截断属性 → 404。

---

## 按场景用

### 页头：TDK + 静态资源

**场景**：每个页面 include `head.htm`，输出 title/meta、CSS、Logo、导航。

```html
<title>{echo:pagetitle/}</title>
<meta name="keywords" content="{echo:pagekeywords/}">
<meta name="description" content="{echo:pagedescription/}">
<link rel="stylesheet" href="{echo:sitetplpath/}/css/site.css">
<link rel="icon" href="{echo:global name="site_favicon"/}">
{echo:global name="stat_head" html="1"/}
```

| 标签 | 干什么 |
|------|--------|
| `{echo:pagetitle/}` 等 | 当前页 TDK（首页/列表/详情自动换数据源） |
| `{echo:global name="site_title"/}` | 导航品牌，**不是** `<title>` |
| `{echo:sitetplpath/}` | 主题静态前缀 `/theme/{theme}` |
| `{echo:url path="/"/}` | 站内链接（本地 `?site=` 预览自动带上） |
| `{echo:include file="head.htm"/}` | 引入同主题片段 |

**TDK 谁说了算**

| 页面 | title 大致组成 |
|------|----------------|
| 首页 | 站点标题 - 副标题 |
| 栏目列表 | 栏目 SEO 或名称 - 站点 - 副标题 |
| 文章详情 | 文档 SEO 或标题 - 栏目 - 站点 - 副标题 |
| 单页 | 栏目 SEO 或文档标题或栏目名 - 站点 - 副标题 |
| 搜索/留言/地图 | 同首页（不用搜索词当 title） |

keywords / description：列表看栏目 SEO，详情看文档 SEO，都没有则用站点设置。

---

### 顶栏：导航 + 搜索 + 语言

```html
{echo:nav parent="0" num="12"}
<li class="nav-item [field:dropdown_class/]">
  <a class="nav-link [field:active_class/]" href="[field:url/]">[field:name/]</a>
  {echo:if condition="[field:haschild/]"}
  <ul class="dropdown-menu">
    {echo:son}<li><a class="dropdown-item" href="[field:url/]">[field:name/]</a></li>{/echo:son}
  </ul>
  {/echo:if}
</li>
{/echo:nav}
<form method="get" action="{echo:url path="/search"/}">
  <input type="search" name="q" placeholder="搜索">
</form>
```

有子栏目用 `{echo:son}`；当前栏目及子级会带 `active`。

---

### 首页：轮播 + 指定栏目内容

```html
{echo:banner num="1"}
<h1>[field:title/]</h1>
<p>[field:description/]</p>
<a href="[field:link/]">了解产品</a>
{/echo:banner}

{echo:list scode="product" num="3" order="sort"}
<a href="[field:url/]">
  <img src="[field:thumb/]" alt="[field:title/]">
  <h3>[field:title/]</h3>
</a>
{/echo:list}
```

首页嵌「关于我们」单页（不必 `list num="1"`）：

```html
{echo:content scode="about"}
<h2>[field:title/]</h2>
<div>[field:content html="1"/]</div>
<a href="[field:url/]">了解更多</a>
{/echo:content}
```

---

### `{echo:channel/}`

当前栏目信息。列表页、详情页、单页可用。通过 `name` 属性读取字段。

| name | 含义 |
|------|------|
| `name` | 栏目名称 |
| `code` | 标识 |
| `subtitle` | 副标题 |
| `thumb` | 缩略图 URL |
| `banner` | Banner / 大图 URL |
| `seo_title` / `seo_keywords` / `seo_description` | 栏目 SEO |
| `ext1` … `ext5` | 预留文本 |

**真实皮肤**（`templets/default/list_article.htm`）：

```html
<section class="page-banner py-4">
  <img class="page-banner-img" src="{echo:channel name="banner"/}" alt="">
  <div class="container position-relative">
    <h1 class="h3 mb-2">{echo:channel name="name"/}</h1>
    <p class="channel-subtitle mb-2">{echo:channel name="subtitle"/}</p>
    {echo:position/}
  </div>
</section>
```

**可复制案例**（副标题 + Banner）：

```html
<h1>{echo:channel name="name"/}</h1>
<p>{echo:channel name="subtitle"/}</p>
<img src="{echo:channel name="banner"/}" alt="">
```

---

### 栏目列表页：Banner + 列表 + 分页

```html
<section class="page-banner">
  <img src="{echo:channel name="banner"/}" alt="">
  <h1>{echo:channel name="name"/}</h1>
  <p>{echo:channel name="subtitle"/}</p>
  {echo:position/}
</section>

{echo:list num="10" order="published_at"}
<a href="[field:url/]">[field:title/]</a>
{/echo:list}
{echo:page/}
```

- 列表页不写 `scode` → 用当前栏目
- `{echo:page/}` 只有超过 1 页才输出，且要和同页 `{echo:list}` 配合
- 栏目还可读：`thumb`、`seo_*`、`ext1`…`ext5`

---

### 文章详情：字段 + 正文 + 图集 + 上下篇

```html
<h1>{echo:field name="title"/}</h1>
{echo:position/}
<div>{echo:field name="content" html="1"/}</div>

{echo:pics}<img src="[field:url/]">{/echo:pics}

{echo:prev}<a href="[field:url/]">← [field:title/]</a>{/echo:prev}
{echo:next}<a href="[field:url/]">[field:title/] →</a>{/echo:next}
```

扩展字段直接 `{echo:field name="price"/}`。模型多图字段用 `{echo:images name="gallery"}…{/echo:images}`（不是 `pics`）。

---

### 单页（联系我们等）

同详情，只是栏目模型为单页；面包屑不重复追标题。

```html
<h1>{echo:field name="title"/}</h1>
{echo:position/}
<div>{echo:field name="content" html="1"/}</div>
```

侧栏公司信息：`{echo:company name="phone"/}` 等。

---

### 留言页

原生 POST，不要 `fetch`。

```html
<form action="{echo:msgaction/}" method="post">
  {echo:formtoken/}
  <input name="name" required>
  <textarea name="content" required></textarea>
  {echo:if condition="[field:msgcodestatus]"}
  <input name="checkcode"><img src="{echo:checkcode/}" alt="验证码">
  {/echo:if}
  <button type="submit">提交</button>
</form>
<p>{echo:msgresult/}</p>

{echo:guestbook num="20"}
<div>[field:name/]：[field:content/] → 回复：[field:reply/]</div>
{/echo:guestbook}
```

成功跳主题 `success.htm`（可缺省）。

---

### 搜索 / 网站地图

**搜索**（`search.htm`）：

```html
<form method="get" action="{echo:url path="/search"/}">
  <input name="q">
</form>
{echo:searchlist}
<a href="[field:url/]">[field:title/]</a>
{/echo:searchlist}
{echo:page/}
```

**地图页**（路由 `/sitemap`，不是 `sitemap.xml`）：

```html
{echo:sitemap}
{echo:if condition="[field:is_channel]"}<a href="[field:url/]">[field:title/]</a>{/echo:if}
{echo:if condition="[field:is_content]"}<a href="[field:url/]">[field:title/]</a>{/echo:if}
{/echo:sitemap}
```

---

### 关站

全局关站时渲染 `close.htm`（503）：

```html
<h1>{echo:global name="close_title"/}</h1>
<p>{echo:global name="close_site_note"/}</p>
```

---

## 标签速查

| 标签 | 类型 | 场景 |
|------|------|------|
| `pagetitle` / `pagekeywords` / `pagedescription` | 自闭合 | 页头 TDK |
| `global` / `company` / `label` | 自闭合 | 站点设置、公司、定制文案 |
| `channel` | 自闭合 | 当前栏目 name/banner/seo/ext… |
| `field` | 自闭合 | 当前文档字段 |
| `position` | 自闭合 | 面包屑 |
| `url` / `sitetplpath` / `sitepath` | 自闭合 | 链接与资源前缀 |
| `include` | 自闭合 | 引入 head/foot 等 |
| `nav` + `son` | 块 | 栏目导航 |
| `banner` | 块 | 首页轮播 |
| `list` | 块 | 内容列表 |
| `content` | 块 | 单页栏目那一篇（首页嵌入） |
| `page` | 自闭合/块 | 分页 |
| `link` | 块 | 友情链接 |
| `lang` | 块 | 多语言切换 |
| `searchlist` | 块 | 搜索结果 |
| `sitemap` | 块 | 地图主题页 |
| `pics` / `images` | 块 | 内容多图 / 扩展多图 |
| `prev` / `next` / `like` | 块 | 上下篇、相关 |
| `guestbook` | 块 | 已回复留言 |
| `msgaction` 等 | 自闭合 | 留言表单配套 |
| `form` | 自闭合 | 后台自定义表单 |
| `if` | 块 | 简单条件 |

---

## 常用字段

**`{echo:global}`**：`site_title`、`site_subtitle`、`site_logo`、`site_favicon`、`seo_keywords`、`seo_description`、`footer_info`（html=1）、`stat_*`（html=1）

**`{echo:channel}`**：`name`、`code`、`subtitle`、`thumb`、`banner`、`seo_*`、`ext1`…`ext5`

**`{echo:field}`**：`title`、`summary`、`thumb`、`content`（html=1）、`published_at`、扩展字段名

**`{echo:list}` 块内**：同上 + `url`、`is_top`

---

## 模板文件

```
templets/{theme}/
├── index.htm           首页
├── head.htm / foot.htm 公共头尾
├── list_{model}.htm    栏目列表
├── article_{model}.htm 详情 / 单页
├── guestbook.htm       留言
├── search.htm          搜索
├── sitemap.htm         地图页
└── static/             CSS/JS/图 → {echo:sitetplpath/}
```

---

## 非标签接口

| 用途 | 地址 |
|------|------|
| 留言（默认皮肤） | `POST /guestbook` |
| 留言 JSON | `POST /api/guestbook` |
| 自定义表单 | `POST /api/form/{code}` |
| 搜索引擎地图 | `GET /sitemap.xml` |

---

## 常见坑

1. 自闭合漏 `/` → 标签原样输出或破坏 HTML 属性  
2. 富文本忘 `html="1"` → 页面出现 `&lt;p&gt;`  
3. 分页不出现 → 条数不够一页，或没写 `{echo:list}`  
4. `{echo:content scode="about"}` 无输出 → 栏目不是单页模型或没有已发布稿  
5. 本地多站预览加 `/?site=en`，`{echo:url}` 会自动带参数  
