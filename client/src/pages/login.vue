<!--
 * @Author: LRolinx
 * @Date: 2021-01-05 22:39:52
 * @LastEditTime: 2021-01-24 18:20:25
 * @Description: 登录
 * 
-->
<template>
  <div class="body">
    <div class="contentBox">
      <div class="wrap" @keydown="keydown">
        <div class="title">登录对象内部云盘</div>
        <input v-model="account" class="zp-input" placeholder="账号" autofocus>
        <input v-model="password" class="zp-input" type="password" placeholder="密码">

        <div class="rememberMeBox">
          <label class="rememberMeBoxLabel">记住账号</label>
          <div class="switchBox" :class="{switchBoxOn:rememberMe}" @click="switchClick">
            <div class="switch" :class="{switchOn:rememberMe}"></div>
          </div>
        </div>

        <button type="button" class="alreadyAccountButton" @click="gotoRgistered">我需要账号</button>
        <button type="button" class="button" @click="login">登录</button>
        <!-- <a class="button bgGreen" href="/publicFile">公开的文件</a> -->
      </div>
    </div>

    <!-- 提示模态窗 -->
    <tipMessge :showTipMessge.sync="isShowTipMessge" :text="showTipText"></tipMessge>
  </div>
</template>
<script>
import tipMessge from "@/components/tipMessge";
export default {
  components: {
    tipMessge
  },
  data() {
    return {
      isShowTipMessge: false,//是否显示提示模态窗
      showTipText: "",//显示提示内容
      account: '',
      password: '',
      rememberMe: false,//记住账号
    }
  },
  created() {
    if(localStorage.getItem("account") != null) {
      this.account = this.decrypt(localStorage.getItem("account"));
    }

    if(localStorage.getItem("password") != null) {
      this.password = this.decrypt(localStorage.getItem("password"));
    }
    if (this.account && this.password) {
      this.rememberMe = true;
    }

    this.$store.state.isLogin = sessionStorage.getItem('isLogin');
    if (this.$store.state.isLogin) {
      this.$router.replace({ name: 'drive' });//已登录直接进入云盘
    }
  },
  methods: {
    switchClick() {
      //切换开关
      this.rememberMe = !this.rememberMe;
    },
    gotoLogin() {
      //跳转到登录
      this.$router.replace({ name: 'registered' });
    },
    gotoRgistered() {
      //跳转到注册
      this.$router.replace({ name: 'registered' });
    },
    keydown(e) {
      if (e.keyCode == 13) {
        this.login();
      }
    },
    login() {
      //登录
      if (this.account == '' || this.account == null) {
        this.showTipText = "账号不能为空";
        this.isShowTipMessge = true;
        return;
      }
      if (this.password == '' || this.password == null) {
        this.showTipText = "密码不能为空";
        this.isShowTipMessge = true;
        return;
      }
      this.$http.post(`${this.$store.state.serve.serveUrl}users/objectCloudDiskLogin`, {
        account: this.account,
        password: this.password
      }).then(res => {
        switch (res.data.code) {
          case 200:
            if (this.rememberMe) {
              localStorage.setItem("account", this.encryption(this.account));
              localStorage.setItem("password",this.encryption(this.password));
            }else {
              localStorage.removeItem("account")
              localStorage.removeItem("password")
            }

            sessionStorage.setItem('isLogin', true);
            sessionStorage.setItem('id', res.data.data.id);
            sessionStorage.setItem('photo', res.data.data.photo);
            sessionStorage.setItem('nickname', res.data.data.nickname);

            this.$store.state.isLogin = true;
            this.$store.state.id = res.data.data.id;
            this.$store.state.photo = res.data.data.photo;
            this.$store.state.nickname = res.data.data.nickname;
            this.$router.push({ name: 'drive' });
            break;
          case 500:
            this.showTipText = res.data.msg;
            this.isShowTipMessge = true;
            break;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    encryption(str) {
      //加密
      let num1 = window.btoa(str).replace(/=/g,"··");
      let num2 = window.btoa(num1).replace(/=/g,"s+");
      return num2;
    },
    decrypt(str) {
      //解密
      let num1 = window.atob(str.replace(/s\+/g,"="));
      let num2 = window.atob(num1.replace(/··/g,"="));
      return num2;
    }
  }
}
</script>
<style scoped>
.body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  background-image: url("https://cn.bing.com/th?id=OHR.SnowCraterLake_ZH-CN9218350129_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp");
  /* background-size: 100% 100%; */
  background-repeat: no-repeat;
}

.contentBox {
  display: flex;
  align-items: center;
  /* height: 100%; */
  padding: 0.2rem 0.3rem;
  /* justify-content: flex-end; */
}

.wrap {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 0.2rem #758bbd;
  border-radius: 0.2rem;
  background-color: #fff;

  user-select: none;
  height: 8rem;
  min-width: 5rem;
}

.title {
  font-size: 0.24rem;
  padding: 0.2rem;
}

.zp-input {
  font-size: 0.14rem;
  outline: none;
  border: 0.02rem solid #758bbd;
  border-radius: 0.2rem;
  padding: 0.1rem 0.2rem;
  margin: 0 0.2rem 0.2rem;
}

.alreadyAccountButton {
  padding: 0.1rem 0.2rem;
  margin: 0 0.2rem 0.2rem;
  border-radius: 0.2rem;
  border: none;
  cursor: pointer;
  outline: none;
  background-color: #f2f6ff;
}

.button {
  display: inline-block;
  padding: 0.1rem 0.2rem;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #758bbd;
  border: none;
  border-radius: 0.2rem;
  margin: 0 0.2rem 0.2rem;
}

.button:active {
  background-color: #758bbd;
}

.bgGreen {
  background-color: #009f95;
}

.bgGreen:active {
  background-color: #32a9a1;
}

.rememberMeBox {
  display: flex;
  align-items: center;
  margin: 0 0.2rem 0.2rem;
}

.rememberMeBoxLabel {
  font-size: 0.14rem;
  margin-right: 0.2rem;
}

/* 开关 */
.switchBox {
  border-radius: 20px;
  border: 2px solid #758bbd;
  width: 40px;
  height: 20px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: ease-in 0.2s;
  cursor: pointer;
  box-sizing: content-box;
}

.switchBoxOn {
  background-color: #758bbd !important;
}

.switch {
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(0%);
  background-color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 25px;
  box-shadow: 1px 2px 2px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1),
    0 3px 3px 0 rgba(0, 0, 0, 0.05);
  transition: ease-in 0.2s;
  
}

.switchOn {
  transform: translateX(100%) !important;
}

@media (max-width: 750px) {
  .contentBox {
    justify-content: center;
    align-items: flex-start;
    height: auto;
    width: 100%;
  }

  .wrap {
    min-width: inherit;
    height: max-content;
  }
}
</style>