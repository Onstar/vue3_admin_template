<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <el-icon class="toggle-icon" @click="toggleHandle">
                <Expand v-if="settingStore.fold" />
                <Fold v-else />
            </el-icon>
            <BreadcrumbIndex />
        </div>
        <div class="tabbar_right">
            <SettingIndex />
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'TabBarIndex',
})
import BreadcrumbIndex from '@/layout/tabbar/breadcrumb/index.vue'
import SettingIndex from '@/layout/tabbar/setting/index.vue'
import useLayoutSettingStore from '@/store/modules/setting.ts'
const settingStore = useLayoutSettingStore()
function toggleHandle() {
    settingStore.fold = !settingStore.fold
}
</script>

<style scoped>
.tabbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        90deg,
        rgb(232 223 223),
        rgb(201 178 178),
        rgb(197 165 165)
    );

    .toggle-icon {
        cursor: pointer;
    }

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
        user-select: none;

        & > .el-icon {
            margin-right: 10px;
        }
    }

    .tabbar_right {
        display: flex;
        align-items: center;
    }
}
</style>
