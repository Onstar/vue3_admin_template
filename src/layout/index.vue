<template>
    <div class="layout_container">
        <div class="layout_sidebar">
            <LogoIndex />
        </div>
        <div class="layout_tabbar">222</div>
        <div class="layout_main">
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
            <h1>111</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import LogoIndex from '@/layout/logo/index.vue'
</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;
    background-color: red;

    .layout_sidebar {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-backgournd;
    }

    .layout_tabbar {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        background-color: cyan;
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
