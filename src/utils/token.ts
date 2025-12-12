// 封装本地存储数据和读取数据
export const SET_TOKEN = (token: string) => {
    localStorage.setItem('TOKEN', token)
}
export const GET_TOKEN = (): string => {
    return localStorage.getItem('TOKEN') || ''
}
