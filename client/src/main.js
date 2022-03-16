/*
 * @Author: LRolinx
 * @Date: 2020-10-14 20:58:01
 * @LastEditTime: 2022-03-16 17:25:22
 * @Description:
 *
 */
import './static/css/iconFont.css'
import { createApp } from 'vue';
import store from './store'
// import VueAxios from 'vue-axios'

import App from './App.vue'
import './assets/fonts/cnrIcon.css'
import lPromptBox from './components/lpromptbox.vue'
import router from "./router/router.js"
// import VueRouter from "vue-router";
import axios from './utils/axios'
import tipMessge from '@/components/tipMessge.js'
import dialogMessge from '@/components/dialogMessge.js'
import VueVirtualScroller from 'vue-virtual-scroller'

const app = createApp(App)

// import driveRouter from "./router/drive.js"

app.config.globalProperties.$http = axios;
app.component('lPromptBox', lPromptBox);
app.config.globalProperties.$tipMessge = tipMessge;
app.config.globalProperties.$dialogMessge = dialogMessge;

// Vue.use(VueVirtualScroller)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

// Vue.use(VueAxios, axios);

app.use(router).use(store).use(VueVirtualScroller).mount('#app')
