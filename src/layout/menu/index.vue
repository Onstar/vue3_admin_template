<template>
    <template v-for="item in menuList">
        <template v-if="!item.children">
            <el-menu-item
                v-if="!item.meta.hidden"
                :key="item.path"
                :index="item.path"
                @click="goRoute(item)"
            >
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <template v-if="hasSingleItem(item)">
            <el-menu-item
                v-if="!item.children[0].meta.hidden"
                :key="item.path"
                :index="item.path"
                @click="goRoute(item)"
            >
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <template v-if="item.children && item.children.length > 1">
            <el-sub-menu
                v-if="!item.meta.hidden"
                :key="item.path"
                :index="item.path"
            >
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <MenuIndex :menu-list="item.children" />
            </el-sub-menu>
        </template>
    </template>
</template>

<script setup lang="ts">
import type { MenuList, MenuRouteRecordRaw } from '@/router/types/type.ts'
import MenuIndex from '@/layout/menu/index.vue'

defineOptions({
    name: 'MenuIndex',
})
const { menuList } = defineProps<{
    menuList: MenuList
}>()
// 定义类型守卫，让 TS 识别「只有一个子路由」的场景
const hasSingleItem = (
    item: MenuRouteRecordRaw,
): item is MenuRouteRecordRaw & { children: [MenuRouteRecordRaw] } => {
    return !!item.children && item.children.length === 1
}
// 引入路由器
import { useRouter } from 'vue-router'
const router = useRouter()
// 菜单跳转
const goRoute = (item: MenuRouteRecordRaw) => {
    router.push(item.path)
}
</script>

<style scoped></style>
