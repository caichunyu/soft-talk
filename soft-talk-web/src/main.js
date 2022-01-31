// import Vue from "vue/dist/vue.common.js";
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from "axios";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.axios = axios //全局注册，使用方法为:this.$axios

Vue.config.productionTip = false

//请求拦截器
// axios.defaults.headers.post['Content-Type']='aapplication/x-www-form-urlencoded'

axios.interceptors.request.use(
  config => {
    config.headers.post['Content-Type']='application/json; charset=utf-8'
    config.baseURL='http://127.0.0.1:3000/api';
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });
/* 响应拦截器 */

axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效

  if (response.data.code === 10010 || response.data.code === 10011) {

    Storage.localRemove('token') // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）

    router.replace({

      path: '/login' // 到登录页重新获取token

    })

  } else if (response.token) { // 判断token是否存在，如果存在说明需要更新token

    Storage.localSet('token', response.token) // 覆盖原来的token(默认一天刷新一次)

  }

  return response

}, function (error) {

  return Promise.reject(error)

})

Vue.mixin({ //  相当于vue代码块让每个vue实例都运行
  computed:{
    uploadUrl(){
      return 'http://127.0.0.1:3000/api/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
