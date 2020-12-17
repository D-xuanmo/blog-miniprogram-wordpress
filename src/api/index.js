import request from '../request/index'

export default {
  // 获取公用数据
  getGlobalData () {
    return request.get('/wp-json/xm-blog/v1/info')
  },

  // 获取文章列表
  getArticleList (page) {
    return request.get('/wp-json/wp/v2/posts', {
      data: {
        page,
        per_page: 10,
        _embed: true
      }
    })
  },

  // 获取文章详情
  getArticleDetail (id) {
    return request.get(`/wp-json/wp/v2/posts/${id}`)
  },

  // 获取评论列表
  getCommentList (data) {
    return request.get('/wp-json/wp/v2/comments', {
      data
    })
  },

  // 更新阅读量
  updateViewCount (id) {
    return request.post('/wp-json/xm-blog/v1/view-count', {
      data: {
        id
      }
    })
  },

  // 点赞
  handlerLikes (articleId) {
    return request.post('/wp-json/xm-blog/v1/like', {
      data: {
        id: articleId,
        key: 'very_good'
      }
    })
  }
}
