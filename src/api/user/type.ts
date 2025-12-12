// 登录接口参数类型
export interface loginForm {
    username: string
    password: string
}
interface dataType {
    token?: string
    message?: string
}
// 登录接口返回的类型
export interface loginResponse {
    code: number
    data: dataType
}

// 定义服务器返回的用户信息类型
interface userInfo {
    userId: number
    avatar: string
    username: string
    password: string
    desc: string
    roles: string[]
    buttons: string[]
    routes: string[]
    token: string
}
interface userData {
    checkUser: userInfo
}
export interface userResponseData {
    code: number
    data: userData[]
}
