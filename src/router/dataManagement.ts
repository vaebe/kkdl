import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

const router: RouteRecordRaw = {
  path: 'dm',
  name: 'dm',
  meta: {
    title: '数据管理',
  },
  redirect: (to: RouteLocationNormalized) => {
    return `${to.path}/short-url`
  },
  component: () => import('@/views/layout/dataManagementLayout.vue'),
  children: [
    {
      path: 'short-url',
      name: 'backstage-short-url',
      meta: {
        title: '短链管理',
      },
      component: () => import('@/views/dataManagement/shortUrl/index.vue'),
    },
    {
      path: 'user',
      name: 'backstage-user',
      meta: {
        title: '用户管理',
        role: ['admin'],
      },
      component: () => import('@/views/dataManagement/user/index.vue'),
    },
  ],
}

export default router
