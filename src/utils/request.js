import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
// create an axios instance
const service = axios.create({
  baseURL: (process.env.NODE_ENV === 'production' ? location.origin + process.env.VUE_APP_BASE_API : process.env
    .VUE_APP_BASE_API) + '/admin', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000 // request timeout

})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // post请求头

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (getToken()) {
      var Token = getToken()
      if (getQueryString('sid')) {
        Token = Token + '|sid=' + getQueryString('sid')
      }
      if (getQueryString('ocid')) {
        Token = Token + '|ocid=' + getQueryString('ocid')
      }
      if (getQueryString('console')) {
        Token = Token + '|console=' + getQueryString('console')
      }
      if (getQueryString('i')) {
        Token = Token + '|i=' + getQueryString('i')
      }
      config.headers['Authorization'] = Token
    }

    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 2000) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout', {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
