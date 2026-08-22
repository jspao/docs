# 自定义表单

## `{echo:form/}`

按后台表单 `code` 输出 Bootstrap 表单并 POST 到 `/api/form/{code}`。

```html
{echo:form code="contact"/}
```

| 属性 | 说明 |
|------|------|
| `code` | 必填，对应 `cms_forms.code` |

表单不存在、已禁用或无字段时输出空。

字段类型：`text`、`textarea`、`number`、`email`、`select`、`radio`、`checkbox`、`date`。

也可自写表单直接调 API：

```js
fetch('/api/form/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '张三', message: '你好' }),
});
```
