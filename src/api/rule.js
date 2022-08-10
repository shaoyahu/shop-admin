import axios from '@/axios.js'

// 获取所有菜单权限
export function getRuleList(page) {
  return axios.get(`/admin/rule/${page}`)
}

// 创建菜单权限 body
export function createRule(data) {
  return axios.post(`/admin/rule`, data)
}

// 更新菜单权限 body
export function updateRule(id, data) {
  return axios.post(`/admin/rule/${id}`, data)
}

// 删除菜单权限
export function deleteRule(id) {
  return axios.post(`/admin/rule/${id}/delete`)
}

// 修改菜单权限 body
export function updateRuleStatus(id, status) {
  return axios.post(`/admin/rule/${id}/update_status`, { status })
}

