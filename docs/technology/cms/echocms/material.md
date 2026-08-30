# 素材库图片

按**当前站点**素材库文件夹循环图片。后台「内容 → 素材库」建文件夹、丢图即可，不必给每张图单独建一篇内容。适合荣誉墙、证书墙、工厂相册。

::: tip 和 `{echo:pics}` / `{echo:images}` 的区别
那些读的是**某一篇内容**上的多图字段。本标签读的是素材库文件夹，和栏目内容无关。
:::

## `{echo:material}` / `{/echo:material}`

文件夹名按站点唯一，精确匹配。找不到文件夹或没有图片时输出空。只输出 `kind=image`，PDF 等文档不会出现。不读取未分组（根目录）素材。

```html
{echo:material folder="honor" order="name"}
  <img src="[field:url/]" alt="[field:title/]" loading="lazy">
{/echo:material}
```

多组墙面用多个文件夹：

```html
<section id="certificates">
  {echo:material folder="honor" order="name"}
  <figure>
    <img src="[field:url/]" alt="[field:title/]" loading="lazy">
  </figure>
  {/echo:material}
</section>

<section id="awards">
  {echo:material folder="honor-竖图" order="name"}
  <figure>
    <img src="[field:url/]" alt="[field:title/]" loading="lazy">
  </figure>
  {/echo:material}
</section>
```

默认主题相册网格也可以套同一套标签（写法对齐 `templets/default/article_album.htm`）：

```html
<div class="row g-3 echo-gallery">
  {echo:material folder="factory" order="name"}
  <div class="col-sm-6 col-lg-4">
    <img class="echo-gallery-img rounded" src="[field:url/]" alt="[field:title/]">
  </div>
  {/echo:material}
</div>
```

| 属性 | 默认 | 说明 |
|------|------|------|
| `folder` | （必填） | 文件夹名称，精确匹配 |
| `order` | `name` | `name` / `id` / `created_at` |
| `dir` | `asc` | `asc` / `desc` |
| `num` | `200` | 条数，上限 200 |

块内字段：`id`、`url`、`name`（含扩展名）、`title`（去掉扩展名）、`index`（从 1 起）。

`[field:url width="800"/]` 仍可走缩略图 `/thumb?src=&w=`。
