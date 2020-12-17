import API from '../../api/index'

Page({
  data: {
    article: {},
    articleId: null,
    viewCount: 0,

    currentPage: 1,
    totalPage: 0,
    total: 0,
    commentList: [],
    noMore: false,
    loadingMore: false,

    showLikeLoading: false,
    liked: false
  },

  async onLoad ({ id }) {
    // 获取当前文章是否已经点赞
    try {
      let { data } = await wx.$promisify('getStorage', {
        key: `like_${id}`
      })
      this.setData({
        liked: +data
      })
    } catch (e) {
      this.setData({
        liked: 0
      })
    }
    wx.showShareMenu()
    this.setData({
      articleId: id
    })
    wx.showLoading({
      title: '加载中...'
    })
    await this.getDetail(id)
    await this.getCommentList(id)
    await this.updateViewCount(id)
    wx.hideLoading()
  },

  async onReachBottom () {
    this.setData({
      currentPage: this.data.currentPage + 1,
      loadingMore: true
    })
    await this.getCommentList(this.data.articleId)
    this.setData({
      loadingMore: false
    })
  },

  async getDetail (id) {
    let { data } = await API.getArticleDetail(id)
    const content = data.content.rendered
      .replace(/<img/gi, '<img style="max-width:100%;height:auto;"')
      .replace(/<code/gi, '<code class="code"')
      .replace(/<pre/gi, '<pre style="overflow:scroll;margin: 10px 0;padding: 10px;background: #f8f8f8;border-radius: 5px;"')
      .replace(/<blockquote/gi, '<blockquote class="blockquote"')
      .replace(/<h2/gi, '<h2 class="content-title"')
      .replace(/<a/gi, '<a bindtap="test"')

    this.setData({
      article: {
        ...data,
        date: data.date.replace('T', ' '),
        author: data.articleInfor.author,
        authorPic: data.articleInfor.other.authorPic,
        commentCount: data.articleInfor.commentCount,
        goodCount: data.articleInfor.xmLike.very_good,
        content
      }
    })
  },

  async getCommentList (id) {
    if (this.data.totalPage && this.data.currentPage > this.data.totalPage) {
      this.setData({
        noMore: true
      })
      return
    }
    let { data, header } = await API.getCommentList({
      post: id,
      page: this.data.currentPage
    })
    this.setData({
      commentList: data,
      total: +header['X-WP-Total'],
      totalPage: +header['X-WP-TotalPages']
    })
  },

  async updateViewCount (id) {
    let { data } = await API.updateViewCount(id)
    this.setData({
      viewCount: data
    })
  },

  async handlerLikes () {
    if (this.data.liked) return
    wx.vibrateShort()
    this.setData({
      showLikeLoading: true
    })
    let { data } = await API.handlerLikes(this.data.articleId)
    this.setData({
      showLikeLoading: false,
      ['article.goodCount']: data.very_good,
      liked: 1
    })
    wx.$promisify('setStorage', {
      key: `like_${this.data.articleId}`,
      data: 1
    })
  }
})
