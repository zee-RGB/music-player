import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import VeeValidatePlugin from './includes/vee-validate-plugin'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VeeValidatePlugin)

app.mount('#app')
