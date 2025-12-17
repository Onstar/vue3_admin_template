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
    <img class="avatar" :src="userStore.avatar" alt="" />
    <el-dropdown class="name_dropdown">
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'

defineOptions({
    name: 'SettingIndex',
})
import useLayoutSettingStore from '@/store/modules/setting.ts'
import useUserStore from '@/store/modules/user.ts'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const userStore = useUserStore()

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
// 退出
function logout() {
    // 请求退出接口( 清除 Token)
    userStore.userLogout()
    debugger
    nextTick(() => {
        router.push({
            path: '/login',
            query: {
                redirect: route.path,
            },
        })
    })
}
</script>

<style scoped>
.avatar {
    width: 24px;
    height: 24px;
    margin: 0 10px;
    border-radius: 50%;
}

.name_dropdown {
    cursor: pointer;
}
</style>
