// 导入 Vue 的 App 类型（核心：明确 app 的类型）
import type { App } from 'vue'
import SvgIcon from '@/components/svgIcon/index.vue'
import CategorySelect from '@/components/categorySelect/index.vue'
// 引入所有图标。如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComponent = {
    SvgIcon,
    CategorySelect,
}
export default {
    install(app: App) {
        Object.keys(allGlobalComponent).forEach((k) => {
            app.component(
                k,
                allGlobalComponent[k as keyof typeof allGlobalComponent],
            )
        })
        // element-plus 提供的图标注册为全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    },
}
