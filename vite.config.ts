import { defineConfig, loadEnv } from 'vite'
import viteBaseConfig from './vite.base.config'
import viteDevConfig from './vite.dev.config'
const envResolve = {
    serve: () => {
        console.log('开发环境')
        return Object.assign({}, viteBaseConfig, viteDevConfig)
    },
    build: () => {
        console.log('生产环境')
        return Object.assign({}, viteBaseConfig, viteDevConfig)
    },
}
// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_')
    console.log('evn', env)
    console.log('mode', mode)
    return envResolve[command]()
})
