# Webpack
## 避免全量处理
在配置插件或者loader的时候使用exclude/include，精确化loader或者插件作用范围
## 多线程/并行处理
通过thread-loader多线程处理 JS
## 缓存机制
- 持久化缓存```（cache: { type: 'filesystem' }）```
- babel-loader?cacheDirectory：Babel 编译结果缓存
## 构建目标
- target：针对特定环境（如 'web' 或 'browserslist'）
- devtool：生产环境避免使用 eval-cheap-source-map 等慢速 Source Map
- Tree Shaking
- TerserPlugin压缩js
- css-minimizer-webpack-plugin：压缩 CSS。
- 按需加载与懒加载:import() 语法：动态加载路由组件或非关键模块
- 资源优化:压缩图片，小文件转 Base64 内联
- CDN 引入
- ignorePlugin：忽略无用的语言包
## DevServer
- compress：启用 Gzip 压缩
# Vite
## 配置 cacheDir 启用缓存
## 减少依赖预构建
```js
optimizeDeps: {
  include: ['react', 'react-dom', 'lodash-es'], // 强制预构建
  exclude: ['不需要预构建的库'] // 排除
}
```
## 多线程压缩
但可通过 ```vite-plugin-compression``` 启用多线
## 压缩资源
- JS/CSS 压缩：Vite 默认使用 ESBuild 压缩，无需额外配置。
- 图片压缩：使用 ```vite-plugin-imagemin```
## CDN引入
通过 ```rollup-plugin-external-globals``` 将依赖外部化
## 异步加载（Dynamic Import）
Vite 自动支持 import() 动态加载