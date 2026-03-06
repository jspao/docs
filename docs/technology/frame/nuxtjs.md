# Nuxt 3 实战指南

Nuxt 3 是一个基于 Vue 3 的全栈框架，提供了服务端渲染（SSR）、静态站点生成（SSG）等能力，让 Vue 开发更加高效。

> **官方文档**：[Nuxt 3 文档](https://nuxt.com/)

## 推荐解决方案

| 方案 | 说明 | 链接 |
|------|------|------|
| nuxt3-awesome-starter | 功能完善的 Nuxt 3 启动模板 | [GitHub](https://github.com/viandwi24/nuxt3-awesome-starter) |

## ECharts 5.x 集成

在 Nuxt 3 项目中集成 ECharts 5.x 实现数据可视化。

- `"echarts": "^5.5.1"`
- `"nuxt": "^3.8.0"`
- 中国地图数据快速下载[链接地址](./assets/nuxtjs/mapJson.json)

### 步骤 1：创建插件

在 `plugins` 目录下创建 ECharts 插件文件：

```ts
// plugins/echarts.client.ts
import * as echarts from "echarts";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      eChart: echarts,
    },
  };
});
```

::: tip 客户端插件
文件名中的 `.client.ts` 后缀表示该插件只在客户端运行，避免服务端渲染时报错。
:::

### 步骤 2：组件中使用

::: code-group

```vue [Template]
<template>
  <div class="map-container">
    <div ref="chinaMap" class="map-chart" />
  </div>
</template>
```

```vue [JavaScript]
<script setup>
// 中国地图数据（可从文档附件下载）
import china from "./assets/mapJson.json";

// 通过插件注入的 ECharts 实例
const { $eChart } = useNuxtApp();

const chinaMap = ref(null);

onMounted(() => {
  // 注册中国地图
  $eChart.registerMap('CHINA', china);
  
  // 初始化图表
  const myChart = $eChart.init(chinaMap.value);
  
  // 图表配置
  const option = {
    title: {
      text: '中国地图',
      subtext: '数据可视化分布图',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: '数据分布',
        type: 'map',
        map: 'CHINA',
        roam: true, // 支持缩放和平移
        emphasis: {
          label: { show: true },
          itemStyle: {
            areaColor: '#ffd700',
          },
        },
        data: [],
      },
    ],
  };

  myChart.setOption(option);
  
  // 响应式处理
  window.addEventListener('resize', () => {
    myChart.resize();
  });
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
}
.map-chart {
  width: 100%;
  height: 100%;
}
</style>
```

:::
