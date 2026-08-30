# 导航菜单

## `{echo:nav}` / `{/echo:nav}`

栏目导航，默认顶级（`parent="0"`）。

```html
{echo:nav parent="0" num="12"}
<li class="nav-item [field:dropdown_class/]">
  <a class="nav-link [field:active_class/]" href="[field:url/]">[field:name/]</a>
  {echo:if condition="[field:haschild/]"}
  <ul class="dropdown-menu">
    {echo:son}
    <li><a class="dropdown-item" href="[field:url/]">[field:name/]</a></li>
    {/echo:son}
  </ul>
  {/echo:if}
</li>
{/echo:nav}
```

| 属性 | 默认 | 说明 |
|------|------|------|
| `parent` | `0` | 父栏目 ID，`0` 为顶级 |
| `num` | `50` | 条数上限 |

只输出 **启用且展示** 的栏目（`status=1` 且 `visible=1`）。隐藏栏目不出现在导航和 `{echo:son}`，但 URL、`{echo:list}` / `{echo:channel}` / `{echo:content}`、sitemap 仍可用。禁用栏目前台全部不可用，展示/隐藏无效。

块内字段：`name`、`code`、`url`、`haschild`、`dropdown_class`、`toggle_class`、`active_class`。

`{echo:son}…{/echo:son}` 只能写在 `{echo:nav}` 内，有子栏目才输出。

首页高亮：`{echo:if condition="[field:is_home/]"}`（仅首页为真）。
