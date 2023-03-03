export function dataFlattening (list) {
  let arr = []
  list.forEach(item => {
    if (item.children?.length) {
      arr = [...arr, ...dataFlattening(item.children)]
    } else {
      arr.push(item)
    }
  })
  return arr
}

export function routerDictionary (arr) {
  const routerMap = {}
  arr.forEach(item => {
    routerMap[item.path] = item.name
  })
  routerMap['/transit/vehicle-detail/'] = '车辆详情'
  routerMap['/transit/car-register-info'] = '回单查看'
  routerMap['/branches/MapContent'] = '作业范围分配'
  routerMap['/transit/driver-detail'] = '司机详情'
  routerMap['/transit/workArrange-setting'] = '排班设置'
  routerMap['/business/edit-order'] = '订单详情'
  routerMap['/business/waybill-detail'] = '运单详情'
  return routerMap
}
