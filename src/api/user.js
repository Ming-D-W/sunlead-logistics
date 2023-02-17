import request from '@/utils/request'

// 登录

export function login (data) {
  return request({
    method: 'POST',
    url: '/login',
    data
  })
}

// 获取验证码
export function getCode () {
  return request({
    method: 'GET',
    responseType: 'arraybuffer',
    url: '/captcha?key=BB7BAD6312B538509DA88D281676367933832&0=BB7BAD6312B538509DA88D281676367933832'
  })
}

// 获取菜单
export function getMenu () {
  return request({
    method: 'GET',
    url: '/menus'
  })
}
