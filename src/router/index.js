import { createRouter, createWebHashHistory } from 'vue-router'

// 默认路由，所有用户共享
const routes = [
  {
    path: '/',
    name: 'admin',
    component: () => import('@/layout/admin.vue'),
    // 使用该布局的页面都需要放在这个子路由下方
  },
  {
    path: '/login',
    component: () => import('@/pages/login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/404.vue'),
    meta: {
      title: '找不到了啊'
    }
  }
]

// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [{
  path: '/',
  name: '/',
  component: () => import('@/pages/index.vue'),
  meta: {
    title: '后台首页'
  }
}, {
  path: '/goods/list',
  name: '/goods/list',
  component: () => import('@/pages/goods/list.vue'),
  meta: {
    title: '商品管理'
  }
}, {
  path: '/category/list',
  name: '/category/list',
  component: () => import('@/pages/category/list.vue'),
  meta: {
    title: '分类列表'
  }
}, {
  path: '/user/list',
  name: '/user/list',
  component: () => import('@/pages/user/list.vue'),
  meta: {
    title: '用户列表'
  }
}, {
  path: '/order/list',
  name: '/order/list',
  component: () => import('@/pages/order/list.vue'),
  meta: {
    title: '订单列表'
  }
}, {
  path: '/comment/list',
  name: '/comment/list',
  component: () => import('@/pages/comment/list.vue'),
  meta: {
    title: '评价列表'
  }
}, {
  path: '/image/list',
  name: '/image/list',
  component: () => import('@/pages/image/list.vue'),
  meta: {
    title: '图库列表'
  }
}, {
  path: '/notice/list',
  name: '/notice/list',
  component: () => import('@/pages/notice/list.vue'),
  meta: {
    title: '公告列表'
  }
}, {
  path: '/coupon/list',
  name: '/coupon/list',
  component: () => import('@/pages/coupon/list.vue'),
  meta: {
    title: '优惠券列表'
  }
}, {
  path: '/setting/base',
  name: '/setting/base',
  component: () => import('@/pages/setting/base.vue'),
  meta: {
    title: '配置'
  }
}]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 动态添加路由的方法
export function addRoutes(menus) {
  // 是否有新的路由
  let hasNewRoutes = false
  const findAndAddRoutesByMenus = (arr) => {
    arr.forEach(e => {
      // let item = asyncRoutes.find(o => o.path== e.frontpath)
      let item = asyncRoutes.find(o => {
        return o.path == e.frontpath
      })
      if (item && !router.hasRoute(item.path)) {
        router.addRoute('admin', item)
        hasNewRoutes = true
      }
      if (e.child && e.child.length > 0) {
        findAndAddRoutesByMenus(e.child)
      }
    })
  }
  findAndAddRoutesByMenus(menus)
  return hasNewRoutes
}