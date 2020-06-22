import { promisify } from './utils/index'
import datejs from './utils/date'
import request from './request/index'

App({
  onLaunch () {
    wx.$promisify = promisify
    wx.$date = datejs
    wx.$request = request
  },

  globalData: {
    isFirst: true,
    site: null
  }
})
