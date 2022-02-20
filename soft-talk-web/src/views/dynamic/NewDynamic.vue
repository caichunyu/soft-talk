<template>
  <!--  <div>-->
  <el-card shadow="hover" :body-style="{padding:'2vw'}" class="new-dynamic">
    <div>创建新动态</div>
    <el-input
        type="textarea"
        :autosize="{ minRows: 12, maxRows: 15}"
        maxlength=5000
        placeholder="请输入内容"
        v-model="textarea">
    </el-input>
    <el-button style="background-color: #6697e0" class="new-dynamic-button"  @click="postDynamic">发表</el-button>

  </el-card>

  <!--  </div>-->
</template>

<script>
export default {
  name: "NewDynamic",
  data() {
    return {
      textarea: '',
    }
  },
  methods: {
    postDynamic() {
      if (this.textarea){
        this.axios
            .post('/dynamic/insert', {
              "nickName":this.$store.state.loginName,
              "content": this.textarea,
              "userId": this.$store.state.userId,
              "headUrl":localStorage.getItem('headUrl')
            })
            .then(res => {
              // 请求成功
              this.$message('发布成功！');
              this.$router.push('/alldynamic')
              console.log(res.data, 'postDynamic___---',this.$store.state);
            }).catch(error => {
          // 请求失败，
          this.console.error("登录失败！请检查登录信息是否正确！")
        });

      console.log('yes', this.textarea)
    }else {
        this.$message('不能为空')
      }
    }
  }
}
</script>
<style scoped>
/*.new-dynamic{*/
@media screen and (max-width: 500px) {
  .new-dynamic {
    margin-left: 10vw;
    /*background-color: #0e90d2;*/
  }
}
.new-dynamic{
  margin-top: 2.5vh;
  width: 68vw;

  /*height: 51vh;*/
}
.new-dynamic-button{
  width: 64vw;
  max-width: 50rem;
  margin-top: 1vh;
}
/*}*/
</style>
