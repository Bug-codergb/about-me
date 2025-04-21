# Vite与Webpack关键区别
## 核心架构差异
<table>
  <tr>
    <th></th>
    <th>Webpack</th>
    <th>Vite</th>
  </tr>
  <tr>
    <td>底层引擎</td>
    <td>
      开发阶段：ESBuild + 原生 ESM<br/>
      生产阶段：Rollup
    </td>
    <td>
        自研打包引擎（js打包器）
    </td>
  </tr>
  <tr>
   <td>模块加载方式</td>
   <td>
      开发：原生 ESM（浏览器直接解析）<br/>
      生产：Rollup 打包
    </td>
    <td>
      全程打包（生成虚拟模块依赖图）
    </td>
  </tr>
</table>

- **关键区别**：
    - **开发模式：**
        - Vite：利用浏览器原生支持 ES Modules，直接按需编译文件，无需打包。→ 启动快（秒级），HMR 快（仅更新单个文件）。
        - Webpack：启动时构建完整的依赖图并打包所有文件。→ 启动慢（项目越大越慢），HMR 需要重新分析依赖。
    - **生产模式：**
        - Vite：使用 Rollup 进行打包（Rollup 以 Tree Shaking 高效著称）。
        - Webpack：自研打包机制，功能更灵活但配置复杂。
## 项目搭建
- [Vite :](https://github.com/Bug-codergb/gb-webpack/tree/master/gb-vite-client) 通过基本配置从0到1搭建项目
- [Webpack:](https://github.com/Bug-codergb/gb-webpack/tree/master/gb-webpack-client) 通过基本配置从0到1搭建项目

