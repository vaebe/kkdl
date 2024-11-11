<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { getCaptcha, userRegCheck, userRegister } from '@/api/login'
import { useCountdown } from '@/views/login/composables/useCountdown'

const LoginContainer = defineAsyncComponent(() => import('@/components/loginContainer/index.vue'))

const registerForm = reactive({
  email: '',
  password: '',
  accountType: '01',
  verificationCode: '',
})

const registerFormRules = reactive<FormRules>({
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

const registerFormRef = ref<FormInstance>()

const { countdown, startCountdown } = useCountdown()

const sendCodeLoading = ref(false)
// 发送验证码
function sendTheVerificationCode() {
  // 获取验证码倒计时大于 0 直接返回
  if (countdown.value > 0)
    return

  // 验证用户账号是否填写正确
  registerFormRef.value?.validateField('email', async (valid) => {
    if (valid) {
      sendCodeLoading.value = true

      const regCheck = await userRegCheck({ email: registerForm.email })

      if (regCheck.code !== 0) {
        sendCodeLoading.value = false
        return
      }

      if (regCheck.data.isRegistered) {
        sendCodeLoading.value = false
        ElMessage.warning('该账号已注册, 请直接登录！')
        return
      }

      // 发送验证码
      getCaptcha({ email: registerForm.email })
        .then(() => {
          ElMessage.success('验证码发送成功！')

          // 验证码发送成功开始倒计时
          startCountdown()
        })
        .finally(() => {
          sendCodeLoading.value = false
        })
    }
  })
}

const router = useRouter()

// 切换页面类型： 登录｜注册
function jumpToLogin() {
  router.push('/login')
}

const loading = ref(false)
// 注册-注册完成后跳转登录页进行登录
async function register() {
  loading.value = true

  userRegister(registerForm)
    .then(() => {
      router.push('/login')
      ElMessage.success('注册成功！')
    })
    .finally(() => {
      loading.value = false
    })
}

const { current } = useMagicKeys()

watch(current, (v) => {
  if (v.has('enter'))
    register()
})
</script>

<template>
  <LoginContainer>
    <div class="email-login w-[340px] flex flex-col items-center">
      <el-form ref="registerFormRef" class="w-full my-2" :model="registerForm" :rules="registerFormRules" :label-width="0">
        <el-form-item prop="email" label="">
          <el-input v-model="registerForm.email" placeholder="请输入账号" />
        </el-form-item>

        <el-form-item prop="verificationCode" label="">
          <el-input v-model="registerForm.verificationCode" placeholder="请输入验证码">
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

        <el-form-item prop="password" label="">
          <el-input v-model="registerForm.password" show-password type="password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>

      <el-button type="primary" class="w-full" :disabled="loading" :loading="loading" @click="register">
        <span class="ml-4">
          注册
        </span>
      </el-button>

      <p
        class="mt-4 text-sm text-gray-400 cursor-pointer hover:text-blue-400"
        @click="jumpToLogin"
      >
        已有账号，点击登录！
      </p>
    </div>
  </LoginContainer>
</template>

<style lang="scss" scoped>
</style>
