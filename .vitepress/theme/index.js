import DefaultTheme from 'vitepress/theme'

import 'element-plus/dist/index.css'
import './custom.css'
import ElementPlus from "element-plus"
const CustomTheme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus)
  }
}

export { CustomTheme as default }