import axios from '@/axios.js'

export function getImageList(id, page = 1, limit = 10) {
  return axios.get(`/admin/image_class/${id}/image/${page}?limit=${limit}`)
}


