import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import components from '@/components/UI/library.js';

const app = createApp(App)
const pinia = createPinia()

components.forEach(component => {
    app.component(component.name, component)
})

app.use(pinia)
app.use(router)


app.mount('#app')
