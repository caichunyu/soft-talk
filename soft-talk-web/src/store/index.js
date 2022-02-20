import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import {store} from "core-js/internals/reflect-metadata";

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    loginName: localStorage.getItem('loginName') ? localStorage.getItem('loginName') : '昵称',
    userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : 0,
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations,
  actions: {
    resetUserState() {
      // store.commit(store.state.loginName, '昵称')
      // store.commit(store.state.userId, 0)
      // store.replaceState(this.$store.state.Authorization, '')
      // commit(this.$store.state.Authorization, '')
    }
  },
  modules: {}
})

