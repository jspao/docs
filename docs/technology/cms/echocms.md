# Echo CMS 标签调用与案例

Echo CMS 前台皮肤用 `{echo:…}` 标签拼页面。语法由服务端模板引擎解析，皮肤文件在主题目录 `templets/{theme}/`，不走 ThinkPHP 的 `view/`。

本文记录**当前已实现**的标签调用方式，案例摘自默认主题 `templets/default/`。标签前缀是 `echo:`，与织梦 `dede:`、Pboot `pboot:` 区分。

::: tip 权威来源
引擎实现：`app/common/library/template/TemplateEngine.php`  
仓库内清单：echo-cms 的 `docs/templets-tags.md`
:::

## 模板文件约定

```
templets/{theme}/
├── index.htm              # 首页
├── head.htm / foot.htm    # 公共头尾
├── list_{model}.htm       # 栏目列表
├── article_{model}.htm    # 文档详情 / 单页
├── guestbook.htm          # 在线留言
├── search.htm             # 全站搜索
├── sitemap.htm            # 网站地图页（路由 /sitemap）
├── close.htm              # 关站提示
└── static/                # CSS / JS / 图片，URL 前缀 /theme/{theme}/
```

`{model}` 是内容模型标识，如 `article`、`product`、`case`、`album`、`job`、`page`。

静态资源磁盘路径是 `templets/{theme}/static/`，浏览器通过 `{echo:sitetplpath/}` 拿到 `/theme/{theme}`。

## 语法通则

| 形式 | 写法 | 说明 |
|------|------|------|
| 自闭合 | `{echo:tag attr="value"/}` | 输出一段文本或一段固定 HTML |
| 成对块 | `{echo:list}…{/echo:list}` | 循环；块内用 `[field:name/]` 取当前行 |
| 块内字段 | `[field:title/]` | 默认转义 |
| HTML 原文 | `html="1"` | 正文、页脚等富文本才开 |
| 引入片段 | `{echo:include file="head.htm"/}` | 仅主题目录内，禁止 `..` |

属性必须用双引号：`num="10"`，不能写成 `num=10`。

默认全部转义。正文、统计代码、页脚 HTML 需要 `html="1"`，否则会变成实体。

::: warning 自闭合必须带 `/}`
`/}` 是结束符（斜杠在 `}` 前），对标织梦 `{dede:field name='title'/}`，不是 Pboot 的 `{pboot:sitetitle}`。

写成 `{echo:sitetplpath}` 引擎匹配不到，会原样出现在页面上。正确写法：`{echo:sitetplpath/}`。
:::

---

## 标签速查

| 标签 | 类型 | 用途 |
|------|------|------|
| `{echo:include file="head.htm"/}` | 自闭合 | 引入同主题片段 |
| `{echo:sitetplpath/}` | 自闭合 | 主题静态资源前缀 `/theme/{theme}` |
| `{echo:sitepath/}` | 自闭合 | 站点根路径（根域名部署时为空） |
| `{echo:url path="/"/}` | 自闭合 | 生成站内链接（本地 `?site=` 预览会自动带上） |
| `{echo:global name="site_title"/}` | 自闭合 | 站点设置 `cms_site_settings` |
| `{echo:company name="company_name"/}` | 自闭合 | 公司信息 `cms_site_company` |
| `{echo:label name="hotline"/}` | 自闭合 | 定制标签 `cms_labels` |
| `{echo:field name="title"/}` | 自闭合 | 当前详情 / 单页文档字段 |
| `{echo:channel name="name"/}` | 自闭合 | 当前栏目 |
| `{echo:position/}` | 自闭合 | 面包屑（Bootstrap 5） |
| `{echo:page/}` | 自闭合 / 块 | 列表分页（默认 Bootstrap 5，块写法可自定义） |
| `{echo:form code="contact"/}` | 自闭合 | 按表单 code 输出并提交自定义表单 |
| `{echo:nav}…{/echo:nav}` | 块 | 栏目导航 |
| `{echo:banner}…{/echo:banner}` | 块 | 轮播 |
| `{echo:list}…{/echo:list}` | 块 | 已发布内容列表 |
| `{echo:content}…{/echo:content}` | 块 | 指定单页栏目那一篇 |
| `{echo:link}…{/echo:link}` | 块 | 友情链接 |
| `{echo:lang}…{/echo:lang}` | 块 | 语言切换 |
| `{echo:searchlist}…{/echo:searchlist}` | 块 | 搜索结果（仅搜索页） |
| `{echo:sitemap}…{/echo:sitemap}` | 块 | 网站地图主题页 |
| `{echo:pics}…{/echo:pics}` | 块 | 内容内置多图 `pics` |
| `{echo:images}…{/echo:images}` | 块 | 模型扩展多图字段 |
| `{echo:prev}…{/echo:prev}` / `{echo:next}…{/echo:next}` | 块 | 上下篇 |
| `{echo:like}…{/echo:like}` | 块 | 相关内容 |
| `{echo:guestbook}…{/echo:guestbook}` | 块 | 已回复留言 |
| `{echo:if}…{/echo:if}` | 块 | 真值 / 比较 / `{echo:else}` |

---

## 路径与资源

### `{echo:sitetplpath/}`

当前主题静态资源 URL 前缀，值为 `/theme/{theme}`。

```html
<link rel="stylesheet" href="{echo:sitetplpath/}/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="{echo:sitetplpath/}/css/site.css">
<script src="{echo:sitetplpath/}/bootstrap/js/bootstrap.bundle.min.js"></script>
```

### `{echo:sitepath/}`

站点根路径。部署在域名根时为空字符串，可以写成：

```html
<link rel="icon" href="{echo:sitepath/}/favicon.ico">
```

### `{echo:url/}`

生成站内链接。本地用 `?site=en` 预览时会自动带上站点参数。绝对 `http(s)://` 外链不会拼接 `?site=`。

```html
<a href="{echo:url path="/"/}">首页</a>
<a href="{echo:url path="/product"/}">产品中心</a>
<a href="{echo:url path="/news"/}">新闻资讯</a>
```

属性：`path`（默认 `/`）。

### `{echo:include/}`

引入同主题下相对路径片段，嵌套最多 5 层，禁止 `..` 和绝对路径。

```html
{echo:include file="head.htm"/}
{echo:include file="article_nav.htm"/}
{echo:include file="foot.htm"/}
```

---

## 站点与公司信息

### `{echo:global/}`

读取当前站点设置。统计代码、页脚 HTML 需要 `html="1"`。

```html
<title>{echo:global name="site_title"/}</title>
<meta name="keywords" content="{echo:global name="seo_keywords"/}">
<meta name="description" content="{echo:global name="seo_description"/}">
<link rel="icon" href="{echo:global name="site_favicon"/}">
{echo:global name="stat_head" html="1"/}
```

常用 `name`：

| name | 说明 |
|------|------|
| `site_title` | 站点标题 |
| `site_subtitle` | 副标题 |
| `site_logo` | Logo |
| `site_favicon` | 站点图标（全局配置） |
| `site_domain` | 绑定域名 |
| `seo_keywords` / `seo_description` | 全站 SEO |
| `site_icp` | 备案号 |
| `footer_info` | 页脚 HTML |
| `theme` | 主题目录名 |
| `stat_head` / `stat_body_start` / `stat_footer` | 统计代码 |

关站页 `close.htm` 额外可用 `close_title`、`close_site_note`（关站守卫注入，不是后台站点设置项）。

**页头案例**（`head.htm`）：

```html
<title>{echo:global name="site_title"/}</title>
<meta name="keywords" content="{echo:global name="seo_keywords"/}">
<meta name="description" content="{echo:global name="seo_description"/}">
<link rel="icon" href="{echo:global name="site_favicon"/}">
{echo:global name="stat_head" html="1"/}
```

**页脚版权**（`foot.htm`）：

```html
<div>{echo:global name="footer_info" html="1"/}</div>
<div>{echo:global name="site_icp"/}</div>
{echo:global name="stat_footer" html="1"/}
```

### `{echo:company/}`

读取 `cms_site_company`。

```html
{echo:company name="company_name"/}
<p>地址：{echo:company name="address"/}</p>
<p>电话：{echo:company name="phone"/}</p>
<p>邮箱：{echo:company name="email"/}</p>
```

常用 `name`：`company_name`、`address`、`phone`、`mobile`、`email`、`fax`、`wechat_qr`、`mp_qr`、`whatsapp`。

### `{echo:label/}`

读取定制标签 `cms_labels`（按 `name`）。适合热线、促销文案等后台可改、模板写死键名的短文本。

```html
手机：{echo:label name="hotline"/}
```

---

## 导航、轮播、友情链接

### `{echo:nav}` / `{/echo:nav}`

栏目导航。默认取顶级栏目（`parent="0"`）。

| 属性 | 默认 | 说明 |
|------|------|------|
| `parent` | `0` | 父栏目 ID；`0` 表示顶级 |
| `num` | `50` | 条数上限 |

块内字段：`id`、`name`、`code`、`url`。

**顶栏导航**（`head.htm`）：

```html
<li class="nav-item"><a class="nav-link" href="{echo:url path="/"/}">首页</a></li>
{echo:nav parent="0" num="12"}
<li class="nav-item"><a class="nav-link" href="[field:url/]">[field:name/]</a></li>
{/echo:nav}
```

**页脚快速入口**（`foot.htm`）：

```html
{echo:nav parent="0" num="8"}
<li class="mb-1"><a href="[field:url/]">[field:name/]</a></li>
{/echo:nav}
```

### `{echo:banner}` / `{/echo:banner}`

轮播 `cms_site_banners`（仅启用项，按 `sort`）。

属性：`num`（默认 `10`）。  
块内字段：`image`、`title`、`description`、`link`（优先外链，其次内链；内链会走 `siteUrl`）。

**首页 Hero**（`index.htm`）：

```html
{echo:banner num="1"}
<h1 class="display-5 fw-bold mb-3">[field:title/]</h1>
<p class="lead text-white-50 mb-4">[field:description/]</p>
<a class="btn btn-primary btn-lg" href="[field:link/]">了解产品</a>
{/echo:banner}
```

多张图轮播时把 `num` 调大，用 Bootstrap carousel 包一层即可。

### `{echo:link}` / `{/echo:link}`

友情链接。

属性：`num`（默认 `20`）。  
块内字段：`name`、`url`、`logo`。

```html
{echo:link num="10"}
<li><a href="[field:url/]" target="_blank" rel="noopener">[field:name/]</a></li>
{/echo:link}
```

---

## 多语言

### `{echo:lang}` / `{/echo:lang}`

列出启用站点（`cms_sites.status=1`，按 `sort`）。

| 属性 | 说明 |
|------|------|
| `current="1"` | 只输出当前站 |
| `current="0"` | 只输出其它站 |
| 不写 | 输出全部启用站 |

块内字段：`name`、`code`、`flag`、`flag_emoji`、`url`、`current`（`1`/`0`）、`active_class`（当前为 `active`）。

`url` 规则：当前请求以 `?site=` 解析时一律 `/?site={code}`；否则有生产域名跳该域名首页，本地域名/无域名用 `/?site={code}`。

**下拉语言切换**（`head.htm`）：

```html
<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
  {echo:lang current="1"}
  <span class="lang-flag">[field:flag_emoji/]</span>
  <span class="lang-name">[field:name/]</span>
  {/echo:lang}
</a>
<ul class="dropdown-menu">
  {echo:lang}
  <li>
    <a class="dropdown-item [field:active_class/]" href="[field:url/]" hreflang="[field:code/]">
      <span class="lang-flag">[field:flag_emoji/]</span>
      <span class="lang-name">[field:name/]</span>
    </a>
  </li>
  {/echo:lang}
</ul>
```

---

## 内容列表与分页

### `{echo:list}` / `{/echo:list}`

已发布、未删除的内容列表。列表页不写 `scode` 时，默认用当前栏目 `code`。

| 属性 | 默认 | 说明 |
|------|------|------|
| `scode` | 当前栏目 code | 栏目标识，如 `news`、`product` |
| `num` | `10` | 每页条数；同时作为分页 `page_size` |
| `order` | `published_at` | `id` / `sort` / `published_at` / `rand` |

块内字段：内容主字段（`title`、`thumb`、`summary`、`published_at`、`author`、`url`、`is_top` 等）及扩展字段（可按名直接读）。内容若填了绝对地址 `outlink`，`[field:url/]` 直接输出该外链。

**首页三栏产品**（`index.htm`）：

```html
<div class="row g-4">
  {echo:list scode="product" num="3" order="sort"}
  <div class="col-md-4">
    <a class="card h-100 text-decoration-none" href="[field:url/]">
      <img class="card-img-top" src="[field:thumb/]" alt="[field:title/]">
      <div class="card-body">
        <h3 class="h5">[field:title/]</h3>
        <p class="small text-secondary mb-0">[field:summary/]</p>
      </div>
    </a>
  </div>
  {/echo:list}
</div>
```

**新闻列表 + 分页**（`list_article.htm`）：同一页必须先写 `{echo:list}`，再写 `{echo:page/}`。`num` 就是每页条数。

```html
{echo:list num="2" order="published_at"}
<a class="list-group-item" href="[field:url/]">
  <div class="fw-semibold">[field:title/]</div>
  <div class="small text-secondary">[field:summary/]</div>
  <time class="small text-muted">[field:published_at/]</time>
</a>
{/echo:list}
{echo:page/}
```

::: warning 分页不会总出现
总条数不超过每页条数时，`{echo:page/}` **不输出**。
:::

**详情页随机推荐**（`article_nav.htm`）：`order="rand"` 从当前栏目（或不写 `scode` 时的当前栏目）随机抽几条。不要和 `{echo:page/}` 同用；随机时也不会优先置顶。

```html
<div class="mt-4">
  <h2 class="h6 mb-3">随机推荐</h2>
  <ul class="list-unstyled mb-0">
    {echo:list num="4" order="rand"}
    <li class="mb-1"><a href="[field:url/]">[field:title/]</a></li>
    {/echo:list}
  </ul>
</div>
```

### `{echo:content}` / `{/echo:content}`

按栏目标识输出**单页模型**栏目下那一条已发布内容（对标 Pboot `{pboot:content}`）。适合首页嵌「关于我们」等，不必再用 `{echo:list scode="about" num="1"}`。

| 属性 | 默认 | 说明 |
|------|------|------|
| `scode` | （必填） | 栏目标识，如 `about`、`contact` |

规则：栏目须绑定单页模型（`type=1`）且存在已发布未删除稿；否则整块为空，**不**降级成列表。块内字段与 `{echo:list}` 相同；`[field:url/]` 为栏目路径 `/{scode}`（有绝对外链时用外链）。单页自身模板（如 `article_page.htm`）继续用 `{echo:field}`。

**首页嵌入关于我们**（可写在 `index.htm`）：

```html
{echo:content scode="about"}
<section class="py-4">
  <h2 class="h4">[field:title/]</h2>
  <div class="text-secondary">[field:summary/]</div>
  <a href="[field:url/]">了解更多</a>
</section>
{/echo:content}
```

正文富文本示例：

```html
{echo:content scode="about"}
  <h2>[field:title/]</h2>
  <div>[field:content html="1"/]</div>
{/echo:content}
```

### `{echo:page/}` / `{echo:page}`…`{/echo:page}`

`{echo:page/}` **仅当总条数超过每页条数（至少 2 页）时才输出**，否则为空。自闭合输出 Bootstrap 5 的 `ul.pagination`。

搜索页可直接放 `{echo:page/}`，链接形如 `/search?q=关键词&page=2`。

成对写法可自定义 HTML（`article` 列表不一定要用）：

```html
{echo:page}
  <a href="[field:prev_url/]">上一页</a>
  [field:page/] / [field:pages/]
  <a href="[field:next_url/]">下一页</a>
{/echo:page}
```

块内字段：`page`、`pages`、`total`、`page_size`、`prev_url`、`next_url`、`index_url`、`has_prev`、`has_next`。

---

## 栏目、详情字段、面包屑

### `{echo:channel/}`

当前栏目信息。列表页、详情页、单页可用。

字段：`id`、`name`、`code`、`model_id`、`parent_id`。

```html
<h1>{echo:channel name="name"/}</h1>
```

### `{echo:field/}`

当前详情 / 单页文档字段。富文本必须 `html="1"`。`content` 且 `html="1"` 时会套用启用中的内链标签。

```html
<h1>{echo:field name="title"/}</h1>
<p class="text-muted">{echo:field name="published_at"/} · {echo:field name="author"/}</p>
<div class="article-body">{echo:field name="content" html="1"/}</div>
```

常用主字段：`title`、`subtitle`、`summary`、`thumb`、`content`、`author`、`source`、`published_at`、`views`、`is_top`、`is_recommend`、`seo_title`、`seo_keywords`、`seo_description`。

扩展字段按字段名读取，例如产品 `price` / `specs`、招聘 `department` / `location` / `salary` / `headcount`。

**产品详情**（`article_product.htm`）：

```html
<p>参考价：{echo:field name="price"/}</p>
<div class="article-body">{echo:field name="content" html="1"/}</div>
<pre>{echo:field name="specs"/}</pre>
```

**招聘详情**（`article_job.htm`）：

```html
<p>{echo:field name="department"/} · {echo:field name="location"/} · {echo:field name="salary"/} · 招聘 {echo:field name="headcount"/} 人</p>
<div class="article-body">{echo:field name="content" html="1"/}</div>
```

### `{echo:position/}`

面包屑，输出 Bootstrap 5：`<nav><ol class="breadcrumb">…</ol></nav>`。无属性。

规则：`首页`（英文站 `Home`）+ 当前栏目。列表模型的**文章详情**再追加内容标题；**单页栏目**（如联系我们）栏目即页面，不重复追加标题。

**单页**（`article_page.htm`）效果：首页 / 联系我们

```html
<h1 class="h3 mb-2">{echo:field name="title"/}</h1>
{echo:position/}
```

**文章详情**（`article_article.htm`）效果：首页 / 栏目名 / 文章标题

```html
<h1 class="h3 mb-2">{echo:field name="title"/}</h1>
{echo:position/}
```

首页文案按站点语言：中文「首页」、英文 `Home`。

---

## 多图、条件、上下篇

### `{echo:pics}` / `{/echo:pics}`

内容内置「轮播多图」字段 `pics`。无图时输出空。块内字段：`url`、`index`（从 1 起）。

**文章详情图集**（`article_article.htm`）：

```html
{echo:if condition="[field:pics]"}
<div class="row g-3">
  {echo:pics}
  <div class="col-sm-6 col-lg-4">
    <a href="[field:url/]" target="_blank" rel="noopener">
      <img src="[field:url/]" alt="">
    </a>
  </div>
  {/echo:pics}
</div>
{/echo:if}
```

### `{echo:images}` / `{/echo:images}`

模型扩展多图字段（类型 `images`）。属性 `name` 为字段名（如 `gallery`）。块内字段同 `pics`：`url`、`index`。

**产品 / 图集相册**（`article_product.htm`、`article_album.htm`）：

```html
{echo:if condition="[field:gallery]"}
<div class="row g-3">
  {echo:images name="gallery"}
  <div class="col-sm-6 col-lg-4">
    <a href="[field:url/]" target="_blank" rel="noopener">
      <img src="[field:url/]" alt="">
    </a>
  </div>
  {/echo:images}
</div>
{/echo:if}
```

::: tip pics 还是 images？
`pics` 是内容主表内置多图；`images` 是模型扩展字段，必须写 `name`。
:::

### `{echo:if}` / `{/echo:if}`

简单真值与比较，**不是完整表达式引擎**。`condition` 写 `[field:name]` 或 `[field:name/]` 均可；比较支持 `==` `!=` `>` `>=` `<` `<=`，可用 `{echo:else}`。

在 `{echo:list}` / `{echo:pics}` / `{echo:images}` / `{echo:sitemap}` 等块内，按**当前行**取值；块外按当前文档字段。

空数组、空字符串、`0`、`'0'`、`false`、`null` 都视为假。

```html
{echo:if condition="[field:is_top]"}
  <span>置顶</span>
{echo:else}
  <span>普通</span>
{/echo:if}

{echo:if condition="[field:views] >= 10"}热门{/echo:if}
```

### `{echo:prev}` / `{echo:next}` / `{echo:like}`

详情页上下篇与相关内容。无数据时输出空。上一篇是更早发布，下一篇是更新发布；相关取同栏目其它已发布内容。

`like` 属性：`num`（默认 `5`）。块内字段同内容列表（`title`、`url` 等）。

**公共片段**（`article_nav.htm`，各详情模板 include）：

```html
<nav class="article-nav d-flex justify-content-between">
  <div>{echo:prev}<a href="[field:url/]">← [field:title/]</a>{/echo:prev}</div>
  <div>{echo:next}<a href="[field:url/]">[field:title/] →</a>{/echo:next}</div>
</nav>
{echo:if condition="[field:like_list]"}
<div>
  <h2>相关内容</h2>
  <ul>
    {echo:like num="5"}<li><a href="[field:url/]">[field:title/]</a></li>{/echo:like}
  </ul>
</div>
{/echo:if}
```

---

## 搜索、网站地图

### `{echo:searchlist}` / `{/echo:searchlist}`

仅搜索页上下文。块内字段同内容列表。

```html
<form method="get" action="/search">
  <input name="q" placeholder="搜索标题">
  <button type="submit">搜索</button>
</form>
{echo:searchlist}
<a href="[field:url/]">
  <div>[field:title/]</div>
  <div>[field:summary/]</div>
</a>
{/echo:searchlist}
{echo:page/}
```

### `{echo:sitemap}` / `{/echo:sitemap}`

网站地图主题页。按「首页 → 栏目 → 该栏目下文章」顺序输出；单页栏目只出栏目、不出重复详情。

路由 `/sitemap` 渲染 `sitemap.htm`；搜索引擎提交仍用 `/sitemap.xml`。

块内字段：`type`（`home` / `channel` / `content`）、`title`、`url`、`path`、`channel_code`、`channel_name`、`is_channel`、`is_content`、`is_home`。

```html
{echo:sitemap}
  {echo:if condition="[field:is_channel]"}
    <div class="sitemap-channel"><a href="[field:url/]">[field:title/]</a></div>
  {/echo:if}
  {echo:if condition="[field:is_content]"}
    <div class="sitemap-content"><a href="[field:url/]">[field:title/]</a></div>
  {/echo:if}
{/echo:sitemap}
```

首页标题按站点语言：中文「首页」、英文 `Home`。

---

## 留言与自定义表单

### `{echo:guestbook}` / `{/echo:guestbook}`

前台留言页循环**已回复**的留言。属性 `num`（默认 `20`）。

块内字段：`name`、`content`、`reply`、`replied_at`、`created_at`。

提交本身不是标签，走公开接口 `POST /api/guestbook`。

```html
<form id="guestbook-form">
  <input name="name" required>
  <input name="phone">
  <input name="email" type="email">
  <textarea name="content" required></textarea>
  <button type="submit">提交留言</button>
</form>

{echo:if condition="[field:guestbook_list]"}
  {echo:guestbook}
  <div>
    <div>[field:name/]</div>
    <p>[field:content/]</p>
    <div>回复：[field:reply/]</div>
  </div>
  {/echo:guestbook}
{/echo:if}

<script>
document.getElementById('guestbook-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = Object.fromEntries(new FormData(e.target).entries());
  const res = await fetch('/api/guestbook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  // json.code === 0 为成功
});
</script>
```

JSON 字段：`name`、`phone`、`email`、`content`。关站时接口拒绝。

### `{echo:form/}`

按表单标识输出 Bootstrap 表单，并提交到公开接口。后台需已创建并启用该表单。

```html
{echo:form code="contact"/}
```

属性：`code`（必填，对应 `cms_forms.code`）。表单不存在或已禁用、没有字段时输出空。

字段类型：`text`、`textarea`、`number`、`email`、`select`、`radio`、`checkbox`、`date`。下拉/单选/多选在后台填逗号分隔选项。

标签会生成 `<form class="echo-cms-form">`、按字段类型输出控件，并内嵌提交脚本，POST 到 `/api/form/{code}`。

也可自己写表单，直接调接口：

```js
await fetch('/api/form/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '张三', message: '你好' }),
});
```

字段名与后台表单定义一致。关站拒绝，并按 IP 限流。

---

## 关站页

全局 `close_site=1` 时，前台优先渲染主题 `close.htm`（没有则用内置 HTML），HTTP 503。

```html
<title>{echo:global name="close_title"/}</title>
<h1>{echo:global name="close_title"/}</h1>
<p>{echo:global name="close_site_note"/}</p>
```

`close_title` 按站点语言注入（中文「网站维护中」/ 英文 `Site under maintenance` / 日文「メンテナンス中」）。`close_site_note` 优先用后台备注，空则用对应语言默认文案。

---

## 页面级组合案例

### 首页：头 + Hero + 三组列表 + 尾

```html
{echo:include file="head.htm"/}

{echo:banner num="1"}
<h1>[field:title/]</h1>
<p>[field:description/]</p>
<a href="[field:link/]">了解产品</a>
{/echo:banner}

<section>
  <a href="{echo:url path="/product"/}">查看全部</a>
  {echo:list scode="product" num="3" order="sort"}
  <a href="[field:url/]">
    <img src="[field:thumb/]" alt="[field:title/]">
    <h3>[field:title/]</h3>
    <p>[field:summary/]</p>
  </a>
  {/echo:list}
</section>

{echo:include file="foot.htm"/}
```

栏目 code 换成 `case`、`news` 即可复制出案例区和资讯区。

### 列表页：栏目名 + 面包屑 + 列表 + 分页

```html
{echo:include file="head.htm"/}
<h1>{echo:channel name="name"/}</h1>
{echo:position/}
{echo:list num="10" order="published_at"}
  <a href="[field:url/]">[field:title/]</a>
{/echo:list}
{echo:page/}
{echo:include file="foot.htm"/}
```

### 详情页：正文 + 多图 + 上下篇

```html
{echo:include file="head.htm"/}
<h1>{echo:field name="title"/}</h1>
{echo:position/}
<div>{echo:field name="content" html="1"/}</div>
{echo:pics}
  <img src="[field:url/]" alt="">
{/echo:pics}
{echo:include file="article_nav.htm"/}
{echo:include file="foot.htm"/}
```

### 单页（关于我们）：正文 + 侧栏公司信息 + 留言表单

见 `article_page.htm`：左侧 `{echo:field name="content" html="1"/}`，右侧 `{echo:company}` 与手写 `POST /api/guestbook`。

---

## 非标签接口

| 能力 | 接口 | 说明 |
|------|------|------|
| 在线留言 | `POST /api/guestbook` | JSON：`name`、`phone`、`email`、`content` |
| 自定义表单 | `POST /api/form/{code}` | JSON 字段名与表单定义一致；关站拒绝；按 IP 限流 |
| 网站地图 XML | `GET /sitemap.xml` | 给搜索引擎；主题页是 `/sitemap` |

---

## 常见注意

1. **属性必须双引号**，引擎只解析 `name="value"`。
2. **默认转义**。正文、统计、页脚 HTML 忘记 `html="1"` 会显示源码实体。
3. **`{echo:page/}` 依赖同一页的 `{echo:list}`**（或搜索页注入的分页上下文），且不足两页不输出。
4. **`{echo:if}` 只认 `[field:xxx]` 真值**，不能写 `==`、`&&` 这类表达式。
5. **`include` 出不去主题目录**，不能 `../` 或绝对路径。
6. **本地多站预览用 `/?site=en`**，`{echo:url}` 和列表 `url` 会自动带站点参数；生产域名绑定后走对应域名。
