import axios from 'axios'
import store from '@/store'
import { getTime } from '@/utils/stotage'
import router from '@/router'

const request = axios.create({
  baseURL: 'https://slwl-geteway.itheima.net/manager',
  timeout: 5000
})

// token过期判断
const TIME_OUT = 500000

function isTimeout () {
  const time = getTime()
  const now = Date.now()
  return (now - time) > (TIME_OUT * 1000)
}

// 请求拦截器
request.interceptors.request.use(config => {
  const token = store.getters.token
  if (token) {
    if (isTimeout()) {
      store.commit('user/logoutMutation')
      router.push('/login')
      return Promise.reject(new Error('token过期'))
    }
    config.headers.authorization = token
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(res => {
  return res.data
}, err => {
  return Promise.reject(err)
})

export default request
