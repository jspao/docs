# 多条件搜索

## `{echo:searchlist}` / `{/echo:searchlist}`

仅搜索页（`search.htm`）上下文。

```html
<form method="get" action="{echo:url path="/search"/}">
  <input name="q" placeholder="搜索">
</form>

{echo:searchlist}
<a href="[field:url/]">
  <div>[field:title mark="1"/]</div>
  <div>[field:summary mark="1" len="80" drophtml="1"/]</div>
</a>
{/echo:searchlist}
{echo:page/}
```

块内字段同内容列表。搜索页 `pageKind=other`，`<title>` 仍用站点 TDK，不用搜索词。

::: info
Pboot 有多条件筛选标签；Echo 目前仅全站关键词搜索，无栏目/字段组合筛选。
:::
