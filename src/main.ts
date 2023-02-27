import { createApp } from 'vue'
import '@/assets/base.css'
import 'amfe-flexible'      //将 1rem 设为 viewWidth/10

import 'vant/es/dialog/style'
import 'vant/es/toast/style'
import router from './router'
import store from './store'
import App from './App.vue'
import { Toast, Dialog } from 'vant';


createApp(App)
    .use(router)
    .use(store)
    .use(Toast)
    .use(Dialog)
    .mount('#app')
