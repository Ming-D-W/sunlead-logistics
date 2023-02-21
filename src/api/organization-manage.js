import request from '@/utils/request'

// 获取树状机构信息
export function getTreeOrganApi () {
  return request({
    method: 'GET',
    url: '/business-hall/tree'
  })
}

// 获取员工信息列表分页
export function getEmpListApi (params) {
  return request({
    method: 'GET',
    url: '/business-hall/user/page',
    params
  })
}

// 获取机构详情
export function getOrganDetailApi (id) {
  return request({
    method: 'GET',
    url: `/business-hall/${id}`
  })
}

// 获取省份列表
export function getProvince () {
  return request({
    method: 'GET',
    url: '/areas/children'
  })
}

// 获取市列表
export function getCityOrArea (parentId) {
  return request({
    method: 'GET',
    url: '/areas/children',
    params: {
      parentId
    }
  })
}

// 获取模板列表
export function getCarriagesList () {
  return request({
    method: 'GET',
    url: '/carriages'
  })
}
