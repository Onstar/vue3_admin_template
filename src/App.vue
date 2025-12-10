<template>
    <div class="app">
        <h1 class="title">APP</h1>
    </div>
</template>

<script setup lang="ts">
import request from '@/utils/request.ts'
import { onMounted } from 'vue'
onMounted(() => {
    request({
        method: 'post',
        url: '/user/login',
        data: {
            username: 'admin',
            password: '111111',
        },
    }).then((res) => {
        console.log(res)
    })
})
</script>
<style lang="scss" scoped>
.title {
    color: $color;
}
</style>
