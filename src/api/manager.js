import axios from '@/axios.js'

// 管理员登录
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

// 修改密码
export function updatePassword(data) {
  return axios.post('/admin/updatepassword', data)
}
