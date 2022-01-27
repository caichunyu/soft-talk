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

        <h2>修改个人信息</h2>
      </div>

      <el-input v-model="nickName" placeholder="请输入新昵称"></el-input>
      <div style="display: flex;flex-direction: row; width: 100%;">选头像：
        <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="res=>$set(model,'avatar', res.url)">
          <div  style="display: flex;flex-direction: row">
            <img v-if="model.avatar" :src="model.avatar" class="avatar">
<!--            <div>-->
              <el-button slot="trigger" size="small" type="primary" style="margin-left: .3rem;">选取</el-button>
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
          </div>

        </el-upload>
<!--        <el-button style="margin-left: .3rem;height: 2rem;" size="small" type="success" @click="submitForm">上传</el-button>-->

      </div>
<!--      <div>性别：-->
<!--        <el-radio v-model="radio" label="1">男</el-radio>-->
<!--        <el-radio v-model="radio" label="2">女</el-radio>-->
<!--      </div>-->
      <!--      <el-button type="primary" @click="register">注册</el-button>-->
      <el-button-group>
        <el-button style="margin-right: 1rem" @click="cancelPage">取消</el-button>
        <el-button @click="updateUserInfo">确认</el-button>
      </el-button-group>
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
  name: "EditUserInfo",
  data() {
    return {
      file: null,
      tempCheckpoint: null, // 用来缓存当前切片内容
      uploadId: '',
      uploadName: '',  //Object所在Bucket的完整路径
      radio: '1',
      email: '',
      sex: 0,
      nickName:'',
      headUrl: 'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/default.jpg',
      model:{
        avatar:''
      }
    }
  },
  mounted() {
    if (localStorage.getItem('headUrl')){
      this.model.avatar = localStorage.getItem('headUrl');
    }
  },
  methods: {
    // 点击上传至服务器
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
        setTimeout(()=>this.headUrl = 'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/' + this.$store.state.userId +'_'+this.file.name+ '.jpg', 1000)
        localStorage.setItem('headUrl', 'https://softtalk.oss-cn-hangzhou.aliyuncs.com/avatar/'+this.$store.state.userId+'_'+this.file.name+ '.jpg')
        //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
        let result = await client.multipartUpload('avatar/' + this.$store.state.userId +'_'+ this.file.name + '.jpg', this.file, {
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

    updateUserInfo: function () {
      // if (this.password === this.password1 && this.oldPassword) {

      this.axios
          .post('/api/user/update',
              {
                id: this.$store.state.userId,
                headUrl: this.model.avatar,
                nickName: this.nickName
              })
          .then(res => {
            if (res.data.code === 0) {
              this.$message(res.data.message)
            } else if (res.data.code === 1) {
              this.$message(res.data.message)
              this.$router.push('/');
              localStorage.setItem('loginName',res.data.data.nickName)
              localStorage.setItem('headUrl',res.data.data.headUrl)
            }
            console.log(res, 'res')
          })
      // }
    },
    cancelPage: function () {
      // console.log( this.registerData,'name')
      this.$router.go(-1)
    }
  }
}

</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  /*cursor: pointer;*/
  /*position: relative;*/
  /*overflow: hidden;*/
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 2.5rem;
  height: 2.5rem;
  /*line-height: 178px;*/
  text-align: center;
}

.avatar {
  width: 2rem;
  height: 2rem;
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

