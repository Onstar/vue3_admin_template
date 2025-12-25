import type { Component } from 'vue'
import type { SvgIcon } from '@/components/svgIcon/index.vue'

declare module 'vue' {
    export interface GlobalComponents {
        // Component 是“我保证能用”，typeof Xxx 是“我保证是真的”。
        SvgIcon: typeof SvgIcon // 强类型
        CategorySelect: Component
        TestGlobalComponent: Component // 占位 / 弱类型
        /******************** element-plus 全局图标组件 ********************/
        Fold: Component
        Expand: Component
        ArrowDown: Component
    }
}

export {}
