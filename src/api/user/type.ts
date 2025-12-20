// 登录接口参数类型
export interface loginForm {
    username: string
    password: string
}
// 接口返回都有的类型
export interface ResponseData {
    code: number
    message: string
    ok: boolean
}
// 登录接口返回的类型
export interface loginResponse extends ResponseData {
    data: string
}
// 登出返回的类型
export interface logoutResponse extends ResponseData {
    data: null
}

// 定义返回的用户信息类型
export interface userResponseData extends ResponseData {
    data: {
        avatar: string
        buttons: string[]
        name: string
        roles: string[]
        routes: string[]
    }
}
