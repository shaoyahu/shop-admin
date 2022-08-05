import axios from '@/axios.js'

// 获取所有菜单权限
export function getRuleList(page) {
  return axios.get(`/admin/rule/${page}`)
}

// 创建菜单权限 body
export function createRule(data) {
  return axios.post(`/admin/rule`, data)
}

// 更新菜单权限
export function updateRule(id, data) {
  return axios.post(`/admin/rule/${id}`, data)
}

