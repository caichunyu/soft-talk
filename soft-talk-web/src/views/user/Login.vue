<template>
  <!--  <mu-container class="demo-container is-stripe">-->
  <!--    <mu-row gutter>-->
  <!--      <mu-col span="8" sm="6" md="4" lg="3" xl="1"><div class="grid-cell"></div></mu-col>-->
  <!--      <mu-col span="4" sm="6" md="8" lg="9" xl="11"><div class="grid-cell"></div></mu-col>-->
  <!--      <mu-col span="4" sm="6" md="8" lg="9" xl="11"><div class="grid-cell"></div></mu-col>-->
  <!--      <mu-col span="8" sm="6" md="4" lg="3" xl="1"><div class="grid-cell"></div></mu-col>-->
  <!--    </mu-row>-->
  <!--  </mu-container>-->

  <div class="register-main">
    <img class="login-icon" src="../../assets/SoftTalk1.png">
    <div class="register-main-all">
      <div>
        <h2>登 录</h2>
      </div>
      <el-input v-model="loginName" placeholder="请输入账号"></el-input>
      <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
      <el-button-group>
        <el-button style="margin-right: 1rem" type="danger" icon="el-icon-arrow-left" @click="cancelPage">取消</el-button>
        <el-button type="primary" @click="login">确定<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
      <div class="to-register" @click="toRegister">去注册</div>
    </div>
  </div>
</template>

<script>
import store from '../../store';
import {mapMutations, mapActions} from 'vuex';

import qs from "qs";

export default {
  name: "Login",
  data() {
    return {
      loginName: '',
      userToken: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations(['SET_USER_LOGIN_INFO', 'CHANGE_LOGIN']),
    ...mapActions(['login']),
    login: function () {
      if (this.loginName && this.password) {
        this.axios
            .post('/login',
                // qs.stringify(
                    {loginName: this.loginName, password: this.password})
            .then(res => {
              // 请求成功
              console.log(res.data);
              this.userToken = res.data.token;
              // this.$store.state.nickName=res.data.data.loginName
              // console.log(this.$store)
              localStorage.setItem('loginName', res.data.data.loginName);
              localStorage.setItem('userId', res.data.data._id);
              localStorage.setItem('headUrl', res.data.data.headUrl);
              // 将用户token保存到vuex中
              this.CHANGE_LOGIN({Authorization: this.userToken});
              this.$router.push('/');
            }).catch(error => {
          // 请求失败，
          this.$message('登录失败！请检查登录信息是否正确！')
          console.log("登录失败！请检查登录信息是否正确！",error)
        });
      } else {
        this.$message('不能为空')
      }
    },
    cancelPage: function () {
      // console.log( this.registerData,'name')
      this.$router.go(-1)
    },
    toRegister() {
      this.$router.push({path: '/register'})
    }
  },
  store
}

</script>

<style scoped>
.to-register {
  font-size: .6rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: -1rem;
}

.login-icon {
  width: 18rem;
  height: 6rem;
  padding-bottom: 5.3rem;
}

.register-main {
  /*margin-left: 2vh;*/
  padding: 0.2rem;
  max-width: 100%;
  /*background-image: url("../assets/远山背景.png");*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  /*position: relative;*/
  /*text-align: center;*/
  /*font-size: 1rem;*/
  /*!*color: rgba(255, 255, 255, 0.6);*!*/
  /*!*background: #6ea5ed url(../assets/64702.jpg) no-repeat center center;*!*/
  /*background-size: cover;*/

}

.register-main-all {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: -5rem;

  width: 60vw;
  height: 33vh;
  max-width: 25rem;
  max-height: 18rem;
  background: #f6f8fa;
  /*opacity: 0.85;*/
  padding: 1rem;
  border-radius: 1rem;
}
</style>
