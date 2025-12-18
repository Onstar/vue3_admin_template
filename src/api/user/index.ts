// 用户相关的接口
import request from '@/utils/request'
import type { loginForm, loginResponse, userResponseData } from './type.ts'

const API = {
    LOGIN_URL: '/admin/acl/index/login',
    USERINFO_URL: '/admin/acl/index/info',
    LOGOUT_URL: '/admin/acl/index/logout',
} as const

// 登录接口
export const reqLogin = (data: loginForm) => {
    return request.post<unknown, loginResponse>(API.LOGIN_URL, data)
}
// 获取用户信息
export const reqUserInfo = () => {
    return request.get<unknown, userResponseData>(API.USERINFO_URL)
}
// 退出
export const logout = () => {
    return request.post<unknown, unknown>(API.LOGOUT_URL)
}
