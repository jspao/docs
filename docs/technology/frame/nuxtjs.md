# Nuxt3

[官方入口](https://nuxt.com/)

# 好用的解决方案

- [nuxt3-awesome-starter](https://github.com/viandwi24/nuxt3-awesome-starter)


## ECharts 5.x 运用

- `"echarts": "^5.5.1"`
- `"nuxt": "^3.8.0"`
- 中国地图数据快速下载[链接地址](./assets/nuxtjs/mapJson.json)

1. 创建插件

目录：plugins

```ts
import * as echarts from "echarts";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      eChart: echarts,
    },
  };
});
```

2. 运用

::: code-group

```vue [Template]
<template>
  <div class="f-s-c">
    <div ref="chinaMap" style="width: 100%; height: 600px" />
  </div>
</template>
```

```vue [JavaScript]
<script setup>
// 中国地图数据
import china from "./mapJson.json";
const { $eChart } = useNuxtApp();

const chinaMap = ref<HTMLElement>()

onMounted(() => {
  $eChart.registerMap('CHINA', JSON.stringify(china), {})
  const myChart = $eChart.init(chinaMap.value!)
  // 指定图表的配置项和数据
  const option = {
    title: {
      text: '中国地图',
      subtext: '人才基地可视化分布图',
      left: 'right',
    },
    series: [
      {
        name: '中国地图',
        type: 'map',
        data: [],
        map: 'CHINA',
      },
    ],
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
})
</script>
```

:::
