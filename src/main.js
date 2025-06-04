import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import Icon from './directives/icon'
import { auth } from './includes/firebase'
import VeeValidatePlugin from './includes/vee-validate-plugin'
import router from './router'

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    const pinia = createPinia()
    app = createApp(App)

    app.use(pinia)
    app.use(router)
    app.use(VeeValidatePlugin)
    app.directive('icon', Icon)

    app.mount('#app')
  }
})
