// 获取时间结果，判断为: 早上|上午｜下午｜晚上
export const getTimeName = (): string => {
    const hours = new Date().getHours()
    let message = ''
    if (hours < 9) {
        message = '早上'
    } else if (hours <= 12) {
        message = '上午'
    } else if (hours <= 18) {
        message = '下午'
    } else {
        message = '晚上'
    }
    return message
}
