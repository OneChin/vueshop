import axios from 'axios'

// 因为框架设计原因，部分接口是挂载在其他域名下，
// 而vue-resource不支持创建多实例，所以引进axios。
const instance = axios.create({
  baseURL: "http://127.0.0.1:8888/api/private/v1/",
  timeout: 30000
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem("token")
  console.log(config)
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

export default instance