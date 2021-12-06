<template>
  <div id="app">

    <router-view class="view one" name="top"></router-view>
    <router-view class="view two" name="side"></router-view>
    <div class="side-main">
      <router-view class="view three"></router-view>
    </div>
<!--    <router-view class="view one"></router-view>-->
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

body
  margin 0;

.side-main{
  display flex
  flex-direction row
  justify-content center

}
//margin-top 60px
.one {
  height 20vh;
  width 100vw;
}

.two {
  width 15vw
  position absolute
}
.three{
  //width 100vw
}
</style>
