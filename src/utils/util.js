import $ from 'jquery'
import api from '@/utils/api.js'
import {
  Message
} from 'element-ui'

// 滚动条滚动动画
function scrollTop(dom, number = 0, time) {
  if (!time) {
    dom.scrollTop = number
    return number
  }
  const spacingTime = 20 // 设置循环的间隔时间  值越小消耗性能越高
  let spacingInex = time / spacingTime // 计算循环的次数
  let nowTop = dom.scrollTop // 获取当前滚动条位置
  const everTop = (number - nowTop) / spacingInex // 计算每次滑动的距离
  const scrollTimer = setInterval(() => {
    if (spacingInex > 0) {
      spacingInex--
      this.scrollTop(dom, nowTop += everTop)
    } else {
      clearInterval(scrollTimer) // 清除计时器
    }
  }, spacingTime)
}

/* 检测登录*/
function checkLogin() {

}

// 上传图到OSS
const uploadImg = async(arr, callback) => {
  const json = await api.upload({
    m: 'post',
    q: {
      fileType: 'diy',
      originalFileInfoArr: JSON.stringify(arr)
    },
    l: false
  })
  if (json.returnCode == 0) {
    var AuthMsg = json.result
    var imgExit = arr[0].name.split('.')[1]
    var ossKey = AuthMsg.dir + AuthMsg.uploadNameList[0] + '.' + imgExit
    var imgurl = AuthMsg.host + '/' + ossKey
    // 添加签名信息
    var ossData = new FormData()
    ossData.append('OSSAccessKeyId', AuthMsg.accessKeyId)
    ossData.append('policy', AuthMsg.policy)
    ossData.append('Signature', AuthMsg.postSignature)
    ossData.append('key', ossKey)
    ossData.append('callback', AuthMsg.callback)
    ossData.append('file', arr[0].path)
    ossData.append('success_action_status', 200)
    $.ajax({
      url: AuthMsg.host,
      data: ossData,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(res) {
        callback(imgurl)
      },
      error: function(err) {
        console.log(err)
      }
    })
  }
}

// 时间格式化
function timeformat(time) {
  const re = {
    day: '',
    hour: '',
    minute: '',
    second: ''
  }
  re.day = Math.floor(time / 1000 / 60 / 60 / 24)
  re.hour = Math.floor((time / 1000 / 60 / 60) % 24).toString().padStart(2, '0')
  re.minute = Math.floor((time / 1000 / 60) % 60).toString().padStart(2, '0')
  re.second = Math.floor((time / 1000) % 60).toString().padStart(2, '0')
  return re
}

function icon(img) {
  return require('@/assets/diy/' + img)
}

function checkversionisv3(item) {
  var version = 'xm_mallv3'
  var version1 = 'xm_m'
  var version2 = 'allv3'
  var res = true
  if (item.v3) {
    if (version != (version1 + version2)) {
      res = false
    }
  }
  return res
}

// 打开对应模块属性项
function openAttr(arr, index) {
  arr.forEach((res, i) => {
    if (index == i) {
      res.open = true
    } else {
      res.open = false
    }
  })
}

// 展开
function openMore(arr, index) {
  arr[index].open = !arr[index].open
}

// 添加模块项
function addItem(arr, item) {
  const arr2 = JSON.stringify(item)
  arr.push(JSON.parse(arr2))
}

// 提示
function tips(text, type = 'success', time = 1500) {
  Message({
    type: type,
    message: text,
    center: true,
    duration: time
  })
}

export default {
  scrollTop,
  checkLogin,
  uploadImg,
  icon,
  timeformat,
  openAttr,
  tips,
  openMore,
  addItem,
  checkversionisv3
}
