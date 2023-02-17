import router from '@/router/index'
import store from '@/store'
import { dataFlattening, routerDictionary } from '@/utils/dictionary'

// 白名单
const whiteList = ['/login', '/404', '/register']

// 前置路由导航守卫
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    const routerDictionaries = store.state.user.routerDictionary
    if (!routerDictionaries) {
      const routerData = store.getters.router
      const res = dataFlattening(routerData)
      const map = routerDictionary(res)
      store.commit('user/setRouterDic', map)
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else if (whiteList.includes(to.path)) {
    next()
  } else {
    next('/login')
  }
})
