export type idType = number | string
export interface ResponseType {
    code: number
    message: string
    ok: boolean
}
export interface CategoryObjType {
    id: idType
    name: string
    category1Id?: idType
    category2Id?: idType
}
export interface CategoryResponseData extends ResponseType {
    data: CategoryObjType[]
}

export interface AttrValue {
    id: number
    valueName: string
    attrId: number
}
export type AttrValueList = AttrValue[]
export interface Attr {
    id: number
    attrName: string
    categoryId: number
    categoryLevel: number
    attrValueList: AttrValueList
}
export type AttrList = Attr[]

export interface AttrResponseData extends ResponseType {
    data: AttrList
}
