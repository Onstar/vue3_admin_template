// 导入 Vue 的 App 类型（核心：明确 app 的类型）
import type { App } from 'vue'
import SvgIcon from '@/components/svgIcon/index.vue'
const allGlobalComponent = {
    SvgIcon,
}
export default {
    install(app: App) {
        Object.keys(allGlobalComponent).forEach((k) => {
            app.component(
                k,
                allGlobalComponent[k as keyof typeof allGlobalComponent],
            )
        })
    },
}
