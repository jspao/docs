# 幻灯片轮播

## `{echo:banner}` / `{/echo:banner}`

后台「轮播图」`cms_site_banners`（启用项，按 sort）。

```html
{echo:banner num="1"}
<h1>[field:title/]</h1>
<p>[field:description/]</p>
<a href="[field:link/]">了解产品</a>
{/echo:banner}
```

| 属性 | 默认 | 说明 |
|------|------|------|
| `num` | `10` | 条数 |

块内字段：`image`、`title`、`description`、`link`（外链优先，内链走 `siteUrl`）。

多张图时增大 `num`，外层包 Bootstrap carousel 即可。
