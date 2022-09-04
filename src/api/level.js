import axios from '@/axios.js'

// 获取会员等级列表
export function getUserLevelList(page, params) {
  return axios.get(`/admin/user_level/${page}`, params)
}

// 增加会员等级 body
export function createUserLevel(data) {
  return axios.post(`/admin/user_level`, data)
}

// 删除会员等级
export function deleteUserLevel(id) {
  return axios.post(`/admin/user_level/${id}/delete`)
}

// 修改会员等级 body
export function updateUserLevel(id, data) {
  return axios.post(`/admin/user_level/${id}`, data)
}

// 修改会员等级状态 body
export function updateUserLevelStatus(id, status) {
  return axios.post(`/admin/user_level/${id}/update_status`, { status })
}
