import axios from '@/axios.js'
import { queryParams } from '@/composables/util'


// 分销数据统计
export function getAgentStatistics() {
  return axios.get(`admin/agent/statistics`)
}


// 推广订单列表 query
export function getAgentOrderList(page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/user_bill/${page}${r}`)
}

// 分销推广员列表 query
export function getAgentList(page, query = {}) {
  let r = queryParams(query)
  return axios.get(`/admin/agent/${page}${r}`)
}



// 获取分销配置
export function getConfig() {
  return axios.get(`/admin/distribution_setting/get`)
}

// 修改分销配置
export function setConfig(data) {
  return axios.post(`/admin/distribution_setting/set`, data)
}
