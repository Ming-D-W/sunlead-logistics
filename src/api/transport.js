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
