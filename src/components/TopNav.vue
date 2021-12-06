<template>
  <div>
    <div class="top-logo"><img @click="toIndex" style="height: 10vh;" src="../assets/SoftTalk1.png"></div>
  </div>

</template>

<script>
export default {
  name: "TopNav",
  methods: {
    toIndex() {
        this.$router.push({path: '/'})
    }
  }
}

</script>

<style scoped>
.top-logo {
  padding: 3vh;
  height: 12vh;
  /*background: #0e90d2;*/
  position: relative;
  text-align: center;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  background: #6ea5ed url(../assets/bg.jpg) no-repeat center center;
  background-size: cover;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: center;*/
}
</style>
