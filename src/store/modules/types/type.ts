import type { MenuList } from '@/router/types/type.ts'
import type { CategoryObjType } from '@/api/product/attr/type.ts'

// 定义store中的数据类型
export interface UserState {
    token: string
    menuRoutes: MenuList
    username: string
    avatar: string
}

export interface CategoryState {
    c1Id: number | string
    c2Id: number | string
    c3Id: number | string
    c1Arr: CategoryObjType[]
    c2Arr: CategoryObjType[]
    c3Arr: CategoryObjType[]
}
