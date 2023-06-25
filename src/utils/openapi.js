import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL:(process.env.NODE_ENV === 'production'? location.origin: process.env.VUE_APP_BASE_API)+'/index', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout

})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // post请求头

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
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

export default {
	get: function(url, params) {
		return new Promise((resolve, reject) => {
			service.get(url, params).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(err.data);
			})
		});
	},
	post: function(url, params) {
		return new Promise((resolve, reject) => {
			service.post(url, params).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(err.data);
			})
		});
	}
}
