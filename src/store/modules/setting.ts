// layout 组件相关数据
import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('settingStore', {
    state: () => {
        return {
            fold: false, // 用户菜单是否收起
            refresh: false, // 控制页面刷新
        }
    },
})

export default useLayoutSettingStore
