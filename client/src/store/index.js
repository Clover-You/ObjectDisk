/*
 * @Author: LRolinx
 * @Date: 2020-11-22 11:31:10
 * @LastEditTime: 2021-01-20 18:57:33
 * @Description: 
 * 
 */
import {createStore} from "vuex";
import serve from "./modules/serve"

export default createStore({
  modules: {
    serve
  },
  state: {
    isLogin: false,//是否登录
    id: '',//用户id
    photo: '',//用户头像
    nickname: '',//用户昵称
    siderbarStr: 'drive',//当前页面名
  },
  mutations: {
    SET_All() {
      this.state.isLogin = sessionStorage.getItem('isLogin');
      this.state.id = sessionStorage.getItem('id');
      this.state.photo = sessionStorage.getItem('photo');
      this.state.nickname = sessionStorage.getItem('nickname');
    }
  },
  actions: {
    setAll({ commit }) {
      commit("SET_All");
    }
  },
});

// export default store;