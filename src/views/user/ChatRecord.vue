<template>
  <div class="allDynamic-main">
    <div style="margin-top: .3rem"  v-for="(item, index) in getAllDynamicData" :key="item.index" :index="index">
      <el-card shadow="hover" :body-style="{padding:'0.6rem'}">
        <div class="dynamic"  @click="toChatRecordDetail(item.chatroomId)">
          <div class="dynamic-top">
            <!--          <img class="user-icon" src="../../assets/bg.jpg">-->

            <!--          <img class="user-icon" src="../../assets/bg.jpg">-->
            <b style="margin-left: 0.2rem">聊天室名称: {{ item.chatroomName }} </b>
            <b style="margin-left: 0.2rem">创建时间： {{ item.createDate }}</b>

          </div>
          <!--        <div class="dynamic-top dynamic-comment">-->
          <!--          <img class="user-icon" src="../../assets/user.svg">-->
          <!--          <b> name: </b>-->
          <!--          <div> 评论评论评论评论内容********** </div>-->
          <!--          <div style="padding-left: .3rem"> 2021-01-10-31223123</div>-->
          <!--        </div>-->
        </div>
      </el-card>
      </div>

        <div class="block">
          <!--      <span class="demonstration">页数较少时的效果</span>-->
          <el-pagination
              @current-change="nowPage"
              @prev-click="nowPage"
              @next-click="nowPage"
              layout="prev, pager, next"
              :total=dynamicLists>
          </el-pagination>
        </div>
      </div>
</template>

<script>
export default {
  name: "ChatRecord",
  data() {
    return {
      chatName: '',
      time: '2021-01-10-31223123',
      pageNum: 100,
      index: 1,
      getAllDynamicData: [],
      isStar: 'false',
      starNum: 0,
      nickName: 'test111',
      currentPage: 1,
      dynamicLists: 1
    };
  },
  mounted() {
    this.nowPage();
    this.getAllDynamic();
  },
  methods: {
    nowPage(p) {
      console.log(p, 'page now')
      this.axios
          .post('/chatroomsViews/current-user-list', {
            "currentPage": p,
            "pageSize": 10,
          })
          .then(res => {
            // 请求成功
            this.getAllDynamicData = res.data.data;
            console.log('getAllDynamic', this.getAllDynamicData);
          }).catch(error => {
        // 请求失败，
        this.console.error("登录失败！请检查登录信息是否正确！")
      });
    },
    toChatRecordDetail(id) {
      this.$router.push({
        name: 'ChatRecordDetail',
        params: {
          id: id
        }
      })
    },
    getAllDynamic() {
      this.axios
          .post('/chatroomsViews/current-user-list', {
            "currentPage": 1,
            "pageSize": 9999,
          })
          .then(res => {
            // 请求成功
            this.dynamicLists = res.data.data.length;
            console.log(this.dynamicLists, '  this.dynamicLists');
          }).catch(error => {
        // 请求失败，
        this.console.error("登录失败！请检查登录信息是否正确！")
      });
    },
  }
}
</script>

<style scoped>
.dynamic-comment {
  margin-left: 2.6rem;
  font-size: 0.7rem;
}

.user-icon {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-right: .3rem;
}

.allDynamic-butt {

  color: #0e90d2;
  /*background-color: #6697e0;*/
  margin-left: 0.1rem;
}

.allDynamic-main {
  /*background-color: lightyellow;*/
  margin-top: 2.5vh;
  width: 68vw;
}

@media screen and (max-width: 500px) {
  .allDynamic-main {
    margin-left: 10vw;
    /*background-color: #0e90d2;*/
  }
}

.dynamic-top {
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  align-items: flex-start;
}
</style>
