<template>
    <div class="setting">
      <header>
        <img src="../../static/img/leftx.png"   @click="LinkRouter('/?i=2')" alt=""><i>我的认证</i>
      </header>
      <div class="line"></div>
      <ul>
        <li>
          <span>真实姓名</span>
          <input type="text" v-model="CertNum.name" placeholder="请填写您的真实姓名">
        </li>
        <li>
          <span>手机号码</span>

         <input type="text" v-model="CertNum.phone" maxlength="11" placeholder="请填写您的手机号">
        </li>
        <li>
          <span>银行卡号</span>

         <input type="text" v-model="CertNum.bankCard" placeholder="请填写您的银行卡号">
        </li>
        <li>
          <span>开户银行</span>

         <input type="text" v-model="CertNum.bankName" placeholder="请填写您的银行名称">
        </li>
         <!--<li  @click="show=true">
          <span>开户地</span>
            <em><img src="../../static/img/right.png" alt=""></em>
           <input type="text" disabled="disabled"  :value="message.province+' '+message.city+' '+message.area" placeholder="请选择开户省市">
        </li>-->

        <li>
          <span>支行名称</span>
         <input type="text" v-model="CertNum.cardName"  placeholder="请填写支行名称">
        </li>
      </ul>
      <button @click="nextSession()">下一步</button>
      <weui-distpicker v-if="show"  @confirm="onConfirm" @cancel="onCancel"></weui-distpicker>
    </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import store from '@/store/store'
  import api from '@/constant/api'
  import WeuiDistpicker from 'weui-distpicker'
    export default {
        name: "setting",
        data(){
          return{
             show: false,
             message: {
                province:'广东省',
                city:'广州市',
                area:'天河区',
             },
             CertNum:[]
          }
        },
        mounted(){

        },
        methods:{
          nextSession(){
            if(!this.formSet()){
                return
            }
            //var str='name='+this.CertNum.name+'&phone='+this.CertNum.phone+'&bankCard='+this.CertNum.bankCard+'&bankUrl='+this.message.province+'-'+this.message.city+'-'+this.message.area+'&cardName='+this.CertNum.cardName
            var str='name='+this.CertNum.name+'&phone='+this.CertNum.phone+'&bankCard='+this.CertNum.bankCard+'&bankName='+this.CertNum.bankName+'&cardName='+this.CertNum.cardName

            this.LinkRouter('/mycerting?'+str)
          },
          formSet(){
              var o=this.CertNum;
              var phone_tel =/(13|14|15|16|17|18|19)[0-9]{9}$/;
              var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
              //var pattern = /^([1-9]{1})(\d{14}|\d{18})$/;
              var pattern = /^[0-9]+$/;
              if(o.name==''||o.name==null||o.name.toString().replace(/\s*/g,"").length==0){
                  this.showM("姓名不能为空！");
                  return false;
              }

              if(!phone_tel.test(o.phone) ){
                this.showM("请输入正确的手机号！");
                return false;
              }
            /*	if(!reg.test(o.idcard)){
                  this.showM("请输入正确的身份证号码！");
                return false;
                }*/
                if(!pattern.test(o.bankCard)){
                  this.showM("请输入正确的银行卡号码！");
                return false;
                }

               if(o.bankName==''||o.bankName==null||o.bankName.toString().replace(/\s*!/g,"").length==0){
                  this.showM("银行名称不能为空");
                return false;
                }

              if(o.cardName==''||o.cardName==null||o.cardName.toString().replace(/\s*/g,"").length==0){
                  this.showM("支行名称不能为空！");
                return false;
                }


                return true;
          },
           LinkRouter(o){
            this.$router.push({
              path:o
              })
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
           onConfirm(data) {
            this.message.province = data[0].label
            this.message.city = data[1].label
            if(data.length>2){
              this.message.area = data[2].label
            }else{
              this.message.area = ''
            }

            this.show = false
          },
          onCancel() {
            this.show = false
          },
        },
      components: { WeuiDistpicker }
    }
</script>

<style scoped lang="less">
  .setting{
      header{
          width:7.1rem;
          margin:0 auto;
          height:1.2rem;
          line-height: 1.2rem;
        img{
          width:0.26rem;
          vertical-align: middle;
        }
        i{
          font-size: 0.4rem;
          color: #2c2c2c;
          margin-left:0.5rem;
        }
      }
    .line{
      width:100%;
      border-top:0.2rem solid #f3f3f3;
    }
  }
  ul{
    li{
      border-bottom: 1px solid #f3f3f3;
      padding:0.2rem 0.2rem;
      overflow: hidden;
      height:0.7rem;
      line-height: 0.7rem;
      input{
        width:5rem;
        text-align:right;
         float: right;
         font-size: 0.34rem;
        border:0 none;
        margin-top:0.06rem;
        background: #fff;
      }
      input::-webkit-input-placeholder {
          /* placeholder颜色  */
         color: #b8b8b8;
     }
      span{
        font-size: 0.34rem;
        color: #2c2c2c;
        float: left;
      }
      i{
        display: inline-block;
        float: right;
         font-size: 0.34rem;
        color: #b8b8b8;
        img{
          width:100%;
           vertical-align: middle;
        }
      }
       em{
         float: right;
        display: inline-block;
        width:0.23rem;
         margin-left:0.2rem;
        img{
          width:100%;
           vertical-align: middle;
          margin-top:-0.12rem;
        }
      }
    }

  }
  button{
    width:3.7rem;
    height:0.8rem;
    outline: none;
    border:0 none;
    font-size:0.34rem ;
    color: #fff;
    border-radius: 0.5rem;
    position: fixed;
    left:1.8rem;
    bottom:1rem;
    background: -webkit-linear-gradient(left, #53acff , #b846ff); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #53acff, #b846ff); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #53acff, #b846ff); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #53acff , #b846ff); /* 标准的语法 */
  }
</style>
