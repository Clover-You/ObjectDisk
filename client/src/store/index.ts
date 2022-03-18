import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
    // other options...
    state: () => {
        return {
            info: "pinia 可以使用",
            isLogin: false,//是否登录
            id: '',//用户id
            photo: '',//用户头像
            nickname: '',//用户昵称
            siderbarStr: 'drive',//当前页面名

            serve: {
                useLocalAreaNetwork: true, //是否启动局域网络
                // serveUrl: 'http://192.168.8.101:3000/',
                serveUrl: 'http://127.0.0.1:3000/',
            }
        }
    },
    getters: {},
    actions: {}
})