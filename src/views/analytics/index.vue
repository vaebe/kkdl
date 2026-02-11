<script setup lang="ts">
const CHeader = defineAsyncComponent(() => import('./components/CHeader.vue'))
const VisitsTime = defineAsyncComponent(() => import('./components/VisitsTime.vue'))
const VisitsRegion = defineAsyncComponent(() => import('./components/VisitsRegion.vue'))
const VisitsDevice = defineAsyncComponent(() => import('./components/VisitsDevice.vue'))

const options = [
  {
    code: '24h',
    name: '24 Hour',
  },
  {
    code: '7d',
    name: '7 Day',
  },
  {
    code: '30d',
    name: '30 Day',
  },
]

const searchForm = reactive({
  dateType: '24h',
})

provide('searchForm', searchForm)
</script>

<template>
  <div class="analytics w-screen h-screen bg-gray-50 ">
    <el-scrollbar style="height: 100vh">
      <CHeader class="sticky top-0" />

      <div class="w-11/12 mx-auto my-6 bg-gray-50 flex justify-end">
        <el-select
          v-model="searchForm.dateType"
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </div>

      <div class="mt-4 flex flex-col items-center justify-center">
        <VisitsTime class="w-11/12" />

        <div class="w-11/12 my-6 grid grid-cols-2 gap-6">
          <VisitsRegion />
          <VisitsDevice />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style  lang="scss">
.analytics {
  --el-border-radius-base: 0.5rem;
}
</style>
