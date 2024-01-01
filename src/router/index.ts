import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores';

// 保存进入登录页面的路径
const saveEnterTheLoginPagePath = (path: string): void => {
  const { setEnterTheLoginPagePath } = useUserStore();
  setEnterTheLoginPagePath(path);
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    redirect: (to: RouteLocationNormalized) => {
      return `${to.path}login`;
    },
    component: () => import('@/components/ViewComponent.vue'),
    children: []
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    beforeEnter: (_to, from) => {
      saveEnterTheLoginPagePath(from.fullPath);
      return true;
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    beforeEnter: (_to, from) => {
      saveEnterTheLoginPagePath(from.fullPath);
      return true;
    },
    component: () => import('@/views/login/index.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore();

  // 进入后台管理页面 是管理员直接方形，否则提示并导航到首页
  if (to.fullPath.includes('backstage')) {
    if (userStore.isAdmin) {
      next();
    } else {
      ElMessage.warning('您没有权限进入！');
      next('/');
    }
  } else {
    next();
  }
});

export default router;
