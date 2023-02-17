import request from '@/utils/request'

export function getWorkspace () {
  return request({
    method: 'GET',
    url: '/workspace'
  })
}
