const app = getApp()

Page({
  data: {
    appName: '',
    appVersion: '1.0.0'
  },
  onLoad () {
    this.setData({
      appName: app.globalData.site.blogName,
      articleCount: app.globalData.site.getAllCountArticle,
      archiveCount: app.globalData.site.getAllCountCat,
      commentCount: app.globalData.site.getAllCountComment,
      tagCount: app.globalData.site.getAllCountTag,
      domain: app.globalData.site.domain
    })
  },
  copyText ({ target }) {
    wx.$promisify('setClipboardData', {
      data: target.dataset.text
    })
  }
})
