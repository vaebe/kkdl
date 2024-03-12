<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'
import { onBeforeUnmount, reactive, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useUserStore } from '@/stores'
import { getMiniProgramCode } from '@/api/login'

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
  <div class="mini-program-code">
    <img
      class="w-full h-full"
      :src="getMiniProgramCode(codeParams)"
      alt="miniProgramCode"
    >
  </div>
</template>

<style scoped lang="scss">
.mini-program-code {
  width: 240px;
  height: 240px;
}
</style>
