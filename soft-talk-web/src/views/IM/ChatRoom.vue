<template>
  <div class="chat-main">
    <div class="header">
      <div class="header-bar">
        <span @click="toIndex" class="header-avatar"></span>
        <span id="channel" class="header-channel">{{ chatName }}</span>
        <div style="margin-top: .8rem; color: #FFFFFF">{{ onlineUserNum }}</div>
        <!--        移动端显示的侧边栏-->
        <div class="chat-side-mobile" @click="drawer = true">...</div>
        <el-drawer
            title="在线用户"
            size="50%"
            :visible.sync="drawer">
          <div class="chat-side-hidden">
            <div class="chat-side-div" v-for="(item, index) in onlineUser" :key="item.index" :index="index">
              <img class="user-icon" :src=item.headUrl>
              <div class="chat-side-div-text">{{ item.nickName }}
              </div>
            </div>

          </div>
        </el-drawer>
      </div>
      <!--        显示的侧边栏-->
      <div class="chat-side">
        在线用户
        <div class="chat-side-div" v-for="(item, index) in onlineUser" :key="item.index" :index="index">
          <img class="user-icon" :src=item.headUrl>
          <div class="chat-side-div-text">{{ item.nickName }}
          </div>
        </div>

      </div>
    </div>
    <!--      中间对话框-->
    <div style="height: 82vh;overflow: auto">
    <div class="chat-div" v-for="(item, index) in allMess" :key="item.index" :index="index">
      <img class="user-icon" :src=headUrl>
      <div v-if="item.msgType !== 3" class="chat-div-div">{{ item.content }}</div>
      <div v-if="item.msgType === 3" style="width: 32rem;margin-left: .3rem">
        <img class="user-icon" style="width: 3rem;height: 3rem;border-radius:0" :src=item.content>
      </div>
      <el-popover
          placement="top"
          width="160"
          v-model="visibles[index]">
        <p>撤回消息吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="noRecall(item.msgId,visibles,index)">取消</el-button>
          <el-button type="primary" size="mini" @click="recall(item.msgId,visibles,index)">确定</el-button>
        </div>
        <!--        <div slot="reference" style="">.</div>-->
        <el-button slot="reference" icon="el-icon-error" circle style="    border: 0;
    background: 0;"></el-button>
        <!--        <el-button slot="reference">删除</el-button>-->
      </el-popover>
    </div>
      </div>
    <!--    输入框 -->
    <div class="chat-footer">
      <!--        发图片-->
      <div class="chat-footer-inside-top">
        <el-popover
            placement="right"
            width="160"
            trigger="click">
          <div>
            <img v-for="(item, index) in imgList" :index="index" :src="imgList[index]" class="avatar"
                 @click="sendImgMess(item)">
          </div>
          <el-button slot="reference" size="mini" icon="el-icon-picture-outline"></el-button>
          <!--            <el-button slot="reference">click 激活</el-button>-->
        </el-popover>
        <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            ref="upload"
            :on-change="handleChange"
            :auto-upload="false"
            accept=""
        >
          <div style="display: flex;flex-direction: row">
            <!--              <img :src="headUrl" class="avatar">-->
            <!--            <div>-->
            <el-button slot="trigger" size="mini"  icon="el-icon-plus"
                       style="margin-left: .3rem;"></el-button>
            <!--&lt;!&ndash;            </div>&ndash;&gt;-->
          </div>

        </el-upload>
        <el-button style="margin-left: 0.3rem;height: 1.8rem;width: 4rem;padding: 0;" size="mini"
                   @click="submitForm">发送图片
        </el-button>
        <!--          <el-button size="mini" icon="el-icon-picture-outline"></el-button>-->
        <!--<el-button icon="el-icon-picture-outline"></el-button>-->
      </div>
      <!--        //发文字-->
      <div class="chat-footer-inside">
        <el-input v-model="mess" placeholder="请输入内容" style="margin-right: .3rem"></el-input>
        <el-button style="margin-right: 1rem" @click="sendMess">发送</el-button>
      </div>
    </div>
  </div>

</template>

<script>
let OSS = require('ali-oss') // 引入ali-oss插件
const client = new OSS({
  // region: 'oss-cn-shanghai',//根据那你的Bucket地点来填写
  accessKeyId: 'LTAI5t6Ad8v8Uixmn9ErS8z7',//自己账户的accessKeyId
  accessKeySecret: 'gBK6dNSil12qZ4bR6qblq5FFeofjjy',//自己账户的accessKeySecret
  bucket: 'softtalk',//bucket名字
});

export default {
  name: "ChatRoom",
  data() {
    return {
      tempNickName: '',
      roomPass: '',
      roomId: null,
      dialogVisibleRoom: false,
      dialogcreateRoomPass: false,
      dialogVisible: false,

      file: null,
      tempCheckpoint: null, // 用来缓存当前切片内容
      uploadId: '',
      uploadName: '',  //Object所在Bucket的完整路径
      messImgUrl: '',

      imgList: [
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img1.jpg.jpg',
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img2.jpg.jpg',
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img3.jpg.jpg',
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img4.jpg.jpg',
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img5.jpg.jpg',
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img6.jpg.jpg',
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img7.jpg.jpg',
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img8.jpg.jpg',
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img9.jpg.jpg',
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img10.jpg.jpg',
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img11.jpg.jpg',
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img12.jpg.jpg',
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img13.jpg.jpg',
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img14.jpg.jpg',
        'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/36_img15.jpg.jpg',
      ],

      index: 1,
      mess: '',
      chatName: '',
      onlineUserNum: '',
      chatRoomId: '',
      nickName: '',
      headUrl: '',
      drawer: false,
      visibles: [],
      input: '',
      allMess: [],
      onlineUser: []
    };
  },
  mounted() {
    if (!localStorage.getItem('chatName')){
      localStorage.setItem('chatName',this.$route.query.chatRoomId)
      this.$router.push('/hello')
    }
    // 初始化
    this.chatRoomId = localStorage.getItem('chatRoomId');
    // this.chatRoomId = this.$route.query.chatRoomId;

    this.nowUser();
    if (localStorage.getItem('loginName')) {
      this.nickName = localStorage.getItem('loginName');
      this.headUrl = localStorage.getItem('headUrl');
      this.userId = localStorage.getItem('userId');
    } else {
      this.headUrl = 'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/default.jpg'
      // this.chatName = this.$route.params.chatName;
      this.nickName = this.$route.params.tempNickName;
      // this.chatName= localStorage.getItem('tempNickName');
    }
    this.chatName = localStorage.getItem('chatName');
    this.init()
    setInterval(this.getMessage, 1000)
  },

  destroyed() {
    // this.$message('new P')
    this.close();
    console.log(this.socket, ' close 111!!!!!!!socket')
    //存聊天记录
    this.axios
        .get('/chatroomsViews/enter?chatroomId=' + this.chatRoomId + '&userId=' + this.userId)
        .then(response => {
          // this.onlineUser = response.data.data.list
          console.log(response, this.chatRoomId, '  //存聊天记录')
        })
  },
  methods: {
    // 图片点击上传至服务器
    submitForm(file) {
      this.multipartUpload();
      // this.headUrl = 'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/'+this.$store.state.userId+'.jpg'
    },
    // 切片上传
    async multipartUpload() {
      if (!this.file) {
        this.$message.error('请选择文件')
        return
      }

      try {
        console.log("切片上传完毕 11");
        setTimeout(() => {
          this.messImgUrl = 'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/' + this.$store.state.userId + '_' + this.file.name + '.jpg';
          this.sendImgMess(this.messImgUrl)
        }, 1000)
        // localStorage.setItem('headUrl', 'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/'+this.$store.state.userId+'_'+this.file.name+ '.jpg')
        //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
        let result = await client.multipartUpload('avatar/' + this.$store.state.userId + '_' + this.file.name + '.jpg', this.file, {
          headers: {
            'Content-Disposition': 'inline',
            'Content-Type': this.file.type //注意：根据图片或者文件的后缀来设置，我试验用的‘.png’的图片，具体为什么下文解释
          },
          progress: (p, checkpoint) => {
            this.tempCheckpoint = checkpoint;
            this.upload = checkpoint.uploadId
            this.uploadName = checkpoint.name
            console.log(p, checkpoint, this.percentage, '---------uploadId-----------')
            // 断点记录点。浏览器重启后无法直接继续上传，您需要手动触发上传操作。
          },
          meta: {year: 2020, people: 'dev'},
          mime: this.file.type
        });
        console.log(result, 'result= 切片上传完毕=');

      } catch (e) {
        window.addEventListener('online', this.resumeUpload) // 该监听放在断网的异常处理
        // 捕获超时异常。
        if (e.code === 'ConnectionTimeoutError') { // 请求超时异常处理
          this.uploadStatus = 'exception'
          console.log("TimeoutError");
          // do ConnectionTimeoutError operation
        }
        // console.log(e)
      }
    },
    // 选择文件发生改变
    handleChange(file, fileList) {
      this.fileList = fileList.filter(row => row.uid == file.uid)
      this.file = file.raw
      // 文件改变时上传
      console.log("选择文件发生改变 11");
      // this.submitForm(file)
    },

    //发送消息等
    init: function () {
      if (typeof (WebSocket) === "undefined") {
        alert("您的浏览器不支持socket")
      } else {
        let socketUrl = "ws://121.196.111.125:8007/webSocket/" + this.userId + "/" + this.nickName + "/" + this.chatRoomId + "/" + this.headUrl.replace(/\//g, "_");
        console.log(socketUrl, 'socket')
        // 实例化socket
        // this.socket = new WebSocket(`ws://sjzh2019.ticp.io:8888/dev/websocket/${this.userId}`);
        // this.socket = new WebSocket('ws://121.196.111.125:8007/webSocket/6/nick1/33/https:__softtalk.oss-cn-hangzhou.aliyuncs.com_user_icon_6_6.jpg.jpg');
        this.socket = new WebSocket(socketUrl);
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
        // 监听socket关闭
        this.socket.onclose = this.close;
      }
    },
    open: function () {
      console.log("socket连接成功1")
    },
    error: function () {
      console.log("连接错误")
    },
    getMessage: function (msg) {
      // console.log(msg, '信息new')
      if (msg) {
        console.log(JSON.parse(msg.data), '信息new1')
        if (JSON.parse(msg.data).msgType !== 4) {
          this.allMess.push(JSON.parse(msg.data));
          console.log(this.allMess, 'all mess')
        }
      if (JSON.parse(msg.data).msgType === 0|| JSON.parse(msg.data).msgType !== 1){
        this.nowUser();
      }
        // else if (JSON.parse(msg.data).msgType === 4){
        //     let msgId = JSON.parse(msg.data).msgId;
        //     console.log(JSON.parse(msg.data).msgId,'msgid')
        //     for (let i =0; i<this.allMess.length; i++){
        //       if (msgId === this.allMess[i].msgId){
        //         console.log(i,'msgid i')
        //       }
        //     }
        //   }
      }
    },
    send: function (params) {
      console.log(params, 'send websocket')
      this.socket.send(params)
    },
    close: function () {
      this.socket.close();
      console.log("socket已经关闭")
    },
    destroyed() {
      // 销毁监听
      this.socket.onclose = this.close

    },
    nowUser() {
      // console.log('pass', this.roomPass, e)
      // if (this.roomPass) {
      this.axios
          .get('/user/online-user-list?chatRoomId=' + this.chatRoomId)
          .then(response => {
            this.onlineUser = response.data.data.list
            console.log(response.data, 'online-user-list')
            this.onlineUserNum = response.data.data.onlineUserNum;
            // if (response.data.message === "密码错误，进入聊天室失败") {
            //   this.$message('"密码错误，进入聊天室失败"')
            // } else {
            //   this.$router.push({
            //     name: 'ChatRoom',
            //     params: {
            //       tempNickName: this.tempNickName,
            //       chatName: this.chatName
            //     }
            //   })
            // }
          })
      // }
    },
    sendMess() {

      if (this.mess) {
        console.log(this.mess, 'ws')
        let msg = {
          userId: this.userId,
          nickName: this.nickName,
          headUrl: this.headUrl,
          content: this.mess,
          type: 2
        };
        this.mess = '';
        this.send(JSON.stringify(msg))
      } else {
        this.$message('不能为空！')
      }

    },
    sendImgMess(url) {
      console.log(url, 'ws')
      let msg = {
        userId: this.userId,
        nickName: this.nickName,
        headUrl: this.headUrl,
        content: url,
        type: 3
      };
      this.send(JSON.stringify(msg))
    },
    // recall(item.msgId,visibles,index)
    noRecall(e, v, i) {
      // this.visibles[i]=false
      this.visibles.splice(i, 1, false);
    },
    recall(e, v, i) {
      let msg = {
        userId: this.userId,
        nickName: this.nickName,
        headUrl: this.headUrl,
        content: e,
        type: 4
      };
      this.send(JSON.stringify(msg))
      console.log(e, v, i, msg, 'reCall')
      this.allMess.splice(i, 1)
      this.visibles.splice(i, 1, false);
    },
    toIndex() {
      this.$router.push({path: '/'})
    },

  }
}
</script>

<style scoped>
.chat-main {
  overflow: auto;
  /*height: 89vh;*/
  display: flex;
  flex-direction: column;
}

.chat-div {
  margin-top: .3rem;
  background-color: #f4f3f1;
  border-radius: .3rem;
  display: flex;
  flex-direction: row;
  /*margin-left: 1rem;*/
  /*width: 100%;*/
  /*margin-left: .6rem;*/
  padding: .3rem;
}

.chat-div-div {
  width: 17rem;
  margin-left: .3rem;
  padding: .5rem;
  word-wrap: break-word;
  text-align: initial;
}

.chat-footer {
  /*padding-left:1rem ;*/
  display: flex;
  flex-direction: column;
  /*justify-content: space-around;*/
  width: 32rem;
  /*position: absolute;*/
  margin-bottom: 1rem;
  /*bottom: 0;*/
}

.chat-footer-inside {
  display: flex;
  flex-direction: row;
  /*justify-content: space-around;*/
  width: 32rem;
  margin-left: 3rem;
  /*position: absolute;*/
  margin-bottom: 1rem;
  /*bottom: 0;*/
}

.chat-footer-inside-top {
  display: flex;
  flex-direction: row;
  /*justify-content: space-around;*/
  width: 32rem;
  margin-left: 3rem;
  /*position: absolute;*/
  margin-bottom: 1rem;
  /*background-color: bisque;*/
  height: 2rem;
  /*bottom: 3rem;*/
}

@media (max-width: 761px) {
  .chat-footer-inside-top {
    width: auto
  }

  .chat-footer-inside {
    width: auto

  }

  .chat-footer {
    /*padding-left:1rem ;*/
    padding-top: .3rem;
    display: flex;
    flex-direction: column;
    /*justify-content: space-around;*/
    width: 97%;
    margin-left: 1rem;
    /*position: absolute;*/
    margin-bottom: 1rem;
    /*bottom: 0;*/
  }
}

@media (max-width: 761px) {
  .chat-side {

    display: none;
  }

  .chat-side-mobile {
    font-size: 2rem;
    color: #ffffff;
    margin-top: -.4rem;
    border: 0;
  }
}

@media (min-width: 761px) {
  .chat-div-div {
    width: 32rem;
    margin-left: .3rem;
    padding: .5rem;
  }

  .chat-div {
    width: 32rem;
    display: flex;
    flex-direction: row;
    word-wrap: break-word;
    /*word-wrap: break-word;*/
    /*width: 30rem;*/
    text-align: initial;
  }

  .header {
    display: flex;
    flex-direction: row;

  }

  .chat-side {
    position: absolute;
    right: 14%;
    max-height: 93vh;
    overflow: auto;
    width: 11rem;
    padding: 1rem;
    /*border-radius: .5rem;*/
    /*height: 10rem;*/
    /*background-color: #2BB1A8*/
  }

  .chat-side-mobile {
    display: none;
  }
}

.chat-side-hidden {
  max-height: 93vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 11rem;
  /*max-height: 100vh;*/
  padding: .4rem;
  /*border-radius: .5rem;*/
  /*height: 10rem;*/
  /*background-color: #2BB1A8*/
}

.chat-side-div {
  display: flex;
  flex-direction: row;
  width: 10.7rem;
  margin-top: .3rem;
}

.chat-side-div-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 0.3rem;
  margin-top: .5rem;
}

.user-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  /*margin-left: 1rem;*/
}

.header-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 102vw;
  background-color: #5c9dff;
}

@media (min-width: 761px) {
  .header-bar {
    width: 35rem;
    /*width: 100%;*/
    border-radius: 0 0 12px 12px;
    /*margin: 0 auto;*/
  }

  .header-bar {
    position: relative;
    z-index: 3;
    height: 50px;
    text-align: left;
    box-shadow: 0 1px 3px #cccccc;
    -webkit-font-smoothing: antialiased;
  }
}

@media (min-width: 761px) {
  .header-avatar {
    width: 55px;
  }
}

.header-avatar {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 0px;
  color: transparent;
  overflow: hidden;
  vertical-align: top;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
  background: url(../../assets/header-avatar.svg) no-repeat center center;
  background-size: 100% auto;
}

.header-channel {
  display: block;
  height: 50px;
  /*margin-left: 60px;*/
  /*margin-right: 96px;*/
  padding-left: 33%;
  font: normal 32px/46px 'Terminal Dosis', sans-serif;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.avatar {
  width: 2rem;
  height: 2rem;
}
</style>
