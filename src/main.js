import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/element'
import '@/router/permission'
import * as directives from '@/directives'
import 'echarts-liquidfill'

import '@/style/scss/index.scss'
import moment from 'moment' // 引入插件
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment // 给Vue函数添加一个原型属性$moment 指向moment

Object.keys(directives).forEach(item => {
  Vue.directive(item, directives[item])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
