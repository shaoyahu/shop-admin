import axios from '@/axios.js'


// 获取所有商品分类
export function getCategoryList(){
  return axios.get(`/admin/category`)
}