<template>
    <div class="login">
      <div class="login-header"><span  @click="goHistroy('/')"><img src="../../static/img/left.png" alt=""></span><i  @click="goHistroy('/login_pwd')">密码登录</i></div>
      <h1>验证码登录</h1>
      <div class="form">
        <p>
          <select name="phone-type" id="">
            <option value="+86">+86</option>
          </select>
          <input type="text" id="phone" @keyup="changPhone" maxlength="11" v-model="login.phone" placeholder="请输入手机号">
          <em @click="login.phone=''"><img src="../../static/img/close.png" alt=""></em>
        </p>
        <p>
          <input type="text" id="code"  v-model="login.code" placeholder="请输入验证码">
          <button :class="{disabled:numFlag}" @click="send">{{sen}}</button>
        </p>
      </div>
      <div class="login-button" @click="Login()"><img src="../../static/img/login.png" alt=""></div>
      <div class="footer"><img src="../../static/img/copy.png" alt="">&nbsp;登录代表你已同意<i>《用户注册协议》</i></div>
    </div>
</template>

<script>
import store from '@/store/store'
import api from '@/constant/api'
import * as types from '@/store/types'
import qs from 'qs'
import { Toast } from 'mint-ui'
    export default {
        name: "login",
        data(){
          return{
            login:[],
            sen:'发验证码',
            numFlag:true,
          }
        },
      methods:{
          goHistroy:function(o){
				    this.$router.push({
	    			  path:o
	        	})
			    },
          formSet:function(){
            var partten_tel =/(13|14|15|16|17|18|19)[0-9]{9}$/;
              if(!partten_tel.test(this.login.phone) ){
                this.showM("请输入正确的手机号！");
              return false;
              }

              if(this.login.code==''||this.login.code==null||this.login.code.toString().replace(/\s*/g,"").length==0){
                this.showM("验证码不能为空！");
              return false;
              }
              return true;

          },
          showM:function(o){
           // this.$root.Hub.$emit('child',{msg:o,flag:true});
            Toast({
              message:o,
              iconClass: 'icon icon-success',
              className:'backColor',
              duration:1000
            });
          },
          changPhone:function(){
            var partten_tel =/(13|14|15|16|17|18|19)[0-9]{9}$/;
            if(partten_tel.test(this.login.phone)){
              if(this.countdown>0){
                this.numFlag=true;
              }else{
                this.numFlag=false;
              }
            }else{
              this.numFlag=true;
            }
          },
          send:function(){
            if(!this.numFlag){
              this.sendPhone();
            }

          },
          sendPhone(){
            var _this=this;
            var json={phone:this.login.phone};
            console.log(json)
            //var param= this.$root.entrypt(json);
            this.axios.post(api.send,this.$qs.stringify(json))
            .then(function(res){
              if(res.data.state==0){
                  //_this.send()
                  _this.numFlag=true;
                  _this.countNum();
                 // _this.login.code=res.data.content.phone_code
                }else{
                  _this.showM(res.data.msg);
                }
              })
          },
        Login(){
            if(!this.formSet()){
              return false;
            }
            var _this=this;
            var json={phone:this.login.phone,phone_code:this.login.code};
            console.log(json)
           // var param= this.$root.entrypt(json);
            this.axios.post(api.login_code,this.$qs.stringify(json))
            .then(function(res){
              localStorage.setItem('uid',res.data.content.user_info.id);
              if(res.data.state==0){
                  _this.showM(res.data.msg+'1秒后跳转');
                  localStorage.setItem('login_token',res.data.content.user_info.login_token)
                  setTimeout(function(){
                    _this.goHistroy('/')
                  },1000)
                }else{
                  _this.showM(res.data.msg);
                }
              })
          },
          countNum:function(){
            this.countdown=60;
            var _this=this;
            function settime() {
              if (_this.countdown == 0) {
                _this.numFlag=false
                _this.sen="发验证码";
                _this.countdown = 60;
                return false;
              } else {
                _this.sen=_this.countdown + "S";
                _this.countdown--;
              }
              var time=setTimeout(function() {
                settime()
              },1000)
            }
            settime()
          }
      }
    }
</script>

<style scoped="scoped"  lang="less">
  .backColor{
    background: blue !important;
  }
  .disabled{
					background-color: #ccc !important;
  }
  .login{
    width: 6.8rem;
    padding:0 0.35rem;
    background: #fff;
    height:14rem;
    h1{
      font-size: 0.58rem;
      font-weight: normal;
      margin-top:0.7rem;
    }
    .form{
      margin-top:0.5rem;
      p{
        padding:0.3rem 0;
        border-bottom: 1px dashed #cfcfcf ;
        overflow: hidden;
        clear: both;
      }
      select{
        border: 0 none;
        outline: none;
        width:1.2rem;
        font-size: 0.34rem;
        float: left;
        background: #fff;
      }
      #phone{
        border:0 none;
        outline: none;
        font-size: 0.34rem;
        width:4.96rem;
        padding-left: 0.2rem;
        float: left;
        border-left: 1px dashed  #cfcfcf;
      }
      em{
        display: block;
        float: left;
        width:0.24rem;
        margin-top:-0.1rem;
        img{
          width:100%;
          vertical-align: middle;
        }
      }
      #code{
         border: 0 none;
         outline: none;
        font-size: 0.34rem;
        width:5.36rem;
        float: left;
      }
      button{
        display: block;
        border:0 none;
        width:1.44rem;
        height:0.44rem;
        font-size: 0.26rem;
        color:#fff;
        float: left;
       // background: url(../../static/img/button.png) center no-repeat;
        background-color: #c0b9f3;
        border-radius: 0.3rem;
        outline: none;
        background-size:100% 100%;
      }
    }
  }
  .login-header{
    overflow: hidden;
    padding:0.2rem 0;
    span{
      display: block;
      width:0.27rem;
      height:0.49rem;
      float: left;
    }
    img{
      width:100%;
    }
    i{
      color: #3F3F3F;
      font-size: 0.28rem;
      height:0.49rem;
      line-height: 0.49rem;
      float: right;
    }
  }
  .login-button{
    margin-top:2rem;
    text-align: center;
    img{
      width:3.7rem;
      height:0.8rem;
    }
  }
  .footer{
    margin-top:3rem;
    font-size: 0.26rem;
    text-align: center;
    img{
      width:6%;
      vertical-align: middle;
    }
    i{
      color:#79caf8;
    }
  }
</style>
