import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_')
    // 1. 提取需要替换的前缀变量（从环境变量读取）
    const apiPrefix = env.VITE_APP_BASE_API || '/api' // 默认值 /api
    // 2. 动态构造正则（推荐带转义的通用方案）
    const escapeRegExp = (str: string): string =>
        str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const rewriteReg = new RegExp(`^${escapeRegExp(apiPrefix)}`)
    return {
        plugins: [
            vue(),
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                // 指定symbolId格式
                symbolId: 'icon-[dir]-[name]',
            }),
            viteMockServe({
                mockPath: 'mock',
                enable: true,
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve('./src'),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/style/variable.scss" as *;`,
                },
            },
        },
        server: {
            port: 5173,
            open: true,
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    target: env.VITE_SERVE,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(rewriteReg, ''),
                    configure(proxy) {
                        proxy.on('proxyReq', (proxyReq, req) => {
                            console.log(
                                '[proxy]====',
                                req.method,
                                req.url,
                                '->',
                                proxyReq.protocol +
                                    '//' +
                                    proxyReq.host +
                                    proxyReq.path,
                            )
                        })
                    },
                },
            },
        },
    }
})
