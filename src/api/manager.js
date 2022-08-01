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

// 获取所有管理员信息
export function getManagerList(page, query = {}) {
  let q = []
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`)
    }
  }
  let r = q.join('&')
  r = r ? ('?' + r) : ''
  return axios.get(`/admin/manager/${page}${r}`)
}