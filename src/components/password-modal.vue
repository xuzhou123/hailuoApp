<template>
  <div>
    <div class="pwd_box" v-show="modalVisible">
      <div class="passTitle">{{passTitle}}</div>
      <ul class="pwd-wrap" @click="focus">
        <li :class="msg.length == 0?'psd-blink':''">
          <i v-if="msg.length > 0"></i>
        </li>
        <li :class="msg.length == 1?'psd-blink':''">
          <i v-if="msg.length > 1"></i>
        </li>
        <li :class="msg.length == 2?'psd-blink':''">
          <i v-if="msg.length > 2"></i>
        </li>
        <li :class="msg.length == 3?'psd-blink':''">
          <i v-if="msg.length > 3"></i>
        </li>
        <li :class="msg.length == 4?'psd-blink':''">
          <i v-if="msg.length > 4"></i>
        </li>
        <li :class="msg.length == 5?'psd-blink':''">
          <i v-if="msg.length > 5"></i>
        </li>
      </ul>
      <div class="footer">
        <button @click="modalVisible=false">取消</button>
        <button @click="submit">确认</button>
      </div>
      <input ref="pwd" type="tel" maxlength="6" v-model="msg" class="pwd" unselectable="on" />
    </div>
    <div class="pwd_info" v-show="modalVisible" @click="modalVisible=false"></div>
  </div>
</template>

<script>
import apiy from "@/constant/api";
import { Toast } from "mint-ui";
export default {
  name: "cashier",
  head() {
    return {
      title: `去支付`
    };
  },
  data() {
    return {
      msg: "" //支付密码
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    passTitle: {
      type: String,
      default: "请输入房间密码！"
    },
    type: {
      type: String,
      default: "create"
    },
    id: {
      type: [String, Number],
      default: ""
    }
  },
  computed: {
    modalVisible: {
      get() {
        if (this.visible) {
          this.msg = "";
          this.$refs.pwd.focus();
        }
        return this.visible;
      },
      set(val) {
        return this.$emit("update:visible", val);
      }
    }
  },
  watch: {
    msg(curVal) {
      if (/[^\d]/g.test(curVal)) {
        this.msg = this.msg.replace(/[^\d]/g, "");
      }
    }
  },
  methods: {
    //输入支付密码
    focus() {
      this.$refs.pwd.focus();
    },
    submit() {
      if (this.type === "create") {
        this.createPassword();
      } else {
        this.checkPassword();
      }
    },
    checkPassword() {
      var json = { anchor_id: this.id, liveroom_password: this.msg };
      this.axios
        .post(apiy.live_check_liveroom_password, this.$qs.stringify(json))
        .then((res)=> {
          var dat = res.data;
          if (dat.state === 0) {
            this.modalVisible = false;
            this.$emit("passNum", this.id);
          } else {
            Toast(dat.msg);
          }
        });
    },
    createPassword() {
      if (this.msg.length < 6) {
        Toast("请输入6为房间密码！");
        return false;
      }
      this.modalVisible = false;
      this.$emit("passNum", this.msg);
    }
  }
};
</script>

<style  lang="less" scoped>
// 输入支付密码样式
.pwd_box {
  height: auto;
  position: fixed;
  width: 5rem;
  height: 2.5rem;
  margin-top: -1.25rem;
  margin-left: -2.5rem;
  left: 50%;
  top: 50%;
  background: #fff;
  border-radius: 0.3rem;
  padding: 0.2rem 0;
  box-shadow: 0 0 0.1rem #ccc;
  z-index: 101;
  .passTitle {
    text-align: center;
    color: #aaa;
    padding: 0.1rem 0 0.2rem 0;
    font-size: 0.3rem;
  }
  input[type="tel"] {
    width: 0.1px;
    height: 0.1px;
    color: transparent;
    // position: relative;
    // top: 23px;
    background: #000000;
    // left: 46px;
    border: none;
    font-size: 18px;
    opacity: 0;
    z-index: -1;
  }
  //光标
  .psd-blink {
    display: inline-block;
    // background: url("./img/blink.gif") no-repeat center;
  }
  .pwd-wrap {
    height: 0.7rem;
    padding-bottom: 1px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #ddd;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    margin: 0 0.3rem;
    border-radius: 0.15rem;
    cursor: pointer;
    // position: absolute;
    // left: 0;
    // right: 0;
    // top: 13%;
    z-index: 10;
    li {
      list-style-type: none;
      text-align: center;
      line-height: 0.7rem;
      -webkit-box-flex: 1;
      flex: 1;
      -webkit-flex: 1;
      border-right: 1px solid #ccc;
      &:last-child {
        border-right: 0;
      }
      i {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #000;
        display: inline-block;
      }
    }
  }
  .footer {
    text-align: center;
    button {
      width: 2rem;
      display: inline-block;
      border-radius: 0.3rem;
      border: 1px solid #d8dcdd;
      padding: 0.13rem 0;
      background: #fff;
      font-size: 0.2rem;
      margin-top: 0.25rem;
      outline: none;
    }
    button:last-child {
      background: #7decdc;
      color: #fff;
      margin-left: 0.2rem;
    }
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