import store from '@/store'

export const imgerror = {
  inserted (dom, options) {
    dom.onerror = function () {
      dom.src = options.value
    }
  }
}

export const auth = {
  inserted (dom, options) {
    const userInfo = store.state.user.userInfo
    if (!userInfo.roles?.ponints.includes(options.value)) {
      dom.remove()
    }
  }
}
