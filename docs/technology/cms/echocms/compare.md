# 与 PbootCMS 能力对比

对照 [Pboot 公共标签](https://www.pbootcms.com/docs/296.html) 及手册导航。✅ 已有 · ⚠️ 部分 · ❌ 暂无。

## 文档形态

| | Pboot | Echo |
|---|-------|------|
| 结构 | 左侧手册，**一标签一页** | 已拆分为同结构子页 |
| 写法 | `{pboot:xxx}` / `{sort:xxx}` | `{echo:xxx}` / `[field:xxx/]` |

## 标签对照

| 能力 | Pboot | Echo | 状态 |
|------|-------|------|------|
| 模板嵌套 | `{include}` | `{echo:include}` | ✅ |
| 站点信息 | `{pboot:sitetitle}` 等 | `{echo:global}` + `{echo:pagetitle}` | ✅ |
| 公司信息 | company 标签 | `{echo:company}` | ✅ |
| 定制标签 | `{label:xxx}` | `{echo:label}` | ✅ |
| 页头 TDK | pagetitle 系列 | `{echo:pagetitle}` 等 | ✅ |
| 面包屑 | `{pboot:position}` 可配分隔符 | `{echo:position}` 固定 Bootstrap | ⚠️ |
| 导航 | `{pboot:nav}` | `{echo:nav}` + `{echo:son}` | ✅ |
| 当前栏目 | `{sort:xxx}` | `{echo:channel}` | ✅ |
| **指定栏目** | `{pboot:sort scode=}` | 无 | ❌ |
| 内容列表 | `{pboot:list}` | `{echo:list}` | ✅ |
| 分页 | `{pboot:page}` | `{echo:page}` | ✅ |
| 内容详情 | `{content:xxx}` | `{echo:field}` | ✅ |
| 指定单页内容 | content 标签 | `{echo:content}` | ✅ |
| 多图 | pics 遍历 | `{echo:pics}` / `{echo:images}` | ✅ |
| 幻灯片 | slide | `{echo:banner}` | ✅ |
| 友情链接 | link | `{echo:link}` | ✅ |
| 留言 | message 系列 | msgaction + guestbook | ✅ |
| 验证码开关 | checkcodestatus | `{echo:msgcodestatus}` | ✅ |
| 自定义表单 | form | `{echo:form}` | ✅ |
| 多语言 | lg / lang | `{echo:lang}` | ✅ |
| 搜索 | search | `{echo:searchlist}` | ✅ |
| 站点地图 | sitemap / xml | 块 + `/sitemap.xml` | ✅ |
| 条件 | if | `{echo:if}` | ✅ |
| 上下篇 / 相关 | 部分主题内置 | prev / next / like | ✅ |

## Pboot 有、Echo 暂无

| 能力 | 说明 | **是否建议补** |
|------|------|----------------|
| **指定栏目** `{sort scode=}` | 任意页读某栏目 name/banner/link | **建议** — `{echo:channel scode="about" name="banner"/}` |
| **字段修饰** `len` `lencn` `drophtml` `substr` | 列表/详情截取、去 HTML | **建议** — 模板里最高频 |
| **时间格式化** `style=Y-m-d` | 日期显示 | **建议** — 可先做 field/list 的 `format` 属性 |
| **当前完整 URL** `httpurl` / `pageurl` |  canonical、分享 | **建议** — 轻量自闭合标签 |
| **面包屑参数** separator / indextext | 自定义分隔符与首页文案 | 可选 |
| **搜索关键字标红** `mark=1` | 搜索结果高亮 | 可选 |
| **图片缩放** `width=` `height=` | 列表缩略图 | 可选 — 更宜 CDN/上传时生成 |
| **二维码** `qrcode` | 动态二维码图 | 低优 — 前端库即可 |
| **运行时间** `runtime` | 页脚调试 | 低优 |
| **内容 tags** | 文章标签云 | 中期 — 需内容模型支持 |
| **多选字段遍历** | checkbox 扩展 | 低优 |
| **多条件筛选** | 栏目+字段筛选 | 中期 |
| **会员 / 评论** | 用户体系 | **不做** — 企业站非核心 |
| **万能 SQL / Loop** | 任意 SQL | **不做** — 安全与维护成本 |

## 建议实施顺序（若补标签）

1. **指定栏目** — 首页/侧栏读任意栏目 Banner、链接（对标 Pboot 最常用缺口）
2. **字段修饰** — `[field:title len="30"]` 或 `{echo:field name="title" len="30"/}`（先 len + drophtml）
3. **日期 format** — `format="Y-m-d"` 或 `style` 与 Pboot 对齐
4. **httpurl / pageurl** — 分享与 SEO 辅助

其余按产品需求排期；会员、SQL、评论不建议对标 Pboot 全量复制。

---

确认要补哪几项后，可在 echo-cms 仓库提规格再开发；引擎变更需同步 `docs/templets-tags.md` 与本手册。
