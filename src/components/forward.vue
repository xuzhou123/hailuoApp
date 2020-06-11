<template>
  <div class="Records">
     <header>
        <img src="../../static/img/leftx.png"   @click="LinkRouter('/?i=2')" alt=""><i>提现中心</i>
        <span  @click="LinkRouter('/pay')"><img src="../../static/img/payer.png" alt=""></span>
     </header>
      <div class="line"></div>

      <div class="payer">
        <p class="p0">{{live.name_votes}}：<i>186.5</i> <img src="../../static/img/web0.png" alt=""></p>
        <div class="p1"><p>{{live.name_votes}}兑换RMB</p> <i>今日可提现金额：{{live.n_today_can_cash}}</i></div>
        <p class="p3">提示 可提现金额：{{live.n_user_has_votes}}</p>
      </div>plo;pl[fglr[l,kge,[e
    <div class="button"  @click="openPromp('请填写提现金额！')"><img src="../../static/img/web2.png" alt=""></div>
  </div>
</template>

<script>
import store from '@/store/store'
import api from '@/constant/api'
import * as types from '@/store/types'
import qs from 'qs'
import { Toast,MessageBox } from 'mint-ui'
    export default {
        name: "Records",
        data(){
          return{
            live:[],
            money:0
          }
        },
        mounted(){
          this.search()

        },
        methods:{
          // search(){
          //   console.log(this.stime,this.etime)
          // },
           openPromp(o) {
             var _this=this;
              MessageBox.prompt(' ',o).then(({ value }) => {
                if (value) {
                  _this.money=value;
                  _this.paysearch()
                  //MessageBox.alert(`你的名字是 ${ value }`, '输入成功');
                }
              });
          },
           LinkRouter(o){
            this.$router.push({
              path:o
              })
           },
          search(o){
            var _this=this;
            this.axios.post(api.cash_centre)
            .then(function(res){
              if(res.data.state==0){
                   _this.live=res.data.content
                }else{
                  _this.showM(res.data.msg);
                }
              })
          },
          paysearch(o){
            var _this=this;
            var json={cash_money:this.money};
            this.axios.post(api.withdraw_cash,this.$qs.stringify(json))
            .then(function(res){
              _this.$root.login(res.data.state)
                  _this.showM(res.data.msg);
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

        }
    }
</script>

<style scoped lang="less">

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
   span{
     display: inline-block;
     width:0.84rem;
     float: right;
     img{
       width:100%;
       vertical-align: middle;
     }
   }
      }
    .line{
      width:100%;
      border-top:0.2rem solid #f3f3f3;
    }
.payer{
  width:7.1rem;
  margin:0 auto;
  .p0{
    color: #2c2c2c;
    font-size: 0.34rem;
    height:1.3rem;
    line-height: 1.3rem;
    i{
      color: #ccc;
    }
    img{
      width:0.35rem;
      vertical-align: middle;
      margin-top:-0.06rem;
    }
  }
  .p1{
    width:7.1rem;
    height:2.3rem;
    background: url("../../static/img/web.png");
    background-size: 100% 100%;
    color:#fff;
    text-align: center;
    overflow: hidden;
    p{
      font-size: 0.34rem;
      margin-top:0.5rem;
    }
    i{
      font-size: 0.3rem;
    }
  }
  .p3{
    font-size: 0.24rem;
    color: #8d8d8d;
    text-align: right;
    height:0.6rem;
    line-height: 0.6rem;
  }
}

  .button{
    width:3.7rem;
    height:0.8rem;
    margin:0 auto;
    margin-top:5.7rem;
    img{
      width:100%;
    }
  }
</style>
