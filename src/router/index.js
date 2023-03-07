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
      },
      {
        path: 'pickUptask',
        component: () => import('@/views/transport/pickUptask')
      },
      {
        path: 'dispatchTask',
        component: () => import('@/views/transport/dispatchTask')
      },
      {
        path: 'operational',
        component: () => import('@/views/branches/operational')
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
  },
  {
    path: '/business',
    component: Layout,
    children: [
      {
        path: 'order-manage',
        component: () => import('@/views/business/order-manage')
      },
      {
        path: 'edit-order',
        component: () => import('@/views/business/order-manage/edit-order.vue')
      },
      {
        path: 'waybill',
        component: () => import('@/views/business/waybill')
      },
      {
        path: 'waybill-detail',
        component: () => import('@/views/business/waybill/waybill-detail.vue')
      }
    ]
  },
  {
    path: '/transport',
    component: Layout,
    children: [
      {
        path: 'transport-task',
        component: () => import('@/views/transport/transport-task')
      },
      {
        path: 'task-detail',
        component: () => import('@/views/transport/transport-task/task-detail.vue')
      },
      {
        path: 'line-manage',
        component: () => import('@/views/transport/line-manage')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
