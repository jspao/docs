# 公司信息

## `{echo:company/}`

读取 `cms_site_company`。

```html
<p>{echo:company name="company_name"/}</p>
<p>地址：{echo:company name="address"/}</p>
<p>电话：{echo:company name="phone"/}</p>
<p>邮箱：{echo:company name="email"/}</p>
<img src="{echo:company name="wechat_qr"/}" alt="微信">
```

| name | 说明 |
|------|------|
| `company_name` | 公司名称 |
| `address` / `phone` / `mobile` / `email` / `fax` | 联系方式 |
| `wechat_qr` / `mp_qr` / `whatsapp` | 二维码或 WhatsApp |
