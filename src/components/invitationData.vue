<template>
  <div class="invitation-data">
    <ul>
      <li v-for="item in datas" :key="item.id">
        <div class="avatar">
          <img :src="item.avatar" alt />
        </div>
        <div class="info">
          <div class="one">
            <span>{{item.user_nicename}}</span>
            <img :src="`../../static/img/op${item.level_anchor}.png`" alt />
            <img :src="`../../static/img/${item.level}.png`" alt />
          </div>
          <div class="two">
            <img src="../../static/img/nan.png" v-if="item.sex===1" alt />
            <img src="../../static/img/nv.png" v-if="item.sex===2" alt />
            <span :class="{'nan':item.sex===1,'nv':item.sex===2}">{{item.fans_num}}粉丝</span>
            <span class="yinlang">{{item.vote_total}}累计海螺</span>
          </div>
        </div>
        <div class="invitation-pk">
          <div class="invitation-btn pking" v-if="item.ispk==1">PK中</div>
          <div class="invitation-btn" v-else-if="item.islive==1" @click="$emit('invitationPk',item)">邀请PK</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import api from "@/constant/api";
export default {
  props: {
    datas: {
      type: Array,
      default: []
    }
  },
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
          .nan {
            color: #326aff;
          }
          .nv {
            color: #e7577f;
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
          &.pking {
            background: #ccc;
          }
        }
      }
    }
  }
}
</style>
