import {
  constantRoutes
} from '@/router'
import api from '@/utils/api'

import Layout from '@/layout'
import {
  getToken,
  setToken,
  removeToken,
  setChatEn,
  removeChatEn
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu(routes, data) {
  data.forEach(item => {
    const menu = {
      path: item.path,
      component: item.component_path === '' ? Layout : (resolve) => require([`@/views/${item.component_path}`], resolve),
      // hidden: true,
      children: [],
      name: item.name,
      meta: {
        title: item.title,
        icon: item.icon
      }
    }
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
}

const state = {
  token: getToken(),
  sys_title: '',
  store_title: '',
  city_title: '',
  is_console: '',
  w7copyright: '',
  logo: '',
  avatar: '',
  roles: [],
  actions: [],
  username: '',
  role_id: '',
  routes: [],
  addRoutes: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ACTIONS(state, actions) {
    state.actions = actions
  },
  SET_INFO(state, val) {
    state.username = val.username
    state.role_id = val.role_id
    state.sys_title = val.sys_title
    state.store_title = val.store_title
    state.city_title = val.city_title
    state.is_console = val.is_console
    state.logo = val.logo
    state.w7copyright = val.w7copyright
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }

}

const actions = {
  login({
    commit
  }, userInfo) {
    const {
      username,
      password,
      m
    } = userInfo
    return new Promise((resolve, reject) => {
      api.post('/Login/index', {
        username: username.trim(),
        password: password,
        m: m
      }).then(response => {
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        setChatEn(response.data.serverChatEn)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit
  }) {
    return new Promise((resolve, reject) => {
      const loadMenuData = []
      const asyncRoutes = []

      api.post('/Users/getUserInfo').then(response => {
        const data = response.data
        if (!data) {
          reject('清重新登录')
        }

        const {
          roles,
          avatar
        } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        const menu = response.menu
        if (menu) {
          Object.assign(loadMenuData, menu)
          generaMenu(asyncRoutes, loadMenuData)
        }

        const accessedRoutes = asyncRoutes || []

        data.menu = accessedRoutes
        commit('SET_ROUTES', accessedRoutes)
        commit('SET_ROLES', roles)
        commit('SET_AVATAR', avatar)
        commit('SET_ACTIONS', response.actions)
        commit('SET_INFO', response.data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出
  logout({
    commit,
    state,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      api.post('/Users/logout', state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_ACTIONS', [])
        commit('SET_INFO', {})
        removeToken()
        removeChatEn()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, {
          root: true
        })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({
    commit,
    dispatch
  }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, {
      root: true
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
