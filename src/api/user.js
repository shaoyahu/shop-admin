import axios from '@/axios.js'
import { queryParams } from '@/composables/util'


// 获取所有用户信息 query
export function getUserList(page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/user/${page}${r}`)
}

// 修改用户状态 body
export function updateUserStatus(id, status) {
  return axios.post(`/admin/user/${id}/update_status`, {
    status
  })
}

// 增加用户 body
export function createUser(data) {
  return axios.post(`/admin/user`, data)
}

// 修改用户 body
export function updateUser(id, data) {
  return axios.post(`/admin/user/${id}`, data)
}

// 删除用户 
export function deleteUser(id) {
  return axios.post(`/admin/user/${id}/delete`)
}
