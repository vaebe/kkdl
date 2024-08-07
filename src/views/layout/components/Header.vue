<script setup lang="ts">
const ThemeSwitch = defineAsyncComponent(
  () => import('@/components/ThemeSwitch.vue'),
)

const { VITE_APP_TITLE } = import.meta.env

const userStore = useUserStore()
const { userInfo, isLogin, isAdmin } = storeToRefs(userStore)
const { loginOut } = userStore

const router = useRouter()
const routes = router?.getRoutes() || []

const route = useRoute()

const curMenu = ref(route.path)

const ignoreRouteNameList = ['base', 'login', 'register']

const menuDataList = computed(() => {
  let list = routes.filter(item => !ignoreRouteNameList.includes(item!.name as string))

  // 不是管理员，则过滤掉管理员菜单
  if (!isAdmin.value) {
    list = list.filter((item) => {
      const roleList = item.meta?.role as string[] ?? []
      return !roleList.includes('admin')
    })
  }

  return list.map((item) => {
    return {
      label: item.meta?.title,
      value: `${item.path}`,
    }
  })
})

function menuChange(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="layout-header w-full h-[58px] px-2 flex items-center justify-between shadow">
    <div class="h-full flex  items-center">
      <img src="/logo.svg" alt="logo" style="width: 32px;height: 32px">
      <RouterLink to="/shortUrl">
        <h1 class="text-2xl  cursor-pointer ml-2">
          {{ VITE_APP_TITLE }}
        </h1>
      </RouterLink>
    </div>

    <el-segmented v-model="curMenu" :options="menuDataList" @change="menuChange" />

    <div class="flex justify-end items-center">
      <el-popover v-if="isLogin" placement="bottom" trigger="click">
        <template #reference>
          <p class="cursor-pointer hover:text-blue-500">
            {{ userInfo.nickName }}
          </p>
        </template>
        <ul class="text-center space-y-2">
          <li class="cursor-pointer hover:text-blue-400" @click="loginOut">
            退出登录
          </li>
          <li class="cursor-pointer hover:text-blue-400">
            版本：1.0.0
          </li>
        </ul>
      </el-popover>

      <p v-else class="cursor-pointer">
        <RouterLink to="/login">
          <span class="hover:text-blue-500">登录</span>
        </RouterLink>
        ｜
        <RouterLink to="/register">
          <span class="hover:text-blue-500">
            注册
          </span>
        </RouterLink>
      </p>
      <ThemeSwitch class="ml-2" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-header {
  background: var(--el-bg-color);
}
</style>

<style lang="scss">
.layout-header {
  .el-segmented {
    --el-border-radius-base: 8px;
  }
}
</style>
