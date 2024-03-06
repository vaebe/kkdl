import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUserDetails, userLoginOut } from '@/api/login';
import type { LoginResData, UserInfo } from '@/api/login';
import { resetObjToPrimitiveType } from '@/utils/tool';

const useUserStore = defineStore(
  'useUserStore',
  () => {
    const userInfo = reactive({
      id: '',
      email: '',
      wxId: 'string',
      nickName: '',
      accountType: '',
      role: '',
      avatar: ''
    });

    const loginResData = reactive({
      token: '',
      tokenExpire: '',
      userInfo
    });

    // 是否是管理员
    const isAdmin = computed(() => userInfo.role === '00');

    // 保存进入登录页面的路径实现从哪来回哪里去
    const enterTheLoginPagePath = ref('/');
    const setEnterTheLoginPagePath = (path: string): void => {
      enterTheLoginPagePath.value = path;
    };

    const router = useRouter();

    // 设置登录返回数据
    const setLoginResData = (data: LoginResData): void => {
      Object.assign(loginResData, data);
      Object.assign(userInfo, data.userInfo);

      if (isAdmin.value) {
        router.push('/dm');
      } else {
        const path = ['/login', '/register'].includes(
          enterTheLoginPagePath.value
        )
          ? '/dm'
          : enterTheLoginPagePath.value;
        router.push(path);
      }
    };

    // 获取用户信息
    const getUserInfo = (): UserInfo => {
      return loginResData.userInfo;
    };

    // 刷新用户信息
    const refreshUserInfo = (): void => {
      getUserDetails({ id: userInfo.id }).then((res) => {
        Object.assign(userInfo, res.data);
      });
    };

    const isLogin = computed(() => !!loginResData.userInfo.id);

    // 获取 token
    const getToken = (): string => {
      return loginResData.token;
    };

    // 清除登录信息
    const clearLoginInfo = async (): Promise<void> => {
      // 重置登录信息
      Object.assign(loginResData, resetObjToPrimitiveType(loginResData));
      Object.assign(userInfo, resetObjToPrimitiveType(userInfo));

      // 清除缓存的数据
      localStorage.clear();
      sessionStorage.clear();

      await router.push('/login');
    };

    // 退出登录
    const loginOut = async (): Promise<void> => {
      await userLoginOut();
      await clearLoginInfo();
    };

    return {
      userInfo,
      loginResData,
      setLoginResData,
      getUserInfo,
      getToken,
      clearLoginInfo,
      loginOut,
      isLogin,
      isAdmin,
      refreshUserInfo,
      setEnterTheLoginPagePath
    };
  },
  {
    persist: {
      enabled: true,
      // 将 userInfo 放到 sessionStorage 做持久化，不设置默认持久化全部数据
      strategies: [{ storage: sessionStorage, paths: ['loginResData'] }]
    }
  }
);

// 导出 store
export { useUserStore };
export default useUserStore;

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
