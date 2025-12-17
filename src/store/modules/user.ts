// 创建用户相关的数据
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo } from '@/api/user'
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
        async userInfo() {
            const result = await reqUserInfo()
            if (result.code === 200) {
                const { username, avatar } = result.data.checkUser
                this.username = username
                this.avatar = avatar
                return 'ok'
            } else {
                return Promise.reject('获取信息失败')
            }
        },
        userLogout() {
            REMOVE_TOKEN()
            this.username = ''
            this.avatar = ''
            this.token = ''
        },
    },
    getters: {},
})
export default useUserStore
