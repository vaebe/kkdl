import { createApp } from 'vue'
import { disableCache } from '@iconify/vue'
import router from './router'
import store from './stores'
import App from './App.vue'
import 'ress/dist/ress.min.css'
import '@/assets/styles/index.scss'

disableCache('local')

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
