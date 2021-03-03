const app = getApp()

Component({
  properties: {
    data: {
      type: Array,
      value: []
    }
  },

  data: {
    list: []
  },

  observers: {
    data (val) {
      this.setData({
        list: [
          ...this.data.list,
          ...val.map(item => {
            item.firstName = item.author_name.substr(0, 1)
            item.date = item.date.replace('T', ' ')
            item.content = item.content.rendered
              .replace(/(src=['"])\/wp-content\/uploads/gi, (match, $1) => `${$1}${app.globalData.site.domain}/wp-content/uploads`)
            return item
          })
        ]
      })
    }
  },

  attached () {
    this.setData({
      isTextThumbnail: app.globalData.site.isOpenTextThumbnail
    })
  }
})
