# UniApp 跨平台开发指南

UniApp 是一个使用 Vue.js 开发跨平台应用的前端框架，支持编译到 iOS、Android、H5、小程序等多个平台。

## 推荐资源

| 资源 | 说明 | 链接 |
|------|------|------|
| **uView UI** | 基于 Vue 3 的移动端组件库 | [官网](https://uiadmin.net/uview-plus/) |
| **z-paging** | 高性能分页组件，支持下拉刷新、上拉加载 | [文档](https://z-paging.zxlee.cn/start/intro.html) |
| **项目模板** | Vue 3 + TypeScript 开发模板 | [GitHub](https://github.com/jspao/uniapp-vue3-template.git) |

::: warning 模板使用注意
使用 `uniapp-vue3-template` 模板生成 App 时，需要移除 `package.json` 中的 `simple-git-hooks` 和 `czg` 依赖及相关配置，避免构建问题。
:::

## 开发技巧

### 导航栏配置

| 需求 | 解决方案 |
|------|----------|
| 隐藏返回图标 | `left-icon=""` 设置为空 |
| 自定义导航栏背景 | 设置为 `transparent`，否则主题色无法覆盖状态栏 |

### 避免重复请求

使用 `z-paging` 时，在 `onShow` 中避免重复加载数据：

```ts
const isFirstLoad = ref(true);
const pagingRef = ref<ZPagingRef>();

onShow(async () => {
  if (!isFirstLoad.value) {
    // 非首次进入，刷新数据
    pagingRef.value?.reload();
  } else {
    // 首次进入，标记已加载
    isFirstLoad.value = false;
  }
});
```

## 主题色开发模式

实现动态主题切换（浅色/深色/跟随系统），需要以下文件配合：

| 文件 | 作用 |
|------|------|
| `src/store/modules/theme/index.ts` | 主题状态管理 |
| `src/uni.scss` | 主题 CSS 变量定义 |
| `src/pages/tab/home/index.vue` | 页面中使用主题 |

::: tip 注意事项
使用自定义导航栏时，需将背景设为 `transparent`，否则主题色无法覆盖状态栏。
:::

```vue
<template>
  <u-navbar
    :title="$t('user.nav')"
    bg-color="transparent"
    :placeholder="true"
    left-icon=""
    :title-style="{ fontWeight: 500, fontSize: '34rpx' }"
  />
</template>
```

::: code-group

```vue [src/pages/tab/home/index.vue]
<template>
  <z-paging class="custom-page" :style="theme"> </z-paging>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store";

const useTheme = useThemeStore();

const theme = computed(() => {
  return useTheme.getTheme;
});
</script>

<style scoped lang="scss">
// 整个页面的主题色更替
.custom-page {
  background-color: $theme-bg !important;
}
</style>
```

```ts [src/store/modules/theme/index.ts]
import { defineStore } from "pinia";

const useThemeStore = defineStore("theme", {
  state: (): any => {
    return {
      currentTheme: "light",
      themeStyle: {
        // 浅色
        light: {
          "--theme-color": "#080808",
        },
        // 深色
        dark: {
          "--theme-color": "#f2f7f7",
        },
      },
    };
  },
  getters: {
    // 获取当前选中的主题
    getCurrentTheme(): any {
      return this.currentTheme;
    },
    // 获取主题
    getTheme(): any {
      const obj = this.themeStyle[this.currentTheme];
      let themeStyleStr = "";
      for (const key in obj) {
        themeStyleStr += `${key}:${obj[key]};`;
      }
      return themeStyleStr;
    },
  },
  actions: {
    setCurrentTheme(theme: any) {
      this.currentTheme = theme;
    },
    // 初始化主题
    initTheme() {
      const theme = uni.getStorageSync("theme") || "light";

      if (theme === "system") {
        // 监听系统主题变化
        uni.onThemeChange((res: any) => {
          console.log("🚀 ~ uni.onThemeChange ~ res:", res);
          this.setTheme(res.theme);
        });
      } else {
        this.setTheme(theme);
      }
    },
    setTheme(theme: any) {
      // 持久化存储
      uni.setStorageSync("theme", theme);

      this.currentTheme = theme;

      // 如果选择了系统主题，则根据系统主题设置
      if (theme === "system") {
        // 检测系统主题
        const systemTheme = uni.getSystemInfoSync().osTheme;
        this.currentTheme = systemTheme === "dark" ? "dark" : "light";
      }

      // #ifdef APP-PLUS
      // App端处理方案
      plus.navigator.setStatusBarStyle(this.currentTheme); // dark/light
      plus.navigator.setStatusBarBackground(
        this.currentTheme === "dark" ? "#000000" : "#ffffff"
      );
      // #endif

      // 设置状态栏和TabBar样式
      if (this.currentTheme === "dark") {
        uni.setNavigationBarColor({
          frontColor: "#ffffff",
          backgroundColor: "#000000",
        });
        if (uni.setTabBarStyle) {
          uni.setTabBarStyle({
            backgroundColor: "#1a1a1a",
            color: "#999999",
            selectedColor: "#ffffff",
            borderStyle: "black",
          });
        }
      } else {
        uni.setNavigationBarColor({
          frontColor: "#000000",
          backgroundColor: "#ffffff",
        });
        if (uni.setTabBarStyle) {
          uni.setTabBarStyle({
            backgroundColor: "#ffffff",
            color: "#999999",
            selectedColor: "#007aff",
            borderStyle: "white",
          });
        }
      }
    },
  },
});
export default useThemeStore;
```

```scss [src/uni.scss]
/**  主题文字颜色  */
$theme-color: var(--theme-color);
```

:::

## 国际化（i18n）开发模式

基于 vue-i18n 实现多语言支持，主要文件结构如下：

```
src/
├── locales/
│   ├── index.ts       # i18n 配置入口
│   └── langs/         # 语言文件目录
│       ├── en.ts
│       └── zh-Hans.ts
├── plugins/
│   └── index.ts       # 插件封装
├── main.ts            # 注册插件
└── pages/
    ├── tab/
    │   ├── home/      # 应用语言
    │   └── user/      # 切换语言
    └── components/
        └── lang-picker/  # 语言选择组件
```

### 核心依赖

- [vue-i18n](https://www.npmjs.com/package/vue-i18n) - Vue 官方国际化插件

::: code-group

```ts [src/locales/index.ts]
import type { App } from "vue";
import { createI18n } from "vue-i18n";
import en from "./langs/en";
import zhHans from "./langs/zh-Hans";

// 设置默认语言
const savedLocale = uni.getStorageSync("language") || "en";

const i18n = createI18n({
  legacy: false, // 必须设置false才能使用Composition API
  globalInjection: true, // 为每个组件注入$为前缀的全局属性和函数
  locale: savedLocale,
  messages: {
    en,
    "zh-Hans": zhHans,
    vietnamese: vietnamese,
  },
});

function setupI18n(app: App) {
  app.use(i18n);
}

export { i18n };
export default setupI18n;
```

```ts [src/plugins/index.ts]
// 封装插件
import type { App } from "vue";
import setupI18n from "@/locales";

export default {
  install(app: App) {
    // 状态管理
    setupStore(app);
    // 国际化
    setupI18n(app);
  },
};
```

```ts [src/main.ts]
// 注册插件 setupPlugins
import { createSSRApp } from "vue";
import App from "@/App.vue";
import setupPlugins from "@/plugins";

export function createApp() {
  const app = createSSRApp(App);
  app.use(setupPlugins);

  return {
    app,
  };
}
```

```ts [src/locales/langs]
// 语言文件对应 src/locales/index.ts 中的引入

// src/locales/langs/zh-Hans.ts
export default {
  locale: {
    auto: "System",
    en: "English",
    "zh-Hans": "中文",
    vietnamese: "Tiếng Việt",
  },
};

// src/locales/langs/en.ts
export default {
  locale: {
    auto: "System",
    en: "English",
    "zh-Hans": "中文",
    vietnamese: "Tiếng Việt",
  },
};

// src/locales/langs/vietnamese.ts
export default {
  locale: {
    auto: "System",
    en: "English",
    "zh-Hans": "中文",
    vietnamese: "Tiếng Việt",
  },
};
```

```vue [src/pages/tab/home/index.vue]
<!-- template 中的使用模式 -->
<template>
  <z-paging :loading-more-default-text="$t('zpaging.more_default')">
    <view>
      {{ $t("home.latest_news") }}
    </view>
  </z-paging>
</template>

<script setup lang="ts">
// ts 中的使用方式
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import { useLoading } from "@/hooks";

async function onSubmitAutoBuy(payload: any) {
  useLoading().showLoading(t("user_convert.loading"));
}
</script>
```

:::

### 语言切换业务处理

如果切换了语言需要后端同步的话，则前往 `src/utils/request/interceptors.ts` 中的请求头配置中添加对应配置即可

::: code-group

```vue [src/pages/tab/user/index.vue]
<template>
  <u-cell
    :title="$t('user.language')"
    is-link
    class="custom-cell"
    @click="onPicker"
  >
    <template #icon>
      <image
        class="me-16rpx h-36rpx w-36rpx"
        src="../../../static/images/user/local.webp"
      />
    </template>
    <template #value>
      {{ langText }}
    </template>
  </u-cell>
</template>
```

```vue[src/components/lang-picker/index.vue]
<template>
  <u-picker
    :show="status" :confirm-text="$t('common.confirm')" :cancel-text="$t('common.cancel')" :columns="langOptions" :default-index="langIndex" key-name="text" @cancel="cancel"
    @confirm="handleLangConfirm" @change="handleLangChange"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['ok']);

const { locale, t } = useI18n();

const status = ref(false);

const langOptions: any = computed(() => {
  return [[
    { text: t('locale.en'), value: 'en' },
    { text: t('locale.zh-Hans'), value: 'zh-Hans' },
    { text: t('locale.vietnamese'), value: 'vietnamese' },
  ]];
});

const langIndex = computed(() => {
  return [langOptions.value[0].findIndex((item: any) => {
    return item.value === locale.value;
  })];
});

const localeLabel = ref();
const localeValue = ref();

function handleLangChange(event: any) {
  const lang = langOptions.value[0][event.index].value;
  const langLabel = langOptions.value[0][event.index].text;
  localeValue.value = lang;
  localeLabel.value = langLabel;
}

function handleLangConfirm() {
  emit('ok', { label: localeLabel.value, value: localeValue.value });
  uni.setLocale(localeValue.value);
  uni.setStorageSync('language', localeValue.value);
  status.value = false;
}

function cancel() {
  status.value = false;
}

function open() {
  status.value = true;
}

defineExpose({
  open,
});
</script>
```

```ts [src/utils/request/interceptors.ts]
function requestInterceptors(http: HttpRequestAbstract) {
  /**
   * 请求拦截
   * @param {object} http
   */
  http.interceptors.request.use(
    (config: HttpRequestConfig) => {
      // 设置语言
      config.header["Accept-Language"] =
        lang[uni.getStorageSync("language") || "en"];
      // ... 省略其他配置
    },
    (
      config: any // 可使用async await 做异步操作
    ) => Promise.reject(config)
  );
}
```

:::

### tabbar 语言切换

1. 文件路径 `src/hooks/use-tabbar/index.ts`
2. 将 `useTabbar` 在需要的页面上的`onShow`中引入即可

```ts
const localeInfo: any = {
  en: {
    home: "Home",
    card_pack: "NFT",
    flash_sale: "Rush",
    team: "Team",
    mine: "Me",
  },
  "zh-Hans": {
    home: "首页",
    card_pack: "NFT",
    flash_sale: "抢购",
    team: "团队",
    mine: "我的",
  },
  vietnamese: {
    home: "Trang chủ",
    card_pack: "NFT",
    flash_sale: "Mua gấp",
    team: "Đội ngũ",
    mine: "Tôi",
  },
};

export default function useTabbar() {
  const locale = uni.getStorageSync("language") || uni.getLocale();
  const tabBarLocale = localeInfo[locale];

  if (!tabBarLocale) {
    console.warn(`Locale ${locale} not found, using 'en' as fallback`);
    return;
  }

  setTimeout(() => {
    const tabBarItems = [
      { index: 0, text: tabBarLocale.home },
      { index: 1, text: tabBarLocale.card_pack },
      { index: 2, text: tabBarLocale.flash_sale },
      { index: 3, text: tabBarLocale.team },
      { index: 4, text: tabBarLocale.mine },
    ];

    tabBarItems.forEach((item) => {
      uni.setTabBarItem(item);
    });
  }, 100);
}
```

## z-paging 分页组件使用

[z-paging](https://z-paging.zxlee.cn/start/intro.html) 是 UniApp 生态中功能最完善的分页组件，特性包括：

- **全平台兼容**：支持 H5、小程序、App
- **下拉刷新**：自定义刷新动画和文字
- **上拉加载**：自动加载更多数据
- **虚拟列表**：大数据量下流畅滚动
- **空数据管理**：自动显示空数据占位图
- **国际化**：支持多语言切换

### 常用模式速查

### 上下结构 + 左右插槽 + 自定义 loading 文字

::: code-group

```vue [页面代码]
<template>
  <z-paging
    ref="pagingRef"
    v-model="dataList"
    class="custom-page"
    :style="theme"
    :auto-show-system-loading="true"
    :loading-more-default-text="$t('zpaging.more_default')"
    :loading-more-loading-text="$t('zpaging.more_loading')"
    :loading-more-no-more-text="$t('zpaging.more_no')"
    @query="queryList"
  >
    <template #top>
      <u-navbar :placeholder="true" bg-color="transparent">
        <template #left>
          <!-- 状态栏左侧插槽 -->
        </template>
        <template #right>
          <!-- 状态栏右侧插槽 -->
        </template>
      </u-navbar>
    </template>

    <!-- 内容主体部分 -->
  </z-paging>
</template>
```

```ts [ts代码]
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import useZPaging from 'z-paging/components/z-paging/js/hooks/useZPaging';
import { HomeApi } from '@/api';
import { useLoading } from '@/hooks';
import { useThemeStore } from '@/store';

const { t } = useI18n();

const pagingRef = ref<ZPagingRef>();
const dataList = ref<any[]>([]);
const isFirstLoad: any = ref(true);

const useTheme = useThemeStore();

const theme = computed(() => {
  return useTheme.getTheme;
});

useZPaging(pagingRef);

async function queryList(pageNo: number) {
  try {
    const { data } = await HomeApi.notice({ page: pageNo });
    pagingRef.value?.complete(data.data);
  }
  catch (err) {
    console.log(err);
    pagingRef.value?.complete(false);
  }
}

onShow(async () => {
  if (!isFirstLoad.value) {
    pagingRef.value?.reload();
  }
  else {
    isFirstLoad.value = false;
  }
});
</script>
```

:::

### 只下拉刷新，上下结构 + 左右插槽 + 自定义 loading

::: code-group

```vue [页面代码]
<z-paging
  ref="pagingRef"
  class="custom-page"
  :style="theme"
  refresher-only
  :auto-show-system-loading="true"
  :loading-more-default-text="$t('zpaging.more_default')"
  :loading-more-loading-text="$t('zpaging.more_loading')"
  :loading-more-no-more-text="$t('zpaging.more_no')"
  @on-refresh="onRefresh"
>
    <template #top>
      <u-navbar
        :title="$t('user.nav')" bg-color="transparent" :placeholder="true" left-icon=""
        :title-style="{ fontWeight: 500, fontSize: '34rpx' }"
      />
    </template>

    <!-- 主体部分 -->
  </z-paging>
```

```ts [ts代码]
<script lang="ts" setup>
import { UserApi } from '@/api';
import { useUserStore } from '@/store';

const useUser = useUserStore();

const pagingRef = ref<ZPagingRef>();

function onRefresh() {
  try {
    useUser.info();
    pagingRef.value?.complete();
  }
  catch (err) {
    console.log(err);
    pagingRef.value?.complete(false);
  }
}

onShow(() => {
  useUser.info();
});
</script>

```

:::

### 不分页获取数据

::: code-group

```vue [页面代码]
<template>
  <z-paging
    ref="pagingRef"
    v-model="dataList"
    class="custom-page"
    :style="theme"
    :loading-more-enabled="false"
    :auto-show-system-loading="true"
    :loading-more-default-text="$t('zpaging.more_default')"
    :loading-more-loading-text="$t('zpaging.more_loading')"
    :loading-more-no-more-text="$t('zpaging.more_no')"
    @query="queryList"
  >
    <template #top>
      <u-navbar
        :title="$t('card.nav')"
        bg-color="transparent"
        left-icon=""
        :placeholder="true"
        :title-style="{ fontWeight: 500, fontSize: '34rpx' }"
      >
        <template #right>
          <text
            class="text-28rpx c-#A832F8"
            @click="onPath('/pages/cards/history/index')"
          >
            {{ $t("new_card.t1") }}
          </text>
        </template>
      </u-navbar>
    </template>
    <!-- 主体代码 -->
  </z-paging>
</template>
```

```ts [ts代码]
<script setup lang="ts">
import { CardsApi } from '@/api';
import { useThemeStore } from '@/store';

const pagingRef = ref<ZPagingRef>();
const dataList = ref<any[]>([]);
const isFirstLoad: any = ref(true);

const useTheme = useThemeStore();

const theme = computed(() => {
  return useTheme.getTheme;
});

async function queryList() {
  try {
    const { data } = await CardsApi.cardsList();
    // 主要设置
    pagingRef.value?.complete(data, true);
  }
  catch (err) {
    console.log(err);
    pagingRef.value?.complete(false);
  }
}

onShow(() => {
  if (!isFirstLoad.value) {
    pagingRef.value?.reload();
  }
  else {
    isFirstLoad.value = false;
  }
});
</script>
```

:::
