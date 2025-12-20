// 路由鉴权
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import useUserStore from '@/store/modules/user.ts'
import setting from '@/setting.ts'
router.beforeEach((to, from, next) => {
    document.title = `${setting.title}`
    const userStore = useUserStore()
    const token = userStore.token
    // 已登录
    if (token) {
        if (to.path !== '/login') {
            if (userStore.username) {
                next()
            } else {
                userStore
                    .userInfo()
                    .then(() => {
                        next()
                    })
                    .catch(async () => {
                        await userStore.userLogout()
                        next({ path: '/login', query: { redirect: to.path } })
                    })
            }
        } else {
            next(false)
        }
    } else {
        // 未登录
        if (to.path === '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
    console.log(token, to, from)
    nprogress.start()
    // next()
})
router.afterEach(() => {
    nprogress.done()
})
