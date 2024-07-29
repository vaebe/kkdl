<script lang="ts" setup>
const loginContainer = defineAsyncComponent(() => import('@/components/loginContainer/index.vue'))
const EmailLogin = defineAsyncComponent(
  () => import('./components/EmailLogin.vue'),
)
const GithubLogin = defineAsyncComponent(() => import('./components/GithubLogin.vue'))
</script>

<template>
  <loginContainer>
    <EmailLogin />
    <GithubLogin class="mt-4" />
  </loginContainer>
</template>

<style lang="scss" scoped>

</style>
