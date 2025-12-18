import { type ConfigEnv, defineConfig, loadEnv, mergeConfig } from 'vite'
import viteBaseConfig from './vite.base.config'
import viteDevConfig from './vite.dev.config'
import viteProdConfig from './vite.prod.config'
const envResolve = {
    serve: (arg: ConfigEnv) => {
        console.log('开发环境')
        // return Object.assign({}, viteBaseConfig, viteDevConfig)
        return mergeConfig(viteBaseConfig(arg), viteDevConfig)
    },
    build: (arg: ConfigEnv) => {
        console.log('生产环境')
        // return Object.assign({}, viteBaseConfig, viteProdConfig)
        return mergeConfig(viteBaseConfig(arg), viteProdConfig)
    },
}
// https://vite.dev/config/
export default defineConfig((arg) => {
    const { command, mode } = arg
    const env = loadEnv(mode, process.cwd(), 'VITE_')
    console.log('evn', env)
    console.log('mode', mode)
    return envResolve[command](arg)
})
