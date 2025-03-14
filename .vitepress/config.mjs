import { defineConfig } from 'vitepress'
import { nav } from "./dict.mjs"
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "郭斌的文档库",
  description: "记录学习历程",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      ...nav
    ],

    sidebar: {
      '/javascript/' : [
        {
          items:[
            {text:"Object",link:"/javascript/object"},
            {text:"Math",link:"/javascript/math"},
            {text:"迭代器",link:"/javascript/iterator"},
            {text:"代理和反射",link:"/javascript/proxy"},
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Bug-codergb' }
    ]
  }
})
