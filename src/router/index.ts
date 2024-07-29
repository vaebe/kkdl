import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/modules/useUserStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'base',
    redirect: (to: RouteLocationNormalized) => {
      return `${to.path}login`
    },
    component: () => import('@/views/layout/baseLayout.vue'),
    children: [
      {
        path: 'shortUrl',
        name: 'shortUrl',
        meta: {
          title: '短链管理',
        },
        component: () => import('@/views/shortUrl/index.vue'),
      },
      {
        path: 'shortUrlVisits',
        name: 'shortUrlVisits',
        meta: {
          title: '短链信息管理',
        },
        component: () => import('@/views/shortUrlVisits/index.vue'),
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '用户管理',
          role: ['admin'],
        },
        component: () => import('@/views/user/index.vue'),
      },
    ],
  },
  {
    path: '/analytics',
    name: 'analytics',
    meta: {
      title: '统计分析',
    },
    component: () => import('@/views/analytics/index.vue'),
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
    component: () => import('@/views/register.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
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
