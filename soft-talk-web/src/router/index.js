import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/components/Home";
import SideNav from "@/components/SideNav";
import TopNav from "@/components/TopNav";
import HelloWorld from "@/components/HelloWorld";
import Login from "@/components/Login";
import Register from '../views/register.vue'

import AllDynamic from "../views/dynamic/AllDynamic";
import MyDynamic from "../views/dynamic/MyDynamic";
import NewDynamic from "../views/dynamic/NewDynamic";
import EditDynamic from "../views/dynamic/EditDynamic";
import Comment from "@/views/dynamic/Comment";

import Index from "../views/Index";
import NewPassword from "../views/user/NewPassword";
import EditUserInfo from "../views/user/EditUserInfo";
import ChatRoom from "../views/IM/ChatRoom";

import ChatRecord from "@/views/user/ChatRecord";
import ChatRecordDetail from "@/views/user/ChatRecordDetail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },{
    path: '/login',
    name: 'Login',
    component: Login,
  }, {
    path: '/register',
    name: 'Register',
    component: Register
  },{
    path: '/newpassword',
    name: 'NewPassword',
    component: NewPassword
  }, {
    path: '/edituserinfo',
    name: 'EditUserInfo',
    component: EditUserInfo
  }, {
    path: '/chatroom',
    name: 'ChatRoom',
    component: ChatRoom
  }, {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
  // component 少s
  // Failed to mount component: template or render function not defined.
  // found in
  path: '/home',
  // component: Home,
  components: {
    default: Home,
    side: SideNav,
    top: TopNav,
  },
  children: [ {
    path: '/alldynamic',
    name: 'AllDynamic',
    component: AllDynamic
  }, {
    path: '/mydynamic',
    name: 'MyDynamic',
    component: MyDynamic
  }, {
    path: '/newdynamic',
    name: 'NewDynamic',
    component: NewDynamic
  }, {
    path: '/editdynamic',
    name: 'EditDynamic',
    component: EditDynamic
  }, {
    path: '/chatrecord',
    name: 'ChatRecord',
    component: ChatRecord
  }, {
    path: '/chatrecorddetail',
    name: 'ChatRecordDetail',
    component: ChatRecordDetail
  }, {
    path: '/comment',
    name: 'Comment',
    component: Comment
  }
  ]
}]

const router = new VueRouter({
  routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  // iView.LoadingBar.start();
  if (to.path === '/register' || to.path === '/login'
    || to.path === '/'|| to.path === '/chatroom'||
    to.path === '/hello') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    console.log('router', token)
    if (token) {
      next();
      console.log('router1')
    } else {
      console.log('router2')
      next('/login');
    }
  }
});

export default router
