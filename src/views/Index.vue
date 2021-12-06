<template>
  <!--  <mu-container class="demo-container is-stripe">-->
  <!--    <mu-row gutter>-->
  <!--      <mu-col span="8" sm="6" md="4" lg="3" xl="1"><div class="grid-cell"></div></mu-col>-->
  <!--      <mu-col span="4" sm="6" md="8" lg="9" xl="11"><div class="grid-cell"></div></mu-col>-->
  <!--      <mu-col span="4" sm="6" md="8" lg="9" xl="11"><div class="grid-cell"></div></mu-col>-->
  <!--      <mu-col span="8" sm="6" md="4" lg="3" xl="1"><div class="grid-cell"></div></mu-col>-->
  <!--    </mu-row>-->
  <!--  </mu-container>-->

  <div class="Header">
    <!--    if else判断是否登陆-->
    <div class="index-top" v-if="isLogin">
      <el-button type="primary" @click="toLogin" plain>登陆</el-button>
      <el-button type="primary" @click="toRegister" plain>注册</el-button>
    </div>
    <div class="index-top" v-else>
      <el-button type="primary" plain @click="toHome" style="height: 2.5rem;
    margin-top: .2rem;">轻聊圈子
      </el-button>
      <img class="user-icon" :src=headUrl>
      <el-dropdown
          style="margin-left: 1rem; margin-top: .3rem;">
        <el-button>
          {{ loginName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" n>
          <el-dropdown-item>
            <div @click="toEditUserInfo">编辑信息</div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="toNewPass">修改密码</div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="loginOut">退出登录</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
    <img class="Header-logo" src="../assets/SoftTalk1.png">
    <div class="Join">
      <span class="Join-domain">房间名/</span>
      <input title="Please use alphanumeric characters (a-z, 0-9), underscore (_) or dash (-)" placeholder=""
             spellcheck="false" pattern="[A-Za-z0-9_-]{3,30}" class="Join-input" type="text" name="chat[permalink]"
             id="chat_permalink" v-model="chatName">
      <button @click="toHello" class="Join-button" slot="reference">Join</button>
      <p class="Join-hint">请输入一个 <strong>聊天室名</strong>，后面您可以再次输入进去聊天</p>
    </div>

<!--    &lt;!&ndash;//输入昵称弹出框&ndash;&gt;-->
<!--    <div style="z-index: 9999">-->
<!--    <el-dialog-->
<!--        title="请输入昵称"-->
<!--        :visible.sync="dialogVisible"-->
<!--        width="22rem" >-->
<!--      <el-input v-model="tempNickName" placeholder="请输入昵称">-->
<!--        &lt;!&ndash;      <el-button @click="visible = !visible">进入</el-button>&ndash;&gt;-->
<!--      </el-input>-->
<!--      <div style="padding-top: .5rem">-->
<!--        <el-button @click="cancel">取 消</el-button>-->
<!--        <el-button type="primary" @click="tempUserToChat">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
<!--    </div>-->
<!--    &lt;!&ndash;//房间密码弹出框&ndash;&gt;-->
<!--    <el-dialog-->
<!--        title="请输入房间密码"-->
<!--        :visible.sync="dialogVisibleRoom"-->
<!--        width="22rem">-->
<!--      <el-input v-model="roomPass" placeholder="请输入房间密码">-->
<!--        &lt;!&ndash;      <el-button @click="visible = !visible">进入</el-button>&ndash;&gt;-->
<!--      </el-input>-->
<!--      <div style="padding-top: .5rem">-->
<!--        <el-button @click="cancel">取 消</el-button>-->
<!--        <el-button type="primary" @click="verfiyPass">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
<!--    &lt;!&ndash;//新建房间密码弹出框&ndash;&gt;-->
<!--    <el-dialog-->
<!--        title="请输入当前房间密码"-->
<!--        :visible.sync=" dialogcreateRoomPass"-->
<!--        width="22rem">-->
<!--      <el-input v-model="roomPass" placeholder="请设置密码，无密码的话请直接点确认！">-->
<!--        &lt;!&ndash;      <el-button @click="visible = !visible">进入</el-button>&ndash;&gt;-->
<!--      </el-input>-->
<!--      <div style="padding-top: .5rem">-->
<!--        <el-button @click="cancel">取 消</el-button>-->
<!--        <el-button type="primary" @click="createRoomPass">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->

<!--    <el-drawer-->
<!--        custom-class="z-index: 99"-->
<!--        title="我是标题"-->
<!--        :visible.sync="drawer"-->
<!--        size="100%"-->
<!--        :with-header="false">-->
<!--      <span>我来啦!</span>-->
<!--    </el-drawer>-->

  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "Index",
  data() {
    return {
      drawer: false,
      roomPass: '',
      chatName: '',
      roomId: null,
      dialogVisibleRoom: false,
      dialogcreateRoomPass: false,
      dialogVisible: false,
      isLogin: 'true',
      loginName: '',
      tempNickName: '',
      password: '',
      headUrl: 'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/default.jpg'
    }
  },
  mounted() {
    if (localStorage.getItem('Authorization')) {
      this.headUrl = localStorage.getItem('headUrl')
      console.log(this.$store)
      this.loginName = localStorage.getItem('loginName')
      this.isLogin = false
    }
  },
  // this.axios
  //     .post('/chatrooms/create',{
  //       "name": this.chatName,
  //       "password": "",
  //       "type": 0
  //     })
  //     .then(response => {
  //       console.log(response.data, 'res')
  //       if (response.data.code === 0){
  //         this.$message('创建新聊天室成功')
  //       }
  //     })
  methods: {
  //   cancel(){
  //     this.drawer=false;
  //     this.dialogVisibleRoom= false;
  //     this.dialogVisible =false;
  //     this.dialogcreateRoomPass =false;
  //
  //   },
    toHello(){
      if (this.chatName) {
        localStorage.setItem('chatName', this.chatName);
        this.$router.push({
          name: 'HelloWorld',
          params:{chatName:this.chatName}})
      } else {
        this.$message('请输入聊天室名')
      }
    },
  // verfiyPass(e) {
  //     //验证密码
  //     console.log('pass', this.roomPass, e)
  //     if (this.roomPass) {
  //       this.axios
  //           .post('/chatrooms/check-password', {
  //             "chatroomName": this.chatName,
  //             "password": this.roomPass,
  //           })
  //           .then(response => {
  //             console.log(response.data, 'res')
  //             if (response.data.message === "密码错误，进入聊天室失败") {
  //               this.$message('"密码错误，进入聊天室失败"')
  //             } else {
  //               this.$router.push({
  //                 name: 'ChatRoom',
  //                 params: {
  //                   chatRoomId:response.data.data.id,
  //                   tempNickName: this.tempNickName,
  //                   chatName: this.chatName
  //                 }
  //               })
  //             }
  //           })
  //     }
  //   },
  //   createRoomPass(e) {
  //     //新建房间密码设置
  //     console.log('pass', this.roomPass, e)
  //     let type =1 ;
  //     if (this.roomPass) {
  //       type =2
  //     }
  //       this.axios
  //           .post('/chatrooms/create', {
  //             "type": type,
  //             "name": this.chatName,
  //             "password": this.roomPass,
  //           })
  //           .then(response => {
  //             console.log(response.data, 'res')
  //             // if (response.data.message === "密码错误，进入聊天室失败") {
  //             //   this.$message('"密码错误，进入聊天室失败"')
  //             // } else {
  //             this.$router.push({
  //                 name: 'ChatRoom',
  //                 params: {
  //                   chatRoomId:response.data.data.id,
  //                   tempNickName: this.tempNickName,
  //                   chatName: this.chatName
  //                 }
  //               })
  //             // }
  //           })
  //     // }
  //   },
  //   toChat(done) {
  //     this.drawer = true;
  //     if (this.chatName) {
  //       if (localStorage.getItem('Authorization') || this.tempNickName || this.roomId) {
  //         this.dialogVisible = false;
  //         // this.drawer = true;
  //         console.log('name room', this.chatName)
  //         this.axios
  //             .get('/chatrooms/enter?chatroomName=' + this.chatName)
  //             .then(response => {
  //               console.log(response.data.data, 'res')
  //               if (response.data.code === 2) {
  //                 this.dialogVisibleRoom = true
  //               } else if (response.data.code === 0) {
  //                 this. dialogcreateRoomPass = true;
  //               }else {
  //                 this.$router.push({
  //                   name: 'ChatRoom',
  //               query: {chatRoomId:response.data.data.id}
  //                   // params: {
  //                   //   chatRoomId:response.data.data.id,
  //                   //   tempNickName: this.tempNickName,
  //                   //   chatName:this.chatName
  //                   // }
  //                 })
  //               }
  //             })
  //
  //         localStorage.setItem('chatName', this.chatName);
  //         localStorage.setItem('tempNickName', this.tempNickName,);
  //       } else {
  //         this.dialogVisible = true;
  //       }
  //     } else {
  //       this.$message('请输入聊天室名')
  //     }
  //   },
  //   //临时用户注册
  //   ...mapMutations(['SET_USER_LOGIN_INFO', 'CHANGE_LOGIN']),
  //   tempUserToChat(){
  //     this.axios
  //         .post('/user/temp-user-insert',{
  //           "headUrl": "https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/default.jpg",
  //           "nickName": this.tempNickName
  //         })
  //         .then(res => {
  //           console.log(res.data.data, 'res')
  //           localStorage.setItem('loginName', res.data.data.nickName);
  //           localStorage.setItem('userId', res.data.data.id);
  //           localStorage.setItem('headUrl', res.data.data.headUrl);
  //           this.CHANGE_LOGIN({Authorization: res.data.data.token});
  //         })
  //   },
    toLogin() {

      this.$router.push({path: '/login'})
    },
    toRegister() {
      this.$router.push({path: '/register'})
    },
    loginOut() {
      localStorage.setItem('Authorization', '');
      // localStorage.setItem('headUrl','https://softtalk.oss-cn-hangzhou.aliyuncs.com/user_icon/default.jpg');
      localStorage.setItem('loginName', '');
      localStorage.setItem('chatName', '');
      this.$router.push('/login')
    },
    toNewPass() {
      console.log('newPassword')
      this.$router.push({path: '/newPassword'})
    },
    toEditUserInfo() {
      console.log('toEditUserInfo')
      this.$router.push({path: '/editUserInfo'})
    },
    toHome() {
      this.$router.push({path: '/alldynamic'})
    },

    register: function () {
      console.log(this.registerData, 'name')
      // this.$router.push({ path: '/login' })
      this.axios
          // axios.post('https://www.online-tradeshows.com/api/userInfo', qs.stringify({id: this.form.userID}),{headers:{'content-type': 'application/x-www-form-urlencoded'} })
          // .post('http://121.196.111.125:8007/user/insert')
          .get('http://127.0.0.1:7001/api/v2/northQrough')
          .then(response => {
            console.log(response, 'res')
          })
    },
    cancelPage: function () {
      // console.log( this.registerData,'name')
      this.$router.go(-1)
    }
  }
}

</script>

<style scoped>
.user-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-left: 1rem;
}

.index-top {
  padding-top: 0.2rem;
  position: absolute;
  top: 0;
  /*height: 10vh;*/
  width: 100vw;
  /*background-color: #2BB1A8;*/
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.index-top-div {
  height: 100%;
  width: 10%;
  background-color: black;
  margin-left: 0.3rem;
  min-width: 4rem;
}

.Header-logo {
  display: block;
  position: relative;
  margin: 0 auto 1rem auto;
  height: 97px;
  /*background: url(../images/icon.svg) no-repeat center center;*/
}

.Header {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: relative;
  text-align: center;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  background: #6ea5ed url(../assets/bg.jpg) no-repeat center center;
  background-size: cover;
}

.Join {
  margin: 40px 0 50px 0;
}

.Join-domain {
  position: absolute;
  margin: 1rem 1rem;
  color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
}

.Join-input {
  -moz-appearance: none;
  -webkit-appearance: none;
  display: inline-block;
  width: 280px;
  padding: .5rem .5rem .5rem 4.4rem;
  vertical-align: middle;
  font-size: inherit;
  line-height: 34px;
  color: white;
  border-radius: 4px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  background-color: rgba(78, 114, 166, 0);
  transition: background-color .1s;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

.Join-button {
  height: 3.3rem;
  -webkit-appearance: button;
  cursor: pointer;
  margin-left: 4px;
  vertical-align: middle;
  padding: .5rem 2rem;
  font-family: inherit;
  font-size: inherit;
  line-height: 42px;
  color: #4e4e88;
  border-radius: 4px;
  border: none;
  background: white;
  outline: none;
  transition: background-color .2s ease-out;
}

/*.Join-button:hover{*/
/*  !*-webkit-box-shadow: #ccc 0px 10px 10px;*!*/
/*  !*-moz-box-shadow: #ccc 0px 10px 10px;*!*/
/*  box-shadow: #ccc 0px 10px 10px;  }*/
</style>
