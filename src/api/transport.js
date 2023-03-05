import request from '@/utils/request'

// 获取运输任务列表 分页
export function getTransportTaskList (data) {
  return request({
    method: 'POST',
    url: '/transport-task-manager/page',
    data
  })
}

// 运输任务统计
export function getTransportTaskCount () {
  return request({
    method: 'GET',
    url: '/transport-task-manager/count'
  })
}

// 获取运输任务详情
export function getTransportTaskDetail (id) {
  return request({
    method: 'GET',
    url: `/transport-task-manager/${id}`
  })
}

// 获取线路数据 分页
export function getTransportLineList (data) {
  return request({
    method: 'POST',
    url: '/transportLine/page',
    data
  })
}

// 获取车次列表
export function getTruckTrips (transportLineId) {
  return request({
    method: 'GET',
    url: '/transportLine/trips',
    params: {
      transportLineId
    }
  })
}

// 新增线路
export function addLine (data) {
  return request({
    method: 'POST',
    url: '/transportLine',
    data
  })
}

// 修改线路
export function updateLine (data) {
  return request({
    method: 'PUT',
    url: `/transportLine/${data.id}`,
    data
  })
}

// 获取成本
export function getCost () {
  return request({
    method: 'GET',
    url: '/cost-configuration-manager'
  })
}

// 添加车次
export function addTransportLine (data) {
  return request({
    method: 'POST',
    url: '/transportLine/trips',
    data
  })
}

// 删除线路
export function delLine (id) {
  return request({
    method: 'DELETE',
    url: `/transportLine/${id}`
  })
}

// 更新车次
export function updateLineTrips (data) {
  return request({
    method: 'PUT',
    url: `/transportLine/trips/${data.id}`,
    data
  })
}

// 删除车次
export function delLineTrips (id) {
  return request({
    method: 'DELETE',
    url: `/transportLine/trips/${id}`
  })
}

// 获取可用车辆
export function getWorkingCar () {
  return request({
    method: 'GET',
    url: '/workingTrucks'
  })
}

// 安排车辆
export function arrangeTruck (data) {
  return request({
    method: 'POST',
    url: `/transportLine/trips/${data.id}/truckDrivers`,
    data
  })
}

// 获取区间作业列表
export function getPickupMissionList (data) {
  return request({
    method: 'POST',
    url: '/pickup-dispatch-task-manager/page',
    data
  })
}
