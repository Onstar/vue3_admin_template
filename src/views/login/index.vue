<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form">
                    <h1>hello</h1>
                    <h2>欢迎来到硅谷</h2>
                    <el-form-item>
                        <el-input
                            v-model="loginForm.username"
                            :prefix-icon="User"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input
                            v-model="loginForm.password"
                            type="password"
                            :prefix-icon="Lock"
                            show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            :loading="submitBtnLoading"
                            class="login_btn"
                            type="primary"
                            size="default"
                            @click="loginHandle"
                        >
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user.ts'
const userStore = useUserStore()
// 获取路由器
import { useRouter } from 'vue-router'
const router = useRouter()
// 引入获取当前时间 name
import { getTimeName } from '@/utils/time.ts'

const submitBtnLoading = ref<boolean>(false)
let loginForm = reactive({
    username: 'admin',
    password: '111111',
})
// 登录
function loginHandle() {
    submitBtnLoading.value = true
    userStore
        .userLogin(loginForm)
        .then(() => {
            submitBtnLoading.value = false
            router.push('/')
            ElNotification({
                type: 'success',
                title: `HI, ${getTimeName()}好!`,
                message: '欢迎回来!',
            })
        })
        .catch((err) => {
            submitBtnLoading.value = false
            ElNotification({
                type: 'error',
                message: err.message,
            })
        })
}
</script>

<style lang="scss" scoped>
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
}

.login_form {
    position: relative;
    top: 30vh;
    width: 80%;
    padding: 40px;
    color: #fff;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;

    h1 {
        font-size: 40px;
    }

    h2 {
        margin: 20px 0;
        font-size: 20px;
    }

    .login_btn {
        width: 100%;
    }
}
</style>
