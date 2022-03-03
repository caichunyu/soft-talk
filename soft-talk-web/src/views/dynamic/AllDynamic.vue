<template>
  <div class="allDynamic-main">
    <div style="margin-top: .3rem" v-for="(item, index) in getAllDynamicData" :key="item.index" :index="index">
      <el-card shadow="hover" :body-style="{padding:'0.6rem'}">
        <div class="dynamic">
          <div class="dynamic-top">
            <img class="user-icon" :src=item.headUrl>
            <b style="margin-left: 0.2rem">昵称:{{ item.nickName }}</b>
            <el-dropdown v-if="nickName===item.userNickName"
                style="margin-left: 1rem; margin-top: .3rem;">
              <el-button icon="el-icon-more" style="padding: .5rem .5rem;">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div @click="editDynamic(item.id)">修改</div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="deleteDynamic(item.id)">删除</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="dynamic-top" style="margin-left: 2.5rem">{{ item.content }}</div>
          <div class="dynamic-edit">
            <el-button @click="toComment(item._id)" size="mini" class="allDynamic-butt"
                       icon="el-icon-chat-square"></el-button>
            <el-button v-if="getAllDynamicData[index].ifLike === 1" size="mini" class="allDynamic-butt"
                       @click="offStar(index)" icon="el-icon-star-on"></el-button>
            <el-button v-else @click="onStar(index)" size="mini" class="allDynamic-butt"
                       icon="el-icon-star-off"></el-button>

            <span style="margin-left: 0.1rem"> {{ item.likes }}</span>
          </div>
          <div class="dynamic-top dynamic-comment" v-for="ite in item.repliesVOList">
            <b>{{ ite.nickName }}: </b>
            <div> {{ ite.content }}</div>
          </div>
        </div>
      </el-card>
    </div>

    <div class="block">
<!--      <span class="demonstration">页数较少时的效果</span>-->
      <el-pagination
          @current-change	="nowPage"
          @prev-click="nowPage"
          @next-click="nowPage"
          layout="prev, pager, next"
          :current-page.sync=currentPage
          :total=dynamicLists>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "AllDynamic",
  data() {
    return {
      pageNum:100,
      index: 1,
      getAllDynamicData: [],
      isStar: 'false',
      starNum: 0,
      nickName: '',
      currentPage:1,
      dynamicLists:1
    };
  },
  mounted() {
    // this.nowPage();
    this.getAllDynamic();
    this.nickName = localStorage.getItem('loginName')
  },
  methods: {
    nowPage(p){
      console.log(p,'page now')
      this.axios
          .post('/dynamic/list',
              {
            "currentPage":p,
            "pageSize": 10,
          }
          )
          .then(res => {
            // 请求成功
            this.getAllDynamicData = res.data.data;
            if (this.getAllDynamicData[0].headerUrl !=='string'){

            }
            console.log(res.data, 'getAllDynamic', this.getAllDynamicData);
          }).catch(error => {
        // 请求失败，
        this.console.error("登录失败！请检查登录信息是否正确！")
      });
    },
    toComment(id) {
      this.$router.push({
        name: 'Comment',
        params: {
          id: id
        }
      })
    },
    getAllDynamic() {
      this.axios
          .get('/dynamic/list', )
          .then(res => {
            // 请求成功
            this.getAllDynamicData = res.data.data;
            console.log(  this.dynamicLists, '  this.dynamicLists');
          }).catch(error => {
        // 请求失败，
        this.console.error("登录失败！请检查登录信息是否正确！")
      });
    },
    deleteDynamic(id) {
      this.axios
          .delete('/moments/delete?id=' + id)
          .then(res => {
            // 请求成功
            console.log(res.data, 'delete', id);
            if (res.data.code === 1) {
              this.$message('删除成功！');
              // this.currentPage = 3
              this.dynamicLists--
              this.nowPage(this.currentPage);
              this.getAllDynamic();
            }
          }).catch(error => {
        // 请求失败，
        this.console.error("登录失败！请检查登录信息是否正确！")
      });
    },
    editDynamic(id) {
      this.$router.push({
        name: 'EditDynamic',
        params: {
          id: id
        }
      })
    },
    //点赞处理
    onStar(id) {
      this.getAllDynamicData[id].likes++;
      this.getAllDynamicData[id].ifLike = 1;

      this.axios
          .post('/moments/like', {
            "momentsId": id,
            "type": 1,
            "userId": this.$store.state.userId
          })
          .then(res => {
            // 请求成功
            // this.getAllDynamicData = res.data.data;
            // console.log(res.data, 'getAllDynamic', this.getAllDynamicData);
          }).catch(error => {
        // 请求失败，
        console.log("登录失败！请检查登录信息是否正确！")
      });

      console.log(id, 'star id')
      console.log(this.getAllDynamicData, 'star id')
    },
    offStar(id) {
      // if (this.getAllDynamicData[id].ifLike){
      this.getAllDynamicData[id].likes--;
        this.getAllDynamicData[id].ifLike=0;
      this.axios
          .post('/moments/like', {
            "momentsId": id,
            "type": 0,
            "userId": this.$store.state.userId
          })
          .then(res => {
            // 请求成功
            // this.getAllDynamicData = res.data.data;
            // console.log(res.data, 'getAllDynamic', this.getAllDynamicData);
          }).catch(error => {
        // 请求失败，
        console.log("登录失败！请检查登录信息是否正确！")
      });

    },
    // this.$event.confirm
    confirmDelete() {
      console.log('已删除');
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
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  /*margin-left: 1rem;*/
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
  padding-bottom: 1rem;
}

@media screen and (max-width: 500px) {
  .allDynamic-main {
    margin-left: 10vw;
    /*background-color: #0e90d2;*/
  }
}

.dynamic-top {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
</style>
