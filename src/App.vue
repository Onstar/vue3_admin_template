<template>
    <div class="app">
        <h1 class="title">APP</h1>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { reqLogin } from '@/api/user'
onMounted(() => {
    reqLogin({ username: 'admin', password: '111111' }).then((res) => {
        console.log(res.data)
    })
})
</script>
<style lang="scss" scoped>
.title {
    color: $color;
}
</style>
