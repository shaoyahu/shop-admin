import axios from '@/axios.js'

// 获取商品规格
export function getSkusList(page, params) {
  return axios.get(`/admin/skus/${page}`, params)
}

// 新增规格 body
export function createSkus(data) {
  return axios.post(`/admin/skus`, data)
}

// 批量删除规格 body
export function deleteSkus(ids) {
  ids = !Array.isArray(ids) ? [ids] : ids
  return axios.post(`/admin/skus/delete_all`, { ids })
}

// 修改商品规格 body
export function updateSkus(id, data) {
  return axios.post(`/admin/skus/${id}`, data)
}

// 修改商品规格状态 body
export function updateSkusStatus(id, status) {
  return axios.post(`/admin/skus/${id}/update_status`, { status })
}

