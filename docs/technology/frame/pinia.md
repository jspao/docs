# Pinia 状态管理

Pinia 是 Vue 的官方状态管理库，是 Vuex 的继任者，提供更简洁的 API 和更好的 TypeScript 支持。

[官方文档](https://pinia.vuejs.org/zh/)

## 为什么选择 Pinia？

- 🪶 **轻量** - 核心库仅 1KB
- 🔧 **TypeScript** - 完整的类型支持
- 🎯 **简洁 API** - 无需 mutations，直接修改 state
- 🧩 **模块化** - 天然支持多个 store
- 🔌 **插件系统** - 丰富的扩展生态

## 快速开始

```bash
# 安装
npm install pinia

# Vue 3 中使用
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

## 定义 Store

### Option Store

```typescript
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '张三',
    age: 25,
    isLogin: false
  }),
  
  getters: {
    doubleAge: (state) => state.age * 2,
    fullName: (state) => `用户：${state.name}`
  },
  
  actions: {
    login(userInfo: any) {
      this.name = userInfo.name
      this.isLogin = true
    },
    logout() {
      this.$reset()
    }
  }
})
```

### Setup Store（推荐）

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const name = ref('张三')
  const age = ref(25)
  const isLogin = ref(false)
  
  // Getters
  const doubleAge = computed(() => age.value * 2)
  const fullName = computed(() => `用户：${name.value}`)
  
  // Actions
  function login(userInfo: any) {
    name.value = userInfo.name
    isLogin.value = true
  }
  
  function logout() {
    name.value = '张三'
    age.value = 25
    isLogin.value = false
  }
  
  return { name, age, isLogin, doubleAge, fullName, login, logout }
})
```

## 在组件中使用

```vue
<script setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

// 使用 storeToRefs 保持响应性
const { name, doubleAge } = storeToRefs(userStore)

// 方法可直接解构
const { login, logout } = userStore
</script>

<template>
  <div>
    <p>用户名：{{ name }}</p>
    <p>双倍年龄：{{ doubleAge }}</p>
    <button @click="login({ name: '李四' })">登录</button>
    <button @click="logout">退出</button>
  </div>
</template>
```

## 持久化存储

使用插件实现状态持久化：

```bash
npm install pinia-plugin-persistedstate
```

```typescript
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

```typescript
export const useUserStore = defineStore('user', {
  state: () => ({ ... }),
  persist: true // 开启持久化
})
```