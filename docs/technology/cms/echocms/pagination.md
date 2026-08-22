# 分页条

## `{echo:page/}` / `{echo:page}`…`{/echo:page}`

列表分页。须同页先有 `{echo:list}`（或搜索页已注入分页上下文）。

**总条数不超过每页条数时不输出**（不足 2 页无分页）。

### 自闭合（Bootstrap 5）

```html
{echo:list num="10" order="published_at"}
  <a href="[field:url/]">[field:title/]</a>
{/echo:list}
{echo:page/}
```

### 成对（自定义 HTML）

```html
{echo:page}
  <a href="[field:prev_url/]">上一页</a>
  [field:page/] / [field:pages/]
  <a href="[field:next_url/]">下一页</a>
{/echo:page}
```

块内字段：`page`、`pages`、`total`、`page_size`、`prev_url`、`next_url`、`has_prev`、`has_next`。

搜索页链接示例：`/search?q=关键词&page=2`。
