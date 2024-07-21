<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const { VITE_APP_GITHUB_CLIENT_ID } = import.meta.env
function login() {
  /**
   * 接口参数查看
   * https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
   */

  const client_id = VITE_APP_GITHUB_CLIENT_ID
  const redirect_uri = `${window.location.origin}/github`
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`
}
</script>

<template>
  <el-button type="primary" class="w-[340px]" color="black" @click="login">
    <Icon icon="uil:github" class="cursor-pointer mr-4" width="24px" height="42px" />

    使用 GitHub 登录
  </el-button>
</template>

<style lang="scss" scoped>
</style>
