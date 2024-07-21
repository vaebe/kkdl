<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import { useColorMode } from '@vueuse/core'

const EmailLogin = defineAsyncComponent(
  () => import('./components/EmailLogin.vue'),
)
const CHeader = defineAsyncComponent(() => import('./components/CHeader.vue'))
const CFooter = defineAsyncComponent(() => import('./components/CFooter.vue'))
const GithubLogin = defineAsyncComponent(() => import('./components/GithubLogin.vue'))

const mode = useColorMode({
  attribute: 'class',
})
mode.value = 'light'
</script>

<template>
  <div class="login">
    <div class="bg1" />
    <div class="bg2" />
    <div class="bg3" />

    <CHeader class="absolute top-0 z-20" />

    <div
      class="absolute z-10 w-full h-full flex flex-col justify-center items-center"
    >
      <div
        id="login-container"
        class="p-6 rounded flex flex-col justify-center items-center"
      >
        <EmailLogin />
        <GithubLogin class="mt-4" />
      </div>
    </div>
    <CFooter class="absolute bottom-0 z-10" />
  </div>
</template>

<style lang="scss" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  overflow: hidden;

  .bg1 {
    content: '';
    background: url(https://assets.dub.co/misc/grid.svg) repeat;
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    opacity: 0.4;
    filter: invert(1);
  }

  .bg2 {
    background: radial-gradient(circle, rgba(2, 0, 36, 0) 0, #fafafa 100%);
    position: absolute;
    content: '';
    z-index: 2;
    width: 100%;
    height: 100%;
    top: 0;
  }

  .bg3 {
    width: 100%;
    max-width: 640px;
    height: calc(100% - 80px);
    position: absolute;
    top: 80px;
    z-index: 3;
    filter: blur(100px) saturate(150%);
    background-image: radial-gradient(
        at 27% 37%,
        hsla(215, 98%, 61%, 1) 0px,
        transparent 0%
      ),
      radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%),
      radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%),
      radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%),
      radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%),
      radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%),
      radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%);
    opacity: 0.15;
  }
}
</style>
