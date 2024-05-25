<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue'
import type { ECOption } from '@/composables'
import { useEcharts } from '@/composables'
import { analyzeShortLinkAccessByTime } from '@/api/analytics.ts'

const CHeader = defineAsyncComponent(() => import('./components/CHeader.vue'))

const { initChart, echarts } = useEcharts()

async function initLineChart() {
  const res = await analyzeShortLinkAccessByTime({ code: '', dateType: '24h' })

  const list = res.code === 0 ? res.data ?? [] : []

  const option: ECOption = {
    color: 'rgba(29,78,186,1)',
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: list.map(item => item.time),
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'rgba(135,140,147,0.8)',
        },
      },
    },
    series: [
      {
        name: 'Visits',
        type: 'line',
        data: list.map(item => item.clicks),
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(29,78,186, 0.3)',
              },
              {
                offset: 0.8,
                color: 'rgba(29,78,186, 0)',
              },
            ],
            false,
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10,
        },
      },
    ],
  }

  initChart(document.getElementById('lintChart') as HTMLElement, option)
}

onMounted(() => {
  initLineChart()
})
</script>

<template>
  <div class="w-[100vw] h-[100vh] bg-gray-50">
    <CHeader />

    <div class="mt-4 flex items-center justify-center ">
      <div class="w-11/12 h-[300px] p-2  shadow rounded bg-white">
        <div id="lintChart" class="h-full" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
