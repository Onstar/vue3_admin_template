// 创建用户相关的数据
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponse } from '@/api/user/type.ts'
import type { UserState } from '@/store/modules/types/type.ts'
// 引入操作本地存储的方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token.ts'

const useUserStore = defineStore('user', {
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
        }
    },
    // 异步｜逻辑
    actions: {
        async userLogin(param: loginForm) {
            const result: loginResponse = await reqLogin(param)
            if (result.code === 200) {
                this.token = result.data.token as string
                // 本地存储持久化
                // localStorage.setItem('TOKEN', result.data.token as string)
                SET_TOKEN(result.data.token as string)
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
    },
    getters: {},
})
export default useUserStore
