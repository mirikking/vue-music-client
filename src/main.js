import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

import components from '@/components/UI/library.js';

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
