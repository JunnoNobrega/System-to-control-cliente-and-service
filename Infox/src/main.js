import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/bulma/css/bulma.css'
import '../node_modules/bulma-dashboard/dist/bulma-dashboard.min.css'


createApp(App).use(router).mount('#app')
