# 友情链接

## `{echo:link}` / `{/echo:link}`

只输出当前站 `status=1` 的友情链接，按 `sort`。

| 属性 | 默认 | 说明 |
|------|------|------|
| `num` | `20` | 条数 |

块内字段：`name`、`url`、`logo`。

### 首页合作伙伴（有 Logo 出图，没有则显示名称）

摘自 `templets/default/index.htm`：

```html
{echo:link num="18"}
<a class="partner-item" href="[field:url/]" target="_blank" rel="noopener" title="[field:name/]">
  {echo:if condition="[field:logo]"}
  <img class="partner-logo" src="[field:logo/]" alt="[field:name/]">
  {echo:else}
  <span class="partner-name">[field:name/]</span>
  {/echo:if}
</a>
{/echo:link}
```

### 页脚文字链

```html
{echo:link num="10"}
<a href="[field:url/]" target="_blank" rel="noopener">[field:name/]</a>
{/echo:link}
```
