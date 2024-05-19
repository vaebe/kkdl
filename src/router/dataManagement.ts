import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

const router: RouteRecordRaw = {
  path: 'dm',
  name: 'dm',
  meta: {
    title: '数据管理',
  },
  redirect: (to: RouteLocationNormalized) => {
    return `${to.path}/shortUrl`
  },
  component: () => import('@/views/layout/dmLayout.vue'),
  children: [
    {
      path: 'user',
      name: 'backstage.user',
      meta: {
        title: '用户管理',
        role: ['admin'],
      },
      component: () => import('@/views/dataManagement/user/index.vue'),
    },
    {
      path: 'shortUrl',
      name: 'backstage.shortUrl',
      meta: {
        title: '短链管理',
      },
      component: () => import('@/views/dataManagement/shortUrl/index.vue'),
    },
    {
      path: 'shortUrlVisits',
      name: 'backstage.shortUrlVisits',
      meta: {
        title: '短链信息管理',
      },
      component: () => import('@/views/dataManagement/shortUrlVisits/index.vue'),
    },
  ],
}

export default router
