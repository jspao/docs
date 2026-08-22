# 自定义表单

后台「扩展 → 自定义表单」创建并启用后，皮肤手写 HTML，标签只提供提交地址。对齐 Pboot `{pboot:form fcode=*}`。留言走另一套 `{echo:msgaction}`，不要混用。

## `{echo:form/}`

属性 `code`（必填，`cms_forms.code`，如 `quote`、`inquiry`）。输出 `/form/{code}`，预览自动带 `?site=`。`code` 空或非法时输出空。渲染时不查表单是否存在。

## `{echo:formresult/}` / `{echo:formtoken/}`

| 标签 | 说明 |
|------|------|
| `{echo:formtoken/}` | CSRF 隐藏域（与留言相同） |
| `{echo:formresult/}` | 失败回原页后的提示；成功则跳转 `/form/success` |

多选字段 name 加 `[]`，例如 `need_catalog[]`。

案例摘自 `templets/default/article_product.htm`：

```html
<form action="{echo:form code="quote"/}" method="post">
  {echo:formtoken/}
  <label>询价产品</label>
  <input name="product" value="{echo:field name="title"/}" readonly>
  <label>姓名</label>
  <input name="name">
  <label>电话</label>
  <input name="phone">
  <label>邮箱</label>
  <input name="email" type="email">
  <label>台数</label>
  <input name="qty" type="number">
  <label>需求</label>
  <textarea name="message"></textarea>
  <button type="submit">提交</button>
</form>
<p>{echo:formresult/}</p>
```

联系询盘见 `templets/default/article_page.htm`（`code="inquiry"`）。

## 可选 JSON 接口

默认皮肤不用。`POST /api/form/{code}`，JSON 字段名与表单定义一致；关站拒绝；按 IP 限流。无 CSRF、无验证码。
