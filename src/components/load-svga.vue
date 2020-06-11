<template>
  <div>
    <div class="load-svga" v-show="visible">
      <div class="load-svga__title">特效预加载中,请稍后...({{progress.toFixed(2)}}%)</div>
      <mt-progress :value="progress" :bar-height="5"></mt-progress>
    </div>
    <div class="pwd_info" v-show="visible"></div>
  </div>
</template>

<script>
import api from "@/constant/api";
import { Toast } from "mint-ui";
export default {
  name: "cashier",
  data() {
    return {
      visible: false,
      progress: 0,
      data: []
    };
  },
  mounted() {
    const isCatch = localStorage.getItem("isCatch");
    if (isCatch === null) {
      this.visible = true;
      this.loadData();
    }
  },
  methods: {
    loadSvga() {
      const step = 99 / this.data.length;
      this.progress = 0;
      Promise.all(
        this.data.map(url => {
          return fetch(url).then(() => {
            this.progress += step;
          });
        })
      ).then(() => {
        this.progress = 100;
        this.visible = false;
        localStorage.setItem("isCatch", "1");
      });
    },
    loadData() {
      var _this = this;
      this.axios.post(api.live_gift_list).then(res => {
        this.data = res.data.content.data;
        this.loadSvga();
      });
    }
  }
};
</script>

<style  lang="less" scoped>
// 输入支付密码样式
.load-svga {
  height: auto;
  position: fixed;
  width: 5rem;
  height: 1.5rem;
  margin-top: -0.75rem;
  margin-left: -2.5rem;
  left: 50%;
  top: 50%;
  background: #fff;
  border-radius: 0.3rem;
  padding: 0.2rem;
  box-shadow: 0 0 0.1rem #ccc;
  z-index: 101;
  &__title {
    text-align: center;
    color: #aaa;
    padding: 0.1rem 0 0.2rem 0;
    font-size: 0.3rem;
  }
}
.pwd_info {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
</style>