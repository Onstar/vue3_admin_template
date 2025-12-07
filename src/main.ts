import { createApp } from 'vue'
import App from './App.vue'
// 引入 element-plus 插件和样式
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
})

app.mount('#app')
