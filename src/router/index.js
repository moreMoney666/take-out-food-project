import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/AAA/Home'),
      meta: { title: '首页', icon: '' }
    }]
  },

  {
    path: '/food',
    component: Layout,
    redirect: '/food/searchFood',
    name: 'Food',
    meta: { title: '食品管理', icon: '' },
    children: [
      {
        path: 'searchFood',
        name: 'SearchFood',
        component: () => import('@/views/AAA/Food/searchFood'),
        meta: { title: '搜索食品', icon: '' }
      },
      {
        path: 'addFood',
        name: 'AddFood',
        component: () => import('@/views/AAA/Food/addFood'),
        meta: { title: '增加食品', icon: '' }
      },
      {
        path: 'foodList',
        name: 'FoodList',
        component: () => import('@/views/AAA/Food/foodList'),
        meta: { title: '食品列表', icon: '' }
      }
    ]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  {
    path: '/card',
    component: Layout,
    redirect: '/card/cartList',
    name: 'Cart',
    meta: {
      title: '购物车',
      icon: ''
    },
    children: [
      {
        path: 'cartList',
        component: () => import('@/views/AAA/Card/cardList'), // Parent router-view
        name: 'CardList',
        meta: { title: '购物车列表' },
 
      },
      {
        path: 'addGood',
        component: () => import('@/views/AAA/Card/addGood'),
        name: 'AddGood',
        meta: { title: '添加商品' }
      },
      {
        path: 'address',
        component: () => import('@/views/AAA/Card/address'),
        name: 'Address',
        meta: { title: '地址信息' }
      }
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router