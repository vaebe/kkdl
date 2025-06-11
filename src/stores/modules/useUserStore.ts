import type { LoginResData } from '@/api/login'
import { cloneDeep } from 'lodash-es'
import { getUserDetails, userLoginOut } from '@/api/login'

const useUserStore = defineStore(
  'useUserStore',
  () => {
    const [userInfo, resetUserInfo] = useResetReactive({
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
    })

    const [tokenInfo, resetTokenInfo] = useResetReactive({
      token: '',
      tokenExpire: '',
    })

    // 是否是管理员
    const isAdmin = computed(() => userInfo.role === '00')

    const router = useRouter()

    // 设置登录返回数据
    const setLoginResData = (data: LoginResData) => {
      tokenInfo.token = data.token
      tokenInfo.tokenExpire = data.tokenExpire

      Object.assign(userInfo, data.userInfo)

      router.push('/shortUrl')
    }

    // 刷新用户信息
    const refreshUserInfo = (): void => {
      getUserDetails({ id: userInfo.id }).then((res) => {
        Object.assign(userInfo, res.data)
      })
    }

    const isLogin = computed(() => !!userInfo.id)

    // 获取 token
    const getToken = () => tokenInfo.token

    // 清除登录信息
    const clearLoginInfo = () => {
      // 重置登录信息
      resetUserInfo()
      resetTokenInfo()

      // 清除缓存的数据
      localStorage.clear()
      sessionStorage.clear()

      router.push('/login')
    }

    // 退出登录
    const loginOut = () => {
      // 去除对象的引用-否则下边 clearLoginInfo 执行后 token 是 ''
      userLoginOut({ token: cloneDeep(tokenInfo).token })
      clearLoginInfo()
    }

    return {
      userInfo,
      setLoginResData,
      getToken,
      clearLoginInfo,
      loginOut,
      isLogin,
      isAdmin,
      tokenInfo,
      refreshUserInfo,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['userInfo', 'tokenInfo'],
    },
  },
)

export { useUserStore }

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
