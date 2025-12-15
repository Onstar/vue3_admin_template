<template>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
            class="breadcrumb_item"
            v-for="item in breadList"
            :key="item.path"
        >
            <el-icon v-if="item.meta.icon">
                <component :is="item.meta.icon" />
            </el-icon>
            <span>
                {{ item.meta.title }}
            </span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
defineOptions({
    name: 'BreadcrumbIndex',
})
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const breadList = computed(() => {
    return route.matched.filter((item) => item.path !== '/')
})
</script>

<style lang="scss" scoped>
.breadcrumb_item {
    :deep(.el-breadcrumb__inner) {
        display: flex;
        align-items: center;
    }

    .el-icon {
        margin-right: 4px;
    }
}
</style>
