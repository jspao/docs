---
layout: home

hero:
  name: "JSPAO.com"
  text: "程序员的笔记本"
  tagline: "做出伟大的工作的唯一途径是热爱自己所做的事"
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/getting-started
    - theme: alt
      text: 文档仓库
      link: https://github.com/jspao/blog
  image:
    src: /home-logo.webp
    alt: JSPao.com

features:
  - icon: 📙
    title: 学习 Learning
    details: 学习可以锻炼我们的思维能力，如逻辑思维、创造性思维和批判性思维，从而帮助我们更好地解决问题、做出决策。
  - icon: 💰
    title: 赚钱 Make Money
    details: 赚钱能满足购买食物、衣物、医疗保健等基本的物质需求，提供生活必需品，保证个人和家庭的基本生活。
  - icon: 🏃🏻‍♀️
    title: 锻炼 Exercise
    details: 运动可以缓解心理压力，消除紧张情绪，改善焦虑和抑郁状态。它还能刺激快乐激素内啡肽的产生，有助于心理健康。
---

```js
console.log("Hello, World!");
```

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #3476fd 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #38c2ff38 50%, #38c2ff38 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
