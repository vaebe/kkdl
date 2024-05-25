<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const CHeader = defineAsyncComponent(() => import('./components/CHeader.vue'))
const VisitsTime = defineAsyncComponent(() => import('./components/VisitsTime.vue'))
const VisitsCountry = defineAsyncComponent(() => import('./components/VisitsCountry.vue'))
const VisitsDevice = defineAsyncComponent(() => import('./components/VisitsDevice.vue'))
</script>

<template>
  <div class="w-[100vw] h-[100vh] bg-gray-50 ">
    <el-scrollbar style="height: 100vh">
      <CHeader class="sticky top-0" />

      <div class="sticky top-[58px] z-10  my-5 bg-gray-50 py-3 md:py-3 shadow-md">
        dasdsadsadsadsa
      </div>

      <div class="mt-4 flex flex-col items-center justify-center">
        <VisitsTime class="w-11/12" />

        <div class="w-11/12 my-2 grid grid-cols-2 gap-2">
          <VisitsCountry />
          <VisitsDevice />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">

</style>
