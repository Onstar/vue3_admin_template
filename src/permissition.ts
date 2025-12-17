// 路由鉴权
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import useUserStore from '@/store/modules/user.ts'
router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const token = userStore.token
    // 未登录
    debugger
    if (!token) {
        if (to.path !== '/login') {
            next({ path: '/login' })
        } else {
            next()
        }
        // next({ path: '/login' })
    } else {
        // 已登录
        if (to.path !== '/login') {
            next()
        } else {
            nprogress.done()
            next(false)
        }
    }
    console.log(token, to, from)
    nprogress.start()
    // next()
})
router.afterEach(() => {
    nprogress.done()
})
