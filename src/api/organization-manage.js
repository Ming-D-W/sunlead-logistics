import request from '@/utils/request'

// 获取树状机构信息
export function getTreeOrganApi () {
  return request({
    method: 'GET',
    url: '/business-hall/tree'
  })
}
