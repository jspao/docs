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
| `tags` | — | 逗号分隔，匹配任一文章标签 |
| `match` | — | `tags`：详情页用当前文 tags 筛相似 |
| `ext_field` / `ext_value` | — | 扩展字段精确筛选 |

块内常用：`title`、`thumb`、`summary`、`published_at`、`url`、`tags`、`is_top` 及扩展字段。

`order="rand"` 随机抽取，不与 `{echo:page/}` 同用。

字段修饰见 [公共标签 → 字段修饰](./common#_6-字段修饰)。

```html
{echo:list scode="news" match="tags" num="5"}
  <li><a href="[field:url/]">[field:title len="30"/]</a></li>
{/echo:list}
```
