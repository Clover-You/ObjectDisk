<!--
 * @Author: LRolinx
 * @Date: 2021-01-09 13:37:25
 * @LastEditTime: 2021-03-09 11:40:18
 * @Description: 流视频DEMO
 * 
-->
<template>
  <div class="bodyBox">
    <button type="button" @click="show">显示视频模态窗</button>
    <div>

    </div>
    <!-- <video id="DEMO" controls></video> -->
    <lVideo :videoList="videoList" :isShow.sync="isShow"></lVideo>
    <!-- <video class="video" :src="`${$store.state.serve.serveUrl}video/playVideo?name=59b615ae720a9912661f22d4608db65dc6d5a576bf3d9f95296ec25002efd06a.mp4`" controls></video> -->
    <!-- <video width="100%" class="video" id="video" ref="video" :src="lsSrc" controls @loadedmetadata="destroyBlobUrl(lsSrc)"></video> -->
  </div>
</template>
<script>
import lVideo from "@/components/lVideo"
export default {
  components: {
    lVideo
  },
  data() {
    return {
      isShow: false,
      videoList: [],
      lsSrc: "",
    }
  },
  created() {
    if (!this.$store.state.isLogin) {
      this.$router.replace({ name: 'login' });//没登录直接回到登录页
    }

    this.videoList.push("8a8b0118c620cba9363eefe843491322f282a87efa4481a97500dca0bf2a70b2.mp4");

    // this.$http.post(`${this.$store.state.serve.serveUrl}video/playVideoSteam`, {
    //   name: "8a8b0118c620cba9363eefe843491322f282a87efa4481a97500dca0bf2a70b2.mp4"
    // },{
    //   responseType:'blob'
    // }).then(res => {
    //   // console.log(res.data);
      
    //   // let video = document.querySelector("#video");
    //   // video.src = URL.createObjectURL(res.data);
    //   this.videoList.push(
    //   {
    //     title: `测试他一手`,
    //     src: URL.createObjectURL(res.data),
    //   })
    // }).catch(err => {
    //   console.log(err);
    // })

  },
  methods: {
    show() {
      this.isShow = true;
    },
    destroyBlobUrl(blob) {
      //销毁blob地址
      window.URL.revokeObjectURL(blob);
    },
  }
}
</script>
<style scoped>
.bodyBox {
  overflow: auto;
}
/* .video {
  width: 80vw;
} */
</style>