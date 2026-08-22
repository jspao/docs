# 指定内容

## `{echo:content}` / `{/echo:content}`

对标 Pboot「指定内容」：按栏目标识输出**单页模型**下那一条已发布稿。

适合首页嵌「关于我们」，不必 `list scode="about" num="1"`。

```html
{echo:content scode="about"}
<h2>[field:title/]</h2>
<div>[field:content html="1"/]</div>
<a href="[field:url/]">了解更多</a>
{/echo:content}
```

| 属性 | 说明 |
|------|------|
| `scode` | **必填**，栏目 `code` |

规则：栏目须为单页模型且存在已发布稿；否则**整块为空**，不降级为列表。

块内字段同 `{echo:list}`；`[field:url/]` 为 `/{scode}`（有外链时用外链）。

单页模板 `article_page.htm` 仍用 `{echo:field}`，不必套本标签。
