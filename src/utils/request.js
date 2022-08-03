// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import { getTokenTime } from '@/utils/auth'
import store from '@/store'
import router from '@/router'

function isTimeOut() {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeOut = 2 * 60 * 1000
  return currentTime - tokenTime > timeOut
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
}) // 创建一个axios的实例

service.interceptors.request.use(async (config) => {
  // console.log(config)
  if (store.state.user.token) {
    if (isTimeOut()) {
      // console.log('跳转到登录页')
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      // token过期再携带
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return config
}) // 请求拦截器

service.interceptors.response.use(
  (res) => {
    //   console.log(res)
    //   成功的请求
    const { success, data, message } = res.data

    if (success) {
      return data
    }

    Message.error(message)
    return Promise.reject(new Error(message))
  },

  async function (error) {
    // 对响应错误做什么
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
) // 响应拦截器

export default service // 导出axios实例
