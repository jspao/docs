# 留言板

默认皮肤用**原生 POST**，不要 `fetch`。

## 表单标签

| 标签 | 说明 |
|------|------|
| `{echo:msgaction/}` | 提交地址 `/guestbook` |
| `{echo:checkcode/}` | 验证码图片 `/checkcode` |
| `{echo:msgcodestatus/}` | `1` 开 / `0` 关 |
| `{echo:formtoken/}` | CSRF 隐藏域 |
| `{echo:msgresult/}` | 失败提示 |

成功 302 到主题 `success.htm`（可缺省）。

```html
<form action="{echo:msgaction/}" method="post">
  {echo:formtoken/}
  <input name="name" required>
  <textarea name="content" required></textarea>
  {echo:if condition="[field:msgcodestatus]"}
  <input name="checkcode" required>
  <img src="{echo:checkcode/}" alt="验证码">
  {/echo:if}
  <button type="submit">提交</button>
</form>
<p>{echo:msgresult/}</p>
```

字段：`name`、`phone`、`email`、`content`（content 必填）。

---

## `{echo:guestbook}` / `{/echo:guestbook}`

循环**已回复**留言。

```html
{echo:guestbook num="20"}
<div>[field:name/]：[field:content/]</div>
<div>回复：[field:reply/]</div>
{/echo:guestbook}
```

可选 JSON：`POST /api/guestbook`（无验证码）。
