export interface ResponseData {
    code: number
    message: string
    ok: boolean
}
// 品牌对象类型
export interface TradeMark {
    id?: number
    tmName: string
    logoUrl: string
}
// 包含品牌数据类型
export type Records = TradeMark[]

// 获取的品牌数据类型
export interface TradeMarkResponseData extends ResponseData {
    data: {
        current: number
        pages: number
        size: number
        total: number
        searchCount: boolean
        records: Records
    }
}
