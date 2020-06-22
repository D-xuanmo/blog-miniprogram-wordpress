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
    let { data } = await wx.$request.get('/wp-json/xm-blog/v1/info')
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
  },

  goDetail ({ currentTarget }) {
    const id = currentTarget.dataset.link.match(/\d+$/)[0]
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  }
})
