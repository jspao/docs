# 多语言建站

## `{echo:lang}` / `{/echo:lang}`

列出启用站点（`cms_sites.status=1`）。

| 属性 | 说明 |
|------|------|
| `current="1"` | 只输出当前站 |
| `current="0"` | 只输出其它站 |
| 不写 | 全部启用站 |

块内字段：`name`、`code`、`flag`、`flag_emoji`、`url`、`active_class`。

```html
{echo:lang current="1"}
  [field:flag_emoji/] [field:name/]
{/echo:lang}

{echo:lang}
<a class="[field:active_class/]" href="[field:url/]">[field:name/]</a>
{/echo:lang}
```

`url`：本地 `?site=` 预览时为 `/?site={code}`；生产有域名则跳对应域名首页。
