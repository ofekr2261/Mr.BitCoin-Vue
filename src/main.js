import './assets/style/main.scss'

import { createApp } from 'vue'
import { myStore } from './store/store.js'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(myStore)
app.mount('#app')
