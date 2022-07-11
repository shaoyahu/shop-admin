
// 将所有和cookie有关的操作都封装在这个文件里，默认为存储token，键名为 admin_token

import { useCookies } from "@vueuse/integrations/useCookies";
const TokenKey = 'admin_token'
const cookie = useCookies()

// 获取token
export function getToken() {
  return cookie.get(TokenKey)
}
// 设置token
export function setToken(token) {
  return cookie.set(TokenKey, token)
}
// 清除token
export function removeToken() {
  return cookie.remove(TokenKey)
}
