import axios from 'axios'
import { toast } from '@/composables/util.js'
import {
  getToken
} from '@/composables/auth'
import store from './store'

const service = axios.create({
  baseURL: '/api'
})

// 请求拦截器
service.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 往header头自动添加token
  const token = getToken()
  if(token) {
    config.headers['token'] = token
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data.data;
}, function (error) {
  // Do something with response error
  const msg = error.response.data.msg || '请求失败'
  if(msg == '非法token,请先登录！'){
    store.dispatch('logout').finally(() => {
      location.reload()
    })
  }
  toast(error.response.data.msg || '请求失败', 'error')
  return Promise.reject(error);
});

export default service