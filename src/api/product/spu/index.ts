import request from '@/utils/request'
import type { HasSpuResponseData } from './type.ts'

const API = {
    HASSPU_URL: '/admin/product/',
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
