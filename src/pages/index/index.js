const app = getApp()

Page({
  data: {
    notice: '',
    banner: [],
    articleList: [],
    currentPage: 1,
    totalPage: null,
    noMore: false
  },

  async onLoad () {
    await this.getGlobalInfo()
    await this.init()
  },

  async init () {
    wx.showLoading({
      title: '加载中...',
    })
    await this.getArticleList()
    wx.hideLoading()
  },

  async onReachBottom () {
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    this.init()
  },

  async getGlobalInfo () {
    wx.showLoading({
      title: '加载中...',
    })
    let { data } = await wx.$request.get('/wp-json/xm-blog/v1/info')
    wx.hideLoading()
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
    let { data, header } = await wx.$request.get('/wp-json/wp/v2/posts', {
      data: {
        page: this.data.currentPage,
        per_page: 10,
        _embed: true
      }
    })
    this.setData({
      articleList: [...this.data.articleList, ...data],
      totalPage: +header['X-WP-TotalPages']
    })
  }
})
