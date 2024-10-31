export default {
  lang: "zh",
  title: "前端笔记",
  description: "项目，经验，笔记，代码片段",
  base: "/",
  markdown: {
    image: {
      lazyLoading: true,
    },
  },
  sitemap: "https://jspao.com",
  head: [["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }]],
  themeConfig: {
    logo: "/logo.svg",
    search: {
      provider: "local",
    },
    lastUpdated: {
      text: "更新时间",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    outline: {
      level: "deep",
      label: "当前页目录",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    editLink: {
      pattern: "https://github.com/jspao/blog/tree/main/docs:path",
      text: "错误修正及完善",
    },
    footer: {
      message: "山与海都很美，努力走出去",
      copyright: "© 2024 jspao.com",
    },
    nav: [
      { text: "技术栈", link: "/technology/frame/vue", activeMatch: "/technology/" },
      { text: "工具使用", link: "/tools/git", activeMatch: "/tools/" },
      {
        text: "常用第三方入口",
        items: [
          { text: "微信公众平台", link: "https://mp.weixin.qq.com/" },
          {text: "微信公众平台(test)", link:'https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login'},
          { text: "JSON格式化", link: "https://www.sojson.com/" },
          { text: "在线工具", link: "https://tool.lu/" },
          { text: "Vue3官网", link: "https://cn.vuejs.org/api/" },
          { text: "VueUse官网", link: "https://vueuse.org/guide/" },
          { text: "NaiveUI官网", link: "https://www.naiveui.com/zh-CN/os-theme/components/button" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/jspao/blog" }],
    sidebar: {
      "/guide/": {
        base: "/guide/",
        items: [
          {
            text: "使用指南",
            collapsed: false,
            items: [
              { text: "快速开始", link: "getting-started" },
              { text: "如何优雅的编写内容?", link: "markdown" },
              { text: "搭建Vitepress文档", link: "vitepress" },
            ],
          },
        ],
      },
      "/technology/": {
        base: "/technology/",
        items: [
          {
            text: "常用技术栈",
            collapsed: false,
            items: [
              { text: "Vue", link: "frame/vue" },
              { text: "Pinia", link: "frame/pinia" },
              { text: "NaiveUI", link: "frame/naiveui" },
              { text: "NestJS", link: "frame/nestjs" },
              { text: "Nuxt", link: "frame/nuxtjs" },
              { text: "Electron", link: "frame/electronjs" },
              { text: "UnoCSS", link: "frame/unocss" },
              { text: "Sass", link: "frame/sass" },
            ],
          },
          {
            text: "基础技术栈",
            collapsed: false,
            items: [
              { text: "JavaScript", link: "basis/js" },
              { text: "CSS", link: "basis/css" },
              { text: "HTML", link: "basis/html" },
              { text: "综合代码片段", link: "basis/code-snippet" },
            ],
          },
          {
            text: "快速建站技术",
            collapsed: false,
            items: [
              { text: "PbootCMS", link: "cms/pbootcms" },
              { text: "Typecho", link: "cms/typecho" },
            ],
          },
        ],
      },
      "/tools/": {
        base: "/tools/",
        items: [
          {
            text: "工具使用",
            collapsed: false,
            items: [
              { text: "包管理工具", link: "package" },
              { text: "Git", link: "git" },
              { text: "pm2", link: "pm2" },
              { text: "nvm", link: "nvm" },
              { text: "VSCode", link: "vscode" },
              { text: "Linux", link: "linux" },
              { text: "Docker", link: "docker" },
              { text: "日常笔记", link: "common" },
            ],
          },
        ],
      },
    },
  },
};
