<!--
 * @Author: LRolinx
 * @Date: 2021-01-06 10:18:47
 * @LastEditTime: 2021-01-20 18:54:52
 * @Description: 我的云盘-资源池
 * 
-->
<template>
  <div class="body">
    <p style="font-size:0.24rem">资源池</p>
  </div>
</template>
<script>
export default {
  created() {

    if (!this.$store.state.isLogin) {
      this.$router.replace({ name: 'login' });//没登录直接回到登录页
    }
  },
}
</script>
<style scoped>
.body {
  /* width: 100vw; */
}
</style>