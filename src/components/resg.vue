<template>
    <div class="login">
      <div class="login-header"><span  @click="goHistroy('/')"><img src="../../static/img/left.png" alt=""></span><i></i></div>
      <h1>手机号注册</h1>
      <div class="form">
        <p>
          <select name="phone-type" id="">
            <option value="+86">+86</option>
          </select>
          <input type="text" id="phone" @keyup="changPhone" maxlength="11" v-model="login.phone" placeholder="请输入手机号">
          <!--<em @click="login.phone=''"><img src="../../static/img/close.png" alt=""></em>-->
        </p>
        <p>
          <input type="text" id="code"  v-model="login.code" placeholder="请输入验证码">
          <button :class="{disabled:numFlag}" @click="send">{{sen}}</button>
        </p>
          <p>
          <input :type="flag"  id="code1"  v-model="login.pwd" placeholder="请输入6-16位登录密码">
          <i @click="showYj"><img :src="fimg" alt=""></i>
        </p>
         <p>
          <input type="text"  id="code"  v-model="login.friend" placeholder="请输入推荐码">
        </p>
      </div>
      <div class="login-button" @click="Resg()"><img src="../../static/img/resg.png" alt=""></div>
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
            login:{
                friend:''
            },
            sen:'发验证码',
            numFlag:true,
            flag:'password',
            fimg:require('../../static/img/yanF.png'),
          }
        },
        mounted(){
            if(this.$route.query.person!=null&&this.$route.query.person!=undefined){
                this.login.friend=this.$route.query.person
            }
            var ll=localStorage.getItem('code')
            if(ll!=undefined&&ll!=null&&ll!=''){
                this.login.friend=ll
            }
            if(this.$route.query.person!=null&&this.$route.query.person!=undefined){
                this.login.friend=this.$route.query.person
            }
        },
      methods:{
          goHistroy:function(o){
				    this.$router.push({
	    			  path:o
	        	})
			    },
          showYj(){
            if(this.flag=='password'){
               this.flag='text'
               this.fimg=require('../../static/img/yanjing.png')
            }else{
              this.flag='password'
              this.fimg=require('../../static/img/yanF.png')
            }
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
              if(this.login.pwd==''||this.login.pwd==null||this.login.pwd.toString().replace(/\s*/g,"").length==0){
                this.showM("密码不能为空！");
              return false;
              }
              if(this.login.friend==''||this.login.friend==null||this.login.friend.toString().replace(/\s*/g,"").length==0){
                this.showM("推荐码不能为空！");
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
           // var param= this.$root.entrypt(json);
            this.axios.post(api.send,this.$qs.stringify(json))
            .then(function(res){
              if(res.data.state==0){
                  //_this.send()
                  _this.numFlag=true;
                  _this.countNum();
                  _this.login.code=res.data.content.phone_code
                }else{
                  _this.showM(res.data.msg);
                }
              })
          },
          Resg(){
            if(!this.formSet()){
              return false;
            }
            var _this=this;
            var json={phone:this.login.phone,password:this.login.pwd,phone_code:this.login.code,invitation_code:this.login.friend};
            //console.log(json)
           // var param= this.$root.entrypt(json);
            this.axios.post(api.register,this.$qs.stringify(json))
            .then(function(res){
              if(res.data.state==0){
                  _this.showM(res.data.msg+'1秒后跳转');
                  var ll=localStorage.getItem('code')
                  if(ll!=undefined&&ll!=null&&ll!=''){
                      localStorage.setItem('code','')
                      _this.goHistroy('/live?id='+ll)
                  }else{
                      setTimeout(function(){
                          _this.goHistroy('/')
                      },1000)
                  }
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
        #code1{
         border: 0 none;
         outline: none;
        font-size: 0.34rem;
        width:6.42rem;
        float: left;
      }
       i{
        display: block;
        border:0 none;
        width:0.38rem;
        color:#fff;
        float: left;
         margin-top:-0.1rem;
       // background: url(../../static/img/button.png) center no-repeat;
        outline: none;
        background:transparent;
        img{
          width:100%;
          vertical-align: middle;
        }
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
    margin-top:2rem;
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
