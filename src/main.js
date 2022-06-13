import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import components from '@/components/UI/library.js';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

components.forEach(component => {
    app.component(component.name, component)
})