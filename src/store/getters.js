const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  logo: state => state.user.logo,
  sys_title: state => state.user.sys_title,
  w7copyright: state => state.user.w7copyright,
  store_title: state => state.user.store_title,
  city_title: state => state.user.city_title,
  is_console: state => state.user.is_console,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  roles: state => state.user.roles,
  role_id: state => state.user.role_id,
  actions: state => state.user.actions,
  permission_routes: state => state.user.routes,
  son_permission_routes: state => state.user.sonRoutes,
  errorLogs: state => state.errorLog.logs
}
export default getters
