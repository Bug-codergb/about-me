import { defineConfig } from 'vitepress'
import { nav,sidebar } from "./dict.mjs"
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
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
    sidebar:sidebar,
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
  vite: {
    plugins: [
      AutoImport({ // 自动导入 Vue 相关函数（如 ref, reactive）
        resolvers: [ElementPlusResolver()], // 自动导入 Element Plus 的 API（如 ElMessage）
      }),
      Components({
        resolvers: [ElementPlusResolver()], // 自动导入 Element Plus 组件
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "element-plus/theme-chalk/src/index.scss" as *;`,
        },
      },
    },
  },
})
