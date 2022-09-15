import axios from '@/axios.js'


// 获取图库内容
export function getImageList(id, page = 1, limit = 10) {
  return axios.get(`/admin/image_class/${id}/image/${page}?limit=${limit}`)
}


// 删除图片
export function deleteImage(ids) {
  return axios.post(`/admin/image/delete_all`, { ids })
}

// 修改图片名称
export function updateImage(id, name) {
  return axios.post(`/admin/image/${id}`, { name })
}

// 新增图片
export const uploadImageAction = import.meta.env.VITE_APP_BASE_API + '/admin/image/upload'