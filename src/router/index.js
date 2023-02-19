import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/dashboard/index.vue'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }, {
    path: '/branches',
    component: Layout,
    children: [
      {
        path: '/branches/organization-manage',
        component: () => import('@/views/branches/organization-manage')
      },
      {
        path: '/branches/institutions-jobs-area',
        component: () => import('@/views/branches/institutions-jobs-area')
      },
      {
        path: '/transit/freight-manage',
        component: () => import('@/views/branches/freight-manage')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
