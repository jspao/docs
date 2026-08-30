# 站点信息

## `{echo:global/}`

读取当前站点 `cms_site_settings`。

```html
<span>{echo:global name="site_title"/}</span>
<small>{echo:global name="site_subtitle"/}</small>
<img src="{echo:global name="site_logo"/}" alt="">
<img class="footer-logo mb-3" src="{echo:global name="footer_logo"/}" alt="">
<link rel="icon" href="{echo:global name="site_favicon"/}">
{echo:global name="stat_head" html="1"/}
```

| 属性 | 说明 |
|------|------|
| `name` | 字段名，见下表 |
| `html` | `1` 时不转义（统计、页脚） |

### 常用 name

| name | 说明 |
|------|------|
| `site_title` / `site_subtitle` | 站点标题 / 副标题 |
| `site_logo` | 导航 Logo（`templets/default/head.htm`） |
| `footer_logo` | 页脚 Logo（`templets/default/foot.htm`） |
| `site_favicon` | 站点图标 |
| `site_domain` | 绑定域名 |
| `seo_keywords` / `seo_description` | 全站 SEO（页头 TDK 用 pagetitle 系列） |
| `site_icp` | 备案号 |
| `footer_info` | 页脚 HTML（需 html=1） |
| `stat_head` / `stat_body_start` / `stat_footer` | 统计代码（需 html=1） |

```html
<!-- templets/default/head.htm -->
<img class="site-logo" src="{echo:global name="site_logo"/}" alt="">

<!-- templets/default/foot.htm -->
<img class="footer-logo mb-3" src="{echo:global name="footer_logo"/}" alt="">
```

关站页 `close.htm` 另有：`close_title`、`close_site_note`（关站守卫注入）。

拒绝页 `region.htm` 另有：`region_title`、`region_deny_note`（地区访问守卫注入，在后台「访问规则」勾选黑名单命中时使用）。

```html
<title>{echo:global name="region_title"/}</title>
<p class="text-uppercase text-secondary small letter-spacing mb-2">{echo:global name="site_title"/}</p>
<h1 class="h3 mb-3">{echo:global name="region_title"/}</h1>
<p class="text-secondary mb-0">{echo:global name="region_deny_note"/}</p>
```
