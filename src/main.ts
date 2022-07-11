import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8081/zhiye/api/'
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
