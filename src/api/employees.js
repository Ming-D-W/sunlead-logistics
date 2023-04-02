import request from '@/utils/request'

// 获取快递员列表
export function getDeliveryManApi (params) {
  return request({
    method: 'GET',
    url: '/business-hall/courier/page',
    params
  })
}

// 获取快递员详情
export function getDeliveryManDetailApi (id) {
  return request({
    method: 'GET',
    url: `/business-hall/courier/${id}`
  })
}

// 获取业务范围
export function getDeliveryWorkAreaApi (id) {
  return request({
    method: 'GET',
    url: `/business-hall/scope/${id}/2?0=${id}`
  })
}

// 保存业务范围
export function saveDeliveryArea (data) {
  return request({
    method: 'POST',
    url: '/business-hall/scope',
    data
  })
}

// 获取司机列表分页
export function getDriverListPage (params) {
  return request({
    method: 'GET',
    url: '/driver/page',
    params
  })
}

// 获取司机详情
export function getDriverDetail (id) {
  return request({
    method: 'GET',
    url: '/driver/' + id
  })
}

// 修改司机信息
export function updateDriverDetail (data) {
  return request({
    method: 'PUT',
    url: `/driver/${data.id}`,
    data
  })
}

// 获取司机驾驶证信息
export function getDriverLicence (id) {
  return request({
    method: 'GET',
    url: '/driverLicense/' + id
  })
}

// 保存司机驾驶证信息
export function saveDriverLicence (data) {
  return request({
    method: 'POST',
    url: '/driverLicense',
    data
  })
}

// 获取未工作车辆列表
export function getUnworkTrucks () {
  return request({
    method: 'GET',
    url: '/unWorkingTrucks'
  })
}

// 司机分配车辆
export function assignTruckToDriver (data) {
  return request({
    method: 'POST',
    url: '/driver/truckDrivers',
    data
  })
}

// 分页查询排班
export function getWorkPattern (params) {
  return request({
    method: 'GET',
    url: '/work-schedulings',
    params
  })
}

// 人工调整 绑定排班
export function bandingWorkPattern (data) {
  return request({
    method: 'PUT',
    url: '/work-schedulings',
    data
  })
}

// 获取排班设置列表 分页
export function getWorkArrangeSetting (params) {
  return request({
    method: 'GET',
    url: '/work-patterns/page',
    params
  })
}

// 新增工作模式
export function addWorkType (data) {
  return request({
    method: 'POST',
    url: '/work-patterns',
    data
  })
}

// 修改工作模式
export function updateWorkType (data) {
  return request({
    method: 'PUT',
    url: '/work-patterns',
    data
  })
}

// 删除工作模式
export function delWorkType (id) {
  return request({
    method: 'DELETE',
    url: `/work-patterns/${id}`
  })
}

// 获取货物类型列表
export function getCargoTypeList () {
  return request({
    method: 'GET',
    url: '/goodsType/simple'
  })
}

// 删除货物
export function delCargo (id) {
  return request({
    method: 'DELETE',
    url: `/order-manager/cargo/${id}`
  })
}
