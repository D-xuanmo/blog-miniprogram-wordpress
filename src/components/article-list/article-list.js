import API from '../../api/index'

Component({
  properties: {
    autoRequest: {
      type: Boolean,
      value: true
    },

    isLoadMore: {
      type: Boolean,
      value: false
    },

    isReload: {
      type: Boolean,
      value: false
    },

    queryKeywords: {
      type: String,
      value: ''
    }
  },

  observers: {
    isLoadMore (value) {
      if (value) {
        this.setData({
          loadingMore: true
        })
        this.getArticleList(true)
      }
    },

    isReload (value) {
      if (value) {
        this.setData({
          currentPage: 1,
          totalPage: null,
          noMore: false,
          articleList: []
        })
        this.getArticleList()
      }
    }
  },

  data: {
    articleList: [],
    currentPage: 1,
    totalPage: null,
    noMore: false,
    loadingMore: false
  },

  attached () {
    this.properties.autoRequest && this.getArticleList()
  },

  methods: {
    async getArticleList (isLoadMore = false) {
      if (isLoadMore) {
        this.setData({
          currentPage: this.data.currentPage + 1
        })
      }

      // 是否为最后一页
      if (this.data.totalPage && this.data.currentPage > this.data.totalPage) {
        this.setData({
          loadingMore: false,
          noMore: true
        })
        return
      }

      let { data, header } = await API.getArticleList({
        page: this.data.currentPage,
        search: this.properties.queryKeywords
      })
      wx.hideLoading()
      this.setData({
        loadingMore: false
      })

      this.setData({
        articleList: [...this.data.articleList, ...data],
        totalPage: +header['X-WP-TotalPages']
      })
      this.triggerEvent('loaded')
    },

    goDetail ({ currentTarget }) {
      const id = currentTarget.dataset.link.match(/\d+$/)[0]
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}`,
      })
    }
  }
})
