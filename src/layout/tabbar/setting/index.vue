<template>
    <el-button
        size="small"
        icon="refresh"
        circle
        @click="updateRefresh"
    ></el-button>
    <el-button
        size="small"
        icon="FullScreen"
        circle
        @click="fullScreenHandle"
    ></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img
        src="../../../public/logo.png"
        alt=""
        style="width: 24px; height: 24px; margin: 0 10px"
    />
    <el-dropdown>
        <span class="el-dropdown-link">
            admin
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
defineOptions({
    name: 'SettingIndex',
})
import useLayoutSettingStore from '@/store/modules/setting.ts'
const layoutSettingStore = useLayoutSettingStore()
// 刷新
function updateRefresh() {
    layoutSettingStore.refresh = !layoutSettingStore.refresh
}
// 全屏
function fullScreenHandle() {
    const isFull = document.fullscreenElement
    if (!isFull) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
</script>

<style scoped></style>
