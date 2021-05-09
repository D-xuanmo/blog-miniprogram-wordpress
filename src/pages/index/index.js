import API from '../../api/index'
const app = getApp()

Page({
  data: {
    notice: '',
    banner: [],
    isLoadMore: false,
    isReloadList: false
  },

  onLoad () {
    wx.showLoading({
      title: '加载中...',
    })
    this.getGlobalInfo()
  },

  async onReachBottom () {
    this.setData({
      isLoadMore: true
    })
  },

  async onPullDownRefresh () {
    this.setData({
      isReloadList: true
    })
  },

  async getGlobalInfo () {
    let { data } = await API.getGlobalData()
    app.globalData.site = data
    this.setData({
      banner: data.banner.list,
      notice: data.notice
    })
  },

  updateLoadMoreState () {
    this.setData({
      isLoadMore: false,
      isReloadList: false
    })
    wx.stopPullDownRefresh()
  }
})
