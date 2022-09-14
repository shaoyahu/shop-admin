import axios from '@/axios.js'
import { queryParams } from '@/composables/util'

// 获取所有商品信息 query
export function getOrderList(page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/order/${page}${r}`)
}

// 删除商品 body
export function deleteOrder(ids) {
  return axios.post(`/admin/order/delete_all`, {
    ids
  })
}


// 导出订单 query
export function exportOrder(page, query = {}) {
  let r = queryParams(query)
  return axios.post(`/admin/order/excelexport${r}`, {}, {
    responseType: 'blob'
  })
}

// 查询物流信息
export function getShipInfo(id) {
  return axios.get(`/admin/order/${id}/get_ship_info`)
}

// 同意 \ 拒绝退款
export function refundOrder(id, data) {
  return axios.post(`/admin/order/${id}/handle_refund`, data)
}
