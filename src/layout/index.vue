<template>
    <div class="layout_container">
        <div class="layout_sidebar">
            <LogoIndex />
            <!-- 菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu
                    background-color="#001529"
                    text-color="white"
                    :default-active="defaultActiveKey"
                >
                    <MenuIndex :menu-list="userStore.menuRoutes" />
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabbar">
            <TabBarIndex />
        </div>
        <div class="layout_main">
            <MainIndex />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import LogoIndex from '@/layout/logo/index.vue'
import MenuIndex from '@/layout/menu/index.vue'
import MainIndex from '@/layout/main/index.vue'
import TabBarIndex from '@/layout/tabbar/index.vue'
import useUserStore from '@/store/modules/user.ts'
const userStore = useUserStore()

const route = useRoute()
const defaultActiveKey = ref(route.path)
</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_sidebar {
        width: $base-menu-width;
        height: 100vh;
        color: white;
        background-color: $base-menu-backgournd;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border: none;
            }
        }
    }

    .layout_tabbar {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
    }

    .layout_main {
        position: absolute;
        top: $base-tabbar-height;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: calc(100% - $base-tabbar-height);
        padding: 20px;
        overflow: auto;
    }
}
</style>
