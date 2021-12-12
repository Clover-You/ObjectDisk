<!--
 * @Author: LRolinx
 * @Date: 2020-10-14 20:58:01
 * @LastEditTime: 2021-01-26 12:04:49
 * @Description: 我的云盘
 * 
-->
<template>
  <div class="homeBody">
    <div class="topbar" v-if="false">
      <p>网盘改版了~</p>
    </div>
    <div class="main">
      <div class="siderbar">
        <div class="logo">
          <p>对象内部云盘</p>
        </div>

        <ul class="siderbarUl">
          <li
            :class="{ liOn: $store.state.siderbarStr == 'drive' }"
            @click="openDrive"
          >
            <i class="iconfont icon-drive"></i>
            <p>我的云盘</p>
          </li>
          <li
            :class="{ liOn: $store.state.siderbarStr == 'driveResourcePool' }"
            @click="openDriveResourcePool"
          >
            <i class="iconfont icon-cloud"></i>
            <p>资源池</p>
          </li>
          <li
            :class="{ liOn: $store.state.siderbarStr == 'iconList' }"
            @click="openIconList"
          >
            <i class="iconfont icon-play-drag"></i>
            <p>图标库</p>
          </li>
          <li
            :class="{ liOn: $store.state.siderbarStr == 'streamingVideo' }"
            @click="openStreamingVideo"
          >
            <i class="iconfont icon-video-play"></i>
            <p>视频流DEMO</p>
          </li>
          <li
            :class="{ liOn: $store.state.siderbarStr == 'interactiveEffect' }"
            @click="openInteractiveEffect"
          >
            <i class="iconfont icon-list"></i>
            <p>交互效果DEMO</p>
          </li>
        </ul>

        <div class="headBox">
          <div class="headChildBox">
            <img :src="$store.state.photo" />
            <p>{{ $store.state.nickname }}</p>
          </div>
        </div>
      </div>
      <div class="content">
        <keep-alive>
          <router-view
            v-if="$route.meta.keepAlive"
            ref="childRouter"
          ></router-view>
        </keep-alive>
        <router-view
          v-if="!$route.meta.keepAlive"
          ref="childRouter"
        ></router-view>
      </div>
    </div>

    <uploadModal :uploadBufferPool="uploadBufferPool"></uploadModal>
  </div>
</template>

<script>
import uploadModal from "@/components/uploadModal.vue";
import { sha256 } from "js-sha256";
export default {
  components: {
    uploadModal,
  },
  data() {
    return {
      uploadBufferPool: [], //上传缓冲池
      uploadSetTimeOut: null, //延迟倒计时
      uploadRemainingTask: 0, //剩余上传任务
    };
  },
  watch: {
    $route(toRouter) {
      //设置最后路由
      this.$store.state.siderbarStr = toRouter.name;
      sessionStorage.setItem("siderbarStr", toRouter.name);

      // 检查登录状态
      this.judgmentIsLogin();
    },
    uploadBufferPool() {
      //监听任务列表更新
      ++this.uploadRemainingTask;
      if (this.uploadSetTimeOut != null) {
        clearTimeout(this.uploadSetTimeOut);
        this.uploadSetTimeOut = null;
      }
      //延迟1秒再做处理
      this.uploadSetTimeOut = setTimeout(this.distributionTask, 1000);
    },
  },
  created() {
    // 检查登录状态
    this.judgmentIsLogin();
    //拿取最后的路由名称
    if (sessionStorage.getItem("siderbarStr") != null) {
      this.$store.state.siderbarStr = sessionStorage.getItem("siderbarStr");
    }
  },
  mounted() {},
  methods: {
    judgmentIsLogin() {
      //检查登录

      if (!this.$store.state.isLogin) {
        sessionStorage.setItem("siderbarStr", "drive"); //重置最后路由
        this.$router.replace({ name: "login" }); //没登录直接回到登录页
      }
    },
    openDrive() {
      //打开我的云盘
      this.$router.push({ name: "drive" });
    },
    openDriveResourcePool() {
      // 打开资源池
      this.$router.push({ name: "driveResourcePool" });
    },
    openIconList() {
      //打开图标库
      this.$router.push({ name: "iconList" });
    },
    openStreamingVideo() {
      //打开视频流DEMO
      this.$router.push({ name: "streamingVideo" });
    },
    openInteractiveEffect() {
      //打开树形结构DEMO
      this.$router.push({ name: "interactiveEffect" });
    },
    distributionTask() {
      //分配任务
      for (let i = 0, len = this.uploadBufferPool.length; i < len; i++) {
        if (this.uploadBufferPool[i].uploadType == 0) {
          //有空闲线程先异步执行
          this.uploadRemainingTask--;
          this.upLoadFun(this.uploadBufferPool[i]);
        }
      }
    },
    upLoadFun(item) {
      //uploadType 0等待中 1准备中 2上传中 3上传暂停 4上传完成 5秒传 6文件太小 7文件太大 其他上传错误
      if (item.file.size <= 0) {
        this.$set(item, "uploadType", 6);
        return;
      }
      this.$set(item, "uploadType", 1);
      //拿到sha256
      let fr = new FileReader();
      fr.readAsArrayBuffer(item.file);
      fr.onload = (data) => {
        let sha256Id = sha256(data.target.result);
        this.$set(item, "fileSha256", sha256Id);
        //检查文件
        this.$http
          .post(`${this.$store.state.serve.serveUrl}upload/examineFile`, {
            userid: this.$store.state.id,
            folderid: item.folderId,
            sha256Id: sha256Id,
            filename: item.fname,
            fileext: item.fext,
          })
          .then((examineres) => {
            //检查是否有重复文件
            // 根据浏览器获取文件分割方法
            let blobSlice =
              File.prototype.mozSlice ||
              File.prototype.webkitSlice ||
              File.prototype.slice;

            // 指定文件分块大小 1024的2次方
            let chunkSize = this.calculateSliceSize(item.file.size) * 1024 ** 2;
            // 计算文件分块总数
            let chunks = Math.ceil(item.file.size / chunkSize);
            //设置总片段数量
            this.$set(item, "currentChunkMax", chunks);

            switch (examineres.data.code) {
              case 200:
                if (!examineres.data.data.userFileExist) {
                  if (!examineres.data.data.fileExist) {
                    this.$set(item, "uploadType", 2);
                    // console.log(`${examineres.data.msg}>>${examineres.data.data}`)
                    //没文件开始上传
                    // console.log(item);

                    for (let i = 0, len = chunks; i < len; i++) {
                      // 计算开始读取的位置
                      let start = i * chunkSize;
                      // 计算结束读取的位置
                      let end =
                        start + chunkSize >= item.file.size
                          ? item.file.size
                          : start + chunkSize;

                      // 简化流程
                      let fileslice = blobSlice.call(item.file, start, end);

                      //片段流上传

                      this.$http
                        .put(
                          `${
                            this.$store.state.serve.serveUrl
                          }upload/uploadStreamFile?userid=${encodeURI(
                            this.$store.state.id
                          ).replace(/\+/g, "%2B")}&folderid=${encodeURI(
                            item.folderId
                          ).replace(/\+/g, "%2B")}&fileName=${
                            item.fname
                          }&filePath=${item.filePath}&fileExt=${
                            item.fext
                          }&fileSha256=${
                            item.fileSha256
                          }&currentChunkMax=${chunks}&currentChunkIndex=${i}`,
                          fileslice,
                          {
                            headers: {
                              "Content-Type": "image/png",
                            },
                          }
                        )
                        .then(() => {
                          this.$set(
                            item,
                            "uploadCurrentChunkNum",
                            item.uploadCurrentChunkNum + 1
                          );
                          if (
                            item.uploadCurrentChunkNum >= item.currentChunkMax
                          ) {
                            console.log(this.$refs.childRouter);
                            this.$refs.childRouter.getUserFileAndFolder(
                              this.$refs.childRouter.getFolderId
                            );
                            //设置上传完成
                            this.$set(item, "uploadType", 4);
                          }
                        });

                      // let currentChunkfr = new FileReader();
                      // currentChunkfr.readAsArrayBuffer(blobSlice.call(item.file, start, end));
                      // currentChunkfr.onload = (data) => {
                      //   // 构建表单
                      //   // let currentChunkSha256 = sha256(data.target.result);
                      //   const form = new FormData();
                      //   let qpBlob = new Blob([data.target.result]);
                      //   form.append('file', qpBlob, `${i}.${item.fext}`);
                      //   form.append('fileName', item.file.name);
                      //   form.append('filePath', item.filePath);
                      //   form.append('fileExt', item.fext);
                      //   form.append('fileSha256', item.fileSha256);

                      //   form.append('userid', this.$store.state.id);
                      //   form.append('folderid', item.folderId);

                      //   form.append('currentChunkMax', chunks);
                      //   form.append('currentChunkIndex', i);
                      //   form.append('currentChunkSha256', currentChunkSha256);

                      //开始上传片段
                      // this.$http.post(`${this.$store.state.serve.serveUrl}upload/uploadFile`, form, {
                      //   headers: {
                      //     'Content-Type': 'multipart/form-data'
                      //   },
                      //   transformRequest: [function () {
                      //     return form;
                      //   }],
                      // }).then(() => {
                      //   //uploadType 0等待中 1准备中 2上传中 3上传暂停 4上传完成 5上传错误 6秒传
                      //   //上传成功
                      //   this.$set(item, 'uploadCurrentChunkNum', item.uploadCurrentChunkNum + 1)
                      //   if (item.uploadCurrentChunkNum == item.currentChunkMax) {
                      //     //设置上传完成
                      //     this.$set(item, 'uploadType', 4)
                      //   }
                      // }).catch(err => {
                      //   //上传出错片段丢失
                      //   console.log(err);
                      //   this.$set(item, 'uploadType', 5)
                      // })
                      // }
                    }
                  } else {
                    //秒传文件
                    //uploadType 0等待中 1准备中 2上传中 3上传暂停 4上传完成 5秒传 6文件太小 7文件太大 其他上传错误
                    this.$set(this.uploadBufferPool, item.uploadType, 5);
                    if (item.uploadCurrentChunkNum == item.currentChunkMax) {
                      this.$set(item, "uploadType", 4);
                    }
                  }
                } else {
                  //文件已存在
                  console.log("文件已存在");
                }
                break;
              case 500:
                console.log(examineres.data.msg);
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
    },

    calculateSliceSize(size) {
      //计算分段
      let Msize = (parseInt((size / 1024 ** 2) * 100) / 100).toFixed(2);
      if (Msize < 10) {
        return 10;
      } else if (Msize < 100) {
        return 10;
      } else {
        return 10;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homeBody {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.topbar {
  height: 0.4rem;
  width: 100%;
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 3.5rem;
  background: #758bbd;
  /* box-shadow: 0 0 0.04rem #758bbd; */
  -webkit-app-region: drag;

  font-size: 0.14rem;
  color: #fff;
}

.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.4rem 0.2rem;
  /* height: 100%; */
}

.logo p {
  font-size: 0.2rem;
}

.headBox {
  width: 100%;
  position: absolute;
  bottom: 0;
  background: linear-gradient(45deg, rgba(117, 139, 189, 0.2), #f5f5f5 80%);
  /* border-top: 2px solid rgba(117, 139, 189,0.2); */
}

.headChildBox {
  padding: 0.2rem;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

.headBox img {
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 0.1rem;
}

.headBox p {
  font-size: 0.12rem;
  font-weight: bold;
}

.main {
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
  /* width: 100%; */
  /* background: #f1f2f3; */
}

.siderbar {
  /* min-width: 2rem; */
  width: 2.4rem;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  z-index: 1;
  /* box-shadow: 0 0 0.06rem #758bbd; */
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
}

.siderbarUl {
  padding: 0 0.2rem 0.7rem;
  margin: 0;
  overflow: auto;
  flex-shrink: 1;
  flex-grow: 1;
}

.siderbarUl li {
  margin: 0.1rem 0;
  height: 0.4rem;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  transition: ease-in 0.2s;
  border-radius: 0.1rem;
}

.siderbarUl .liOn {
  color: rgb(117, 139, 189);
  background-color: rgba(117, 139, 189, 0.2);
}

.siderbarUl li:hover {
  background-color: rgba(117, 139, 189, 0.2);
  /* color: #fff; */
}

.siderbarUl li p {
  font-size: 0.14rem;
  margin: 0;
  padding: 0;
}

.siderbarUl li i {
  font-size: 0.24rem;
  padding: 0 0.12rem;
}

.content {
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
}

@media (max-width: 750px) {
  .logo {
    display: none;
  }

  .siderbar {
    min-width: inherit;
    max-width: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .siderbarUl li p {
    font-size: 0.14rem;
    margin: 0;
    padding: 0;
    display: none;
  }

  .headChildBox {
    padding: 0.2rem 0;
    justify-content: center;
  }

  .headChildBox img {
    margin: 0;
  }

  .headChildBox p {
    display: none;
  }
}
</style>
