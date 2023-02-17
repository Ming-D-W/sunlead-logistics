import Cookies from 'js-cookie'

const TOKEN_KEY = 'project-token'
const USER_ROUTER = 'USER_ROUTER'
const TIME_STEMP = 'TIME_STEMP'
const USER_INFO = 'USER_INFO'

export function getToken () {
  return Cookies.get(TOKEN_KEY)
}

export function setToken (token) {
  Cookies.set(TOKEN_KEY, token)
}

export function removeToken () {
  Cookies.remove(TOKEN_KEY)
}

export function setRouter (routes) {
  localStorage.setItem(USER_ROUTER, JSON.stringify(routes))
}

export function getRouter () {
  return JSON.parse(localStorage.getItem(USER_ROUTER))
}

export function delRouter () {
  localStorage.removeItem(USER_ROUTER)
}

export function setTime () {
  localStorage.setItem(TIME_STEMP, Date.now().toString())
}

export function getTime () {
  return localStorage.getItem(TIME_STEMP)
}

export function delTime () {
  localStorage.removeItem(TIME_STEMP)
}

export function setUserInfo (user) {
  localStorage.setItem(USER_INFO, JSON.stringify(user))
}

export function getUserInfo () {
  return JSON.parse(localStorage.getItem(USER_INFO))
}

export function delUserInfo () {
  localStorage.removeItem(USER_INFO)
}
