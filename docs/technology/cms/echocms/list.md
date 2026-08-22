# 内容列表

## `{echo:list}` / `{/echo:list}`

已发布、未删除的内容。列表页不写 `scode` 时用当前栏目。

```html
{echo:list scode="news" num="10" order="published_at"}
<a href="[field:url/]">
  <img src="[field:thumb/]" alt="[field:title/]">
  <h3>[field:title/]</h3>
  <p>[field:summary/]</p>
</a>
{/echo:list}
```

| 属性 | 默认 | 说明 |
|------|------|------|
| `scode` | 当前栏目 code | 如 `product`、`news` |
| `num` | `10` | 条数（也是分页每页条数） |
| `order` | `published_at` | `id` / `sort` / `published_at` / `rand` |

块内常用：`title`、`thumb`、`summary`、`published_at`、`url`、`is_top` 及扩展字段。

`order="rand"` 随机抽取，不与 `{echo:page/}` 同用。

::: info 字段修饰
Pboot 的 `len`、`drophtml` 等截取/去 HTML 修饰符 Echo **尚未支持**，见 [对比](./compare)。
:::
