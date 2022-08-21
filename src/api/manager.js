import axios from '@/axios.js'
import { queryParams } from '@/composables/util'


// 管理员登录 body
export function login(username, password) {
  return axios.post('/admin/login', {
    username,
    password
  })
}

// 获取管理员信息和权限菜单
export function getInfo() {
  return axios.post('/admin/getinfo')
}

// 退出登录
export function logout() {
  return axios.post('/admin/logout')
}

// 修改密码 body
export function updatePassword(data) {
  return axios.post('/admin/updatepassword', data)
}

// 获取所有管理员信息 query
export function getManagerList(page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/manager/${page}${r}`)
}

// 修改管理员状态 body
export function updateManagerStatus(id, status) {
  return axios.post(`/admin/manager/${id}/update_status`, {
    status
  })
}

// 增加管理员 body
export function createManager(data) {
  return axios.post(`/admin/manager`, data)
}

// 修改管理员 body
export function updateManager(id, data) {
  return axios.post(`/admin/manager/${id}`, data)
}

// 删除管理员 
export function deleteManager(id) {
  return axios.post(`/admin/manager/${id}/delete`)
}
