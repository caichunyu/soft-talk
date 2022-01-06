<template>
  <div>
    <el-row class="tac">
      <el-col :span="12" style="    width: 15vw;">
        <h5>功能</h5>
<!--        用户信息-->
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose" :collapse="isCollapse">
<!--          <el-submenu index="1">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-location"></i>-->
<!--              <span>用户信息</span>-->
<!--            </template>-->
<!--            <el-menu-item-group>-->
<!--              <el-menu-item index="1-1" style="min-width: 0;">编辑信息</el-menu-item>-->
<!--              <el-menu-item index="1-2" style="min-width: 0;">修改密码</el-menu-item>-->
<!--              <el-menu-item index="1-3" style="min-width: 0;" @click="toChatRecord">聊天记录</el-menu-item>-->
<!--            </el-menu-item-group>-->
<!--          </el-submenu>-->
<!--          去聊天室-->
<!--          <el-menu-item index="1" @click="dialogVisible = true">-->
<!--            <i class="el-icon-menu"></i>-->
<!--            <span slot="title">去聊天室</span>-->
<!--          </el-menu-item>-->
<!--          <el-dialog-->
<!--              title="去聊天"-->
<!--              :visible.sync="dialogVisible"-->
<!--              width="30%"-->
<!--              fullscreen-->
<!--              custom-class="my-dialog">-->
<!--            <el-input v-model="IMID" placeholder="请输入内容"></el-input>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="toIM">确 定</el-button>-->
<!--  </span>-->
<!--          </el-dialog>-->
<!--          所有动态-->
          <el-menu-item index="1" @click="toAllDynamic">
            <i class="el-icon-menu"></i>
            <span slot="title">所有动态</span>
          </el-menu-item>
<!--          我的动态-->
          <el-menu-item index="2" @click="toMyDynamic">
            <i class="el-icon-document"></i>
            <span slot="title">我的动态</span>
          </el-menu-item>
<!--          发布动态-->
          <el-menu-item index="3" @click="toNewDynamic">
            <i class="el-icon-circle-plus-outline"></i>
            <span slot="title">发布动态</span>
          </el-menu-item>
<!--          聊天记录-->
          <el-menu-item index="4" @click="toChatRecord">
            <i class="el-icon-zoom-in"></i>
            <span slot="title">聊天记录</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SideNav",
  data() {
    return {
      isCollapse: false,
      dialogVisible: false,
      IMID: '',
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toChatRecord(){
      if (this.$router.history.current.path !== '/chatrecord') {
        this.$router.push({path: '/chatrecord'})
      }
    },
    toIM() {
      console.log('toim', this.IMID)
      this.dialogVisible = false;
    },
    toAllDynamic() {
      console.log('router', this.$router.history.current.path)
      if (this.$router.history.current.path !== '/alldynamic') {
        this.$router.push({path: '/alldynamic'})
      }

    },
    toMyDynamic() {
      console.log('router', this.$router.history.current.path)
      if (this.$router.history.current.path !== '/mydynamic') {
        this.$router.push({path: '/mydynamic'})
      }
    },
    toNewDynamic() {
      console.log('router', this.$router.history.current.path)
      if (this.$router.history.current.path !== '/newdynamic') {
        this.$router.push({path: '/newdynamic'})
      }
    }
  },
  mounted() {
    if (document.body.clientWidth < 550) {
      this.isCollapse = true
    }
    console.log('width', document.body.clientWidth)
  }
}
</script>

<style scoped>
.my-dialog {
  min-width: 100rem
}
.dialog-footer{
  text-align: center;
}
</style>
