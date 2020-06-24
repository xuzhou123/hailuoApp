<template>
  <div class="blood-bar">
    <div class="blood blood-l" :style="{width: ratioL+'%'}">
      <span>{{bloodL}}</span>
    </div>
    <div class="blood blood-r" :style="{width: ratioR+'%'}">
      <span>{{bloodR}}</span>
    </div>
    <!-- 倒计时 -->
    <div class="count-down-box">
      <div class="count-down">
        <img v-if="roomState!='punish'" src="../../static/img/pklogo.png" alt />
        <span v-if="roomState=='punish'">惩罚</span>
        {{time}}
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
    pkActiveData: {
      type: Object,
      default: {}
    },
    liveCt: {
      type: Object,
      default: {}
    },
    lUid: {
      type: Number
    },
    rUid: {
      type: Number
    }
  },
  watch: {
    pkActiveData(newVal, oldVal) {
      if (this.pkActiveData.pk_data&&this.pkActiveData.pk_data.anchor) {
        this.formatBlood();
        this.setTime();
      }
    }
  },
  data() {
    return {
      bloodL: 0,
      bloodR: 0,
      ratioL: 50,
      ratioR: 50,
      time: '00:00',
      roomState: 'pk',// 房间状态 pk：pk中 punish：惩罚中 no：没有状态
    };
  },
  methods: {
    formatBlood() {
      this.bloodL = this.pkActiveData.pk_room_data.contribution["uid_" + this.lUid];  
      this.bloodR = this.pkActiveData.pk_room_data.contribution["uid_" + this.rUid];
      // 计算比率
      let sum = this.bloodL + this.bloodR;
      if(sum==0) {
        this.ratioL = this.ratioR = 50;
      } else {
        let ratio = Math.ceil(this.bloodL/sum*100);
        if(ratio>=95) {
          this.ratioL = 95;
          this.ratioR = 5;
        } else if (ratio<=5) {
          this.ratioL = 5;
          this.ratioR = 95;
        } else {
          this.ratioL = ratio;
          this.ratioR = 100 - this.ratioL;
        }
      }
    },
    setTime() {
      this.roomState = this.pkActiveData.pk_room_data.room_state;
      if(this.roomState=='pk') {
        this.time = this.pkActiveData.pk_room_data.pk_stime;
      } else if(this.roomState=='punish') {
        this.time = this.pkActiveData.pk_room_data.punish_stime;
      }
    }
  },
  mounted() {}
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
