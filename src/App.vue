<template>
    <div class="app">
        <h1 class="title">APP</h1>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
axios({
    method: 'post',
    url: '/api/user/login',
    data: {
        username: 'admin',
        password: '111111',
    },
})
</script>
<style lang="scss" scoped>
.title {
    color: $color;
}
</style>
