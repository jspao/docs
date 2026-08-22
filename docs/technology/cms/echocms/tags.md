# 内容标签

对标 Pboot `{pboot:tags}`。数据来自后台内容编辑里的 **标签** 字段（`cms_contents.tags`，逗号分隔）。

::: tip 与「内链管理」区别
后台「扩展 → 内链管理」（`cms_tags`）用于正文关键词自动加链；本标签读的是**每篇文章自己的 tags 字段**。
:::

## `{echo:tags}` / `{/echo:tags}`

### 当前文章（详情页）

```html
{echo:tags}
  <a class="badge bg-secondary me-1" href="[tags:link/]">[tags:text/]</a>
{/echo:tags}
```

### 指定栏目 / 全站标签云

```html
{echo:tags scode="news,product" num="30"}
  <a href="[tags:link/]">[tags:text/]</a>
{/echo:tags}
```

| 属性 | 说明 |
|------|------|
| `id` | 内容 ID；详情页可省略 |
| `scode` | 栏目标识（可多个）；省略且不带 `id` 时为全站汇总 |
| `num` | 最多输出数量 |

块内字段：`[tags:text/]`、`[tags:link/]`、`[tags:i/]`（从 1）、`[tags:n/]`（从 0）。

`[tags:link/]` 指向 `/search?tag=标签名`，可带 `scode` 限定栏目。

---

## 相关列表

详情页按当前文章标签筛相似内容：

```html
{echo:list scode="news" match="tags" num="5"}
  <li><a href="[field:url/]">[field:title/]</a></li>
{/echo:list}
```

等价于 `{echo:list tags="文章标签串" …}`；`match="tags"` 自动取当前文 tags。

---

## 搜索页

`GET /search?tag=五轴&scode=product` — 按标签（可选栏目）列出文章。可与 `q` 组合：标题再含关键词。

```html
{echo:searchlist}
  <a href="[field:url/]">[field:title mark="1"/]</a>
{/echo:searchlist}
```

标签页标题为「标签：xxx」；关键词搜索为「搜索：xxx」。
