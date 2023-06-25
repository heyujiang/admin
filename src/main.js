import Vue from 'vue'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
Element.Dialog.props.closeOnClickModal.default = false
import './styles/element-variables.scss'
import locale from 'element-ui/lib/locale/lang/zh-CN'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import request from '@/utils/request'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
// ak
import ak from '@/utils/ak.js'
Vue.prototype.$ak = ak

import api from '@/utils/api'
import openapi from '@/utils/openapi'

/** *diy页面开始***/
import util from '@/utils/util.js'
Vue.prototype.$util = util

/** *标题***/
import moduleTitle from './views/diypage/module/title.vue'
Vue.component('moduleTitle', moduleTitle)

/** *标题2***/
import moduleTwtit from './views/diypage/module/twtit.vue'
Vue.component('moduleTwtit', moduleTwtit)

/** *颜色选择***/
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)
/** *diy页面结速***/

import {
  parseTime,
  formatStr,
  checkPermission
} from '@/utils/common.js'


Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: locale // 如果使用中文，无需设置，请删除
})

import BMap from 'vue-baidu-map';
Vue.use(BMap, {
  ak: 'yI1xgGj0Gvl6wbuh1m0jANsdVUPTUuZZ'
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.parseTime = parseTime
Vue.prototype.formatStr = formatStr
Vue.prototype.checkPermission = checkPermission
Vue.prototype.$api = api
Vue.prototype.$openapi = openapi

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
