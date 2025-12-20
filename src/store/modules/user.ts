// 创建用户相关的数据
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponse } from '@/api/user/type.ts'
import type { UserState } from '@/store/modules/types/type.ts'
// 引入操作本地存储的方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token.ts'
// 引入常量路由
import { constantRoute } from '@/router/routes.ts'

const useUserStore = defineStore('user', {
    state: (): UserState => {
        console.log('state() 执行了')
        return {
            token: GET_TOKEN(),
            menuRoutes: constantRoute,
            username: '',
            avatar: '',
        }
    },
    // 异步｜逻辑
    actions: {
        async userLogin(param: loginForm) {
            const result: loginResponse = await reqLogin(param)
            const { data, message } = result
            if (result.code === 200) {
                // this.token = result.data as string
                this.token = data
                // 本地存储持久化
                // localStorage.setItem('TOKEN', result.data.token as string)
                SET_TOKEN(data)
                return 'ok'
            } else {
                return Promise.reject(new Error(data || message))
            }
        },
        async userInfo() {
            const result = await reqUserInfo()
            if (result.code === 200) {
                const { name, avatar } = result.data
                this.username = name
                this.avatar = avatar
                return 'ok'
            } else {
                return Promise.reject(result.message)
            }
        },
        async userLogout() {
            const result = await reqLogout()
            if (result.code === 200) {
                REMOVE_TOKEN()
                this.username = ''
                this.avatar = ''
                this.token = ''
            } else {
                return Promise.reject(result.message)
            }
        },
    },
    getters: {},
})
export default useUserStore
