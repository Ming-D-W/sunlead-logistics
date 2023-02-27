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
      },
      {
        path: 'operational-range',
        component: () => import('@/views/employess/operational-range')
      },
      {
        path: 'MapContent',
        component: () => import('@/views/employess/operational-range/MapContent')
      }
    ]
  }, {
    path: '/transit',
    component: Layout,
    children: [
      {
        path: 'car-models',
        component: () => import('@/views/transit/car-models')
      },
      {
        path: 'vehicle',
        component: () => import('@/views/transit/vehicle')
      },
      {
        path: 'car-register',
        component: () => import('@/views/transit/car-register')
      },
      {
        path: 'vehicle-detail',
        component: () => import('@/views/transit/vehicle/vehicle-detail')
      },
      {
        path: 'car-register-info',
        component: () => import('@/views/transit/car-register/car-register-info.vue')
      },
      {
        path: 'driver',
        component: () => import('@/views/employess/driver')
      },
      {
        path: 'driver-detail',
        component: () => import('@/views/employess/driver-detail')
      },
      {
        path: 'workArrange-manage',
        component: () => import('@/views/employess/workArrange-manage')
      },
      {
        path: 'workArrange-setting',
        component: () => import('@/views/employess/workArrange-setting')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
