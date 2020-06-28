<template>
  <div class="close-pk-dialog">
    <div class="mask">
      <div class="tip-box">
        <div class="desc">
          提前结束本次PK?
          <img @click="closeDialog" src="../../static/img/close.png" alt />
        </div>
        <div class="close-pk" @click="closePk">提前结束</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import api from "@/constant/api";
import { Toast } from "mint-ui";
export default {
  props: {
    closePkDialogShow: {
      type: Boolean
    }
  },
  data() {
    return {
    };
  },
  mounted() {},
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('update:closePkDialogShow', false);
    },
    // 关闭pk
    closePk() {
      this.$emit('update:closePkDialogShow', false);
      this.$emit('xClosePk');
    }
  }
};
</script>

<style type="text/css" scoped="scoped" lang="less">
.close-pk-dialog {
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10100;
    display: flex;
    justify-content: center;
    align-items: center;
    .tip-box {
      width: 5rem;
      background: #ccc;
      border-radius: 0.1rem;
      .desc {
        position: relative;
        text-align: center;
        line-height: 1rem;
        font-weight: 700;
        img {
          position: absolute;
          right: 0.3rem;
          top: 0.3rem;
          height: 0.4rem;
        }
      }
      .close-pk {
        width: 4rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background: #326aff;
        color: #fff;
        margin: 0.2rem auto 0.5rem;
      }
    }
  }
}
</style>
