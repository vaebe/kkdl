<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { getMiniProgramCode } from '@/api/login'

const loading = ref(true)
function setLoading(type: boolean) {
  loading.value = type
}

const codeParams = reactive({
  scene: uuidv4().replaceAll('-', ''),
  page: '',
})

const { VITE_APP_LOGIN_WS_URL } = import.meta.env

const {
  status,
  data: wsData,
  close,
} = useWebSocket(`${VITE_APP_LOGIN_WS_URL}?userCode=${codeParams.scene}`)

const { setLoginResData } = useUserStore()

// 监听 WebSocket 推送数据
const wsDataWatch = watch(
  () => wsData.value,
  () => {
    if (['OPEN', 'CONNECTING'].includes(status.value)) {
      const res = JSON.parse(wsData.value)

      if (res.dataType === 'loginSuccess') {
        setLoginResData(res)
        ElMessage.success('登录成功!')
      }
    }
  },
)

// 离开页面关闭 WebSocket 连接
onBeforeUnmount(() => {
  close()
  wsDataWatch()
})
</script>

<template>
  <div
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-background="rgba(0, 0, 0, 0.3)"
    class="mini-program-code"
  >
    <img
      class="w-full h-full"
      :src="getMiniProgramCode(codeParams)"
      alt="miniProgramCode"
      @load="setLoading(false)"
      @error="setLoading(false)"
    >
  </div>
</template>

<style scoped lang="scss">
.mini-program-code {
  width: 300px;
  height: 300px;
}
</style>
