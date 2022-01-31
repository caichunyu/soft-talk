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
    <!--    <img class="login-icon" src="../assets/SoftTalk1.png">-->
    <div class="register-main-all">
      <div>

        <h2>修改密码</h2>
      </div>

      <el-input v-model="oldPassword" placeholder="请输入原密码"></el-input>
      <el-input v-model="password" placeholder="请输入新密码"></el-input>
      <el-input v-model="password1" placeholder="重新输入新密码"></el-input>
      <!--      <el-button type="primary" @click="register">注册</el-button>-->
      <el-button-group>
        <el-button style="margin-right: 1rem" @click="cancelPage">取消</el-button>
        <el-button @click="newPassword">确认</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: "NewPassword",
  data() {
    return {
      password: '',
      password1: '',
      oldPassword: ''
    }
  },
  methods: {
    newPassword: function () {
      if (this.password === this.password1 && this.oldPassword) {

        this.axios
            .post('/user/update-password',
                // qs.stringify(
                    {
                  id: this.$store.state.userId,
                  newPassword: this.password,
                  oldPassword: this.oldPassword,
                })
      // )
            .then(res => {
              if (res.data.code === 1) {
                this.$router.push('/login');
                this.$message(res.data.message);
              } else if (res.data.code === 0) {
                this.$message(res.data.message);
              }
              // else if (res.data.code === 1) {
              //   this.$message(res.data.message);
              // }
              console.log(res, 'res')
            })
      }else {
      this.$message('新密码不能为空/不相等')
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
