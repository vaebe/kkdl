import type { LoginResData } from '@/api/login'
import { getUserDetails, userLoginOut } from '@/api/login'
import { resetObjToPrimitiveType } from '@/utils/tool'
import { cloneDeep } from 'lodash-es'

const defaultUserInfo = {
  id: '',
  email: '',
  wxId: '',
  nickName: '',
  accountType: '',
  role: '',
  avatar: '',
  createdAt: '',
  updatedAt: '',
  deletedAt: '',
}

const useUserStore = defineStore(
  'useUserStore',
  () => {
    const userInfo = reactive(cloneDeep(defaultUserInfo))

    const loginResData = reactive({
      token: '',
      tokenExpire: '',
      userInfo: cloneDeep(defaultUserInfo),
    })

    // 是否是管理员
    const isAdmin = computed(() => userInfo.role === '00')

    const router = useRouter()

    // 设置登录返回数据
    const setLoginResData = (data: LoginResData) => {
      Object.assign(loginResData, data)
      Object.assign(userInfo, data.userInfo)

      router.push('/shortUrl')
    }

    // 刷新用户信息
    const refreshUserInfo = (): void => {
      getUserDetails({ id: userInfo.id }).then((res) => {
        Object.assign(userInfo, res.data)
      })
    }

    const isLogin = computed(() => !!loginResData.userInfo.id)

    // 获取 token
    const getToken = (): string => {
      return loginResData.token
    }

    // 清除登录信息
    const clearLoginInfo = async () => {
      // 重置登录信息
      Object.assign(loginResData, resetObjToPrimitiveType(loginResData))
      Object.assign(userInfo, resetObjToPrimitiveType(userInfo))

      // 清除缓存的数据
      localStorage.clear()
      sessionStorage.clear()

      await router.push('/login')
    }

    // 退出登录
    const loginOut = async () => {
      await userLoginOut()
      await clearLoginInfo()
    }

    return {
      userInfo,
      loginResData,
      setLoginResData,
      getToken,
      clearLoginInfo,
      loginOut,
      isLogin,
      isAdmin,
      refreshUserInfo,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['loginResData', 'userInfo'],
    },
  },
)

// 导出 store
export { useUserStore }
export default useUserStore

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
