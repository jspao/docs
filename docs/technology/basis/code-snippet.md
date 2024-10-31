# 综合代码片段

日常建站过程中的综合代码片段，主要还是帮助快速完善建站业务吧

## Lazyload 图片懒加载

::: code-group

```html [HTML]
<script src="img.lazyload.js"></script>

<script>
  // 图片懒加载配置
  lazyLoadImage({
    errorImage: "error.jpg",
    lazyAttr: "lazy",
    toBottom: 100,
    callback() {
      console.log("全部加载完成");
    },
  });
  // 页面加载完成后需要滚动一下，否则图片不会加载
  window.onload = function () {
    document.documentElement.scrollTop = 5;
  };
</script>

<img class="d-block" lazy="/static/upload/v/s/2.jpg" src="loading.gif" alt="Iran Customer Visiting" />
```

```js [JavaScript]
/**
 * 图片懒加载（传统做法）
 * @param {object} params 传参对象
 * @param {number?} params.toBottom 距离底部像素加载开始加载（可选）
 * @param {string?} params.errorImage 加载失败时显示的图片路径（可选）
 * @param {string?} params.lazyAttr 自定义加载的属性（可选）
 * @param {number?} params.interval 函数节流间隔`毫秒`为单位（可选）
 * @param {() => void} params.callback 全部加载完回调（可选）
 */
function lazyLoadImage(params) {
  const doc = document;
  /** 懒加载属性类型 */
  const attr = params.lazyAttr || "lazy";
  /** 函数节流间隔 */
  const space = params.interval || 100;
  /** 距离底部距离 */
  const offset = params.toBottom || 0;
  /** 上一次代码执行时间（节流用） */
  let before = 0;
  /**
   * 加载图片
   * @param {HTMLImageElement} el 图片节点
   */
  function loadImage(el) {
    /** 缓存当前 src 加载失败时候用 */
    const cache = el.src;
    el.src = el.getAttribute(attr);
    el.removeAttribute(attr);
    // 图片加载失败
    el.onerror = function () {
      el.src = params.errorImage || cache;
    };
  }
  /** 判断监听图片加载 */
  function judgeImages() {
    const now = Date.now();
    if (now - before < space) return;
    before = now;
    const images = doc.querySelectorAll(`[${attr}]`);
    const viewHeight = window.innerHeight || doc.documentElement.clientHeight;
    if (images.length) {
      for (let i = 0; i < images.length; i++) {
        const imageTop = images[i].getBoundingClientRect().top;
        if (imageTop <= viewHeight - Math.floor(offset)) {
          loadImage(images[i]);
        }
      }
    } else {
      window.removeEventListener("scroll", judgeImages);
      typeof params.callback === "function" && params.callback();
    }
  }
  judgeImages();
  window.addEventListener("scroll", judgeImages);
}

// https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver

/**
 * 懒加载（完美版）可加载`<img>`、`<video>`、`<audio>`等一些引用资源路径的标签
 * @param {object} params 传参对象
 * @param {string?} params.lazyAttr 自定义加载的属性（可选）
 * @param {"src"|"background"} params.loadType 加载的类型（默认为`src`）
 * @param {string?} params.errorPath 加载失败时显示的资源路径，仅在`loadType`设置为`src`中可用（可选）
 */
function lazyLoad(params) {
  const attr = params.lazyAttr || "lazy";
  const type = params.loadType || "src";

  /** 更新整个文档的懒加载节点 */
  function update() {
    const els = document.querySelectorAll(`[${attr}]`);
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      observer.observe(el);
    }
  }

  /**
   * 加载图片
   * @param {HTMLImageElement} el 图片节点
   */
  function loadImage(el) {
    const cache = el.src; // 缓存当前`src`加载失败时候用
    el.src = el.getAttribute(attr);
    el.onerror = function () {
      el.src = params.errorPath || cache;
    };
  }

  /**
   * 加载单个节点
   * @param {HTMLElement} el
   */
  function loadElement(el) {
    switch (type) {
      case "src":
        loadImage(el);
        break;
      case "background":
        el.style.backgroundImage = `url(${el.getAttribute(attr)})`;
        break;
    }
    el.removeAttribute(attr);
    observer.unobserve(el);
  }

  /**
   * 监听器
   * [MDN说明](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)
   */
  const observer = new IntersectionObserver(function (entries) {
    for (let i = 0; i < entries.length; i++) {
      const item = entries[i];
      if (item.isIntersecting) {
        loadElement(item.target);
      }
    }
  });

  update();

  return {
    observer,
    update,
  };
}
```

:::

## Google CMP

::: code-group

```html [HTML]
<div class="globa-cookie" id="globa-cookie">
  <div class="info">
    <div class="title">Cookies</div>
    <div class="desc">This site uses cookies from Google to deliver and enhance the quality of its services to analyze traffic.</div>
  </div>
  <div class="yes-no">
    <button class="yes" id="_google_cmp_yes">Accept</button>
    <button class="no" id="_google_cmp_no">Refuse</button>
  </div>
</div>
```

```css [CSS]
.globa-cookie {
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  background-color: rgba(128, 133, 139, 0.9);
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  align-items: center;
  display: none;
  z-index: 10000000;
}

.globa-cookie .info {
  color: #ffffff;
  font-size: 14px;
  flex: 1;
}

.globa-cookie .info .title {
  font-weight: bold;
  font-size: 16px;
  line-height: 32px;
}

.globa-cookie .yes-no {
  display: flex;
}

.globa-cookie .yes-no button {
  width: 108px;
  height: 40px;
  margin-right: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 10;
}

.globa-cookie .yes-no button::after {
  content: " ";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: -100%;
  top: 0;
  background: #ffffff;
  transition: all 0.3s;
  z-index: -1;
}

.globa-cookie .yes-no button:hover::after {
  left: 0;
}

.globa-cookie .yes-no button:hover {
  color: #1e5096;
  border: 1px solid #ffffff;
}

.globa-cookie .yes-no .yes {
  background-color: #1e5096;
  font-size: 14px;
  color: #ffffff;
  border: 1px solid #1e5096;
}

.globa-cookie .yes-no .no {
  background-color: none;
  background: none;
  border: 1px solid #ffffff;
  font-size: 14px;
  color: #ffffff;
}

@media screen and (max-width: 768px) {
  .globa-cookie {
    flex-flow: column;
    z-index: 1000000;
  }

  .globa-cookie .yes-no {
    margin-top: 20px;
    width: 100%;
    justify-content: center;
  }
}
```

```js [JavaScript]
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

gtag("consent", "default", {
  ad_user_data: "denied",
  ad_personalization: "denied",
  ad_storage: "denied",
  analytics_storage: "denied",
  wait_for_update: 500,
  region: ["ES", "RUS"],
});

gtag("set", "url_passthrough", true);
gtag("set", "ads_data_redaction", true);

dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

document.addEventListener("DOMContentLoaded", function () {
  var consentBanner = document.getElementById("globa-cookie");
  var grantButton = document.getElementById("_google_cmp_yes");
  var closeButton = document.getElementById("_google_cmp_no");

  var consentGranted = localStorage.getItem("consentGranted");
  if (!consentGranted) {
    consentBanner.style.display = "flex";
  }

  if (consentGranted === "true") {
    executeConsentOperations(1);
  }

  if (consentGranted === "false") {
    executeConsentOperations(0);
  }

  grantButton.addEventListener("click", function () {
    localStorage.setItem("consentGranted", "true");
    executeConsentOperations(1);
  });

  closeButton.addEventListener("click", function () {
    localStorage.setItem("consentGranted", "false");
    executeConsentOperations(0);
  });

  function executeConsentOperations(type) {
    function gtag() {
      dataLayer.push(arguments);
    }

    if (type == 1) {
      gtag("consent", "update", {
        ad_user_data: "granted",
        ad_personalization: "granted",
        ad_storage: "granted",
        analytics_storage: "granted",
      });
    } else {
      gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }

    consentBanner.style.display = "none";
  }
});
```

:::
