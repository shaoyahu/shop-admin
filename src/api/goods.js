import axios from '@/axios.js'
import { queryParams } from '@/composables/util'

// 获取所有商品信息 query
export function getGoodsList(page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/goods/${page}${r}`)
}

// 修改商品状态,批量上架下架 body
export function updateGoodsStatus(ids, status) {
  return axios.post(`/admin/goods/changestatus`, {
    ids,
    status
  })
}

// 增加商品 body
export function createGoods(data) {
  return axios.post(`/admin/goods`, data)
}

// 修改商品 body
export function updateGoods(id, data) {
  return axios.post(`/admin/goods/${id}`, data)
}

// 删除商品 body
export function deleteGoods(ids) {
  return axios.post(`/admin/goods/delete_all`, {
    ids
  })
}

// 查看商品资料
export function readGoods(id) {
  return axios.get(`/admin/goods/read/${id}`)
}


// 设置商品轮播图
export function setGoodsBanner(id, data) {
  return axios.post(`/admin/goods/banners/${id}`, data)
}

// 修改商品规格 body
export function updateGoodsSkus(id, data) {
  return axios.post(`/admin/goods/updateskus/${id}`, data)
}

// 添加商品规格 body
export function createGoodsSkusCard(data) {
  return axios.post(`/admin/goods_skus_card`, data)
}

// 修改商品规格 body
export function updateGoodsSkusCard(id, data) {
  return axios.post(`/admin/goods_skus_card/${id}`, data)
}


// 删除商品选项 body
export function deleteGoodsSkusCard(id) {
  return axios.post(`/admin/goods_skus_card/${id}/delete`)
}

// 排序商品选项 body
export function sortGoodsSkusCard(data) {
  return axios.post(`/admin/goods_skus_card/sort`, data)
}




