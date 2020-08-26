import axios from 'axios'
import hostConfig from './config'
import { Message } from 'element-ui'

let pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const cancelToken = axios.CancelToken

const apiConfig = axios.create({
    // 设置超时时间
    timeout: 10000,
    // 请求的baseUrl
    baseURL: hostConfig.apiHost,
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
            if (data[it] !== undefined && data[it] !== null) {
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
    handleReq(config)
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
    err.config && removePending(err.config)
    err.response && Message.error(err.response ? `服务器异常（${err.response.status}）` : '连接超时，请检查网络')
    return Promise.reject(err)
})

/**
 * 移除已相应的请求
 * @param {*} config
 */
const removePending = (config) => {
    pending = pending.filter(val => {
        if (val.u === concatReq(config)) {
            val.f()
            return false
        } else {
            return true
        }
    })
}

/**
 * 对请求进行处理：过滤与收集
 * @param {*} config
 */
const handleReq = (config) => {
    removePending(config)
    config.cancelToken = new cancelToken((c) => {
        pending.push({
            u: concatReq(config),
            f: c
        })
    })
}

const concatReq = (config) => {
    const { url, method, data = '', params } = config
    return url.concat(method, JSON.stringify(data), JSON.stringify(params))
}

export const createAPI = (url, method, data) => {
    if (method === 'post' || method === 'POST') {
        return apiConfig({
            method: method,
            url: url,
            data
        })
    } else {
        return apiConfig({
            method: method,
            url: url,
            params: data
        })
    }
}
