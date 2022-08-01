import axios from '@/axios.js'

// 获取所有公告
export function getNoticeList(page, params) {
  return axios.get(`/admin/notice/${page}`, params)
}

// 新增公告
export function createNotice(data) {
  return axios.post(`/admin/notice`, data)
}

// 删除公告
export function deleteNotice(id) {
  return axios.post(`/admin/notice/${id}/delete`)
}

// 修改公告
export function updateNotice(id, data) {
  return axios.post(`/admin/notice/${id}`, data)
}