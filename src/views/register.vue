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
    <img class="login-icon" src="../assets/SoftTalk1.png">
    <div class="register-main-all">
      <div>

        <h2>注 册</h2>
      </div>
      <el-input v-model="registerData.nickName" placeholder="请输入昵称"></el-input>
      <el-input v-model="registerData.loginName" placeholder="请输入账号"></el-input>
      <el-input v-model="registerData.password" placeholder="请输入密码" show-password></el-input>

      <!--      <el-button type="primary" @click="register">注册</el-button>-->
      <el-button-group>
        <el-button style="margin-right: 1rem" type="danger" icon="el-icon-arrow-left" @click="cancelPage">取消</el-button>
        <el-button type="primary" @click="register">注册<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: "register",
  data() {
    return {
      registerData: {
        loginName: '',
        nickName: '',
        password: ''
      }
    }
  },
  methods: {
    register: function () {
      console.log(this.registerData, 'name')
      // this.$router.push({ path: '/login' })
      if (this.registerData.loginName&&this.registerData.nickName&&this.registerData.password){
      this.axios
          .post('/user/insert',
             {
               nickName: this.registerData.nickName,
                loginName:this.registerData.loginName,
                password:this.registerData.password,
                headUrl: 'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/default.jpg',
                email: 'string',
                sex: 0,
                userType: 0
              })
          .then(res => {
            if (res.data.code===1){
              this.$router.push('/login');
              alert(res.data.message)
            }else if(res.data.code===0) {
              alert(res.data.message)
            }
            console.log(res, 'res')
          })
    }else {
      this.$message('不能为空')
    }
    },
    cancelPage: function () {
      // console.log( this.registerData,'name')
      this.$router.go(-1)
    }
  }
}

</script>

<style scoped>
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
  position: relative;
  text-align: center;
  font-size: 1rem;
  /*color: rgba(255, 255, 255, 0.6);*/
  /*background: #6ea5ed url(../assets/64702.jpg) no-repeat center center;*/
  background-size: cover;
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
  max-height: 20rem;
  background: #f6f8fa;
  /*opacity: 0.85;*/
  padding: 1rem;
}
</style>
