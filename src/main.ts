import { createApp } from 'vue'
import App from '@/App.vue'
// 引入 element-plus 插件和样
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
})
// svg 插件需要的配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件：注册全局组件
import globalComponent from '@/components'
app.use(globalComponent)

app.mount('#app')
