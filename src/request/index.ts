import $axios from 'axios'
import { getToken, setToken } from '../utils/utils';

// 创建一个 axios 实例
const axios = $axios.create({
    baseURL: 'http://localhost:8080/', // 所有的请求地址前缀部分
    timeout: 60000, // 请求超时时间毫秒
    withCredentials: true, // 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        "token": "null"
    },
})

// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        // 在发送请求前携带token
        // 在新版axios中headers定义未 headers? 而非 any
        if (config && config.headers && (getToken('token') != null || getToken('token') != undefined)) {
            config.headers['token'] = getToken('token')
        }

        return config
    },
    function (error) {
        // 对请求错误做些什么
        console.log(error)
        return Promise.reject(error)
    }
)

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // console.log(response)
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data

        // 当返回的code 为1代表 用户验证通过 存储
        if (dataAxios.code == 10086) {
            setToken("token", dataAxios.data)
        }

        console.log('当前请求状态码：', response.status);
        console.log('当前响应的数据:', dataAxios);
        return response
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        console.log(error)
        return Promise.reject(error)
    }
)

export default axios;