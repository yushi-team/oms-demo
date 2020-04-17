import axios from 'axios'
import hostConfig from './config'
import { Message } from 'element-ui'

const baseUrl = hostConfig.apiHost

const pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const cancelToken = axios.CancelToken
const removePending = (config) => {
    for (const p in pending) {
        if (pending[p].u === config.url + '&' + config.method) { // 当当前请求在数组中存在时执行函数体
            pending[p].f() // 执行取消操作
            pending.splice(p, 1) // 把这条记录从数组中移除
        }
    }
}

const cutReq = (config) => {
    for (const p in pending) {
        if (pending[p].u === config.url + '&' + config.method) { // 当当前请求在数组中存在时执行函数体
            return true
        }
    }
}
const apiConfig = axios.create({
    // 设置超时时间
    timeout: 10000,
    // 请求的baseUrl
    baseURL: baseUrl,
    // 请求头部信息
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Token: ''
    },
    withCredentials: true,
    // 请求参数转换
    transformRequest: [function (data) {
        let ret = ''
        for (const it in data) {
            // 去除空字符串的请求字段
            if (data[it] !== '' && data[it] !== undefined && data[it] !== null) {
                if (ret !== '') ret += '&'
                // 处理复杂数据{list: [{a:1}, {b:2}]}
                if (data[it] instanceof Array && data[it][0].constructor === Object) {
                    ret += encodeURIComponent(it) + '=' + JSON.stringify(data[it])
                } else {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
                }
            }
        }
        return ret
    }]
})

// 请求拦截
apiConfig.interceptors.request.use(config => {
    const flag = cutReq(config)
    if (flag === true) return null // 当上一次相同请求未完成时，无法进行第二次相同请求
    config.cancelToken = new cancelToken((c) => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({ u: config.url + '&' + config.method, f: c })
    })
    if (!config.data) {
        config.data = {}
    }
    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截
apiConfig.interceptors.response.use(res => {
    removePending(res.config)
    if (!res) {
        return Promise.reject(res)
    }
    // 未登录，路由重定向至登录界面
    if (res.data.code === '2001') {
        // const route = router.history.pending || router.history.current
        // if (route.path !== '/login' || route.name !== '404') {
        //     router.replace('/login')
        // }
    } else if (res.data.code !== '2000') {
        Message.error(res.data.message || '请求错误')
    }
    return res.data
}, err => {
    Message.error('服务器异常，请稍后重试')
    return Promise.reject(err)
})

export function createAPI (url, method, data) {
    const config = {
        method: method,
        url: url,
        data
    }
    return apiConfig(config)
}
