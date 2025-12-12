import { createApp } from 'vue'
import App from '@/App.vue'
// 引入 element-plus 插件和样
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

// svg 插件需要的配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件：注册全局组件
import globalComponent from '@/components'
// 引入路由
import router from '@/views/router'
// 引入 仓库
import pinia from '@/store/index.ts'

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
})
app.use(globalComponent)
app.use(router)
app.use(pinia)

// 引入全局样式
import '@/style/index.scss'
app.mount('#app')
