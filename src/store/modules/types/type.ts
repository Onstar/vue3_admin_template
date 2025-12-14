import type { MenuList } from '@/router/types/type.ts'

// 定义store中的数据类型
export interface UserState {
    token: string
    menuRoutes: MenuList
}
