//自定义实例默认值
import axios from "axios"

const myAxios = axios.create()

myAxios.defaults.withCredentials = true

//拦截器
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log("请求发送了",config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    const res = response.data
    if (res.code === 406) {
        showToast(res.msg)
        window.location.href = '/login'
    }
    return res
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
})

export default myAxios
