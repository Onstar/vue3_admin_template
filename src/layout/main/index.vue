<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
defineOptions({
    name: 'MainIndex',
})
</script>

<style scoped>
.fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: all 0.3s;
}

.face-enter-to {
    opacity: 1;
}
</style>
