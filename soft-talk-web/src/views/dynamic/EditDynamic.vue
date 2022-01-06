<template>
  <!--  <div>-->
  <el-card shadow="hover" :body-style="{padding:'2vw'}" class="new-dynamic">
    <div>修改动态</div>
    <el-input
        type="textarea"
        :autosize="{ minRows: 12, maxRows: 15}"
        maxlength=5000
        placeholder=""
        v-model="textarea">
    </el-input>
    <el-button style="background-color: #6697e0" class="new-dynamic-button"  @click="editDynamic">修改</el-button>

  </el-card>

  <!--  </div>-->
</template>

<script>
import qs from "qs";

export default {
  name: "EditDynamic",
  data() {
    return {
      // oldDynamicText:'oldDynamicText',
      textarea: '',
      id:0
    }
  },
  mounted() {
    this.getTheDynamic();
  },
  methods: {
    getTheDynamic(){
      console.log(this.$route.params,'route params')
      this.axios
          .get('/moments/detail', {
            params: {
              id: this.$route.params.id
            }
          })
              // qs.stringify({id:this.$route.params.id}))
          .then(res => {
            // 请求成功
            console.log(res.data);
            this.textarea = res.data.data.content;
            this.id = res.data.data.id;
            // this.userToken = res.data.data.token;
            // localStorage.setItem('userId', res.data.data.id);
            // // 将用户token保存到vuex中
            // this.CHANGE_LOGIN({Authorization: this.userToken});
            // this.$router.push('/');
          }).catch(error => {
        // 请求失败，
     console.log("登录失败！请检查登录信息是否正确！")
      });
    },
    editDynamic() {
      if (this.textarea){
      this.axios
          .post('/moments/update', {
            "content": this.textarea,
            "picUrl": "string",
            "id": this.id //动态的id
          })
          .then(res => {
            // 请求成功
            // this.getAllDynamicData = res.data.data;
            console.log(res.data, 'postDynamic');
            if (res.data.code === 0) {

              this.$message(res.data.message)
            } else if (res.data.code === 1) {
              this.$message(res.data.message)
              this.$router.push('/alldynamic')
              localStorage.setItem('loginName',this.nickName)
            }
            // this.$message('修改成功！');
          }).catch(error => {
        // 请求失败，
        console.log("登录失败！请检查登录信息是否正确！")
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
