// 用户相关的接口
import request from '@/utils/request'
import type { loginForm, loginResponse, userResponseData } from './type.ts'

const API = {
    LOGIN_URL: '/user/login',
    USERINFO_URL: '/user/info',
} as const

// 登录接口
export const reqLogin = (data: loginForm) => {
    return request.post<any, loginResponse>(API.LOGIN_URL, data)
}
// 获取用户信息
export const reqUserInfo = () =>
    request.get<any, userResponseData>(API.USERINFO_URL)
