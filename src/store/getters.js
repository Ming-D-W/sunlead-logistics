export default {
  token: state => state.user.token,
  avatar: state => state.user.userInfo.avatar,
  router: state => state.user.router,
  username: state => state.user.userInfo.name,
  routerDictionaries: state => state.user.routerDictionaries
}
