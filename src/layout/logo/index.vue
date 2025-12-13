<template>
    <div class="logo">
        <img v-if="setting.logoHidden" :src="setting.logo" alt="" />
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
import setting from '@/setting.ts'
defineOptions({
    name: 'LogoIndex',
})
</script>

<style lang="scss" scoped>
.logo {
    display: flex;
    align-items: center;
    width: 100%;
    height: $base-menu-logo-height;
    padding: 20px;
    color: #fff;

    img {
        width: 40px;
        height: 40px;
    }

    p {
        margin-left: 10px;
        font-size: $base-logo-title-font-size;
    }
}
</style>
