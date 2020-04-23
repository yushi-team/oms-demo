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
    if (hasSameReq(config)) return null
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
    return Promise.reject(err)
})

/**
 * 移除已相应的请求
 * @param {*} config
 */
const removePending = (config) => {
    pending = pending.filter(val => {
        if (val.u === config.url + '&' + config.method) {
            val.f()
            return false
        } else {
            return true
        }
    })
}

/**
 * 判断是否有相同请求
 * 有，则无法发送该请求，没有则添加该请求到 pending list
 * @param {*} config
 */
const hasSameReq = (config) => {
    if (pending.some(val => val.u === config.url + '&' + config.method)) {
        return true
    } else {
        new cancelToken((c) => {
            pending.push({ u: config.url + '&' + config.method, f: c })
        })
        return false
    }
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
