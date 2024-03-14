import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import dataManagementRouter from './dataManagement.ts'
import { useUserStore } from '@/stores'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    redirect: (to: RouteLocationNormalized) => {
      return `${to.path}url`
    },
    component: () => import('@/views/layout/baseLayout.vue'),
    children: [
      {
        path: 'url',
        name: 'create-short-url',
        meta: {
          title: '创建短链',
        },
        component: () => import('@/views/shortUrl.vue'),
      },
      dataManagementRouter,
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册',
    },
    component: () => import('@/views/login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()

  // 未登录用户不能进入数据管理页面
  if (to.fullPath.startsWith('/dm')) {
    if (userStore.isLogin) {
      next()
    }
    else {
      ElMessage.warning('请先登录！')
      next('/')
    }
  }
  else {
    next()
  }
})

export default router
