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
| canonical / hreflang | 无内置 | `{echo:seohead}`（首页 hreflang） | ✅ |
| 面包屑 | `{pboot:position}` 可配分隔符 | `{echo:position}` separator / indextext | ✅ |
| 导航 | `{pboot:nav}` | `{echo:nav}` + `{echo:son}` | ✅ |
| 当前栏目 | `{sort:xxx}` | `{echo:channel}` | ✅ |
| **指定栏目** | `{pboot:sort scode=}` | `{echo:channel scode=}` | ✅ |
| 内容列表 | `{pboot:list}` | `{echo:list}` | ✅ |
| 分页 | `{pboot:page}` | `{echo:page}` | ✅ |
| 内容详情 | `{content:xxx}` | `{echo:field}` | ✅ |
| 指定单页内容 | content 标签 | `{echo:content}` | ✅ |
| 多图 | pics 遍历 | `{echo:pics}` / `{echo:images}` | ✅ |
| 素材库文件夹出图 | 无对应标签 | `{echo:material folder="…"}` | ✅ |
| 幻灯片 | slide | `{echo:banner}` | ✅ |
| 友情链接 | link | `{echo:link}` | ✅ |
| 留言 | message 系列 | msgaction + guestbook | ✅ |
| 验证码开关 | checkcodestatus | `{echo:msgcodestatus}` | ✅ |
| 自定义表单 | form | `{echo:form}` | ✅ |
| 多语言 | lg / lang | `{echo:lang}` | ✅ |
| 搜索 | search | `{echo:searchlist}` + `?tag=` | ✅ |
| **内容 tags** | `{pboot:tags}` | `{echo:tags}` | ✅ |
| **多选字段遍历** | checkbox 扩展 | `{echo:checkbox}` | ✅ |
| **动态文本遍历** | 无 | `{echo:texts}` | ✅ |
| **多条件筛选** | 栏目+标签+字段 | `tags` / `ext_field` / `?tag=` | ✅ |
| 站点地图 | sitemap / xml | 块 + `/sitemap.xml` | ✅ |
| 条件 | if | `{echo:if}` | ✅ |
| 上下篇 / 相关 | 部分主题内置 | prev / next / like | ✅ |

## Pboot 有、Echo 已补齐（2026-08）

| 能力 | Echo 写法 |
|------|-----------|
| **指定栏目** | `{echo:channel scode="about" name="banner"/}` |
| **字段修饰** | `[field:title len="30" drophtml="1"/]`、`{echo:field name="title" len="30"/}` |
| **时间格式化** | `style="Y-m-d"` 或 `format="Y-m-d"` |
| **当前完整 URL** | `{echo:httpurl/}`、`{echo:pageurl/}` |
| **面包屑参数** | `{echo:position separator=" &gt; " indextext="首页"/}` |
| **搜索标红** | `[field:title mark="1"/]`（搜索页） |
| **图片缩放** | `width` / `height` → `/thumb?src=&w=&h=` |
| **二维码** | `{echo:qrcode string="…"/}` |
| **运行时间** | `{echo:runtime/}` |

## Pboot 有、Echo 仍暂无

| 能力 | 说明 | **是否建议补** |
|------|------|----------------|
| **会员 / 评论** | 用户体系 | **不做** — 企业站非核心 |
| **万能 SQL / Loop** | 任意 SQL | **不做** — 安全与维护成本 |

## 历史缺口（已实施，见上表）

| 能力 | 说明 |
|------|------|
| 指定栏目 / 字段修饰 / 日期 format / httpurl / pageurl / position 参数 / mark / 缩略图 / qrcode / runtime / 内容 tags / checkbox 遍历 / 列表筛选 | 均已支持，详见各子页 |
