import API from '../../api/index'
const app = getApp()

Page({
  data: {
    notice: '',
    banner: [],
    articleList: [],
    currentPage: 1,
    totalPage: null,
    noMore: false,
    loadingMore: false
  },

  async onLoad () {
    wx.showLoading({
      title: '加载中...',
    })
    await this.getGlobalInfo()
    await this.getArticleList()
    wx.hideLoading()
  },

  async onReachBottom () {
    this.setData({
      currentPage: this.data.currentPage + 1,
      loadingMore: true
    })
    await this.getArticleList()
    this.setData({
      loadingMore: false
    })
  },

  async onPullDownRefresh () {
    this.setData({
      currentPage: 1,
      totalPage: null,
      noMore: false,
      articleList: []
    })
    await this.getArticleList()
    wx.stopPullDownRefresh()
  },

  async getGlobalInfo () {
    let { data } = await API.getGlobalData()
    app.globalData.site = data
    this.setData({
      banner: data.banner.list,
      notice: data.notice
    })
  },

  async getArticleList () {
    if (this.data.totalPage && this.data.currentPage > this.data.totalPage) {
      this.setData({
        noMore: true
      })
      return
    }
    let { data, header } = await API.getArticleList(this.data.currentPage)
    this.setData({
      articleList: [...this.data.articleList, ...data],
      totalPage: +header['x-wp-totalpages']
    })
  },

  goDetail ({ currentTarget }) {
    const id = currentTarget.dataset.link.match(/\d+$/)[0]
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  }
})
