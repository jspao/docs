# 站点信息

## `{echo:global/}`

读取当前站点 `cms_site_settings`。

```html
<span>{echo:global name="site_title"/}</span>
<small>{echo:global name="site_subtitle"/}</small>
<img src="{echo:global name="site_logo"/}" alt="">
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
| `site_logo` / `site_favicon` | Logo / 图标 |
| `site_domain` | 绑定域名 |
| `seo_keywords` / `seo_description` | 全站 SEO（页头 TDK 用 pagetitle 系列） |
| `site_icp` | 备案号 |
| `footer_info` | 页脚 HTML（需 html=1） |
| `stat_head` / `stat_body_start` / `stat_footer` | 统计代码（需 html=1） |

关站页 `close.htm` 另有：`close_title`、`close_site_note`（关站守卫注入）。
