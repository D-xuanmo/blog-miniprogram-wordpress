import { promisify } from './utils/index'
import datejs from './utils/date'
import request from './request/index'

App({
  onLaunch () {
    wx.$promisify = promisify
    wx.$date = datejs
    wx.$request = request
    this.getGlobalInfo()
  },

  globalData: {
    userInfo: null,
    site: {}
  },

  async getGlobalInfo () {
    wx.showLoading({
      title: '加载中...',
    })
    let { data } = await wx.$request.get('/wp-json/xm-blog/v1/info')
    wx.hideLoading()
    this.globalData.site = data

    // 执行首页的回调
    typeof this.indexOnLoad === 'function' && this.indexOnLoad(data)
  },
})
