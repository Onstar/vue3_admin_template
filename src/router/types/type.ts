import type { RouteRecordRaw, RouteMeta } from 'vue-router'
// 扩展 RouteMeta
interface MenuRouteMeta extends RouteMeta {
    title: string
    icon?: string
    hidden?: boolean
}
// 扩展 RouteRecordRaw
export interface MenuRouteRecordRaw extends Omit<
    RouteRecordRaw,
    'meta' | 'children'
> {
    meta: MenuRouteMeta
    children?: MenuRouteRecordRaw[] | undefined
}
export type MenuList = MenuRouteRecordRaw[]
