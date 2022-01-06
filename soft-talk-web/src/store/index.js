import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    loginName:localStorage.getItem('loginName')?localStorage.getItem('loginName') : '昵称',
    userId:localStorage.getItem('userId')?localStorage.getItem('userId') : 0,
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
    mutations,
  actions: {
  },
  modules: {
  }
})

