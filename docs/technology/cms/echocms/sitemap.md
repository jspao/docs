# 站点地图

## 主题页 `{echo:sitemap}`

路由 **`/sitemap`** 渲染 `sitemap.htm`（给人看的 HTML 地图）。

```html
{echo:sitemap}
{echo:if condition="[field:is_channel]"}
  <a href="[field:url/]">[field:title/]</a>
{/echo:if}
{echo:if condition="[field:is_content]"}
  <a href="[field:url/]">[field:title/]</a>
{/echo:if}
{/echo:sitemap}
```

顺序：首页 → 栏目 → 该栏目文章；单页栏目只出栏目。

## 搜索引擎

提交 **`/sitemap.xml`**（动态 XML，非模板标签）。
