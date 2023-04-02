import request from '@/utils/request'

export function getTruckTypeApi (params) {
  return request({
    method: 'GET',
    url: '/truckType/page',
    params
  })
}

// 新增车型
export function addTruckApi (data) {
  return request({
    method: 'POST',
    url: '/truckType',
    data
  })
}

// 获取车型详情
export function getTruckDetail (id) {
  return request({
    method: 'GET',
    url: `/truckType/${id}`
  })
}

// 修改车型
export function updateTruckApi (data) {
  return request({
    method: 'PUT',
    url: '/truckType/' + data.id,
    data
  })
}

// 删除车型
export function deleteTruckApi (id) {
  return request({
    method: 'DELETE',
    url: '/truckType/' + id
  })
}

// 获取车型信息simple
export function getTruckTypeSimpleApi () {
  return request({
    method: 'GET',
    url: '/truckType/simple'
  })
}

// 获取车辆列表分页
export function getTruckPageApi (params) {
  return request({
    method: 'GET',
    url: '/truck/page',
    params
  })
}

// 统计车辆状态
export function getWorkStatusApi () {
  return request({
    method: 'GET',
    url: '/count'
  })
}

// 新增车辆
export function addCarApi (data) {
  return request({
    method: 'POST',
    url: '/truck',
    data
  })
}

// 获取车辆详情
export function getCarDetailApi (id) {
  return request({
    method: 'GET',
    url: `/truck/${id}`
  })
}

// 获取行驶证详情
export function getLicenceDetailApi (id) {
  return request({
    method: 'GET',
    url: `/truck/${id}/license`
  })
}

// 更新车辆信息
export function updateTruck (data) {
  return request({
    method: 'PUT',
    url: `/truck/${data.id}`,
    data
  })
}

// 保存驾驶证信息
export function updateLicenceApi (data) {
  return request({
    method: 'POST',
    url: `/truck/${data.id}/license`,
    data
  })
}

// 获取回车登记列表
export function getTruckReturnListApi (data) {
  return request({
    method: 'POST',
    url: '/truck-return-register/pageQuery',
    data
  })
}

// 获取回单详情
export function getTruckReturnDetailApi (id) {
  return request({
    method: 'GET',
    url: `/truck-return-register/detail/${id}`
  })
}
