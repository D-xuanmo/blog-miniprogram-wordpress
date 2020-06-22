import { REQUEST_BASE_URL, REQUEST_TIMEOUT } from '../utils/const'

// 微信request文档：https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
class Request {
  constructor () {
    this.defaultOptions = {
      header: {
        'COntent-Type': 'application/json'
      },
      method: 'GET',
      data: null,
      timeout: REQUEST_TIMEOUT * 1000,
      dataType: 'json',
      responseType: 'text'
    }
  }

  _success (res) {
    return res
  }

  _fail (message) {
    wx.$promisify('showToast', {
      title: message,
      icon: 'none'
    })
    new Error(JSON.stringify({
      message
    }))
  }

  _request (url, options) {
    return new Promise((resolve, reject) => {
      wx.$promisify('request', {
        ...this.defaultOptions,
        ...options,
        url: `${REQUEST_BASE_URL}${url}`
      }).then(res => {
        resolve(this._success(res))
      }).catch(error => {
        this._fail(error)
        reject(error)
      })
    })
  }

  get (url, options) {
    return this._request(url, options)
  }

  post (url, options) {
    return this._request(url, {
      ...options,
      method: 'POST'
    })
  }

  // 请求如果不是GET/POST调用此方法
  request (url, options) {
    return this._request(url, options)
  }
}

export default new Request()
