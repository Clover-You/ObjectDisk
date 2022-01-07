<!--
 * @Author: LRolinx
 * @Date: 2021-01-24 17:44:47
 * @LastEditTime 2021-12-14 21:42
 * @Description: 提示模态窗
 * 
-->
<template>
  <div class="componentBody">
    <div class="contentBox">
      <p>{{title}}</p>
      <span>{{text}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "tipMessge",
  data() {
    return {
      // tip提示 warn警告 err错误 succ成功
      type: "tip",
      title: "提示",
      text: "你好，世界",
      time: 2500,
    };
  },
  mounted() {
    //指定时间后撤销组件
    setTimeout(() => {
      this.$destroy(true); //销毁组件
      this.$el.parentNode.removeChild(this.$el); //父元素中移除dom元素（$el为组件实例）
    }, this.time);
  },
};
</script>
<style scoped>
.contentBox {
  position: fixed;
  left: 50%;
  top: 0rem;
  z-index: 999;
  border-radius: 0.2rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  width: 2rem;
  animation: ease-in 2s forwards contentBox;
  box-shadow: 0 0 8px #ddd;
}

@keyframes contentBox {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  10% {
    top: 1.3rem;
  }
  15% {
    top: 1rem;
  }
  90% {
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    top: 1rem;
    transform: translate(-50%, -50%) scale(0);
  }
}

.contentBox p {
  font-size: 0.18rem;
  padding: 0.2rem;
  font-weight: bold;
}

.contentBox span {
  font-size: 0.14rem;
  padding: 0 0.2rem 0.2rem;
}
</style>