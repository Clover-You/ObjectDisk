<!--
 * @Author: LRolinx
 * @Date: 2020-10-14 20:58:01
 * @LastEditTime 2021-12-16 10:01
 * @Description: 我的云盘
 *
-->
<template>
  <div class="driveBody" @mouseup="driveBodyMouseup" @dragenter.prevent.stop="dragenter" @mouseup.stop="fileBoxMouseup($event,null)" @contextmenu.prevent="">
    <div class="draging" v-if="isShowUpdateModel" @dragover.prevent.stop="dragover" @dragleave.prevent.stop="dragleave" @drop.prevent.stop="drop">
      <div class="tip" @dragleave.prevent.stop="">
        <p>拖拽文件到此即可上传到XXX</p>
      </div>
    </div>

    <div class="toolbar">
      <div class="toolbarLeft">
        <p class="toolbarTitle" :class="{colorR:currentFolder.length >= 1}">{{currentFolder.length == 0?`我的云盘(${fileData.length})`:'我的云盘'}}</p>
        <div v-for="(item,index) in currentFolder" :key="item.id" style="display:inline-flex" :class="{toolbarOn:index!=currentFolder.length-1}">
          <P class="toolbarArrow colorR">›</P>
          <p class="toolbarTitle" :class="{colorR:index!=currentFolder.length-1}">{{item.text}}<span v-if="index==currentFolder.length-1">({{fileData.length}})</span></p>
        </div>
      </div>
      <div class="toolbarRight">
        <div class="updateButton" @click="openNewFileModel">
          <i class="iconfont icon-add"></i>
          <p>新建</p>
        </div>
      </div>
    </div>
    <div class="dropZone" ref="recycleScroller">
      <div v-if="fileData.length==0" class="emptyBox">
        <img src="../static/img/empty.png" draggable="false" />
        <p>这里啥也没有呢~</p>
      </div>

      <div class="file-container" v-if="fileData.length!=0">
        <RecycleScroller
          :items="getFileData"
          class="scroller"
          :item-size="15"
          key-field="key"
          v-slot="data"
        >
        <div style="display: flex">
            <div v-for="(item) in data.item.data" :key="item.id" class="fileBox" @dblclick="openFileOrFolder(item)" @mouseup.stop="fileBoxMouseup($event,item)" @contextmenu.prevent="" >
              <div class="fileContentBox">
                <div class="fileContentImg">
                  <img class="imagePreview" src="../static/img/folder.png" draggable="false" v-if="item.type == 'folder'" />
                  <div class="imgBox" v-if="item.type == 'file' && item.blob != null">
                    <img class="imagePreview" ref="img" :src="item.blob" draggable="false" @load="destroyBlobUrl(item.blob)">
                    <i class="iconfont icon-or-play videoImg" v-if="checkType(item).type == 'video'"></i>
                  </div>
                  <i class="iconfont iconPreview" :class="checkType(item).iconStr" v-if="item.type == 'file' && item.blob == null"></i>
                </div>
                <div class="fileContentText">
                  <p class="fileContentName">{{item.name}}{{item.suffix==null?'':`.${item.suffix}`}}</p>
                  <p class="fileContentDate">{{item.updateTime.slice(0,item.updateTime.length-3)}}</p>
                </div>
              </div>
            </div>
          </div>
        </RecycleScroller>
      </div>
    </div>

    <div class="fileMenu" :style="{top:`${fileMenuPos.y}px`,left:`${fileMenuPos.x}px`}" v-if="isShowRightMenu" @contextmenu.prevent="" @mouseup.stop="">
      <!-- 文件 -->
      <ul>
        <li v-if="showRightMenuType=='default'" @click="openNewFolderModel">
          <i class="iconfont iconfont icon-add-folder"></i>
          <p>新建文件夹</p>
        </li>
        <li v-if="showRightMenuType=='file'">
          <i class="iconfont icon-download"></i>
          <p>下载</p>
        </li>
        <li v-if="showRightMenuType=='file' || showRightMenuType=='folder'">
          <i class="iconfont icon iconfont icon-move"></i>
          <p>移动</p>
        </li>
        <li v-if="showRightMenuType=='file' || showRightMenuType=='folder'">
          <i class="iconfont iconfont icon-edit"></i>
          <p>重命名</p>
        </li>
        <li v-if="showRightMenuType=='file'">
          <i class="iconfont iconfont icon-yun"></i>
          <p>公开文件</p>
        </li>
        <li v-if="showRightMenuType=='file' || showRightMenuType=='folder'">
          <i class="iconfont iconfont icon-hook"></i>
          <p>进入多选</p>
        </li>
        <li v-if="showRightMenuType=='file' || showRightMenuType=='folder'">
          <i class="iconfont iconfont icon-info"></i>
          <p>查看详情信息</p>
        </li>
        <li v-if="showRightMenuType=='file' || showRightMenuType=='folder'" @click="showdelDialog">
          <i class="iconfont iconfont icon-delete"></i>
          <p>删除</p>
        </li>
      </ul>
    </div>

    <!-- 新建模态窗 -->
    <newFile @oneFile="oneFile" :isShowNewFileModel.sync="isShowNewFileModel"></newFile>
    <!-- 新建文件夹模态窗 -->
    <newFolder :isShowNewFolderModel.sync="isShowNewFolderModel" @changeValue="addUserFolder"></newFolder>
    <!-- 视频模态窗 -->
    <lVideo :videoList="videoList" :isShow.sync="isShowlVideo"></lVideo>
    <lPicture :isShow="false"></lPicture>
  </div>
</template>

<script>
import newFile from "@/components/newFile";
import newFolder from "@/components/newFolder";
import lVideo from "@/components/lVideo";
import lPicture from "@/components/lPicture";
export default {
  components: {
    newFile,
    newFolder,
    lVideo,
    lPicture,
  },
  data() {
    return {
      width: 0, // 宽
      height: 0, // 高
      isShowlVideo: false, //是否显示视频模态窗
      videoList: [], //视频模态窗数据
      isShowNewFileModel: false, //是否显示新建文件模态窗
      isShowNewFolderModel: false, //是否显示新建文件夹模态窗
      isShowUpdateModel: false, //是否显示上传模态窗
      isShowRightMenu: false, //是否显示右键菜单选择
      showRightMenuType: "default", //显示的右键菜单类型
      fileMenuPos: { x: 0, y: 0 }, //右键菜单选择显示位置
      rightMenuItem: null, //右键对应的Item对象
      fileData: [], //用户数据
      currentFolder: [], //导航文件夹
    };
  },
  watch: {
    $route() {
      //监听路由变化
      // console.log(to,from);
      this.getUserFileAndFolder(this.getFolderId);

      //倒序删除导航
      for (let i = this.currentFolder.length; i >= 0; i--) {
        if (
          this.getFolderId !=
          this.currentFolder[this.currentFolder.length - 1].id
        ) {
          this.currentFolder.splice(i, 1);
        } else {
          break;
        }
      }
    },
  },
  computed: {
    getFileData() {
      const colNum = Number.parseInt(Math.abs(this.width / 190));
      let arr = [];
      const rowNum = Number.parseInt(Math.abs((this.fileData.length / colNum)));
      const rowNumReal =( (this.fileData.length / colNum) > rowNum) ? rowNum + 1 :rowNum;
      for (let i = 0; i < rowNumReal; i++) {
        arr.push([])
        for (let j = (i * colNum); j < ((i * colNum) + colNum); j++) {
          arr[i].push(this.fileData[j])
        }
      }
      arr[arr.length - 1] = arr[arr.length - 1].filter(item => item!= void 0)
      return arr.map((item, i) => {
        return {
          key: i,
          data: item
        }
      });
    },
    getFolderId() {
      //获取路由中的参数文件夹id
      return this.$route.params.folderId == undefined
        ? "0"
        : this.$route.params.folderId;
    },
  },
  created() {
    if (!this.$store.state.isLogin) {
      this.$router.replace({ name: "login" }); //没登录直接回到登录页
    }
    this.getUserFileAndFolder(this.getFolderId);
  },

  methods: {
    test(data) {
      console.log(data);
    },
    addUserFolder(value) {
      //添加用户文件夹
      this.$http
        .post(`${this.$store.state.serve.serveUrl}drive/addUserFolder`, {
          userid: this.$store.state.id,
          folderid: this.getFolderId,
          name: value,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.getUserFileAndFolder(this.getFolderId);
          } else {
            this.$tipMessge(res.data.message);
          }
        })
        .catch((err) => {
          this.$tipMessge(err.data.message);
        });
    },
    getUserFileAndFolder(value) {
      // 获取用户的文件夹与文件
      this.$http
        .post(`${this.$store.state.serve.serveUrl}drive/getUserFileAndFolder`, {
          userid: this.$store.state.id,
          folderid: value,
        })
        .then((res) => {

          if (res.data.code == 200) {
            console.log(res.data.data);
            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].blob = null;
            }

            this.fileData = res.data.data;

            for (let i = 0; i < res.data.data.length; i++) {
              if (
                res.data.data[i].type == "file" &&
                this.checkType(res.data.data[i]).type == "image"
              ) {
                this.ImageToblobUrl(i);
              }
              if (
                res.data.data[i].type == "file" &&
                this.checkType(res.data.data[i]).type == "video"
              ) {
                this.VideoImageToblobUrl(i);
              }
            }
          } else {
            this.$tipMessge(res.data.message);
          }
        })
        .catch((err) => {
          this.$tipMessge(err.data.message);
        });
    },
    dragenter(e) {
      //拖拽进入
      let items = e.dataTransfer.items;
      for (let i = 0; i <= items.length - 1; i++) {
        let item = items[i];
        if (item.kind === "file") {
          //是文件才触发显示效果
          e.dataTransfer.dropEffect = "copy";
          this.isShowUpdateModel = true;
        }
      }
    },
    dragover(e) {
      //拖拽持续移动
      e.dataTransfer.dropEffect = "copy";
      this.isShowUpdateModel = true;
    },
    dragleave() {
      //拖拽离开
      this.isShowUpdateModel = false;
    },
    drop(e) {
      //拖拽放入
      this.isShowUpdateModel = false;

      // 修复拖拽获取不了文件的情况
      let items = [];
      [].forEach.call(
        e.dataTransfer.items,
        function (file) {
          items.push(file);
        },
        false
      );
      items.forEach((item) => {
        if (item.kind === "file") {
          //是文件才触发
          let entry = item.webkitGetAsEntry();
          this.getFileFromEntryRecursively("0", entry);
        }
      });
    },
    driveBodyMouseup() {
      //父级点击
      this.isShowRightMenu = false;
    },
    fileBoxMouseup(e, item) {
      this.isShowRightMenu = false;
      this.showRightMenuType = item === null ? "default" : item.type;

      this.rightMenuItem = item;
      //点击文件与文件夹
      if (e.button == 2) {
        //右键
        this.$set(this.fileMenuPos, "x", e.x);
        this.$set(this.fileMenuPos, "y", e.y);
        this.isShowRightMenu = true;
      }
    },
    openFileOrFolder(item) {
      //打开文件或打开文件夹
      if (item.type == "folder") {
        this.currentFolder.push({ text: item.name, id: item.id });
        this.$router.push({ name: "drive", params: { folderId: item.id } });
      } else {
        //打开文件
        this.$tipMessge("哦吼,文件预览还不能用");
      }
    },
    async oneFile(file) {
      //单文件处理
      let filenameAndfext = this.getFileNameAndFext(file.name);
      let path = `-/${file.name}`;

      let fileInfoOBJ = {
        uploadType: 0,
        uploadCurrentChunkNum: 0,
        currentChunkMax: 0,
        file,
        fileSize: file.size,
        fileType: file.type,
        fname: filenameAndfext.fname,
        fext: filenameAndfext.fext,
        filePath: path,
        fileSha256: "",
        folderId: this.getFolderId,
        // currentChunkList: []
      };
      // console.log(fileInfoOBJ);
      this.$parent.uploadBufferPool.push(fileInfoOBJ); //将任务写入数据
    },
    getFileNameAndFext(string) {
      //获取文件名和后缀
      let fname = "";
      let fext = "";
      if (string.indexOf(".") != -1) {
        fname = string.substring(0, string.lastIndexOf(".")); //获取文件名
        fext = string.substring(string.lastIndexOf(".") + 1); //获取后缀名
      } else {
        fname = string.substring(string.lastIndexOf(".") + 1); //获取文件名
        fext = "";
      }
      return { fname, fext };
    },
    async getFileFromEntryRecursively(folderId, entry) {
      // 处理文件夹里的文件
      if (entry.isFile) {
        entry.file((file) => {
          let filenameAndfext = this.getFileNameAndFext(file.name);

          let path = entry.fullPath.substring(1);

          let fileInfoOBJ = {
            uploadType: 0,
            uploadCurrentChunkNum: 0,
            currentChunkMax: 0,
            file,
            fileSize: file.size,
            fileType: file.type,
            fname: filenameAndfext.fname,
            fext: filenameAndfext.fext,
            filePath: path,
            fileSha256: "",
            folderId: folderId == "0" ? this.getFolderId : folderId,
            // currentChunkList: []
          };
          // console.log(fileInfoOBJ);
          this.$parent.uploadBufferPool.push(fileInfoOBJ); //将任务写入数据
        });
      } else {
        //检测到文件夹
        let createfolderres = await this.$http.post(
          `${this.$store.state.serve.serveUrl}drive/addUserFolder`,
          {
            userid: this.$store.state.id,
            folderid: folderId == "0" ? this.getFolderId : folderId,
            name: entry.name,
          }
        );

        let reader = entry.createReader();
        reader.readEntries((entries) => {
          for (let i = 0, len = entries.length; i < len; i++) {
            this.getFileFromEntryRecursively(
              createfolderres.data.data,
              entries[i]
            );
          }

          // entries.forEach(entry => this.getFileFromEntryRecursively(entry));
        });
        //刷新
        this.getUserFileAndFolder(this.getFolderId);
      }
    },
    openNewFolderModel() {
      // 显示新建文件夹模态窗
      this.isShowRightMenu = false;
      this.isShowNewFolderModel = true;
    },
    openNewFileModel() {
      //显示新建文件模态窗
      this.isShowNewFileModel = true;
    },
    showdelDialog() {
      this.isShowRightMenu = false;
      if (this.rightMenuItem.type == "file") {
        //删除文件
        this.$dialogMessge({
          title: "确定删除",
          text: `确定删除该文件嘛?`,
          onOk: () => this.delFileOrFolder(),
          onCancel: () => {},
        });
      } else {
        //删除文件夹
        this.$dialogMessge({
          title: "确定删除",
          text: "确定删除该文件夹嘛?文件夹内的文件将全部删除!!!",
          onOk: () => this.delFileOrFolder(),
          onCancel: () => {},
        });
      }
    },
    delFileOrFolder() {
      //删除文件或文件夹
      this.$http
        .post(`${this.$store.state.serve.serveUrl}drive/delUserFileOrFolder`, {
          id: this.rightMenuItem.id,
          type: this.rightMenuItem.type,
        })
        .then((res) => {
          if (res.data.code == 200) {
            //刷新
            this.getUserFileAndFolder(this.getFolderId);
          }
          this.$tipMessge(res.data.message);
        })
        .catch((err) => {
          this.$tipMessge(err.data.message);
        });
    },
    ImageToblobUrl(i) {
      //获取图片数据并返回Blob地址
      this.$http
        .post(
          `${this.$store.state.serve.serveUrl}drive/getUserFileForFileId`,
          {
            id: this.fileData[i].id,
          },
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          let bloburl = window.URL.createObjectURL(res.data);
          this.$set(this.fileData[i], "blob", bloburl);
        })
        .catch((err) => {
          this.$tipMessge(err.data.message);
        });
    },
    VideoImageToblobUrl(i) {
      //获取视频预览图数据并返回Blob地址
      this.$http
        .post(
          `${this.$store.state.serve.serveUrl}video/getVideoSceenshots`,
          {
            id: this.fileData[i].id,
          },
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          if (res.data != null) {
            let bloburl = window.URL.createObjectURL(res.data);
            this.$set(this.fileData[i], "blob", bloburl);
          }
        })
        .catch((err) => {
          this.$tipMessge(err.data.message);
        });
    },
    destroyBlobUrl() {
      //销毁blob地址
      // window.URL.revokeObjectURL(blob);
    },
    checkType(item) {
      let typeStr = {
        type: "",
        iconStr: "icon-unknown",
      };
      if (item.fileType == null) {
        //使用后缀判断
        if (item.suffix != null) {
          switch (item.suffix.toLowerCase()) {
            // 图片
            case "png": {
              typeStr.type = "image";
              typeStr.iconStr = "icon-pic";
              break;
            }
            case "jpg": {
              typeStr.type = "image";
              typeStr.iconStr = "icon-pic";
              break;
            }
            case "jpeg": {
              typeStr.type = "image";
              typeStr.iconStr = "icon-pic";
              break;
            }
            case "gif": {
              typeStr.type = "image";
              typeStr.iconStr = "icon-pic";
              break;
            }
            case "eps": {
              typeStr.type = "image";
              typeStr.iconStr = "icon-pic";
              break;
            }
            case "exr": {
              typeStr.type = "image";
              typeStr.iconStr = "icon-pic";
              break;
            }
            case "svg": {
              typeStr.type = "image";
              typeStr.iconStr = "icon-pic";
              break;
            }
            case "tga": {
              typeStr.type = "image";
              typeStr.iconStr = "icon-pic";
              break;
            }
            case "bmp": {
              typeStr.type = "image";
              typeStr.iconStr = "icon-pic";
              break;
            }
            case "tiff": {
              typeStr.type = "image";
              typeStr.iconStr = "icon-pic";
              break;
            }

            // 视频
            case "mp4": {
              typeStr.type = "video";
              typeStr.iconStr = "icon-video";
              break;
            }
            case "avi": {
              typeStr.type = "video";
              typeStr.iconStr = "icon-video";
              break;
            }
            case "wmv": {
              typeStr.type = "video";
              typeStr.iconStr = "icon-video";
              break;
            }
            case "m4v": {
              typeStr.type = "video";
              typeStr.iconStr = "icon-video";
              break;
            }
            case "mov": {
              typeStr.type = "video";
              typeStr.iconStr = "icon-video";
              break;
            }
            case "asf": {
              typeStr.type = "video";
              typeStr.iconStr = "icon-video";
              break;
            }
            case "flv": {
              typeStr.type = "video";
              typeStr.iconStr = "icon-video";
              break;
            }
            case "f4v": {
              typeStr.type = "video";
              typeStr.iconStr = "icon-video";
              break;
            }
            case "rmvb": {
              typeStr.type = "video";
              typeStr.iconStr = "icon-video";
              break;
            }
            case "rm": {
              typeStr.type = "video";
              typeStr.iconStr = "icon-video";
              break;
            }
            case "3gp": {
              typeStr.type = "video";
              typeStr.iconStr = "icon-video";
              break;
            }
            case "vob": {
              typeStr.type = "video";
              typeStr.iconStr = "icon-video";
              break;
            }

            // 音频
            case "mp3": {
              typeStr.type = "audio";
              typeStr.iconStr = "icon-music";
              break;
            }
            case "aac": {
              typeStr.type = "audio";
              typeStr.iconStr = "icon-music";
              break;
            }
            case "wav": {
              typeStr.type = "audio";
              typeStr.iconStr = "icon-music";
              break;
            }
            case "ogg": {
              typeStr.type = "audio";
              typeStr.iconStr = "icon-music";
              break;
            }
            case "alac": {
              typeStr.type = "audio";
              typeStr.iconStr = "icon-music";
              break;
            }
            case "flac": {
              typeStr.type = "audio";
              typeStr.iconStr = "icon-music";
              break;
            }
            case "ape": {
              typeStr.type = "audio";
              typeStr.iconStr = "icon-music";
              break;
            }

            // 文本
            case "txt": {
              typeStr.type = "text";
              typeStr.iconStr = "icon-txt";
              break;
            }
            case "html": {
              typeStr.type = "text";
              typeStr.iconStr = "icon-html";
              break;
            }
            case "css": {
              typeStr.type = "text";
              typeStr.iconStr = "icon-css";
              break;
            }
            case "xlsx": {
              typeStr.type = "text";
              typeStr.iconStr = "icon-excel";
              break;
            }
            case "doc": {
              typeStr.type = "text";
              typeStr = "icon-word";
              break;
            }
            case "docx": {
              typeStr.type = "text";
              typeStr.iconStr = "icon-word";
              break;
            }
            case "pdf": {
              typeStr.type = "text";
              typeStr.iconStr = "icon-pdf";
              break;
            }
            case "ppt": {
              typeStr.type = "text";
              typeStr.iconStr = "icon-ppt";
              break;
            }

            //压缩
            case "zip": {
              typeStr.type = "*";
              typeStr.iconStr = "icon-zip";
              break;
            }
            case "jar": {
              typeStr.type = "*";
              typeStr.iconStr = "icon-zip";
              break;
            }
            case "7z": {
              typeStr.type = "*";
              typeStr.iconStr = "icon-zip";
              break;
            }
            case "rar": {
              typeStr.type = "*";
              typeStr.iconStr = "icon-zip";
              break;
            }

            //其他文件
            case "psd": {
              typeStr.type = "*";
              typeStr.iconStr = "icon-unknown";
              break;
            }
            case "xmind": {
              typeStr.type = "*";
              typeStr.iconStr = "icon-xmind";
              break;
            }
            case "bt": {
              typeStr.type = "*";
              typeStr.iconStr = "icon-bt";
              break;
            }
            case "exe": {
              typeStr.type = "*";
              typeStr.iconStr = "icon-windows";
              break;
            }
            case "msi": {
              typeStr.type = "*";
              typeStr.iconStr = "icon-windows";
              break;
            }
            case "apk": {
              typeStr.type = "*";
              typeStr.iconStr = "icon-Android-hover";
              break;
            }

            default: {
              typeStr.type = "*";
              typeStr.iconStr = "icon-unknown";
            }
          }
        }
      }
      return typeStr;
    },
  },
  mounted(){
    this.width = (this.$refs.recycleScroller.offsetWidth - 100);
    this.height = this.$refs.recycleScroller.offsetHeight;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.driveBody {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
}

.toolbar {
  margin: 0.3rem 0;
  height: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  user-select: none;
  position: relative;
}

.toolbarLeft {
  display: flex;
  align-items: center;
  width: calc(100% - 1.2rem);
}

.toolbarTitle {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.16rem;
}

.toolbarArrow {
  font-size: 0.16rem;
  margin: 0 0.05rem;
}

.toolbarOn {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.colorR {
  color: #aaa;
}

.toolbarRight {
  position: absolute;
  right: 0.5rem;
  flex-shrink: 0;
  background: #fff;
  padding: 0 0 0 0.2rem;
}

.dropZone {
  outline: none;
  cursor: default;
  flex: 1;
  display: flex;
  padding: 0 50px;
  /* overflow: auto; */
}

.draging {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(117, 139, 189, 0.14);
  border: 1px solid rgb(117, 139, 189);
  box-sizing: border-box;
  display: block;
  z-index: 99;
  user-select: none;
  /* transition: ease-in 0.2s; */
  animation: ease-in forwards draging 0.2s;
  opacity: 0;
}

@keyframes draging {
  form {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.tip {
  position: absolute;
  z-index: 1;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  height: 40px;
  min-width: 280px;
  background: rgb(117, 139, 189);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.1rem;
  text-align: left;
  color: #fff;
  line-height: 40px;
  display: flex;
  justify-content: center;
}

.tip p {
  font-size: 0.14rem;
}

.file-container {
  position: relative;
  flex: 1;
  z-index: 0;
  /* overflow: auto; */
  display: flex;
  flex-wrap: wrap;
}

.fileBox {
  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 0.2rem;
  display: inline-flex;

  user-select: none;
  /* margin: 0.2rem; */
  margin: 15px;
  padding-top: 0.12rem;
  letter-spacing: 0.01px;
  transition: ease-in 0.2s;
  height: 1.8rem;
  width: 1.6rem;
}

.fileBox:hover {
  background-color: rgba(117, 139, 189, 0.2);
}

.fileBoxOn {
  background-color: #758bbd;
}

.fileContentBox {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}

.fileContentImg {
  display: flex;
}

.fileContentText {
  display: flex;
  flex-direction: column;
}

.imgBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  position: relative;
}

.videoImg {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  right: 50%;
  width: max-content;
  transform: translateX(-50%);
  width: 0.4rem;
  height: 0.4rem;
  color: white;
  border-radius: 100rem;
  background: rgba(30, 30, 30, 0.3);
  padding: 0.08rem;
  backdrop-filter: blur(2px);
  padding-left: 0.1rem;
}

.imagePreview,
.iconPreview {
  height: max-content;
  max-height: 1rem;
  max-width: 1rem;
}

.iconPreview {
  font-size: 100%;
}

.fileContentName {
  font-size: 0.14rem;
  color: #333;
  line-height: 1.5;
  width: 100%;
  text-align: center;
  margin-top: 0.12rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  overflow: hidden;
  word-break: break-all;
}

.fileContentDate {
  text-align: center;
  font-size: 0.12rem;
  color: #999;
  transform-origin: center;
  line-height: 0.2rem;
}

.fileMenu {
  display: block;
  background: rgba(217, 224, 241, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 0.02rem 0.08rem 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.12rem;
  position: fixed;
  overflow: hidden;
  top: 20px;
  left: 50%;
  z-index: 9999;

  animation: ease-in forwards fileMenu 0.2s;
  transform-origin: left top;
}

@keyframes fileMenu {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fileMenu ul {
  margin: 0;
  padding: 0.08rem 0;
}

.fileMenu li {
  display: flex;
  flex-direction: row;
  height: 0.3rem;
  align-items: center;
  padding: 0 0.2rem;
  cursor: pointer;
  user-select: none;
}

.fileMenu li:hover {
  background-color: #758bbd;
  color: #fff;
}

.fileMenu li i {
  font-size: 0.16rem;
}

.fileMenu li p {
  font-size: 0.12rem;
  margin-left: 0.1rem;
}

.updateButton {
  display: none;
  flex-direction: row;
  align-items: center;
  background-color: #758bbd;
  padding: 0.05rem 0.2rem;
  border-radius: 0.2rem;
  color: #fff;
  cursor: pointer;
  user-select: none;
}

.updateButton i {
  font-size: 0.18rem;
}

.updateButton p {
  font-size: 0.14rem;
}

.emptyBox {
  width: 100%;
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.emptyBox img {
  width: 1.5rem;
}

.emptyBox p {
  font-size: 0.12rem;
}

@media (max-width: 750px) {
  /* .file-container {
    grid-template-columns: repeat(auto-fill, 100%);
    grid-template-rows: none;
  } */

  .updateButton {
    display: flex;
  }
}

.scroller .vue-recycle-scroller__item-wrapper .vue-recycle-scroller__item-view {
  display: flex !important;
}

.scroller {
  height: 100%;
  overflow-y: auto;
}

</style>
