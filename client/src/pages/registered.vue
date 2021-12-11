<!--
 * @Author: LRolinx
 * @Date: 2021-01-17 20:28:02
 * @LastEditTime 2021-12-11 16:43
 * @Description: 注册
 * 
-->
<template>
  <div class="body">
    <div class="contentBox">
      <div class="wrap" @keydown="keydown">
        <div class="title">注册对象内部云盘</div>
        <input v-model="nickName" class="zp-input" placeholder="昵称" maxlength="32">
        <input v-model="account" class="zp-input" placeholder="账号" autofocus maxlength="32">
        <input v-model="password" class="zp-input" type="password" placeholder="密码" maxlength="32">
        <input v-model="confirmPassword" class="zp-input" type="password" placeholder="确认密码" maxlength="32">

        <div class="verificationCodeInputBox">
          <label>内部注册码</label>
          <l-verification-code-input class="verificationCodeInput" :maxLength="6" placeholder="内部注册码" :value.sync="registeredCode"></l-verification-code-input>
        </div>

        <!-- <input v-model="registeredCode" class="zp-input" type="password" placeholder="对象内部注册码" maxlength="10"> -->
        <button type="button" class="alreadyAccountButton" @click="gotoLogin">我已有账号</button>
        <button type="button" class="button" @click="registered">注册</button>
        <!-- <a class="button bgGreen" href="/publicFile">公开的文件</a> -->
      </div>
    </div>

    <!-- 提示模态窗 -->
    <tipMessge :showTipMessge.sync="isShowTipMessge" :text="showTipText"></tipMessge>
  </div>
</template>
<script>
import tipMessge from "@/components/tipMessge";
import lVerificationCodeInput from "../components/lVerificationCodeInput";
export default {
  components: {
    tipMessge,
    lVerificationCodeInput,
  },
  data() {
    return {
      isShowTipMessge: false, //是否显示提示模态窗
      showTipText: "", //显示提示内容
      nickName: "",
      account: "",
      password: "",
      confirmPassword: "",
      registeredCode: "",
    };
  },
  created() {
    if (this.$store.state.isLogin) {
      this.$router.replace({ name: "drive" }); //已登录直接进入云盘
    }
  },
  methods: {
    gotoLogin() {
      //跳转到登录
      this.$router.replace({ name: "login" });
    },
    keydown(e) {
      if (e.keyCode == 13) {
        this.registered();
      }
    },
    registered() {
      //注册
      if (this.nickName == "") {
        this.showTipText = "昵称不能为空";
        this.isShowTipMessge = true;
        return;
      }
      if (this.account == "") {
        this.showTipText = "账号不能为空";
        this.isShowTipMessge = true;
        return;
      }
      if (this.password == "") {
        this.showTipText = "密码不能为空";
        this.isShowTipMessge = true;
        return;
      }
      if (this.confirmPassword == "") {
        this.showTipText = "确认密码不能为空";
        this.isShowTipMessge = true;
        return;
      }
      if (this.registeredCode == "") {
        this.showTipText = "内部注册码不能为空";
        this.isShowTipMessge = true;
        return;
      }
      this.$http
        .post(
          `${this.$store.state.serve.serveUrl}users/objectCloudDiskRegistered`,
          {
            nickName: this.nickName,
            account: this.account,
            password: this.password,
            confirmPassword: this.confirmPassword,
            registeredCode: this.registeredCode,
          }
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.$router.push({ name: "login" });
            this.showTipText = res.data.message;
            this.isShowTipMessge = true;
          } else {
            this.showTipText = res.data.message;
            this.isShowTipMessge = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  background-image: url("https://cn.bing.com/th?id=OHR.SnowCraterLake_ZH-CN9218350129_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp");
  background-size: 100% 100%;
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

.verificationCodeInputBox {
  display: flex;
  flex-direction: column;
  margin: 0 0.2rem 0.2rem;
}

.verificationCodeInputBox label {
  font-size: 0.14rem;
  flex-shrink: 0;
  flex-grow: 0;
  padding: 0 0 0.2rem 0;
}

.verificationCodeInput {
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

  .verificationCodeInputBox label {
    display: none;
  }
}
</style>