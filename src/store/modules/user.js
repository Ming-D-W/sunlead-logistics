import {
  delRouter,
  delTime,
  delUserInfo,
  getRouter,
  getToken,
  getUserInfo,
  removeToken, setRouter, setTime,
  setToken, setUserInfo
} from '@/utils/stotage'
import { getMenu, login } from '@/api/user'
import router from '@/router'

const state = {
  userInfo: getUserInfo(),
  token: getToken() || null,
  router: getRouter(),
  routerDictionaries: null
}
const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setUserInfo (state, data) {
    state.userInfo = data
  },
  setRouter (state, data) {
    state.router = data
  },
  logoutMutation (state) {
    state.token = null
    state.userInfo = {}
    state.router = []
    delRouter()
    delTime()
    removeToken()
    delUserInfo()
    router.push('/login')
  },
  setRouterDic (state, data) {
    state.routerDictionaries = data
  }
}
const actions = {
  async loginAction (ctx, loginData) {
    const { data } = await login(loginData)
    setToken(data.token.token)
    setUserInfo(data.user)
    setTime()
    ctx.commit('setToken', data.token.token)
    ctx.commit('setUserInfo', data.user)
    const res = await getMenu()
    setRouter(res.data)
    ctx.commit('setRouter', res.data)
    router.push('/')
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
