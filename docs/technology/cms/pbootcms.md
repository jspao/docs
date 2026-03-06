# PbootCMS 开发指南

PbootCMS 是一款开源免费的 PHP 企业网站管理系统，以高效、简洁、易用为特点。系统采用简单的模板标签，只需掌握 HTML 即可快速开发企业网站。

> **官方网站**：[PbootCMS 官网](https://www.pbootcms.com/)

## 核心特点

| 特点 | 说明 |
|------|------|
| **开源免费** | 永久开源，可商用 |
| **模板简单** | 标签简洁，学习成本低 |
| **功能完善** | 支持多语言、自定义表单、SEO 优化等 |
| **扩展性强** | 支持二次开发和插件扩展 |

## 常见问题与解决方案

### 首页参数导致 301 重定向

**问题描述**：首页 URL 携带参数时（如 `/?ref=xxx`），会触发 301 重定向。

**解决方案**：

1. 打开文件：`apps/home/controller/IndexController.php`
2. 找到以下代码：
   ```php
   header("Location: " . $http . $_SERVER['HTTP_HOST'] . $matches1[0], true, 301);
   ```
3. 替换为：
   ```php
   $this->getIndexPage();
   ```

**修改后的完整代码**：
```php
if ($matches1[0]) {
    if ($_SERVER['REQUEST_URI'] == $matches1[0]) {
        $this->getIndexPage();
    } elseif (strpos($matches1[0], '/?page=') !== false) {
        $this->getIndexPage();
    } else {
        // 读取后台首页404访问配置
        if ($this->config('url_index_404') == 1) {
            _404('您访问的页面不存在，请核对后重试！');
        }
        // 修改这里：移除 301 跳转
        $this->getIndexPage();
    }
} else {
    _404('您访问的页面不存在，请核对后重试！');
}
```

### 支持 Google 广告参数

**问题描述**：Google 广告跳转参数（如 `?gad_source=xxx`）被系统拦截，导致 404 错误。

**解决方案**：

1. 打开文件：`apps/home/controller/IndexController.php`
2. 找到以下代码：
   ```php
   if (stripos(URL, '?') !== false && stripos(URL, '/?tag=') == false && stripos(URL, '/?page=') == false && stripos(URL, '/?ext_') == false) {
       _404('您访问的内容不存在，请核对后重试！');
   }
   ```
3. 添加广告参数白名单（以 `gad_source` 为例）：
   ```php
   if (stripos(URL, '?') !== false 
       && stripos(URL, '/?tag=') == false 
       && stripos(URL, '/?page=') == false 
       && stripos(URL, '/?ext_') == false
       && stripos(URL, '/?gad_source') == false  // 添加这一行
   ) {
       _404('您访问的内容不存在，请核对后重试！');
   }
   ```

::: tip 提示
如需支持其他广告参数（如 `utm_source`、`fbclid` 等），按相同方式添加即可。
:::

### 多语言 API 调用

**场景**：在多语言网站中，通过 API 获取指定语言的内容列表。

**关键参数**：`acode` - 指定语言代码（如 `en`、`zh` 等）

**参考文档**：[PbootCMS API 文档](https://www.pbootcms.com/docs/237.html)

```js
$(document).ready(function () {
  $.ajax({
    type: "POST",
    url: "http://your-domain/api.php/list/*/page/2/num/12",
    dataType: "json",
    data: {
      // 关键：指定语言代码
      acode: 'en',
      appid: "{pboot:appid}",
      timestamp: "{pboot:timestamp}",
      signature: "{pboot:signature}",
    },
    success: function (response) {
      if (response.code) {
        console.log('数据获取成功：', response.data);
      } else {
        console.error('错误：', response.data);
      }
    },
    error: function () {
      console.error('请求异常');
    },
  });
});
```

| 参数 | 说明 |
|------|------|
| `acode` | 语言代码，如 `en`、`zh`、`ja` 等 |
| `appid` | 应用 ID，使用模板标签 `{pboot:appid}` 获取 |
| `timestamp` | 时间戳，使用模板标签 `{pboot:timestamp}` 获取 |
| `signature` | 签名，使用模板标签 `{pboot:signature}` 获取 |

### 移除 URL 末尾的斜杠

**修改路径**：`core/basic/Url.php`

**操作步骤**：
1. 打开 `Url.php` 文件
2. 找到 `$suffix = '';` 这一行
3. 删除该行末尾的 `/`（如果有）

**效果**：
- 修改前：`http://example.com/about/`
- 修改后：`http://example.com/about`

### Sitemap 排除特定栏目

**场景**：某些栏目（如测试页面、内部页面）不需要生成到 Sitemap 中。

**修改路径**：`apps/home/model/SitemapModel.php`

**操作步骤**：
1. 找到代码 `a.status=1` 所在行
2. 在其下方添加排除条件：
   ```php
   // 排除栏目 ID 为 16 的内容
   a.scode<>16
   ```

**示例**：
```php
// 原代码
where a.status=1

// 修改后（排除栏目 16 和 20）
where a.status=1 
  and a.scode<>16 
  and a.scode<>20
```

### 列表加载全部字段

**问题描述**：`{pboot:list}` 默认只加载部分字段，无法获取自定义扩展字段。

**解决方案**：添加 `lfield="*"` 参数

```html
<!-- 加载所有字段（包括扩展字段） -->
{pboot:list num=12 lfield="*"}
    <p>标题：[list:title]</p>
    <p>自定义字段：[list:custom_field]</p>
{/pboot:list}
```

| 参数值 | 说明 |
|--------|------|
| `lfield="*"` | 加载所有字段 |
| `lfield="title,content"` | 仅加载指定字段（多个用逗号分隔） |

### 自定义表单文件上传

为自定义表单和留言表单添加文件上传功能，基于 LayUI 的 Upload 模块实现。

**参考资料**：
- [LayUI Upload 文档](https://www.bejson.com/doc/layui/doc/modules/upload.html#options)
- [实现思路参考](https://www.xiuzhanwang.com/pbootcms_sy/5727.html)
- [LayUI 文件下载](../assets/pbootcms/layui-v2.2.5.zip)

#### 后端配置

**1. 添加上传接口**

打开 `apps/home/controller/IndexController.php`，添加上传方法：

```php
public function upload() {
    $upload = upload('upload');
    if (is_array($upload)) {
        json(1, $upload);  // 上传成功
    } else {
        json(0, $upload);  // 上传失败
    }
}
```

**2. 后台表单图片预览**

如需在后台表单中显示上传的图片，修改 `/apps/admin/view/default/content/form.html`：

```php
<tbody>
    {foreach $fields(key2,value2,num2)}
    <tr>
        <th>[value2->description]</th>
        {php} $field=$value2->name {/php}
        <td>
            <!-- 图片预览代码 -->
            <script>
                var fls = "[value->$field]"
                if (fls.indexOf('/static/') >= 0) {
                    document.write("<a href=" + fls + " target='_blank'><img src=" + fls +" width='250' /></a>");
                } else {
                    document.write(fls);
                }
            </script>
        </td>
    </tr>
    {/foreach}
</tbody>
```

**3. 留言列表图片预览**

修改 `message.html` 文件，添加与上面相同的图片预览代码。

#### 前端基础示例

最简单的文件上传实现：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>文件上传示例</title>
    <link rel="stylesheet" href="/static/build/layui.css" />
</head>
<body>
    <!-- 上传按钮 -->
    <button type="button" class="layui-btn" id="uploadBtn">
        <i class="layui-icon">&#xe67c;</i> 上传图片
    </button>

    <script src="/static/build/layui.js"></script>
    <script>
        layui.use('upload', function() {
            var upload = layui.upload;

            // 初始化上传组件
            upload.render({
                elem: '#uploadBtn',           // 绑定按钮
                url: '/index.php?p=/index/upload',  // 上传接口
                done: function(res) {
                    // 上传成功回调
                    console.log('上传成功：', res);
                },
                error: function() {
                    // 上传失败回调
                    console.error('上传失败');
                }
            });
        });
    </script>
</body>
</html>
```

#### 上传组件配置参数

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `elem` | 绑定元素的选择器或 DOM 对象 | string/object | - |
| `url` | 服务端上传接口地址 | string | - |
| `method` | HTTP 请求方法 | string | `post` |
| `data` | 额外参数（支持动态值） | object | - |
| `headers` | 请求头配置 | object | - |
| `accept` | 文件类型：`images`/`file`/`video`/`audio` | string | `images` |
| `acceptMime` | MIME 类型筛选，如 `image/*` | string | `images` |
| `exts` | 允许的文件后缀，如 `jpg|png|gif` | string | `jpg\|png\|gif` |
| `auto` | 是否自动上传 | boolean | `true` |
| `bindAction` | 手动上传触发按钮（配合 `auto: false`） | string/object | - |
| `field` | 文件字段名 | string | `file` |
| `size` | 文件大小限制（KB），0 为不限制 | number | `0` |
| `multiple` | 是否允许多文件上传 | boolean | `false` |
| `number` | 同时上传文件数量限制 | number | `0` |
| `drag` | 是否支持拖拽上传 | boolean | `true` |

**回调函数**：

| 回调 | 触发时机 | 参数 |
|------|----------|------|
| `choose` | 选择文件后 | 文件对象 |
| `before` | 上传前 | 文件对象 |
| `done` | 上传成功 | `res`, `index`, `upload` |
| `error` | 上传失败 | `index`, `upload` |

### 实战演练 - 多选文件上传

默认引入 `css` 和 `js`

::: code-group

```html [HTML]
<div class="fsc itc-form__upload">
  <div class="itc-form__upload-con">
    <!-- 重要的位置，也是脚本的触发单元 -->
    <button type="button" class="layui-btn upload me-2" data-des="base_photo">
      上传图片
    </button>
    <input
      class="itc-form__file base_photo"
      type="text"
      id="base_photo"
      name="base_photo"
    />
  </div>
  <div id="ico_box" class="itc-form__upload-pic"></div>
  <div class="itc-form__file-txt">
    基地照片3张，外观、实训场地、仪器等。（请上传后缀为.gif,.jpg,.jpeg,.png的图片
    单个文件最大支持 10 M）
  </div>
</div>
```

```js [JavaScript]
layui.use(["element", "upload"], function () {
  var element = layui.element;
  var upload = layui.upload;
  //执行单图片实例
  var uploadInst = upload.render({
    elem: ".upload", //绑定元素
    url: "/index.php?p=/index/upload", //上传接口
    field: "upload", //字段名称
    multiple: true, //多文件上传
    number: 3, // 限制一次选择多少个内容
    accept: "images", //接收文件类型 images（图片）、file（所有文件）、video（视频）、audio（音频）
    acceptMime: "image/*",
    // 选择文件后的回调函数。返回一个object参数
    choose: function (obj) {
      console.log(obj, "obj");
    },
    // 当文件全部被提交后，才触发
    allDone: function (obj) {
      console.log(obj.total); //得到总文件数
      console.log(obj.successful); //请求成功的文件数
      console.log(obj.aborted); //请求失败的文件数
    },
    //上传后的回调
    done: function (res, index, upload) {
      var item = this.item;
      layer.closeAll("loading"); //关闭loading

      if (res.code == 1) {
        let currentValue = $("#base_photo").val();
        let newValue = currentValue
          ? currentValue + "," + res.data[0]
          : res.data[0];
        // 更新 input 的值
        $("#base_photo").val(newValue);

        // 2. 不清空 #ico_box，直接追加新上传的图片
        $.each(res.data, function (index, value) {
          $("#ico_box").append(
            `<a href='${value}' target='_blank'>
                    <img src='${value}' width='200'>
                </a>`
          );
        });

        layer.msg("上传成功！");
      } else {
        layer.msg("上传失败：" + res.data);
      }
    },
    error: function () {
      layer.closeAll("loading"); //关闭loading
      layer.msg("上传发生错误!");
    },
  });
});
```

:::

### 实战演练 - 单选单个文件上传

默认引入 `css` 和 `js`

::: code-group

```html [HTML]
<div class="fsc itc-form__upload">
  <div class="itc-form__upload-con">
    <button type="button" class="layui-btn upload me-2" data-des="id_photo">
      上传图片
    </button>
    <input
      class="itc-form__file id_photo"
      type="text"
      id="id_photo"
      name="id_photo"
    />
  </div>
  <div id="ico_box" class="itc-form__upload-pic"></div>
  <div class="itc-form__file-txt">
    两寸证件照或形象照（请上传后缀为.gif,.jpg,.jpeg,.png的图片 单个文件最大支持
    10 M）
  </div>
</div>
```

```js [JavaScript]
layui.use(["element", "upload"], function () {
  var element = layui.element;
  var upload = layui.upload;
  //执行单图片实例
  var uploadInst = upload.render({
    elem: ".upload", //绑定元素
    url: "/index.php?p=/index/upload", //上传接口
    field: "upload", //字段名称
    multiple: false, //多文件上传
    accept: "images", //接收文件类型 images（图片）、file（所有文件）、video（视频）、audio（音频）
    acceptMime: "image/*",
    done: function (res) {
      var item = this.item;
      layer.closeAll("loading"); //关闭loading
      if (res.code == 1) {
        $("#id_photo").val(res.data[0]);
        $("#ico_box").html(
          `<a href='${res.data[0]}' target='_blank'><img src='${res.data[0]}' width=200 ></a>`
        );
        layer.msg("上传成功！");
      } else {
        layer.msg("上传失败：" + res.data);
      }
    },
    error: function () {
      layer.closeAll("loading"); //关闭loading
      layer.msg("上传发生错误!");
    },
  });
});
```

:::

### 实战演练 - 动态渲染结合上传

采用动态渲染 list 数据，并且每个节点中都存在多个上传

::: code-group

```html [HTML]
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="{pboot:sitetplpath}/js/css/layui.css" />
    <script src="{pboot:sitetplpath}/js/layui.js"></script>
    <script>
      var coverupload = null;
    </script>
  </head>
  <body>
    <form action="{pboot:form fcode=3}" method="post">
      <table>
        <tr>
          <td>
            <div class="fbc">
              <div class="itc-form__left itc-form__subtitle">联合培养信息</div>
              <div class="itc-form__right py-2 fec">
                <a href="javascript:;" id="addInfo">新增培养信息</a>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              name="joint_cultivation"
              id="joint_cultivation"
            />
            <!-- 核心容器 -->
            <div id="tableList">
              <!-- 动态内容 -->
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="fcc itc-form__btn py-4">
              <button type="submit">提交申请</button>
            </div>
          </td>
        </tr>
      </table>
    </form>

    <script src="../js/jquery.min.js"></script>
    <script src="../js/dynamic-form.js"></script>
    <script>
      function uploadCaseFile(index, field) {
        currentInput = $(`#${field}${index}`);
        iconBox = $(`#ico_box${index}`);

        let obj = { id: `${field}${index}` };

        coverupload.currentInput = currentInput;
        coverupload.currentIndex = index;
        coverupload.currentField = field;
        if (field === "tbusiness_license") {
          coverupload.iconBox = iconBox;
        }

        if (["tcurriculum_vitae", "tresearch_summary"].includes(field)) {
          Object.assign(obj, { accept: "file", acceptMime: null });
        }

        coverupload.reload(obj);

        $("#onUpload").click();
      }
    </script>
  </body>
</html>
```

```js [dynamic-form.js]
jQuery(document).ready(function ($) {
  // 创建一个递归函数来应用 Proxy
  function createDeepProxy(target, handler) {
    // 递归代理所有对象或数组
    if (typeof target === "object" && target !== null) {
      Object.keys(target).forEach((key) => {
        target[key] = createDeepProxy(target[key], handler); // 递归处理
      });
      return new Proxy(target, handler); // 代理当前对象或数组
    }
    return target; // 如果不是对象或数组，直接返回值
  }

  // 用于存储所有表单项的数据
  var formDataArray = [
    {
      tname: "",
      tgender: "男",
      tdate_of_birth: "",
      tresearch: "",
      ttitle: "",
      teducation: "",
      tbusiness_license: "",
      tcurriculum_vitae: "",
      tresearch_summary: "",
    },
  ];

  const formDataHandler = {
    get(target, property) {
      return target[property]; // 直接返回属性值
    },
    set(target, property, value) {
      // 更新属性或数组元素
      target[property] = createDeepProxy(value, formDataHandler); // 保证新值也被代理

      // 如果是数组或对象发生变化，触发相应的逻辑
      if (Array.isArray(target)) {
        console.log("formDataArray 发生变化:", target, formDataArray);
      } else if (typeof target === "object") {
        console.log(
          `formData 属性 "${property}" 发生变化:`,
          value,
          formDataArray
        );
      }

      $("#joint_cultivation").val(JSON.stringify(formDataArray));

      return true; // 返回 true 表示设置成功
    },
  };

  formDataArray = createDeepProxy(formDataArray, formDataHandler);

  // 渲染已存在的表单数据
  function renderInitialForms() {
    formDataArray.forEach(function (data, index) {
      addFormHtml(index, data);
    });
    // 绑定上传逻辑
    bindFormEvents(); // 绑定表单相关事件
  }

  // 动态生成表单并插入 DOM
  function addFormHtml(index, data) {
    var newFormHtml = `
              <table class="mt-3" data-index="${index}">
                <tr>
                  <td width="80">姓名</td>
                  <td>
                    <div class="fsc">
                      <input class="itc-form__input tname" placeholder="请输入..." type="text" name="tname" value="${
                        data.tname
                      }" />
                    </div>
                  </td>
                  <td width="80">性别</td>
                  <td>
                    <div class="itc-form__radio fsc">
                      <div class="fsc me-3">
                        <input type="radio" id="tmale${index}" name="tgender${index}" value="男" ${
      data.tgender === "男" ? "checked" : ""
    } />
                        <label for="tmale${index}">男</label>
                      </div>
                      <div class="fsc">
                        <input type="radio" id="tfemale${index}" name="tgender${index}" value="女" ${
      data.tgender === "女" ? "checked" : ""
    } />
                        <label for="tfemale${index}">女</label>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="80">出生日期</td>
                  <td><div class="fsc"><input class="itc-form__input tdate_of_birth" placeholder="请输入..." type="text" name="tdate_of_birth" value="${
                    data.tdate_of_birth
                  }" /></div></td>
                  <td width="80">研究方向</td>
                  <td><div class="fsc"><input class="itc-form__input tresearch" placeholder="请输入..." type="text" name="tresearch" value="${
                    data.tresearch
                  }" /></div></td>
                </tr>
                <tr>
                  <td width="120">职称</td>
                  <td><div class="fsc"><input class="itc-form__input ttitle" placeholder="请输入..." type="text" name="ttitle" value="${
                    data.ttitle
                  }" /></div></td>
                  <td width="120">最后学历</td>
                  <td><div class="fsc"><input class="itc-form__input teducation" placeholder="请输入..." type="text" name="teducation" value="${
                    data.teducation
                  }" /></div></td>
                </tr>
                <tr>
                  <td>证件照</td>
                  <td colspan="3">
                    <div class="fsc itc-form__upload">
                      <div class="itc-form__upload-con">
                        <button type="button" class="layui-btn tupload tbusiness_license${index} me-2" data-index="${index}" data-des="tbusiness_license" onclick="uploadCaseFile(${index}, 'tbusiness_license')">上传图片</button>
                        <input class="itc-form__file tbusiness_license" type="text" id="tbusiness_license${index}" name="tbusiness_license" value="${
      data.tbusiness_license
    }" />
                      </div>
                      <div id="ico_box${index}" class="itc-form__upload-pic"></div>
                       <div class="itc-form__file-txt">
                            两寸证件照或形象照（请上传后缀为.gif,.jpg,.jpeg,.png的图片 单个文件最大支持 10 M）
                       </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>个人简历</td>
                  <td colspan="3">
                    <div class="fsc itc-form__upload">
                      <div class="itc-form__upload-con">
                        <button type="button" class="layui-btn tupload tcurriculum_vitae${index} me-2" data-index="${index}" data-des="tcurriculum_vitae" onclick="uploadCaseFile(${index}, 'tcurriculum_vitae')">上传文件</button>
                        <input class="itc-form__file tcurriculum_vitae" type="text" id="tcurriculum_vitae${index}" name="tcurriculum_vitae" value="${
      data.tcurriculum_vitae
    }" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>研究成果简述</td>
                  <td colspan="3">
                    <div class="fsc itc-form__upload">
                      <div class="itc-form__upload-con">
                        <button type="button" class="layui-btn tupload tresearch_summary${index} me-2" data-index="${index}" data-des="tresearch_summary" onclick="uploadCaseFile(${index}, 'tresearch_summary')">上传文件</button>
                        <input class="itc-form__file tresearch_summary" type="text" id="tresearch_summary${index}" name="tresearch_summary" value="${
      data.tresearch_summary
    }" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="6">
                    <div class="fcc py-3 itc-form__delete">
                      <a href="javascript:;" class="remove-form" data-index="${index}">删除</a>
                    </div>
                  </td>
                </tr>
              </table>
            `;

    // 将新表单插入到 tableList 中
    $("#tableList").append(newFormHtml);
  }

  // 点击新增培养信息按钮，添加新的表单
  $("#addInfo").on("click", function () {
    var newIndex = formDataArray.length; // 获取新表单的索引
    formDataArray.push({
      tname: "",
      tgender: "男", // 默认选中男
      tdate_of_birth: "",
      tresearch: "",
      ttitle: "",
      teducation: "",
      tbusiness_license: "",
      tcurriculum_vitae: "",
      tresearch_summary: "",
    });
    addFormHtml(newIndex, formDataArray[newIndex]);

    bindFormEvents();
  });

  // 绑定事件处理函数
  function bindFormEvents() {
    // 输入框输入事件
    $("#tableList")
      .find('input[type="text"]')
      .off("input")
      .on("input", function () {
        var index = $(this).closest("table").data("index");
        var name = $(this).attr("name");
        formDataArray[index][name] = $(this).val();
      });

    // 性别单选按钮事件
    $("#tableList")
      .find('input[type="radio"]')
      .off("change")
      .on("change", function () {
        var index = $(this).closest("table").data("index");
        var name = $(this).attr("name").replace(/\d+/, ""); // 去掉索引，保持name一致
        formDataArray[index][name] = $(this).val();
      });

    // 删除表单事件
    $(".remove-form")
      .off("click")
      .on("click", function () {
        var index = $(this).data("index");
        $(this).closest("table").remove(); // 从 DOM 中移除表单
        formDataArray.splice(index, 1); // 从数组中删除该项

        // 重新更新表单索引
        $("#tableList")
          .find("table")
          .each(function (i, table) {
            $(table).attr("data-index", i);
          });
      });
  }

  layui.use("upload", function () {
    var upload = layui.upload;
    var currentInput = null;
    var iconBox = null;

    //执行实例
    coverupload = upload.render({
      elem: "#onUpload", // 绑定当前点击的按钮元素
      url: "/index.php?p=/index/upload", // 上传接口
      field: "upload", // 后端接收字段名
      multiple: false, // 单文件上传
      accept: "images", // 仅允许上传图片类型
      acceptMime: "image/*",
      done: function (res) {
        layer.closeAll("loading"); // 关闭loading
        if (res.code == 1) {
          let uploadedPath = res.data[0]; // 获取上传的文件路径
          console.log("currentInput: ", currentInput, currentInput);
          coverupload.currentInput.val(uploadedPath); // 将路径填充到对应的输入框
          if (coverupload.iconBox) {
            coverupload.iconBox.html(
              `<a href='${uploadedPath}' target='_blank'><img src='${uploadedPath}' width=200 ></a>`
            );
          }
          formDataArray[coverupload.currentIndex][coverupload.currentField] =
            uploadedPath; // 更新formDataArray中对应的路径
          layer.msg("上传成功！");
        } else {
          layer.msg("上传失败：" + res.data);
        }
      },
      error: function () {
        layer.closeAll("loading");
        layer.msg("上传发生错误!");
      },
    });
  });

  // 初次绑定事件
  bindFormEvents();

  // 渲染初始化数据
  renderInitialForms();
});
```

:::

## 幻灯片列表新增字段

实例路由：`/admin.php?p=/Slide/index`

控制层路径：`/apps/admin/controller/content/SlideController.php`

渲染层路径：`/apps/admin/view/default/content/slide.html`

**Tips：新增与编辑的渲染层代码是分开的，注意区分**

1. 文件改造

::: code-group

```php [SlideController.php]
public function add()
{
  if ($_POST) {
      // 获取数据
      $gid = post('gid', 'int');
      $pic = post('pic');
      $link = post('link');
      $title = post('title');
      $subtitle = post('subtitle');
      // 新增字段
      $desc = post('desc');
      $sorting = post('sorting', 'int');

      if (! $gid) {
          $gid = $this->model->getMaxGid() + 1;
      }

      if (! $pic) {
          alert_back('图片不能为空！');
      }

      // 构建数据
      $data = array(
          'acode' => session('acode'),
          'gid' => $gid,
          'pic' => $pic,
          'link' => $link,
          'title' => $title,
          'subtitle' => $subtitle,
          // 新增字段
          'desc' => str_replace("\r\n", '<br>', $desc),
          'sorting' => $sorting,
          'create_user' => session('username'),
          'update_user' => session('username')
      );

      // 执行添加
      if ($this->model->addSlide($data)) {
          $this->log('新增轮播图成功！');
          if (! ! $backurl = get('backurl')) {
              success('新增成功！', base64_decode($backurl));
          } else {
              success('新增成功！', url('/admin/Slide/index'));
          }
      } else {
          $this->log('新增轮播图失败！');
          error('新增失败！', - 1);
      }
  }
}

public function mod()
{
  if (! ! $submit = post('submit')) {
      switch ($submit) {
          case 'sorting': // 修改列表排序
              $listall = post('listall');
              if ($listall) {
                  $sorting = post('sorting');
                  foreach ($listall as $key => $value) {
                      if ($sorting[$key] === '' || ! is_numeric($sorting[$key]))
                          $sorting[$key] = 255;
                      $this->model->modSlide($value, "sorting=" . $sorting[$key]);
                  }
                  $this->log('批量修改轮播图排序成功！');
                  success('修改成功！', - 1);
              } else {
                  alert_back('排序失败，无任何内容！');
              }
              break;
      }
  }

  if (! $id = get('id', 'int')) {
      error('传递的参数值错误！', - 1);
  }

  // 单独修改状态
  if (($field = get('field', 'var')) && ! is_null($value = get('value', 'var'))) {
      if ($this->model->modSlide($id, "$field='$value',update_user='" . session('username') . "'")) {
          location(- 1);
      } else {
          alert_back('修改失败！');
      }
  }

  // 修改操作
  if ($_POST) {

      // 获取数据
      $gid = post('gid', 'int');
      $pic = post('pic');
      $link = post('link');
      $title = post('title');
      $subtitle = post('subtitle');
      // 新增的字段
      $desc = post('desc');
      $sorting = post('sorting', 'int');

      if (! $gid) {
          $gid = $this->model->getMaxGid() + 1;
      }

      if (! $pic) {
          alert_back('图片不能为空！');
      }

      // 构建数据
      $data = array(
          'gid' => $gid,
          'pic' => $pic,
          'link' => $link,
          'title' => $title,
          'subtitle' => $subtitle,
          // 新增的字段
          'desc' => str_replace("\r\n", '<br>', $desc),
          'sorting' => $sorting,
          'update_user' => session('username')
      );

      // 执行添加
      if ($this->model->modSlide($id, $data)) {
          $this->log('修改轮播图' . $id . '成功！');
          if (! ! $backurl = get('backurl')) {
              success('修改成功！', base64_decode($backurl));
          } else {
              success('修改成功！', url('/admin/Slide/index'));
          }
      } else {
          location(- 1);
      }
  } else {
      // 调取修改内容
      $this->assign('mod', true);
      if (! $result = $this->model->getSlide($id)) {
          error('编辑的内容已经不存在！', - 1);
      }
      $this->assign('gids', $this->model->getGid());
      $this->assign('slide', $result);
      $this->display('content/slide.html');
  }
}
```

```html [slide.html]
<!-- 新增逻辑代码 -->
<div class="layui-form-item">
  <label class="layui-form-label">描述</label>
  <div class="layui-input-block">
    <textarea
      name="desc"
      placeholder="请输入描述"
      class="layui-textarea"
    ></textarea>
  </div>
</div>

<!-- 编辑逻辑代码 -->
<div class="layui-form-item">
  <label class="layui-form-label">描述</label>
  <div class="layui-input-block">
    <textarea name="desc" placeholder="请输入描述" class="layui-textarea">
{php}echo str_replace('<br>', "\r\n", @$this->getVar('slide')->desc);{/php}</textarea
    >
  </div>
</div>
```

:::

2. 找到数据库名为 `ay_slide` 的表, 增加字段 `desc`
