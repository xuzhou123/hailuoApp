<template>
  <div class="invitation-data">
    <ul>
      <li>
        <div class="avatar">
          <img src="../../static/img/default.jpg" alt />
        </div>
        <div class="info">
          <div class="one">
            <span>许多好机会房价肯定JFK搭建开发接口</span>
            <img src="../../static/img/op1.png" alt />
            <img src="../../static/img/23.png" alt />
          </div>
          <div class="two">
            <img src="../../static/img/women.png" alt />
            <span class="audience">99观众</span>
            <span class="yinlang">9999累计音浪</span>
          </div>
        </div>
        <div class="invitation-pk">
          <div class="invitation-btn">邀请PK</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import api from "@/constant/api";
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
.invitation-data {
  ul {
    li {
      height: 1rem;
      margin-top: 0.2rem;
      display: flex;
      align-items: center;
      .avatar {
        flex: 0 0 0.8rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      .info {
        flex: 1;
        padding-left: 0.2rem;
        .one {
          height: 0.5rem;
          span {
            display: inline-block;
            max-width: 2rem;
            color: #404142;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .two {
          height: 0.5rem;
          font-size: 0.2rem;
          span {
            display: inline-block;
            margin-top: 0.1rem;
          }
          .audience {
            color: #326aff; // #E7577F
          }
          .yinlang {
            color: #8e8e8f;
          }
        }
        img {
          height: 0.3rem;
          margin-top: 0.1rem;
        }
      }
      .invitation-pk {
        flex: 0 0 1.5rem;
        .invitation-btn {
          float: right;
          width: 1.2rem;
          padding: 0.05rem;
          text-align: center;
          color: #fff;
          font-size: 0.2rem;
          border-radius: 0.05rem;
          background: #326aff;
        }
      }
    }
  }
}
</style>
