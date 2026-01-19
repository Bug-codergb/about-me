---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Guobin的知识库"
  text: "记录知识"
  tagline: 我的其它项目
  actions:
    - theme: brand
      text: 快速开始
      link: /markdown-examples
    - theme: alt
      text: Github
      link: https://github.com/Bug-codergb

features:
  - title: Vue源码学习
    icon: 🛠️
    link: https://github.com/Bug-codergb/gb-vue.git
    details: 记录vue3.3源码的学习过程
  - title: Vue & React 管理系统
    icon: 🎖️
    link: https://github.com/Bug-codergb/gb-admin.git
    details: 吐核从0到1搭建管理系统,
  - title: Vite & Webpack 工程化
    icon: 🏆️
    details: 从0到1配置Webpack 和 Vite
    link: https://github.com/Bug-codergb/gb-webpack.git
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/Bug-codergb.png',
    name: 'Bug codergb',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/Bug-codergb' },
      { icon: 'juejin', link: 'https://juejin.cn/user/3140654322159326' }
    ]
  },
{
    avatar: 'https://www.github.com/Bug-codergb.png',
    name: 'Bug codergb',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/Bug-codergb' },
      { icon: 'juejin', link: 'https://juejin.cn/user/3140654322159326' }
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      关于我
    </template>
    <template #lead>
      codergb 前端开发，这是我的github
    </template>
  </VPTeamPageTitle>
<VPTeamMembers :members size="medium"/>
</VPTeamPage>

