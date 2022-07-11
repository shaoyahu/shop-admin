
// 处理权限验证相关内容 包括未登录自动打回登录页面等

import { router, addRoutes } from '@/router/index.js'
import { getToken } from '@/composables/auth.js'
import { toast, showFullLoading, hideFullLoading } from '@/composables/util.js'
import store from './store'

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 显示loading
  showFullLoading()

  const token = getToken()

  // 没有登录强制跳转回登录页
  if (!token && to.path != '/login') {
    toast('请先登录', 'error')
    return next({ path: '/login' })
  }

  // 防止重复登录判断
  if (token && to.path == '/login') {
    toast('请勿重复登录', 'error')
    return next({ path: from.path ? from.path : '/' })
  }

  let hasNewRoutes = false
  // 如果用户登录了，就自动获取用户信息并存储在vuex中
  if (token) {
    let { menus } = await store.dispatch('getinfo')
    console.log(menus)
    // 动态添加路由
    hasNewRoutes = addRoutes(menus)
  }

  // 设置页面标题
  let title = (to.name ? to.name : to.meta.name) + '--商城后台'
  document.title = title

  hasNewRoutes ? next(to.fullPath) : next()
})

// 全局后置守卫
router.afterEach((to, from) => {
  hideFullLoading()
})