import request from '@/utils/request'

export function getOrderList (data) {
  return request({
    method: 'POST',
    url: '/order-manager/order/page',
    data
  })
}

// 获取订单详情
export function getOrderDetail (id) {
  return request({
    method: 'GET',
    url: `/order-manager/order/${id}`
  })
}

// 获取货品列表
export function getCargoList (orderId) {
  return request({
    method: 'GET',
    url: '/order-manager/cargo',
    params: {
      orderId
    }
  })
}

// 更新货品信息
export function updateCargo (data) {
  return request({
    method: 'PUT',
    url: `/order-manager/cargo/${data.id}`,
    data
  })
}

// 获取运单裂列表 分页
export function getTransportOrderList (data) {
  return request({
    method: 'POST',
    url: '/transport-order-manager/page',
    data
  })
}

// 获取运单统计数字
export function getTransportCount () {
  return request({
    method: 'GET',
    url: '/transport-order-manager/count'
  })
}

// 获取运单详情
export function getTransportOrderDetail (id) {
  return request({
    method: 'GET',
    url: `/transport-order-manager/${id}`
  })
}
