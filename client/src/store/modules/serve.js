/*
 * @Author: LRolinx
 * @Date: 2020-11-22 11:31:10
 * @LastEditTime: 2021-03-09 10:08:41
 * @Description:
 *
 */

const state = {
    useLocalAreaNetwork: true, //是否启动局域网络
    // serveUrl: 'http://192.168.8.101:3000/',
    serveUrl: 'http://127.0.0.1:3000/',
};

const mutations = {
    // SET_NETWORK(state, Payload) {
    //     state.network = Payload;
    // }
}

const actions = {
    // setNetwork({ commit }, args) {
    //     commit("SET_NETWORK", args);
    // },
}

export default {
    state,
    mutations,
    actions,
}