import { createRouter, createWebHistory, RouteRecordRaw, useRouter } from 'vue-router'
import data from '../config/navData.json'
import useStore from '../store'
import { checkToken, infoRequest } from '../utils/utils';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/Home.vue"),
    children: exportChild(),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      // 如果可已经登录则跳转到首页
      checkToken((res: any) => {
        if (res.data.data) {
          router.push('/')
        } else {
          next();
        }
      })
    }
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('../views/Article.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  },
  {
    path: "/:pathMath(.*)", // 此处需特别注意置于最底部
    redirect: "/notfound"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * 处理页面配置数据
 * @returns 返回RouteRecordRaw数组 => 为子路由数据
 */
function exportChild(): RouteRecordRaw[] | undefined {
  const childArray: RouteRecordRaw[] = []
  data.forEach((item) => {
    var temp = {
      path: item.path,
      name: item.name,
      component: () => import(/* @vite-ignore */item.componentPath)
    }
    childArray.push(temp)
  })
  return childArray
}

export default router



