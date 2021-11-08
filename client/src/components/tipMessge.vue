<!--
 * @Author: LRolinx
 * @Date: 2021-01-24 17:44:47
 * @LastEditTime: 2021-01-24 18:22:00
 * @Description: 提示模态窗
 * 
-->
<template>
  <div class="componentBody" v-if="showTipMessge">
    <div class="contentBox">
      <p>{{title}}</p>
      <span>{{text}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showTipMessge: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "提示"
    },
    text: {
      type: String,
      default: "这里是测试"
    }
  },
  data() {
    return {
      setTime: null
    }
  },
  watch: {
    showTipMessge(newNum) {
      if (newNum) {
        if (this.setTime != null) {
          clearTimeout(this.setTime);
          this.setTime = null
        }
        this.setTime = setTimeout(() => {
          this.$emit("update:showTipMessge", false);
        }, 2500);
      }
    },
    title() {
      if (this.setTime != null) {
        clearTimeout(this.setTime);
        this.setTime = null
      }
      this.setTime = setTimeout(() => {
        this.$emit("update:showTipMessge", false);
      }, 2500);
    },
    text() {
      if (this.setTime != null) {
        clearTimeout(this.setTime);
        this.setTime = null
      }
      this.setTime = setTimeout(() => {
        this.$emit("update:showTipMessge", false);
      }, 2500);
    }
  }
}
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