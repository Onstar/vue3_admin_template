export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

export interface SpuData {
    id?: number
    spuName: string
    description: string
    category3Id: number
    tmId: number
    spuSaleAttrList: null
    spuImageList: null
}
export type Records = SpuData[]
export interface HasSpuResponseData extends ResponseData {
    data: {
        current: number
        pages: number
        size: number
        total: number
        searchCount: boolean
        records: Records
    }
}
