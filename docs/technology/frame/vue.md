# Vue 2 & Vue 3 实战指南

Vue 是一款渐进式 JavaScript 框架，用于构建用户界面。它基于标准 HTML、CSS 和 JavaScript，提供声明式、组件化的编程模型，让开发更加高效。

> **官方文档**：[Vue 3 中文文档](https://cn.vuejs.org/guide/introduction)

## 版本对比

| 特性 | Vue 2 | Vue 3 |
|------|-------|-------|
| **API 风格** | Options API | Options API + Composition API |
| **响应式原理** | Object.defineProperty | Proxy |
| **TypeScript** | 支持有限 | 原生支持 |
| **性能** | 优秀 | 更优（体积更小、更快） |
| **新特性** | - | Teleport、Suspense、Fragments |

## 推荐解决方案

| 方案 | 适用场景 | 链接 |
|------|----------|------|
| Vue3 + Vant H5 模板 | 移动端 H5 开发 | [GitHub](https://github.com/easy-temps/vue3-vant-mobile) |
| warm-flow 工作流 | 工作流引擎 | [GitHub](https://github.com/jspao/warm-flow) |

- [H5解决方案 Vue3 + vant](https://github.com/easy-temps/vue3-vant-mobile)
- [warm-flow工作流解决方案](https://github.com/jspao/warm-flow)

## 实用技巧

### Vue 3 iframe 加载监听

::: code-group

```vue [Template]
<template>
  <n-spin :show="loading" description="公网地址正在加载中,请耐心等待...">
    <iframe
      ref="iframeRef"
      class="cus-iframe"
      :src="iframeUrl"
      frameborder="0"
    ></iframe>
  </n-spin>
</template>
```

```vue [JavaScript]
<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  iframe: {
    type: String,
    default: "",
  },
});

const loading = ref(false);
const iframeUrl = ref(null);
const iframeRef = ref(null);

function closeLoading() {
  loading.value = false;
}

// 如果是组件形式则需要
watch(
  () => props.iframe,
  (val) => {
    iframeUrl.value = val;
  }
);

onMounted(() => {
  loading.value = true;
  if (iframeRef.attachEvent) {
    // IE
    iframeRef.attachEvent("onload", closeLoading());
  } else {
    iframeRef.onload = closeLoading();
  }
});
</script>
```

:::

### 全局事件总线（mitt）

Vue 3 中移除了 `$on`、`$off` 等事件总线 API，推荐使用 `mitt` 作为替代方案。

`on` 方法添加事件，`off` 方法移除，`clear` 清空所有

```js
// @/utils/bus.js
import mitt from "mitt";
const emitter = mitt();
export default emitter;

// vue components
import emitter from "@/utils/bus";

// 监听指定事件
emitter.on("foo", (e) => console.log("foo", e));

// 监听所有事件
emitter.on("*", (type, e) => console.log(type, e));

// 触发事件
emitter.emit("foo", { a: "b" });

// 清除所有事件
emitter.all.clear();

// 监听函数
function onFoo() {}
emitter.on("foo", onFoo); // 监听
emitter.off("foo", onFoo); // 移除
```

### 点击外部检测（VueUse）

使用 VueUse 的 `onClickOutside` 实现点击组件外部关闭的功能，常用于下拉菜单、模态框等场景。

[VueUse onClickOutside Demo](https://vueuse.org/core/onClickOutside/#onclickoutside)

::: code-group

```vue [Template]
<template>
  <div class="f-s-c">
    <div
      v-if="hasEditing"
      ref="textContainer"
      :contenteditable="hasEditing"
      outline-none
      cursor-text
      @blur="inputBlur"
      @mousedown="handleMousedown"
      v-text="flowName"
    ></div>
    <template v-else>
      <div outline-none contenteditable="false">
        <b>{{ flowName }}</b>
      </div>
    </template>
    <div class="f-c-c ml-10">
      <n-button text @click="handleEditor">
        <template #icon>
          <div class="i-ph:pencil-simple-line-light"></div>
        </template>
      </n-button>
    </div>
  </div>
</template>
```

```vue [JavaScript]
<script setup>
// 实际运用中flowName可以通过状态获取然后通过computed计算到页面中
const flowName = ref("流程名称");
const hasEditing = ref(false);
const textContainer = ref();

// 切换到编辑状态后需要阻止冒泡
const handleMousedown = (e) => {
  if (hasEditing) {
    e.stopPropagation();
  }
};

// 点击一个Dom其他地方的逻辑操作
onClickOutside(textContainer, () => {
  hasEditing.value = false;
});

// 存储数据
const inputBlur = (e) => {
  $message.success("修改成功");
  flowName.value = e.target.textContent;
};

// 启用编辑
const handleEditor = () => {
  hasEditing.value = true;
  nextTick(() => {
    const innerContent = textContainer.value;
    if (!innerContent) return;
    // 选择与蓝色选区
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(innerContent);
    selection.removeAllRanges();
    selection.addRange(range);
  });
};
</script>
```

:::

### Vue 2 + ECharts 5.x

- `"echarts": "^5.5.0"`
- `"vue": "2.6.10"`
- 中国地图数据快速下载[链接地址](./assets/nuxtjs/mapJson.json)

::: code-group

```vue [Vue]
<template>
  <div>
    <div ref="chinaMap" style="width: 600px; height: 500px" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chinaMapChart: null,
      mapData: [],
    };
  },
  mounted() {
    this.initChinaMapChart();
  },
  methods: {
    initChinaMapChart() {
      if (!this.chinaMapChart) {
        this.chinaMapChart = this.$echarts(this.$refs.chinaMap);
      }
      this.chinaMapChart.setOption({
        geo: {
          map: "china",
          itemStyle: {
            normal: {
              areaColor: "#FFE7C4",
              borderColor: "#111",
            },
            emphasis: {
              areaColor: "#b0cdee",
            },
          },
          emphasis: {
            itemStyle: {
              areaColor: "#FF720D",
              color: "#FF720D",
            },
          },
          select: {
            itemStyle: {
              areaColor: "#FF720D",
              color: "#FF720D",
            },
          },
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            geoIndex: 0,
            name: "地域分布",
            type: "map",
            coordinateSystem: "geo",
            map: "china",
            data: this.mapData,
          },
        ],
      });
    },
  },
};
</script>
```

```js [main.js]
import * as echarts from "echarts";
import china from "./mapJson.json"; // 导入china包
echarts.registerMap("china", china);

// Vue.prototype.$echarts = echarts
Vue.prototype.$echarts = function (el) {
  return echarts.init(el, null, { renderer: "svg" });
};
```

:::

### Vue 3 + TypeScript + ECharts 5.x

鸣谢: [vue3+Ts 项目按需引入 Echarts，并封装成 hooks](https://blog.csdn.net/ganyingxie123456/article/details/136741562)

- `"echarts": "^5.5.1"`
- `"vue": "^3.5.12"`

文件目录如下

```md
- components
  - baseEcharts.vue
  - config.ts
- hooks
  - useEcharts.ts
```

::: code-group

```vue [baseEcharts.vue]
<template>
  <div
    :style="{
      width: width,
      height: height,
    }"
    ref="echartsRef"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, PropType } from "vue";
// @ 为src
import { useEcharts, EChartsCoreOption } from "@/hooks/useEchart.ts"; // 引入hooks

const props = defineProps({
  options: { type: Object as PropType<EChartsCoreOption>, required: true },
  height: { type: String, default: "100%" },
  width: { type: String, default: "100%" },
  themeColors: { type: Array as PropType<string[]>, default: () => [] },
});

const echartsRef = ref();

const { setOptions, initCharts } = useEcharts(echartsRef, props.options);

watch(
  () => props.options,
  (nVal) => {
    let targetOptions: EChartsCoreOption = {};
    if (props.themeColors && props.themeColors.length > 0) {
      targetOptions = { ...nVal };
      targetOptions.color = props.themeColors;
    } else {
      targetOptions = { ...nVal };
    }
    setOptions(targetOptions);
  }
);

onMounted(() => {
  initCharts();
});
</script>
```

```ts [config.ts]
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";

// 引入内置组件，组件后缀都为Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DatasetComponent, // 数据集组件
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  TransformComponent, // 数据转换器组件(filter, sort)
} from "echarts/components";

// 引入渲染器：echarst默认使用canvas渲染，引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";

// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";

// 引入图表类型，后缀都为Chart
import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  PictorialBarChart,
} from "echarts/charts";

// 注册必须的组件
echarts.use([
  // 内置组件
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DatasetComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  TransformComponent,
  // 渲染器
  CanvasRenderer,
  SVGRenderer,
  // 特性
  LabelLayout,
  UniversalTransition,
  // 图表
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  PictorialBarChart,
]);

export default echarts;
```

```ts [useEcharts.ts]
import {
  Ref,
  shallowRef,
  unref,
  onMounted,
  onDeactivated,
  onBeforeUnmount,
} from "vue";

import echarts from "@/components/baseEcharts/config";

export type EChartsCoreOption = echarts.EChartsCoreOption;

const useEcharts = (elRef: Ref<HTMLDivElement>, options: EChartsCoreOption) => {
  const charts = shallowRef<echarts.ECharts>();

  const setOptions = (options: EChartsCoreOption) => {
    charts.value && charts.value.setOption(options);
  };

  // 初始化
  const initCharts = (themeColor?: Array<string>) => {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }
    charts.value = echarts.init(el);
    if (themeColor) {
      options.color = themeColor;
    }
    setOptions(options);
  };

  // 重新窗口变化时，重新计算
  const resize = () => {
    charts.value && charts.value.resize();
  };

  onMounted(() => {
    window.addEventListener("resize", resize);
  });

  // 页面keepAlive时，不监听页面
  onDeactivated(() => {
    window.removeEventListener("resize", resize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resize);
  });

  return {
    initCharts,
    setOptions,
    resize,
  };
};

export { useEcharts };
```

:::

使用示例

```vue
<template>
  <BaseEcharts :options="options" height="300px" />
</template>

<script lang="ts" setup>
// @ 为src
import BaseEcharts from "@/components/baseEcharts.vue";

const options = {
  title: {
    text: "使用示例",
    subtext: "二级标题",
    subTextStyle: {
      fontSize: 16,
      fontWeight: "normal",
      left: "center",
      y: "center",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      lineStyle: {
        width: 1,
        color: "#008000",
      },
    },
  },
  grid: {
    left: "1%",
    right: "1%",
    bottom: "1%",
    top: "60px",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
    axisLabel: {
      interval: 0,
      rotate: 30,
    },
  },
  yAxis: {
    axisLabel: {
      formatter: (val: number) => {
        return val;
      },
    },
  },
  series: [
    {
      name: "收入",
      type: "bar",
      stack: "Total",
      data: [200, 301, 402, 503, 604, 705, 806],
    },
    {
      name: "支出",
      type: "line",
      stack: "Total",
      data: [100, 210, 1020, 230, 20, 250, 60],
    },
  ],
};
</script>
```

### Vue 3 + JavaScript + ECharts 5.x

- `"echarts": "^5.5.1"`
- `"vue": "^3.5.12"`

文件目录如下

```md
- components
  - BaseEcharts
    - index.vue
    - echartsConfig.js
- hooks
  - useEcharts.js
```

::: code-group

```vue [index.vue]
<script setup>
import { onMounted, ref, watch } from "vue";
import _ from "lodash-es";
import { useEcharts } from "@/hooks/useEcharts";

const props = defineProps({
  options: { type: Object, default: () => {} },
  height: { type: String, default: "100%" },
  width: { type: String, default: "100%" },
  themeColors: { type: Array, default: () => [] },
});

const echartsRef = ref();

const { setOptions, initCharts } = useEcharts(echartsRef, props.options);

watch(
  () => props.options,
  (val) => {
    let targetOptions = {};
    if (props.themeColors && props.themeColors.length > 0) {
      targetOptions = _.cloneDeep(val);
      targetOptions.color = props.themeColors;
    } else {
      targetOptions = _.cloneDeep(val);
    }
    setOptions(targetOptions);
  }
);

onMounted(() => {
  initCharts();
});
</script>

<template>
  <div ref="echartsRef" :style="{ width, height }" />
</template>
```

```ts [echartsConfig.js]
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";

// 引入内置组件，组件后缀都为Component
import {
  AriaComponent,
  CalendarComponent,
  DataZoomComponent,
  DatasetComponent,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  ParallelComponent,
  PolarComponent,
  RadarComponent,
  TimelineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
  VisualMapComponent,
} from "echarts/components";

// 引入渲染器：echarst默认使用canvas渲染，引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";

// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";

// 引入图表类型，后缀都为Chart
import {
  BarChart,
  GaugeChart,
  LineChart,
  MapChart,
  PictorialBarChart,
  PieChart,
  RadarChart,
} from "echarts/charts";

// 注册必须的组件
echarts.use([
  // 内置组件
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DatasetComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  TransformComponent,
  // 渲染器
  CanvasRenderer,
  SVGRenderer,
  // 特性
  LabelLayout,
  UniversalTransition,
  // 图表
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  PictorialBarChart,
  GaugeChart,
]);

export default echarts;
```

```ts [useEcharts.js]
import {
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  shallowRef,
  unref,
} from "vue";

import echarts from "@/components/BaseEcharts/echartsConfig";

export function useEcharts(elRef, options) {
  const charts = shallowRef();

  const setOptions = (options) => {
    charts.value && charts.value.setOption(options);
  };

  // 初始化
  const initCharts = (themeColor) => {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }
    charts.value = echarts.init(el);
    if (themeColor) {
      options.color = themeColor;
    }
    setOptions(options);
  };

  // 重新窗口变化时，重新计算
  const resize = () => {
    charts.value && charts.value.resize();
  };

  onMounted(() => {
    window.addEventListener("resize", resize);
  });

  // 页面keepAlive时，不监听页面
  onDeactivated(() => {
    window.removeEventListener("resize", resize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resize);
  });

  return {
    initCharts,
    setOptions,
    resize,
  };
}
```

:::
