<template>
    <svg aria-hidden="true">
        <use :href="symbolId" :fill="color" />
    </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
defineOptions({
    name: 'SvgIcon',
})
const {
    prefix = 'icon',
    color = '#000',
    name,
} = defineProps<{
    prefix?: string
    name: string
    color?: string
}>()
const symbolId = computed<string>(() => {
    return `#${prefix}-${name}`
})
</script>

<style scoped></style>
