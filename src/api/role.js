import axios from '@/axios.js'

// 获取所有角色
export function getRoleList(page, params) {
  return axios.get(`/admin/role/${page}`, params)
}

// 新增角色 body
export function createRole(data) {
  return axios.post(`/admin/role`, data)
}

// 删除角色
export function deleteRole(id) {
  return axios.post(`/admin/role/${id}/delete`)
}

// 修改角色 body
export function updateRole(id, data) {
  return axios.post(`/admin/role/${id}`, data)
}

// 修改角色状态 body
export function updateRoleStatus(id, status) {
  return axios.post(`/admin/role/${id}/update_status`, { status })
}

// 配置角色权限 body
export function setRoleRules(id, rule_ids) {
  return axios.post(`/admin/role/set_rules`, { id, rule_ids })
}

