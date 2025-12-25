import request from '@/utils/request.ts'
import type { idType, CategoryResponseData, AttrResponseData } from './type.ts'

const API = {
    // 一级分类
    C1_URL: '/admin/product/getCategory1',
    // 二级分类
    C2_URL: '/admin/product/getCategory2/',
    // 二级分类
    C3_URL: '/admin/product/getCategory3/',
    // 分类下的数据
    ATTR_URL: '/admin/product/attrInfoList/',
} as const

// 一级分类数据
export const reqC1 = () => {
    return request.get<CategoryResponseData, CategoryResponseData>(API.C1_URL)
}
// 二级分类数据
export const reqC2 = (id: idType) => {
    return request.get<CategoryResponseData, CategoryResponseData>(
        API.C2_URL + id,
    )
}
// 三级分类数据
export const reqC3 = (id: idType) => {
    return request.get<CategoryResponseData, CategoryResponseData>(
        API.C3_URL + id,
    )
}
// 获取分类下的数据
export const reqAttr = (
    category1Id: idType,
    category2Id: idType,
    category3Id: idType,
) => {
    return request.get<AttrResponseData, AttrResponseData>(
        API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
    )
}
