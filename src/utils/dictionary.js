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
  return routerMap
}
