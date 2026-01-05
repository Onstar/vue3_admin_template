import request from '@/utils/request'
import type {
    ResponseData,
    HasSpuResponseData,
    AllTrademark,
    SpuHasImg,
    SaleAttrResponseData,
    HasSaleAttrResponseData,
    SpuData,
} from './type.ts'

const API = {
    HASSPU_URL: '/admin/product/',
    ALLTRADEMARK_URL: '/admin/product/baseTrademark/getTrademarkList',
    IMAGE_URL: '/admin/product/spuImageList/',
    SPUHASSALEATTR_URL: '/admin/product/spuSaleAttrList/',
    ALLSALEATTR_URL: '/admin/product/baseSaleAttrList',
    ADDSPU_URL: '/admin/product/saveSpuInfo',
    UPDATESPU_URL: '/admin/product/updateSpuInfo',
} as const

export const reqHasSpu = (
    page: number,
    limit: number,
    category3Id: number | string,
) => {
    return request.get<HasSpuResponseData, HasSpuResponseData>(
        API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
    )
}

export const reqAllTrademark = () => {
    return request.get<AllTrademark, AllTrademark>(API.ALLTRADEMARK_URL)
}
export const reqSpuImageList = (spuId: number) => {
    return request.get<SpuHasImg, SpuHasImg>(API.IMAGE_URL + spuId)
}

export const reqSpuHasSaleAttr = (spuId: number) => {
    return request.get<SaleAttrResponseData, SaleAttrResponseData>(
        API.SPUHASSALEATTR_URL + spuId,
    )
}
export const reqAllSaleAttr = () => {
    return request.get<HasSaleAttrResponseData, HasSaleAttrResponseData>(
        API.ALLSALEATTR_URL,
    )
}
export const reqAddOrUpdateSPU = (data: SpuData) => {
    if (data.id) {
        return request.post<ResponseData, ResponseData>(API.UPDATESPU_URL, data)
    } else {
        return request.post<ResponseData, ResponseData>(API.ADDSPU_URL, data)
    }
}
