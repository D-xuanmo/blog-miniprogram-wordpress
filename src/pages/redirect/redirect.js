Page({
  onLoad (options) {
    if (JSON.stringify(options) === '{}') {
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      const navigatorType = ['switchTab', 'reLaunch', 'redirectTo', 'navigateTo', 'navigateBack']
      const { url, type = 'navigateTo' } = options
      if (!url) throw new Error('跳转url不能为空')
      if (navigatorType.indexOf(type) === -1) throw new Error(`跳转类型错误，类型只包含[${navigatorType}]`)
      wx[type]({ url })
    }
  }
})
