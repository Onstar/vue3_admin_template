// 品牌管理
import request from '@/utils/request'
import type {
    TradeMarkResponseData,
    TradeMark,
    ResponseData,
} from '@/api/product/trademark/type.ts'

const API = {
    TRADEMARK_URL: '/admin/product/baseTrademark/',
    ADD_TRADEMARK_URL: '/admin/product/baseTrademark/save',
    UPDATE_TRADEMARK_URL: '/admin/product/baseTrademark/update',
    DELETE_URL: '/admin/product/baseTrademark/remove',
} as const

/**
 * 获取已有品牌
 * @param page
 * @param limit
 */
export const reqHasTradeMark = (page: number, limit: number) => {
    return request.get<TradeMarkResponseData, TradeMarkResponseData>(
        API.TRADEMARK_URL + `${page}/${limit}`,
    )
}
/**
 * 新增或修改品牌
 * @param trademark
 */
export const reqAddOrUpdateTradeMark = (trademark: TradeMark) => {
    // 修改
    if (trademark.id) {
        return request.put<ResponseData, ResponseData>(
            API.UPDATE_TRADEMARK_URL,
            trademark,
        )
    } else {
        // 新增
        return request.post<ResponseData, ResponseData>(
            API.ADD_TRADEMARK_URL,
            trademark,
        )
    }
}
/**
 * 删除
 * @param id
 */
export const reqDeleteTradeMark = (id: number) => {
    return request.delete<ResponseData, ResponseData>(API.DELETE_URL + id)
}
