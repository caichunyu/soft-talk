<template>
  <div>
    <!--//输入昵称弹出框-->
    <div style="z-index: 9999">
      <el-dialog
          :before-close="handleClose"
          title="请输入昵称"
          :visible.sync="dialogVisible"
          width="22rem" >
        <el-input v-model="tempNickName" placeholder="请输入昵称">
          <!--      <el-button @click="visible = !visible">进入</el-button>-->
        </el-input>
        <div style="padding-top: .5rem">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="tempUserToChat">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--//房间密码弹出框-->
    <el-dialog
        :before-close="handleClose"
        title="请输入房间密码"
        :visible.sync="dialogVisibleRoom"
        width="22rem">
      <el-input v-model="roomPass" placeholder="请输入房间密码">
        <!--      <el-button @click="visible = !visible">进入</el-button>-->
      </el-input>
      <div style="padding-top: .5rem">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="verfiyPass">确 定</el-button>
      </div>
    </el-dialog>
    <!--//新建房间密码弹出框-->
    <el-dialog
        :before-close="handleClose"
        title="请输入当前房间密码"
        :visible.sync=" dialogcreateRoomPass"
        width="22rem">
      <el-input v-model="roomPass" placeholder="请设置密码，无密码的话请直接点确认！">
        <!--      <el-button @click="visible = !visible">进入</el-button>-->
      </el-input>
      <div style="padding-top: .5rem">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="createRoomPass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "HelloWorld",
  data(){
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
    this.chatName = localStorage.getItem('chatName');
    if (localStorage.getItem('Authorization')) {
      this.headUrl = localStorage.getItem('headUrl')
      console.log(this.$store)
      this.loginName = localStorage.getItem('loginName')
      this.isLogin = false
    }
    this.toChat()
  },
  methods:{
    handleClose(){
      this.$router.push({path:'/'      })

    },
    cancel(){
      this.drawer=false;
      this.dialogVisibleRoom= false;
      this.dialogVisible =false;
      this.dialogcreateRoomPass =false;
      this.$router.push({path:'/'      })
    },
    // toChat(){
    //   if (this.chatName) {
    //     this.$router.push({path: '/chatroom'})
    //   } else {
    //     this.$message('请输入聊天室名')
    //   }
    // },
    verfiyPass(e) {
      //验证密码
      console.log('pass', this.roomPass, e)
      if (this.roomPass) {
        this.axios
            .post('/chatrooms/check-password', {
              "chatroomName": this.chatName,
              "password": this.roomPass,
            })
            .then(response => {
              console.log(response.data, 'res')
              if (response.data.message === "密码错误，进入聊天室失败") {
                this.$message('"密码错误，进入聊天室失败"')
              } else {
                localStorage.setItem('chatRoomId', response.data.data.id);
                this.$router.push({
                  name: 'ChatRoom',
                  query: {chatRoom:this.chatName}
                })
              }
            })
      }
    },
    createRoomPass(e) {
      //新建房间密码设置
      console.log('pass', this.roomPass, e)
      let type =1 ;
      if (this.roomPass) {
        type =2
      }
      this.axios
          .post('/chatrooms/create', {
            "type": type,
            "name": this.chatName,
            "password": this.roomPass,
          })
          .then(response => {
            console.log(response.data, 'res')
            // if (response.data.message === "密码错误，进入聊天室失败") {
            //   this.$message('"密码错误，进入聊天室失败"')
            // } else {
            localStorage.setItem('chatRoomId', response.data.data.id);
            this.$router.push({
              name: 'ChatRoom',
              query: {chatRoom:this.chatName}
            })
            // }
          })
      // }
    },
    toChat(done) {
      this.drawer = true;
      if (this.chatName) {
        if (localStorage.getItem('Authorization') || this.tempNickName || this.roomId) {
          this.dialogVisible = false;
          // this.drawer = true;
          console.log('name room', this.chatName)
          this.axios
              .get('/chatrooms/enter?chatroomName=' + this.chatName)
              .then(response => {
                console.log(response.data.data, 'res')
                if (response.data.code === 2) {
                  this.dialogVisibleRoom = true
                } else if (response.data.code === 0) {
                  this. dialogcreateRoomPass = true;
                }else {
                  localStorage.setItem('chatRoomId', response.data.data.id);
                  this.$router.push({
                    name: 'ChatRoom',
                    query: {chatRoom:this.chatName}
                    // params: {
                    //   chatRoomId:response.data.data.id,
                    //   tempNickName: this.tempNickName,
                    //   chatName:this.chatName
                    // }
                  })
                }
              })

          localStorage.setItem('chatName', this.chatName);
          localStorage.setItem('tempNickName', this.tempNickName,);
        } else {
          this.dialogVisible = true;
        }
      } else { //链接进来情况
        // this.$message('请输入聊天室名')
        this.dialogVisible = true;
      }
    },
    //临时用户注册
  ...mapMutations(['SET_USER_LOGIN_INFO', 'CHANGE_LOGIN']),
        tempUserToChat(){
      this.axios
          .post('/user/temp-user-insert',{
            "headUrl": "https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/default.jpg",
            "nickName": this.tempNickName
          })
          .then(res => {
            console.log(res.data.data, 'res')
            localStorage.setItem('loginName', res.data.data.nickName);
            localStorage.setItem('userId', res.data.data.id);
            localStorage.setItem('headUrl', res.data.data.headUrl);
            // localStorage.setItem('headUrl', res.data.data.headUrl);
            // this.chatName='fromUrl'
            this.CHANGE_LOGIN({Authorization: res.data.data.token});
            this.toChat()
          })
    },
  },

}
</script>

<style scoped>
</style>
