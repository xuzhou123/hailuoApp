<template>
  <div class="blood-bar">
    <div class="blood blood-l" :style="{width:'70%'}">
      <span>11113331</span>
    </div>
    <div class="blood blood-r" :style="{width:'30%'}">
      <span>33333333</span>
    </div>
    <!-- 倒计时 -->
    <div class="count-down-box">
      <div class="count-down">
        <img src="../../static/img/pklogo.png" alt />
        00:59
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import api from "@/constant/api";
import { Toast } from "mint-ui";
export default {
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style type="text/css" scoped="scoped" lang="less">
.blood-bar {
  position: relative;
  font-size: 0;
  height: 0.38rem;
  color: #fff;
  .blood {
    height: 100%;
    line-height: 0.38rem;
    display: inline-block;
    font-size: 0.25rem;
  }
  .blood-l {
    background-image: linear-gradient(to right, #f42f4e, #f33be0);
    text-align: left;
    span {
      display: inline-block;
      margin-left: 0.2rem;
    }
  }
  .blood-r {
    background-image: linear-gradient(to right, #7de0ff, #636bff);
    text-align: right;
    span {
      display: inline-block;
      margin-right: 0.2rem;
    }
  }
  .count-down-box {
    position: absolute;
    top: 0.38rem;
    left: calc(50% - 1rem);
    width: 1.2rem;
    height: 0;
    z-index: 2;
    border-width: 0.4rem 0.4rem;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
    .count-down {
      position: absolute;
      top: -0.4rem;
      left: -0.4rem;
      right: -0.4rem;
      height: 0.4rem;
      padding: 0 0.4rem;
      font-size: 0.25rem;
      line-height: 0.4rem;
      img {
        display: inline-block;
        height: 0.3rem;
        margin-top: 0.05rem;
      }
    }
  }
}
</style>
