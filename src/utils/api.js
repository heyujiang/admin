import request from '@/utils/request'

export default {
  get: function(url, params) {
    return request({
      url: url,
      method: 'get',
      params: params
    })
  },
  post: function(url, data) {
    return request({
      url: url,
      method: 'post',
      data
    })
  }
}
