/*
 * @Author: LRolinx
 * @Date: 2020-10-14 20:58:01
 * @LastEditTime: 2021-01-11 01:31:13
 * @Description:
 *
 */
import './static/css/iconFont.css'
import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'
// import VueAxios from 'vue-axios'

import App from './App.vue'
import './assets/fonts/cnrIcon.css'
import lPromptBox from './components/lpromptbox.vue'
import router from "./router/router.js"
import axios from './utils/axios'
// import driveRouter from "./router/drive.js"

Vue.prototype.$http = axios;
Vue.component('lPromptBox', lPromptBox);
Vue.config.productionTip = false

Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// Vue.use(VueAxios, axios);


new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
