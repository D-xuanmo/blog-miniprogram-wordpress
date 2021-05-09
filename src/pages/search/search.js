Page({
  data: {
    keywords: '',
    isSearch: false,
    isLoadMore: false
  },

  async onReachBottom () {
    this.setData({
      isLoadMore: true
    })
  },

  search ({ detail }) {
    wx.showLoading({
      title: '搜索中...',
    })
    this.setData({
      isSearch: true,
      keywords: detail.value
    })
  },

  onLoaded () {
    wx.hideLoading()
    this.setData({
      isLoadMore: false
    })
  }
})
