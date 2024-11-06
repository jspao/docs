# PbootCMS

[官网入口](https://www.pbootcms.com/)

PbootCMS 是全新内核且永久开源免费的 PHP 企业网站开发建设管理系统，是一套高效、简洁、 强悍的可免费商用的 PHP CMS 源码，能够满足各类企业网站开发建设的需要。系统采用简单到想哭的模板标签，只要懂 HTML 就可快速开发企业网站。

## 剔除 url 后的 /

路径：`\core\basic`

1. 找到 `Url.php` 文件
2. 删除 `$suffix = '';` 后的 `/` 即可

## sitemap 剔除部分菜单路径

路径：`\apps\home\model\SitemapModel.php`

1. 找到代码 `a.status=1` 所在行
2. 下行添加 `a.scode<>16` 16 为后台的栏目 ID，即表示 ID 为 16 的文章不生成 sitemap

## {pboot:list} 无法加载全部字段

添加`lfield`字段用以获取所有预制字段及扩展字段

```text
{pboot:list num=12 lfield="*"}
{/pboot:list}
```

## 自定义表单及留言表单上传附件功能

[鸣谢：灵感来源](https://www.xiuzhanwang.com/pbootcms_sy/5727.html)

[参考文档](https://www.bejson.com/doc/layui/doc/modules/upload.html#options)

[LayUI 文件下载](../assets/pbootcms/layui-v2.2.5.zip)

### 后台修改

1. 文件路径：`apps/home/controller/IndexController.php`

2. 新增上传入口函数

```php
public function upload() {
  $upload = upload('upload');
  if (is_array($upload)) {
      json(1, $upload);
  } else {
      json(0, $upload);
  }
}
```

3. 如果想要后台自定义表单展示图片的话则修改文件：`/apps/admin/view/default/content/form.html`

```php
<tbody>
    {foreach $fields(key2,value2,num2)}
      <tr>
        <th>[value2->description]</th>
        {php} $field=$value2->name {/php}
        <td>
        // 关键行代码
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
    <tr>
      <th>时间</th>
      <td>[value->create_time]</td>
  </tr>
  </tbody>
```

4. 如果是留言列表需要展示图片的话，则修改 `message.html` 即可

### 基础示例

这原本只是一个普通的 button，正是 upload 模块赋予了它“文件选择”的特殊技能。当然，你还可以随意定制它的样式，而不是只局限于按钮。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>upload模块快速使用</title>
    <link rel="stylesheet" href="/static/build/layui.css" media="all" />
  </head>
  <body>
    <button type="button" class="layui-btn" id="test1">
      <i class="layui-icon">&#xe67c;</i>上传图片
    </button>

    <script src="/static/build/layui.js"></script>
    <script>
      layui.use("upload", function () {
        var upload = layui.upload;

        //执行实例
        var uploadInst = upload.render({
          elem: "#test1", //绑定元素
          url: "/index.php?p=/index/upload", //上传接口
          done: function (res) {
            //上传完毕回调
          },
          error: function () {
            //请求异常回调
          },
        });
      });
    </script>
  </body>
</html>
```

### 支持参数

<table>
	<thead>
		<tr>
			<th>参数选项</th>
			<th>说明</th>
			<th>类型</th>
			<th>默认值</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>elem</td>
			<td>指向容器选择器，如：elem: '#id'。也可以是DOM对象</td>
			<td>string/object</td>
			<td>-</td>
		</tr>
		<tr>
			<td>url</td>
			<td>服务端上传接口，返回的数据规范请详见下文</td>
			<td>string</td>
			<td>-</td>
		</tr>
		<tr>
			<td>method</td>
			<td>上传接口的 HTTP 类型</td>
			<td>string</td>
			<td>post</td>
		</tr>
		<tr>
			<td>data
			</td>
			<td>请求上传接口的额外参数。如：data: {id: 'xxx'}
				<br> 从 layui 2.2.6 开始，支持动态值，如: data: { id: function() { return $('#id').val(); } }
			</td>
			<td>object</td>
			<td>-</td>
		</tr>
		<tr>
			<td>headers</td>
			<td>接口的请求头。如：<em>headers: {token: 'sasasas'}</em>。注：该参数为 layui 2.2.6 开始新增</td>
      <td>-</td>
      <td>-</td>
		</tr>
		<tr>
			<td>accept</td>
			<td>指定允许上传时校验的文件类型，可选值有：<em>images</em>（图片）、<em>file</em>（所有文件）、<em>video</em>（视频）、<em>audio</em>（音频）</td>
			<td>string</td>
			<td>images</td>
		</tr>
		<tr>
			<td>acceptMime
			</td>
			<td>规定打开文件选择框时，筛选出的文件类型，值为用逗号隔开的 MIME 类型列表。如：
				<br>
				<em>acceptMime: 'image/*'</em>（只显示图片文件）
				<br>
				<em>acceptMime: 'image/jpg, image/png'</em>（只显示 jpg 和 png 文件）
				<br>
				<span>注：该参数为 layui 2.2.6 开始新增</span>
			</td>
			<td>string</td>
			<td>images</td>
		</tr>
		<tr>
			<td>exts</td>
			<td>允许上传的文件后缀。一般结合 <em>accept</em> 参数类设定。假设 accept 为 file 类型时，那么你设置 <em>exts: 'zip|rar|7z'</em> 即代表只允许上传压缩格式的文件。如果 accept 未设定，那么限制的就是图片的文件格式</td>
			<td>string</td>
			<td>jpg|png|gif|bmp|jpeg</td>
		</tr>
		<tr>
			<td>auto</td>
			<td>是否选完文件后自动上传。如果设定 <em>false</em>，那么需要设置 <em>bindAction</em> 参数来指向一个其它按钮提交上传</td>
			<td>boolean</td>
			<td>true</td>
		</tr>
		<tr>
			<td>bindAction</td>
			<td>指向一个按钮触发上传，一般配合 auto: false 来使用。值为选择器或DOM对象，如：bindAction: '#btn'</td>
			<td>string/object</td>
			<td>-</td>
		</tr>
		<tr>
			<td>field</td>
			<td>设定文件域的字段名</td>
			<td>string</td>
			<td>file</td>
		</tr>
		<tr>
			<td>size</td>
			<td>设置文件最大可允许上传的大小，单位 KB。不支持ie8/9</td>
			<td>number</td>
			<td>0（即不限制）</td>
		</tr>
		<tr>
			<td>multiple</td>
			<td>是否允许多文件上传。设置 <em>true</em>即可开启。不支持ie8/9</td>
			<td>boolean</td>
			<td>false</td>
		</tr>
		<tr>
			<td>number</td>
			<td>设置同时可上传的文件数量，一般配合 multiple 参数出现。
				<br>注意：<em>该参数为 layui 2.2.3 开始新增</em>
			</td>
			<td>number</td>
			<td>0（即不限制）</td>
		</tr>
		<tr>
			<td>drag</td>
			<td>是否接受拖拽的文件上传，设置 <em>false</em> 可禁用。不支持ie8/9</td>
			<td>boolean</td>
			<td>true</td>
		</tr>
		<tr>
			<td colspan="4" style="text-align: center;">回调</td>
		</tr>
		<tr>
			<td>choose</td>
			<td>选择文件后的回调函数。返回一个object参数，详见下文</td>
			<td>function</td>
			<td>-</td>
		</tr>
		<tr>
			<td>before</td>
			<td>文件提交上传前的回调。返回一个object参数（同上），详见下文</td>
			<td>function</td>
			<td>-</td>
		</tr>
		<tr>
			<td>done</td>
			<td>执行上传请求后的回调。返回三个参数，分别为：<em>res</em>（服务端响应信息）、<em>index</em>（当前文件的索引）、<em>upload</em>（重新上传的方法，一般在文件上传失败后使用）。详见下文</td>
			<td>function</td>
			<td>-</td>
		</tr>
		<tr>
			<td>error</td>
			<td>执行上传请求出现异常的回调（一般为网络异常、URL 404等）。返回两个参数，分别为：<em>index</em>（当前文件的索引）、<em>upload</em>（重新上传的方法）。详见下文</td>
			<td>function</td>
			<td>-</td>
		</tr>
	</tbody>
</table>

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
