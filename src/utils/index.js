// 微信api转promise
export const promisify = (name, options) => {
  return new Promise((resolve, reject) => {
    wx[name]({
      ...options,
      success: res => resolve(res),
      fail: error => reject(error)
    })
  })
}
