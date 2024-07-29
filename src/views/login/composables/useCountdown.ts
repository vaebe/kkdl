export function useCountdown() {
  // 验证码倒计时
  const countdown = ref(0)

  // 定时器
  let countdownTimer = 0

  // 清除定时器
  function clearCountdownTimer() {
    window.clearInterval(countdownTimer)
  }

  // 开始倒计时
  function startCountdown() {
    countdown.value = 60

    // 开始定时器
    countdownTimer = window.setInterval(() => {
      countdown.value -= 1

      // 倒计时小于 1 赋值 0 并清除定时器
      if (countdown.value < 1) {
        countdown.value = 0
        clearCountdownTimer()
      }
    }, 1000)
  }

  // 页面销毁前清除定时器
  onBeforeUnmount(() => {
    clearCountdownTimer()
  })

  return {
    startCountdown,
    countdown,
  }
}
