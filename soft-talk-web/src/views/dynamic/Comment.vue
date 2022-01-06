<template>
  <!--  <div>-->
  <el-card shadow="hover" :body-style="{padding:'2vw'}" class="new-dynamic">
    <div>评论</div>
    <el-input
        type="textarea"
        :autosize="{ minRows: 12, maxRows: 15}"
        maxlength=5000
        placeholder="请输入评论内容"
        v-model="textarea">
    </el-input>
    <el-button style="background-color: #6697e0" class="new-dynamic-button"  @click="editDynamic">提交</el-button>

  </el-card>

  <!--  </div>-->
</template>

<script>
import qs from "qs";

export default {
  name: "Comment",
  data() {
    return {
      // oldDynamicText:'oldDynamicText',
      textarea: '',
      id:0
    }
  },
  mounted() {
    // this.getTheDynamic();
  },
  methods: {
    // getTheDynamic(){
    //   console.log(this.$route.params,'route params')
    //   this.axios
    //       .post('/replies/insert',{id:this.$route.params.id})
    //       .then(res => {
    //         // 请求成功
    //         console.log(res.data);
    //         this.textarea = res.data.data.content;
    //         this.id = res.data.data.id;
    //         // this.userToken = res.data.data.token;
    //         // localStorage.setItem('userId', res.data.data.id);
    //         // // 将用户token保存到vuex中
    //         // this.CHANGE_LOGIN({Authorization: this.userToken});
    //         // this.$router.push('/');
    //       }).catch(error => {
    //     // 请求失败，
    // console.log("500")
    //   });
    // },
    editDynamic() {
      if (this.textarea){
      this.axios
          .post('/replies/insert', {
            "content": this.textarea,
            "picUrl": "string",
            "toType": 0,
            "userId": this.$store.state.userId,
            "momentsId": this.$route.params.id //动态的id
          })
          .then(res => {
            // 请求成功
            // this.getAllDynamicData = res.data.data;
            console.log(res.data, 'postDynamic');
            this.$message('评论成功！');
            this.$router.push('/alldynamic')
          }).catch(error => {
        // 请求失败，
     console.log("500")

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
