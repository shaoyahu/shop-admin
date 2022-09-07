import axios from '@/axios.js'
import { queryParams } from '@/composables/util'


// 获取所有商品评价信息 query
export function getGoodsCommentList(page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/goods_comment/${page}${r}`)
}

// 修改商品评价状态 body
export function updateGoodsCommentStatus(id, status) {
  return axios.post(`/admin/goods_comment/${id}/update_status`, {
    status
  })
}

// 回复商品评价 body
export function reviewGoodsComment(id, data) {
  return axios.post(`/admin/goods_comment/review/${id}`, { data })
}
