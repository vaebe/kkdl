<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useRoute, useRouter } from 'vue-router'
import { ElLoading } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { githubLogin } from '@/api/login'

const loadingDom = document.getElementById('login-container') as HTMLElement

const loadingInstance = ref()
function setLoginLoading(message: string) {
  loadingInstance.value = ElLoading.service({
    target: loadingDom,
    text: message,
    background: 'rgba(0, 0, 0, 0.5)',
  })
}

const { VITE_APP_GITHUB_CLIENT_ID } = import.meta.env
function login() {
  /**
   * 接口参数查看
   * https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
   */

  const client_id = VITE_APP_GITHUB_CLIENT_ID
  const redirect_uri = `${window.location.origin}/login`
  const path = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`
  window.open(path, '_self')

  setLoginLoading('正在获取 github 授权...')
}

const { setLoginResData } = useUserStore()

const router = useRouter()

const route = useRoute()

const code = route.query.code as string

function loginGithub() {
  setLoginLoading('正在登录...')

  githubLogin({ code })
    .then((res) => {
      setLoginResData(res.data)
      ElMessage.success('登录成功！')
    })
    .catch(() => {
      ElMessage.warning('登录失败！')
      router.replace('/login')
    })
    .finally(() => {
      loadingInstance.value?.close()
    })
}

// code 存在执行 github 登录逻辑
if (code)
  loginGithub()
</script>

<template>
  <el-button type="primary" class="w-[340px]" color="black" @click="login">
    <Icon icon="uil:github" class="cursor-pointer mr-4" width="24px" height="42px" />

    使用 GitHub 登录
  </el-button>
</template>

<style lang="scss" scoped>
</style>
