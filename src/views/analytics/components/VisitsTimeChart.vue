<script setup lang="ts">
import type { AnalyzeParams, AnalyzeShortLinkAccessByTimeInfo } from '@/api/analytics.ts'
import { useResizeObserver } from '@vueuse/core'
import { CategoryScale, Chart, Filler, LinearScale, LineController, LineElement, PointElement, Tooltip } from 'chart.js'
import { debounce } from 'lodash-es'
import { analyzeShortLinkAccessByTime } from '@/api/analytics.ts'

const CardBox = defineAsyncComponent(() => import('@/components/CardBox.vue'))

// 注册必要的 Chart.js 组件
Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Filler,
)

const searchForm = inject<AnalyzeParams>('searchForm')

const list = ref<AnalyzeShortLinkAccessByTimeInfo[]>([])

const visitsTotal = ref(0)

const canvasRef = ref<HTMLCanvasElement | null>(null)

let chartInstance: any = null

useResizeObserver(document.body, debounce(() => {
  if (chartInstance) {
    chartInstance.resize()
  }
}, 100))

function initChart(dom: HTMLCanvasElement, config: any) {
  const existingChart = Chart.getChart(dom)
  if (existingChart) {
    existingChart.destroy()
  }

  const ctx = dom.getContext('2d')
  if (!ctx)
    throw new Error('无法获取 canvas 上下文')

  return new Chart(ctx, config)
}

function initLineChart() {
  visitsTotal.value = list.value.reduce((a, b) => {
    return a + b.clicks
  }, 0)

  const canvas = canvasRef.value
  if (!canvas)
    return

  const ctx = canvas.getContext('2d')
  if (!ctx)
    return

  // 创建渐变背景
  const gradient = ctx.createLinearGradient(0, 0, 0, 240)
  gradient.addColorStop(0, 'rgba(29,78,186, 0.3)')
  gradient.addColorStop(0.8, 'rgba(29,78,186, 0)')

  const config = {
    type: 'line',
    data: {
      labels: list.value.map(item => item.time),
      datasets: [
        {
          label: 'Visits',
          data: list.value.map(item => item.clicks),
          borderColor: 'rgba(29,78,186,1)',
          backgroundColor: gradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0.5,
          pointHoverRadius: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        x: {
          type: 'category',
          grid: {
            display: false,
          },
          ticks: {
            display: true,
          },
        },
        y: {
          type: 'linear',
          grid: {
            drawTicks: false,
            color: 'rgba(135,140,147,0.6)',
          },
          border: {
            dash: [5, 5],
            display: false,
          },
          ticks: {
            maxTicksLimit: 6,
          },
        },
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false,
      },
    },
  }

  chartInstance = initChart(canvas, config)
}

const loading = ref(false)

function getData() {
  loading.value = true
  list.value = []

  analyzeShortLinkAccessByTime({ code: '', dateType: searchForm!.dateType })
    .then((res) => {
      if (res.code === 0) {
        list.value = res.data ?? []
        initLineChart()
      }
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  watch(() => searchForm, () => {
    if (searchForm?.dateType) {
      getData()
    }
  }, { immediate: true, deep: true })
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<template>
  <CardBox v-loading="loading" class="relative z-0">
    <p class="my-2">
      <span>总数:</span>
      <span class="ml-2">{{ visitsTotal }}</span>
    </p>
    <div class="h-60">
      <canvas ref="canvasRef" />
    </div>
  </CardBox>
</template>

<style scoped lang="scss">

</style>
