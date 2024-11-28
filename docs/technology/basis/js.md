# JavaScript

JavaScript（简称“JS”）是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。

## 如何动态创建key

数据实例

```json
[
    {
        "propKey": "phone",
        "propName": "手机号",
        "propType": "text",
    }
]
```

```js
fieldOptions.value.map(item => {
    return {
        [item.propKey]: model.value[item.propKey]
    };
});
```

**解释：**
1. 使用方括号 [item.propKey] 可以动态地将 item.propKey 的值作为对象的键名。
2. 然后用 model.value[item.propKey] 作为键值，返回一个新的对象。

## 对象结构排除特定字段

如果你希望在构建 item 对象时，从 ele 中排除一些特定字段，可以使用解构赋值和对象扩展运算符来实现这一点。

下面是一个示例，假设你希望排除 ele 中的某些字段（例如 excludeField1 和 excludeField2）：

```js
const { excludeField1, excludeField2, ...rest } = ele;
const item = { ...rest, id: 123 };
```
### 解释

1. 首先使用解构赋值从 ele 对象中提取你想排除的字段 (excludeField1 和 excludeField2)。
2. 剩余的字段保存在 rest 对象中。
3. 然后使用 ...rest 来创建 item 对象，并同时添加或覆盖其他字段（例如 id: 123）。

### 示例代码

```js
const ele = {
  name: 'Example',
  value: 42,
  excludeField1: 'Exclude me 1',
  excludeField2: 'Exclude me 2',
  anotherField: 'Keep me'
};

// 排除 excludeField1 和 excludeField2
const { excludeField1, excludeField2, ...rest } = ele;
const item = { ...rest, id: 123 };

console.log(item);
// 输出：{ name: 'Example', value: 42, anotherField: 'Keep me', id: 123 }
```


## H5 Copy 功能兼容多机型

```javascript
copyText(text) {
    // 数字没有 .length 不能执行selectText 需要转化成字符串
    const textString = text.toString();
    let input = document.querySelector('#copy-input');
    if (!input) {
        input = document.createElement('input');
        input.id = "copy-input";
        input.readOnly = "readOnly";        // 防止ios聚焦触发键盘事件
        input.style.position = "absolute";
        input.style.left = "-1000px";
        input.style.zIndex = "-1000";
        document.body.appendChild(input)
    }

    input.value = textString;
    // ios必须先选中文字且不支持 input.select();
    selectText(input, 0, textString.length);
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        this.toast = true;
        if (this.toast) {
            setTimeout(() => {
                this.toast = false
            }, 1000);
        }
    } else {
        console.log('不兼容');
    }
    input.blur();
    // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
    // 选择文本。createTextRange(setSelectionRange)是input方法
    function selectText(textbox, startIndex, stopIndex) {
        if (textbox.createTextRange) {//ie
            const range = textbox.createTextRange();
            range.collapse(true);
            range.moveStart('character', startIndex);//起始光标
            range.moveEnd('character', stopIndex - startIndex);//结束光标
            range.select();//不兼容苹果
        } else {//firefox/chrome
            textbox.setSelectionRange(startIndex, stopIndex);
            textbox.focus();
        }
    }
}
```

## H5 场景下载图片

```javascript
downloadCode() {
    var oQrcode = document.querySelector('#qrcode')
    var url = oQrcode.src
    var a = document.createElement('a')
    var event = new MouseEvent('click')
    // 下载图名字
    a.download = '这是下载的文件名称'
    //url
    a.href = url
    //合成函数，执行下载
    a.dispatchEvent(event)
}
```

## jQuery

[官方入口](https://jquery.com/)

jQuery 是一个轻量级的 JavaScript 库，它简化了 HTML 文档的获取和操作，提供了事件处理、动画效果、Ajax 请求等功能。

## 动态将 CSS 变量设置为内联样式

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Swiper Theme Color Example</title>
</head>
<body>
    <div id="mySwiper" class="swiper-container">
        <!-- Swiper content goes here -->
    </div>

    <script>
        // 选择目标元素
        var swiperContainer = document.getElementById('mySwiper');

        // 动态添加 CSS 变量
        swiperContainer.style.setProperty('--swiper-theme-color', '#ff0000'); // 红色
    </script>
</body>
</html>
```

## iframe 通讯

``` js
// 1、监听子页面消息
window.addEventListener('LogOutStatus', function(event) { // next todo })
// 2. 子页面向父页面发送完成消息
window.parent.postMessage({ LogOutStatus: true })
```