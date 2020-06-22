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
            item.date = item.date.replace('T', ' ')
            item.content = item.content.rendered
              .replace(/(src=['"])\/wp-content\/uploads/gi, (match, $1) => `${$1}${app.globalData.site.domain}/wp-content/uploads`)
            return item
          })
        ]
      })
    }
  },

  methods: {
  }
})
