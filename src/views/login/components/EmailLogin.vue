<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { useCountdown } from '../composables/useCountdown'
import { emailVerificationCodeLogin, getCaptcha, userLogin } from '@/api/login'

const loginTypeList = [
  {
    label: '账号密码登录',
    value: '01',
  },
  {
    label: '邮箱验证码登录',
    value: '02',
  },
]

const curLoginType = ref('01')

const loginForm = reactive({
  email: '',
  password: '',
  verificationCode: '',
})

const loginFormRules = reactive<FormRules>({
  email: [
    { required: true, message: '账号不能为空！', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址！', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: '密码不能为空！', trigger: 'blur' },
  ],
  verificationCode: [
    { required: true, message: '验证码不能为空！', trigger: 'blur' },
    { min: 6, max: 6, message: '请输入六位验证码！', trigger: 'blur' },
  ],
})

const loginFormRef = ref<FormInstance>()

const { countdown, startCountdown } = useCountdown()

const sendCodeLoading = ref(false)
// 发送验证码
function sendTheVerificationCode() {
  // 获取验证码倒计时大于 0 直接返回
  if (countdown.value > 0)
    return

  // 验证用户账号是否填写正确
  loginFormRef.value?.validateField('email', (valid) => {
    if (valid) {
      sendCodeLoading.value = true

      // 发送验证码
      getCaptcha({ email: loginForm.email }).then(() => {
        ElMessage.success('验证码发送成功！')

        // 验证码发送成功开始倒计时
        startCountdown()
      }).finally(() => {
        sendCodeLoading.value = false
      })
    }
  })
}

const router = useRouter()

// 切换页面类型： 登录｜注册
function jumpToRegister() {
  router.push('register')
}

const loginLoading = ref(false)

const { setLoginResData } = useUserStore()

// 登录
function login() {
  const api = curLoginType.value === '01'
    ? userLogin(loginForm)
    : emailVerificationCodeLogin({ email: loginForm.email, code: loginForm.verificationCode })

  api.then((res) => {
    setLoginResData(res.data)
    ElMessage.success('登录成功！')
  })
    .finally(() => {
      loginLoading.value = false
    })
}

const { current } = useMagicKeys()

watch(current, (v) => {
  if (v.has('enter'))
    login()
})
</script>

<template>
  <div class="email-login w-[340px] flex flex-col items-center">
    <el-segmented v-model="curLoginType" :options="loginTypeList" block class="w-full" />

    <el-form
      ref="loginFormRef" class="w-full my-2" :model="loginForm"
      :rules="loginFormRules" :label-width="0"
    >
      <el-form-item prop="email" label="">
        <el-input v-model="loginForm.email" placeholder="请输入账号" />
      </el-form-item>

      <el-form-item v-if="curLoginType === '02'" prop="verificationCode" label="">
        <el-input v-model="loginForm.verificationCode" placeholder="请输入验证码">
          <template #append>
            <el-button
              :disabled="sendCodeLoading"
              :loading="sendCodeLoading"
              @click="sendTheVerificationCode"
            >
              {{ countdown ? `${countdown}s` : '验证码' }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item v-if="curLoginType === '01'" prop="password" label="">
        <el-input v-model="loginForm.password" show-password type="password" placeholder="请输入密码" />
      </el-form-item>
    </el-form>

    <el-button
      type="primary" class="w-full" :disabled="loginLoading"
      :loading="loginLoading" @click="login"
    >
      <span class="ml-4">
        登录
      </span>
    </el-button>

    <p
      class="mt-4 text-sm text-gray-400 cursor-pointer hover:text-blue-400"
      @click="jumpToRegister"
    >
      已有账号，点击登录！
    </p>
  </div>
</template>

<style lang="scss" scoped>
</style>
