// 开发环境用的 mock 接口
import type { MockMethod, Recordable } from 'vite-plugin-mock'
export default [
    {
        url: '/api/get',
        method: 'get',
        response: ({ query }: Recordable) => {
            console.log('query', query)
            return {
                code: 0,
                data: {
                    name: 'vben',
                },
            }
        },
    },
    {
        url: '/api/post',
        method: 'post',
        timeout: 2000,
        response: {
            code: 0,
            data: {
                name: 'vben',
            },
        },
    },
    {
        url: '/api/text',
        method: 'post',
        rawResponse: async (req, res) => {
            let reqbody = ''
            await new Promise((resolve) => {
                req.on('data', (chunk) => {
                    reqbody += chunk
                })
                req.on('end', () => resolve(undefined))
            })
            res.setHeader('Content-Type', 'text/plain')
            res.statusCode = 200
            res.end(`hello, ${reqbody}`)
        },
    },
] as MockMethod[]

/*
export default function (config: MockConfig) {
    return [
        {
            url: '/api/text',
            method: 'post',
            rawResponse: async (req, res) => {
                let reqbody = ''
                await new Promise((resolve) => {
                    req.on('data', (chunk) => {
                        reqbody += chunk
                    })
                    req.on('end', () => resolve(undefined))
                })
                res.setHeader('Content-Type', 'text/plain')
                res.statusCode = 200
                res.end(`hello, ${reqbody}`)
            },
        },
    ]
}
*/
