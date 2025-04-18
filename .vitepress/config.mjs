  import { defineConfig } from 'vitepress'
import { nav,sidebar } from "./dict.mjs"

export default defineConfig({
  lang: 'zh-CN',
  base:"/about-me",
  title: "codergb的知识库",
  description: "记录学习历程",
  head:[
    ['link', { rel: 'icon', href: '/about-me/favicon.ico' }], // 默认路径
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      ...nav
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Bug-codergb' }
    ],
    outline: {
      label: '本页目录'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 其他中文文本配置
    lastUpdatedText: '最后更新',
    darkModeSwitchLabel: '深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部'
  },
})
