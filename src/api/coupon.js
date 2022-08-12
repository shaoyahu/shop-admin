import axios from '@/axios.js'

// 获取所有优惠券
export function getCouponList(page, params) {
  return axios.get(`/admin/coupon/${page}`, params)
}

// 新增优惠券 body
export function createCoupon(data) {
  return axios.post(`/admin/coupon`, data)
}

// 删除优惠券
export function deleteCoupon(id) {
  return axios.post(`/admin/coupon/${id}/delete`)
}

// 修改优惠券 body
export function updateCoupon(id, data) {
  return axios.post(`/admin/coupon/${id}`, data)
}

// 失效优惠券状态 body
export function updateCouponStatus(id) {
  return axios.post(`/admin/coupon/${id}/update_status`, { status: 0 })
}
