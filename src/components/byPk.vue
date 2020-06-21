<template>
  <div class="by-pk">
    <div class="mask" v-if="show" @click="show=false"></div>
    <div class="fixed-box by-pk-container" v-if="show">
      <div class="container">
        <div class="title">礼物PK</div>
        <div class="desc">来自【相互关注】主播的PK邀请</div>
        <div class="info-box">
          <div class="info">
            <div class="avatar">
              <img :src="'../../static/img/default.jpg'" alt />
            </div>
            <div class="info-other">
              <div class="one">
                <span>{{pkFromData.user_nicename}}</span>
                <img :src="`../../static/img/op1.png`" alt />
                <img :src="`../../static/img/1.png`" alt />
              </div>
              <div class="two">
                <img src="../../static/img/nan.png" v-if="1" alt />
                <!-- <img src="../../static/img/nv.png" v-if="item.sex===2" alt /> -->
                <span class="audience">11观众</span>
                <span class="yinlang">22累计音浪</span>
              </div>
            </div>
          </div>
        </div>
        <div class="operate">
          <div class="refuse" @click="show=false">拒绝（6s）</div>
          <div class="shuxian"></div>
          <div class="accept">接受</div>
        </div>
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
    pkFromData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      show: false
    };
  },
  mounted() {},
  methods: {
    init() {
      const _this = this;
    }
  }
};
</script>

<style type="text/css" scoped="scoped" lang="less">
.by-pk {
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10100;
  }
  .fixed-box {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10101;
  }
  .by-pk-container {
    .container {
      position: absolute;
      width: 100%;
      background: #fff;
      bottom: 0;
      border-radius: 0.4rem 0.4rem 0 0;
      .title {
        position: relative;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        color: #000;
        font-weight: 700;
        border-bottom: 0.001rem solid #eee;
      }
      .desc {
        height: 1rem;
        line-height: 1rem;
        font-weight: 700;
        margin: 0 0.2rem;
      }
      .info-box {
        height: 2rem;
        overflow: auto;
        margin: 0 0.2rem;
        .info {
          display: flex;
          align-items: center;
          .avatar {
            flex: 0 0 1.5rem;
            height: 1.5rem;
            border: 0.05rem;
            border-radius: 0.75rem;
            border: 0.05rem solid #326aff;
            box-sizing: border-box;
            overflow: hidden;
            img {
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
          }
          .info-other {
            flex: 1;
            height: 1.5rem;
            margin-left: 0.2rem;
            .one {
              height: 0.75rem;
              span {
                display: inline-block;
                max-width: 2rem;
                color: #404142;
                margin-top: 0.15rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .two {
              height: 0.75rem;
              font-size: 0.3rem;
              span {
                display: inline-block;
                margin-top: 0.15rem;
              }
              .audience {
                color: #326aff; // #E7577F
              }
              .yinlang {
                color: #8e8e8f;
              }
            }
            img {
              height: 0.45rem;
              margin-top: 0.15rem;
            }
          }
        }
      }
      .operate {
        display: flex;
        align-items: center;
        height: 1rem;
        border-top: 0.01rem solid #979797;
        .refuse {
          height: 100%;
          width: calc(50% - 0.01rem);
          color: #050505;
          text-align: center;
          line-height: 1rem;
        }
        .shuxian {
          height: 0.6rem;
          margin-top: 0.1rem;
          border-right: 0.01rem solid #979797;
        }
        .accept {
          height: 100%;
          width: calc(50% - 0.01rem);
          color: #2f6afe;
          text-align: center;
          line-height: 1rem;
        }
      }
    }
  }
}
</style>
